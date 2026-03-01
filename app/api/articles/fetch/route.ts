import { NextRequest, NextResponse } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function extractTextFromHtml(html: string): { title: string; content: string; excerpt: string } {
  // Remove <script>, <style>, <nav>, <footer>, <header>, <aside> blocks
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
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // Extract meta description as fallback excerpt
  const metaDescMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1].trim() : '';

  // Extract article/main content area if present
  const articleMatch = cleaned.match(/<(?:article|main)[^>]*>([\s\S]*?)<\/(?:article|main)>/i);
  const bodyHtml = articleMatch ? articleMatch[1] : cleaned;

  // Convert block elements to newlines
  const withNewlines = bodyHtml
    .replace(/<\/?(p|div|h[1-6]|li|br|blockquote|section)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '') // strip remaining tags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/gi, ' ');

  // Clean up whitespace
  const content = withNewlines
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 30) // drop short/empty lines (nav items, etc.)
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // First 300 chars as excerpt
  const excerpt = (metaDesc || content.slice(0, 300)).replace(/\s+/g, ' ').trim();

  return { title, content, excerpt };
}

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
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Invalid protocol');
    }
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400, headers: CORS_HEADERS });
  }

  try {
    const response = await fetch(parsedUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-News-Bot/1.0; +https://peta-simple-website.vercel.app)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch article: HTTP ${response.status}` },
        { status: 502, headers: CORS_HEADERS }
      );
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return NextResponse.json(
        { error: `Not an HTML page (content-type: ${contentType})` },
        { status: 422, headers: CORS_HEADERS }
      );
    }

    const html = await response.text();
    const { title, content, excerpt } = extractTextFromHtml(html);

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
      }
    });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: `Fetch failed: ${msg}` },
      { status: 502, headers: CORS_HEADERS }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
