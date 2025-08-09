import { json } from '@sveltejs/kit';

// Simple in-memory rate limiter per IP: max 20 requests per minute
const requestsByIp = new Map<string, number[]>();

function isRateLimited(ipAddress: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 20;

  const recent = (requestsByIp.get(ipAddress) ?? []).filter(
    (timestamp) => now - timestamp < windowMs
  );

  if (recent.length >= maxRequests) return true;

  recent.push(now);
  requestsByIp.set(ipAddress, recent);
  return false;
}

export async function POST({ request, getClientAddress }) {
  try {
    const ipAddress = getClientAddress?.() ?? 'unknown';
    if (isRateLimited(ipAddress)) {
      return json({ error: 'Too many requests' }, { status: 429 });
    }

    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return json({ error: 'Invalid content type' }, { status: 400 });
    }

    const body = await request.json().catch(() => null);
    const sourceText = typeof body?.text === 'string' ? body.text.trim() : '';

    if (!sourceText) {
      return json({ error: 'Missing text' }, { status: 400 });
    }

    // Guard: limit payload size to avoid prompt abuse
    if (sourceText.length > 600) {
      return json({ error: 'Text too long' }, { status: 413 });
    }

    const systemPrompt =
      'You are a strict translator to Traditional Chinese (Taiwan).\n' +
      '- Output ONLY the translation in Traditional Chinese, no explanations.\n' +
      '- Preserve meaning and keep it concise as one sentence.\n' +
      '- Keep game terms simple and beginner-friendly.\n' +
      '- Do not add punctuation or emojis beyond what is natural.\n' +
      '- If input is already Traditional Chinese, return it unchanged.';

    const userPrompt = `Translate the following to Traditional Chinese (Taiwan).\n\nText:\n"""${sourceText}"""`;

    const response = await fetch('https://ai.hackclub.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`AI API request failed: ${response.status}`);
    }

    const data = await response.json();
    let translated: string = data.choices?.[0]?.message?.content?.trim() ?? '';

    if (!translated) {
      throw new Error('Empty translation result');
    }

    // Remove potential hidden tags or wrapping quotes
    translated = translated.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    translated = translated.replace(/^\s*["']|["']\s*$/g, '').trim();

    return json({ text: translated });
  } catch (error) {
    console.error('Error translating text');
    return json({ error: 'Failed to translate' }, { status: 500 });
  }
}


