import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // 2️⃣ Формируем запрос к внешнему API
        const externalResponse = await fetch('https://api.waylone.com/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({phone: "79800919756", code: body.code}),
        })

        // 3️⃣ Проверяем ответ
        if (!externalResponse.ok) {
            const errorText = await externalResponse.text()
            return NextResponse.json(
                { error: 'External API error', details: errorText },
                { status: externalResponse.status }
            )
        }

        // 4️⃣ Возвращаем данные клиенту
        const data = await externalResponse.json()
        const response = NextResponse.json(data)

        if (data) {
            response.cookies.set({
                name: 'auth-token',
                value: data.token,
                httpOnly: true,         // защищаем от JS-доступа
                secure: true,           // только по HTTPS
                sameSite: 'lax',        // или 'strict', если нужно
                path: '/',              // доступно во всём приложении
                maxAge: 60 * 60 * 24 * 7, // 7 дней
            })
        }

        return response;

    } catch (error: any) {
        console.error('Proxy error:', error)
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        )
    }
}