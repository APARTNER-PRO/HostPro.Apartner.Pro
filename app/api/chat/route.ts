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
  'google/gemini-2.0-flash-lite-preview-02-05:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'openrouter/auto', 
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
 You are HostPro AI, a professional hosting consultant.
 Goal: Convert visitors into customers.
 **Language:** ALWAYS ${langName}.
 
 **STRICT RULE:** Output ONLY the final response to the user. DO NOT think out loud.
 
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ## PRICING & RECOMMENDATION
 - **Support Email:** hostpro@apartner.pro
 - **Personal:** $0.99/mo (1 site, 1GB NVMe)
 - **Starter:** $4.99/mo (up to 3 sites, 3GB NVMe)
 - **Business:** $9.99/mo (up to 10 sites, 10GB NVMe, Site Accelerator)
 - **Agency (Recommended):** $19.99/mo (up to 25 sites, 25GB NVMe, **Priority Support 24/7**, Wildcard SSL)
 - **Agency Pro:** $39.99/mo (Unlimited sites, 50GB NVMe, VIP Support 24/7)
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ## PAYMENT LINKS (MANDATORY)
 If you recommend a plan, provide a clickable link.
 **Format:** \`[Localized Text](URL)\`
 
 - **URL:** \`/${lang === 'en' ? '' : lang}?plan={planID}&billing={billingID}\`
 - **planID:** personal, starter, business, agency, agency-pro
 - **billingID:** quarterly, yearly, threeYears
 
 **Examples:**
 - UK: \`[Купити Agency – Рік](/${lang === 'en' ? '' : lang}?plan=agency&billing=yearly)\`
 - RU: \`[Купить Agency – Год](/${lang === 'en' ? '' : lang}?plan=agency&billing=yearly)\`
 
 ${closingSentence}
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ## INTERACTIVE CHIPS
 End EVERY response with exactly 3 chips:
 \`[CHIPS: "Option 1", "Option 2", "Option 3"]\`
 
 NEVER translate the word "CHIPS".
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ## ABSOLUTE RULES
 1. Be concise (max 5 sentences).
 2. Mention 24h Free Migration and 14-day Money-back Guarantee.
 3. Use ${langName} only.
 `;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const OLLAMA_TOKEN = process.env.OLLAMA_CLOUD_TOKEN;

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
          temperature: 0.1, // Fixed: low temperature for stability
          top_p: 0.9,
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

    if (!content) return null;
    return content;
  } catch (err: any) {
    console.error(`[HostPro] Model ${model} → ${err.message}`);
    return null;
  }
}

const OLLAMA_MODELS = [
  'qwen2.5-72b',
  'llama3.3-70b',
  'deepseek-v3'
] as const;

async function tryOllamaCloud(
  model: string,
  messages: ChatMessage[],
  lang: string
): Promise<string | null> {
  if (!OLLAMA_TOKEN) return null;
  try {
    const response = await fetchWithTimeout(
      'https://api.ollama.cloud/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OLLAMA_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'system', content: getSystemPrompt(lang) }, ...messages],
          temperature: 0.1,
          max_tokens: MAX_TOKENS,
        }),
      },
      FETCH_TIMEOUT_MS,
    );

    if (!response.ok) {
      console.warn(`[HostPro] Ollama Cloud [${model}] → HTTP ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.error(`[HostPro] Ollama Cloud [${model}] Error:`, err);
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

  // Final fallback: Ollama Cloud (using user's token)
  for (const oModel of OLLAMA_MODELS) {
    const ollamaContent = await tryOllamaCloud(oModel, messages, lang);
    if (ollamaContent) {
      console.info(`[HostPro] Served by: Ollama Cloud [${oModel}] [${lang}]`);
      return NextResponse.json({ role: 'assistant', content: ollamaContent });
    }
  }

  const { getT } = await import('@/lib/i18n');
  const T = getT((lang || 'en') as any).chat;

  return NextResponse.json(
    { error: T.apiError || 'All models are currently unavailable. Please try again shortly.' },
    { status: 502 },
  );
}