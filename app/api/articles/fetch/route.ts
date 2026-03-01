import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Mac mini residential fetcher — bypasses cloud IP blocks
const MAC_MINI_FETCHER = 'https://fengzhipings-mac-mini.tail53bf89.ts.net';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing ?url= parameter' }, { status: 400, headers: CORS_HEADERS });
  }

  // Validate URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error('Invalid protocol');
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400, headers: CORS_HEADERS });
  }

  try {
    // Proxy to Mac mini fetcher (residential IP, custom DNS bypass)
    const proxyUrl = `${MAC_MINI_FETCHER}/fetch?url=${encodeURIComponent(parsedUrl.toString())}`;

    const response = await fetch(proxyUrl, {
      signal: AbortSignal.timeout(25000),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.ok ? 200 : response.status,
      headers: {
        ...CORS_HEADERS,
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    const isTimeout = msg.includes('aborted') || msg.includes('timeout');
    return NextResponse.json(
      { error: isTimeout ? 'Mac mini fetcher timed out' : `Proxy failed: ${msg}` },
      { status: 502, headers: CORS_HEADERS }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
