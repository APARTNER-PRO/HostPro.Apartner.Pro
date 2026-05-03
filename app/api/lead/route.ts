import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { contact, messages } = await req.json();

    if (!contact) {
      return NextResponse.json({ error: 'Contact is required' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Якщо токен або чат не налаштовані, ми просто імітуємо успіх
    // щоб не ламати логіку чату для користувача
    if (!botToken || !chatId) {
      console.log('Lead captured (Telegram not configured):', contact);
      return NextResponse.json({ success: true, warning: 'Telegram credentials missing' });
    }

    // Формуємо текст повідомлення
    let messageText = `🔥 <b>Новий лід з чату HostPro.apartner.pro</b>\n\n`;
    messageText += `<b>Контакт:</b> ${contact}\n\n`;

    // Якщо передали історію повідомлень (останні 3-4), додаємо контекст
    if (messages && messages.length > 0) {
      messageText += `<b>Контекст розмови:</b>\n`;
      const recentMessages = messages.slice(-4); // беремо останні 4 повідомлення
      recentMessages.forEach((m: any) => {
        const role = m.role === 'user' ? 'Клієнт' : 'Бот';
        // Обрізаємо занадто довгі повідомлення
        const text = m.content.length > 150 ? m.content.substring(0, 150) + '...' : m.content;
        messageText += `<i>${role}:</i> ${text}\n`;
      });
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    console.error('Lead API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
