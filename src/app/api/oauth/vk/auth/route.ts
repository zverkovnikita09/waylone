import { NextResponse } from "next/server";
import { generatePKCE } from "@/app/actions/pkce";

export async function GET() {
    // ⚡ ждем результат асинхронной функции
    const { code_verifier, code_challenge } = await generatePKCE();

    // сохраняем verifier в cookie и редиректим на VK
    const res = NextResponse.redirect(
        "https://id.vk.ru/authorize?" +
        new URLSearchParams({
            response_type: "code",
            client_id: process.env.NEXT_PUBLIC_VK_CLIENT_ID!,
            redirect_uri: process.env.NEXT_PUBLIC_VK_REDIRECT_URI!,
            state: "vk_auth_" + Date.now(),
            code_challenge,
            code_challenge_method: "S256",
        }).toString()
    );

    res.cookies.set({
        name: "vk_code_verifier",
        value: code_verifier,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 300, // 5 минут
    });

    return res;
}
