import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;

  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      redirect: 'follow',
    });

    if (!res.ok) {
      const snippet = (await res.text()).slice(0, 200);
      console.error('[api/claim/nosana] Apps Script non-OK', res.status, snippet);
      return NextResponse.json(
        { error: 'Sheet webhook failed', upstreamStatus: res.status },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[api/claim/nosana] fetch error', err);
    return NextResponse.json({ error: 'Failed to reach webhook' }, { status: 502 });
  }
}
