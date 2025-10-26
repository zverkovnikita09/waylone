import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        // const body = await request.json()

        // 2️⃣ Формируем запрос к внешнему API
        const externalResponse = await fetch('https://api.waylone.com/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({phone: "79800919756"}),
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
        return NextResponse.json(data)

    } catch (error: any) {
        console.error('Proxy error:', error)
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        )
    }
}