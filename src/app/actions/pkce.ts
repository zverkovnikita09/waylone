"use server";

/**
 * Генерация пары { code_verifier, code_challenge } для PKCE (OAuth 2.1)
 */
export async function generatePKCE() {
    // 1️⃣ Генерируем случайный verifier (64 байта)
    const randomBytes = crypto.getRandomValues(new Uint8Array(64));
    const code_verifier = Array.from(randomBytes, b =>
        String.fromCharCode(b)
    )
        .join("")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    // 2️⃣ Вычисляем SHA-256 и кодируем в base64url
    const encoder = new TextEncoder();
    const data = encoder.encode(code_verifier);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const base64 = btoa(String.fromCharCode(...hashArray))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    const code_challenge = base64;

    return { code_verifier, code_challenge };
}
