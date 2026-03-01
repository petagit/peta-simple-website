import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function slugify(text: string): string {
  if (!text) return 'untitled';
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function loadArticles() {
  const dataPath = path.join(process.cwd(), 'data', 'seo-news.json');
  if (!fs.existsSync(dataPath)) return [];
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  return data.articles || [];
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = decodeURIComponent(id);
    const articles = loadArticles();

    // Find by slug match
    const index = articles.findIndex((a: { title: string }) => slugify(a.title) === articleId);
    const raw = articles[index] ?? null;

    if (!raw) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404, headers: CORS_HEADERS });
    }

    const slug = slugify(raw.title);
    const article = {
      id: slug,
      title: raw.title,
      link: raw.url,
      pubDate: raw.publishedAt,
      author: '',
      source: raw.query,
      categories: [raw.query],
      imageUrl: `/images/seo-news/${slug}.png`,
      description: raw.description,
      content: `<h1>${raw.title}</h1><h2>${raw.query}</h2><p>${raw.description}</p>`,
      url: raw.url,
      query: raw.query,
      publishedAt: raw.publishedAt,
      age: raw.age,
    };

    return NextResponse.json({ article }, {
      headers: {
        ...CORS_HEADERS,
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error loading article:', error);
    return NextResponse.json({ error: 'Failed to load article' }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
