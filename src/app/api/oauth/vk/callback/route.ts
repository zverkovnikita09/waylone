import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Callback VK OAuth2.1 + PKCE
 * Получает ?code=..., обменивает на access_token,
 * ставит cookie и уведомляет родительское окно.
 */
export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const cookieStore = await cookies();
    const verifier = cookieStore.get("vk_code_verifier")?.value;

    // если отсутствует код или verifier — ошибка
    if (!code || !verifier) {
        return new Response(
            `<script>
        window.opener?.postMessage('vk-auth-failed', window.location.origin);
        window.close();
      </script>`,
            { headers: { "Content-Type": "text/html; charset=utf-8" } }
        );
    }

    try {
        // 1️⃣ Обмениваем code на access_token
        const params = new URLSearchParams({
            grant_type: "authorization_code",
            client_id: process.env.NEXT_PUBLIC_VK_CLIENT_ID!,
            redirect_uri: process.env.NEXT_PUBLIC_VK_REDIRECT_URI!,
            code,
            code_verifier: verifier,
        });

        const tokenResponse = await fetch("https://id.vk.ru/oauth2/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString(),
        });

        const data = await tokenResponse.json();

        if (!tokenResponse.ok || !data.access_token) {
            console.error("VK token exchange failed:", data);
            return new Response(
                `<script>
          window.opener?.postMessage('vk-auth-failed', window.location.origin);
          window.close();
        </script>`,
                { headers: { "Content-Type": "text/html; charset=utf-8" } }
            );
        }

        // 2️⃣ Удаляем временный verifier
        cookieStore.delete("vk_code_verifier");

        // 3️⃣ Сохраняем токен в cookie
        const res = new NextResponse(
            `<script>
        window.opener?.postMessage('vk-auth-success', window.location.origin);
        window.close();
      </script>`,
            { headers: { "Content-Type": "text/html; charset=utf-8" } }
        );

        res.cookies.set({
            name: "auth-token",
            value: data.access_token,
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 дней
        });

        return res;
    } catch (err: any) {
        console.error("VK callback error:", err);
        return new Response(
            `<script>
        window.opener?.postMessage('vk-auth-failed', window.location.origin);
        window.close();
      </script>`,
            { headers: { "Content-Type": "text/html; charset=utf-8" } }
        );
    }
}
