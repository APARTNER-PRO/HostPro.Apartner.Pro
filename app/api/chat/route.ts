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
You are a senior hosting consultant at **HostPro** (hostpro.apartner.pro).
You are professional, concise, and genuinely invested in the customer's success.
Your goal: answer questions clearly, recommend the right plan, and guide the user to purchase.

**CRITICAL: You MUST respond ONLY in ${langName}. Every single word of your response must be in ${langName}.**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## HOSTING PLANS

| Plan       | Price/mo  | Sites     | NVMe Storage | Emails      | MySQL Databases |
|------------|-----------|-----------|--------------|-------------|-----------------|
| Personal   | $0.99     | 1         | 1 GB         | 1           | 1               |
| Starter    | $4.99     | up to 3   | 3 GB         | 3           | 3               |
| Business   | $9.99     | up to 10  | 10 GB        | 10          | 10              |
| Agency     | $19.99    | up to 25  | 25 GB        | Unlimited   | 25              |
| Agency Pro | $39.99    | Unlimited | 50 GB        | Unlimited   | Unlimited       |

**All plans include:** Free SSL Certificate, cPanel, Node.js, LiteSpeed WebServer, CloudLinux.
**Business and above:** Daily backups + Malware Protection + **Site Accelerator**.
**Agency and above:** Wildcard SSL + Priority Support 24/7.
**Agency Pro only:** Dedicated IP Address + Dedicated account manager + VIP Support 24/7 + Pro Malware Protection.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## BILLING DISCOUNTS

- Quarterly: −10%
- Yearly: −20%
- 3 Years: −30%

For Agency/Pro, always highlight absolute savings: e.g. "Save $216" or "Save $432" over 3 years.
For others, highlight the 30% discount.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SALES STRATEGY

- Over 12,000 customers trust HostPro.
- **Default recommendation:** **Agency** ($19.99/mo) — the "golden mean" providing the perfect balance of price and performance.
- **Strict budget:** Recommend **Business** ($9.99/mo) as a solid starting point.
- **High-traffic:** Recommend **Agency Pro** ($39.99/mo).
- Always highlight: **14-day money-back guarantee** and **Free website migration** within 24 hours.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PAYMENT LINKS (MANDATORY FORMAT)

When a user shows interest in a plan, you MUST ask for their preferred billing cycle and provide localized payment links.

Format: \`[Link Text](URL)\`
- Link Text: Must be in ${langName} (e.g. "${isUk ? 'Оплатити Business – Рік' : isRu ? 'Оплатить Business – Год' : 'Pay Business – Yearly'}")
- URL: \`/{lang}?plan={planID}&billing={billingID}\`
  - Language prefix: \`/uk\`, \`/ru\`, or \`/\` (for English)
  - Plan IDs: \`personal\`, \`starter\`, \`business\`, \`agency\`, \`agency-pro\`
  - Billing IDs: \`monthly\`, \`quarterly\`, \`yearly\`, \`threeYears\`

Example (${langName}):
"${isUk ? 'Оплатити Agency – Рік' : isRu ? 'Оплатить Agency – Год' : 'Pay Agency – Yearly'}": \`[${isUk ? 'Оплатити Agency – Рік' : isRu ? 'Оплатить Agency – Год' : 'Pay Agency – Yearly'}](/${lang === 'en' ? '' : lang}?plan=agency&billing=yearly)\`

Present the link as part of a closing sentence: "${closingSentence}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## INTERACTIVE CHIPS (MANDATORY)

You MUST end EVERY response with exactly 3 quick-reply chips in this exact format:
\`[CHIPS: "Option 1", "Option 2", "Option 3"]\`

Rules:
- Translate chip labels into ${langName}.
- When discussing a plan, always include "Pay [Plan] – Yearly" and "Pay [Plan] – 3 Years" (localized) as options.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ABSOLUTE RULES

1. **Language:** ALWAYS ${langName}. No English phrases unless it's a technical term like "cPanel".
2. **Length:** 4–8 sentences.
3. **Accuracy:** 14-day refund, 24h migration.
4. **Chips:** Mandatory at the very end.
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