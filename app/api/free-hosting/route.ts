import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { partnerName, partnerEmail, clientEmail, partnerDomain, notes } = await req.json();

    if (!partnerName || !partnerEmail || !clientEmail || !partnerDomain) {
      return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.log('Free hosting application (Telegram not configured):', { partnerName, partnerEmail, clientEmail, partnerDomain });
      return NextResponse.json({ success: true, warning: 'Telegram credentials missing' });
    }

    let messageText = `🎁 <b>Нова заявка на БЕЗКОШТОВНИЙ ХОСТИНГ (Партнерська програма)</b>\n\n`;
    messageText += `<b>👤 Партнер:</b> ${partnerName}\n`;
    messageText += `<b>📧 Email партнера:</b> ${partnerEmail}\n`;
    messageText += `<b>🌐 Домен партнера:</b> ${partnerDomain}\n\n`;
    messageText += `<b>🔍 Email клієнта для верифікації:</b> ${clientEmail}\n\n`;
    if (notes) {
      messageText += `<b>📝 Нотатки:</b> ${notes}\n\n`;
    }
    messageText += `⚠️ <i>Перевірте: клієнт має замовити хостинг від 1 року та мінімум 14 днів тому. Нагорода = тариф і термін клієнта. Самореферали заборонені.</i>`;

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
