import { NextResponse } from 'next/server';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: { role: string; content: string };
  }>;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const MODELS = [
  'google/gemini-2.0-flash-001',
  'qwen/qwen-2.5-72b-instruct:free',
  'google/gemini-2.0-flash-exp:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'meta-llama/llama-3.2-3b-instruct:free',
  'google/gemma-2-9b-it:free',
  'openrouter/auto', // Ultimate fallback: OpenRouter will pick any available model
  'openrouter/free'
] as const;

const MAX_TOKENS = 1000;
const FETCH_TIMEOUT_MS = 15_000;

// ─── System Prompt ────────────────────────────────────────────────────────────

const getSystemPrompt = (lang: string) => {
  const isUk = lang === 'uk';
  const isRu = lang === 'ru';
  const langName = isUk ? 'Ukrainian' : isRu ? 'Russian' : 'English';

  const closingSentence = isUk
    ? 'Натисніть на кнопку нижче, щоб розпочати миттєво.'
    : isRu
      ? 'Нажмите на кнопку ниже, чтобы начать мгновенно.'
      : 'Click the button below to get started instantly.';

  return `
You are a senior hosting consultant at **HostPro**.
Style: Professional, direct, sales-oriented. No unnecessary fluff.
Goal: Convert visitors into customers.

**CRITICAL: Respond ONLY in ${langName}. Every single word MUST be in ${langName}.**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SALES STRATEGY
- **Upsell to Agency ($19.99/mo):** Always recommend it as the best choice (Priority Support 24/7, Wildcard SSL, 25GB NVMe).
- **Proactive Links:** If you mention a plan, immediately ask: "Which billing cycle do you prefer: monthly, yearly (-20%), or 3 years (-30% savings)?"
- **Direct Pay Intent:** If the user says "Pay [Plan] - [Cycle]" (from a chip), respond immediately with the payment link and a brief confirmation of what they get.
- **Urgency/Value:** Highlight **Free Migration (24h)** and **14-day Money-back Guarantee**.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## HOSTING PLANS

| Plan       | Price/mo  | Sites     | NVMe  | Key Features |
|------------|-----------|-----------|-------|--------------|
| Personal   | $0.99     | 1         | 1 GB  | Basic hosting |
| Starter    | $4.99     | up to 3   | 3 GB  | Small projects |
| Business   | $9.99     | up to 10  | 10 GB | **Site Accelerator**, Backups |
| Agency     | $19.99    | up to 25  | 25 GB | **Priority Support 24/7**, Wildcard SSL |
| Agency Pro | $39.99    | Unlimited | 50 GB | **VIP Support 24/7**, Dedicated IP |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PAYMENT LINKS (MANDATORY FORMAT)

Format: \`[Link Text](URL)\`
- URL: \`/${lang === 'en' ? '' : lang}?plan={planID}&billing={billingID}\`
- Link Text examples:
  - UK: \`[Купити Agency – Рік]\`
  - RU: \`[Купить Agency – Год]\`
  - EN: \`[Buy Agency – Yearly]\`

Closing sentence: "${closingSentence}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## INTERACTIVE CHIPS

End EVERY response with 3 chips:
\`[CHIPS: "Option 1", "Option 2", "Option 3"]\`

If recommending a plan (e.g. Agency), use:
- "${isUk ? 'Купити Agency – Рік' : isRu ? 'Купить Agency – Год' : 'Buy Agency – Yearly'}"
- "${isUk ? 'Купити Agency – 3 роки' : isRu ? 'Купить Agency – 3 года' : 'Buy Agency – 3 Years'}"
- "${isUk ? 'Порівняти всі тарифи' : isRu ? 'Сравнить все тарифы' : 'Compare all plans'}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ABSOLUTE RULES
1. **Language:** ALWAYS ${langName}.
2. **Length:** Max 6 sentences.
3. **Chips are mandatory.**
`;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function fetchWithTimeout(url: string, options: RequestInit, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function tryModel(
  model: string,
  messages: ChatMessage[],
  apiKey: string,
  lang: string
): Promise<string | null> {
  try {
    const response = await fetchWithTimeout(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://hostpro.apartner.pro',
          'X-Title': 'HostPro',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          max_tokens: MAX_TOKENS,
          messages: [{ role: 'system', content: getSystemPrompt(lang) }, ...messages],
        }),
      },
      FETCH_TIMEOUT_MS,
    );

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[HostPro] Model ${model} → HTTP ${response.status}: ${errText}`);
      return null;
    }

    const data = (await response.json()) as OpenRouterResponse;
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.warn(`[HostPro] Model ${model} → empty content`);
      return null;
    }

    return content;
  } catch (err: any) {
    console.error(`[HostPro] Model ${model} → ${err.message}`);
    return null;
  }
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OPENROUTER_API_KEY is not set in environment variables.' },
      { status: 500 },
    );
  }

  let messages: ChatMessage[];
  let lang: string;
  try {
    const body = await req.json();
    messages = body.messages;
    lang = body.lang || 'en';
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error('Invalid messages array');
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  for (const model of MODELS) {
    const content = await tryModel(model, messages, apiKey, lang);
    if (content) {
      console.info(`[HostPro] Served by: ${model} [${lang}]`);
      return NextResponse.json({ role: 'assistant', content });
    }
  }

  return NextResponse.json(
    { error: 'All models are currently unavailable. Please try again shortly.' },
    { status: 502 },
  );
}