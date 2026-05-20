import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { partnerName, partnerEmail, notes } = await req.json();

    if (!partnerName || !partnerEmail) {
      return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.log('Partner program application (Telegram not configured):', { partnerName, partnerEmail, notes });
      return NextResponse.json({ success: true, warning: 'Telegram credentials missing' });
    }

    let messageText = `🎁 <b>Нова заявка на участь в ПАРТНЕРСЬКІЙ ПРОГРАМІ</b>\n\n`;
    messageText += `<b>👤 Ім'я:</b> ${partnerName}\n`;
    messageText += `<b>📧 Email:</b> ${partnerEmail}\n\n`;
    if (notes) {
      messageText += `<b>📝 Де планує розміщувати посилання:</b> ${notes}\n\n`;
    }
    messageText += `⚠️ <i>Надайте партнеру унікальне реферальне посилання для залучення клієнтів.</i>`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Telegram API error:', err);
      return NextResponse.json({ error: 'Failed to send to Telegram' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Free Hosting API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
