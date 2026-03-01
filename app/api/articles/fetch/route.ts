import { NextRequest, NextResponse } from 'next/server';

// Extend Vercel function timeout to 30s (hobby plan max)
export const maxDuration = 30;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function sanitize(text: string): string {
  // Remove control characters (except \n \r \t) that break JSON
  // eslint-disable-next-line no-control-regex
  return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

function extractTextFromHtml(html: string): { title: string; content: string; excerpt: string } {
  // Remove noisy blocks
  let cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<aside[\s\S]*?<\/aside>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  // Extract <title>
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const rawTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  const title = sanitize(rawTitle);

  // Meta description
  const metaDescMatch =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
  const metaDesc = metaDescMatch ? sanitize(metaDescMatch[1].trim()) : '';

  // Prefer article/main content block
  const articleMatch = cleaned.match(/<(?:article|main)[^>]*>([\s\S]*?)<\/(?:article|main)>/i);
  const bodyHtml = articleMatch ? articleMatch[1] : cleaned;

  // Convert block elements → newlines, strip all tags
  const withNewlines = bodyHtml
    .replace(/<\/?(p|div|h[1-6]|li|br|blockquote|section|td|th)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#\d+;/g, ' ')
    .replace(/&[a-z]+;/gi, ' ');

  const content = sanitize(
    withNewlines
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 30)
      .join('\n\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );

  const excerpt = (metaDesc || content.slice(0, 300)).replace(/\s+/g, ' ').trim();

  return { title, content, excerpt };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing ?url= parameter' }, { status: 400, headers: CORS_HEADERS });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error('Invalid protocol');
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400, headers: CORS_HEADERS });
  }

  try {
    const response = await fetch(parsedUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
      },
      signal: AbortSignal.timeout(25000), // 25s — leaves buffer before Vercel's 30s limit
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Source returned HTTP ${response.status}` },
        { status: 502, headers: CORS_HEADERS }
      );
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      return NextResponse.json(
        { error: `Not an HTML page (content-type: ${contentType})` },
        { status: 422, headers: CORS_HEADERS }
      );
    }

    const html = await response.text();
    const { title, content, excerpt } = extractTextFromHtml(html);

    if (!content) {
      return NextResponse.json(
        { error: 'Could not extract text — page may require JavaScript to render' },
        { status: 422, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json({
      url: parsedUrl.toString(),
      title,
      excerpt,
      content,
      wordCount: content.split(/\s+/).filter(Boolean).length,
      fetchedAt: new Date().toISOString(),
    }, {
      headers: {
        ...CORS_HEADERS,
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    const isTimeout = msg.includes('aborted') || msg.includes('timeout');
    return NextResponse.json(
      { error: isTimeout ? 'Article site timed out (>25s)' : `Fetch failed: ${msg}` },
      { status: 502, headers: CORS_HEADERS }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
