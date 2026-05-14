import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, projectDescription, formType } = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error('Telegram credentials missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const message = `
🚀 **Нова заявка: ${formType || 'Безкоштовний хостинг'}**
━━━━━━━━━━━━━━━━━━
👤 **Ім'я:** ${name}
📧 **Email:** ${email}
📝 **Проект:** ${projectDescription}
━━━━━━━━━━━━━━━━━━
📅 Дата: ${new Date().toLocaleString('uk-UA')}
    `;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Telegram API error: ${error}`);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Telegram notification error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
