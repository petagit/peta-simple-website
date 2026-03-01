import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

interface RawArticle {
  title: string;
  url: string;
  description: string;
  query: string;
  publishedAt: string;
  age: string;
}

interface NewsData {
  lastUpdated: string;
  articles: RawArticle[];
}

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

function toArticle(raw: RawArticle, index: number) {
  const slug = slugify(raw.title);
  return {
    // Rankinglab-compatible fields
    id: slug || String(index),
    title: raw.title,
    link: raw.url,
    pubDate: raw.publishedAt,
    author: '',
    source: raw.query,
    categories: [raw.query],
    imageUrl: `/images/seo-news/${slug}.png`,
    description: raw.description,
    content: '',
    // Original fields (kept for backwards compat)
    url: raw.url,
    query: raw.query,
    publishedAt: raw.publishedAt,
    age: raw.age,
  };
}

function loadNewsData(): NewsData {
  const dataPath = path.join(process.cwd(), 'data', 'seo-news.json');
  if (!fs.existsSync(dataPath)) {
    return { lastUpdated: new Date().toISOString(), articles: [] };
  }
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = (page - 1) * limit;
    const queryFilter = searchParams.get('query')?.toLowerCase();
    const search = searchParams.get('search')?.toLowerCase();

    const newsData = loadNewsData();
    let articles = newsData.articles;

    if (queryFilter) {
      articles = articles.filter(a => a.query.toLowerCase().includes(queryFilter));
    }
    if (search) {
      articles = articles.filter(a =>
        a.title.toLowerCase().includes(search) ||
        a.description.toLowerCase().includes(search)
      );
    }

    const total = articles.length;
    const paginated = articles.slice(offset, offset + limit).map((a, i) => toArticle(a, offset + i));

    return NextResponse.json({
      articles: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: offset + limit < total,
      },
      lastUpdated: newsData.lastUpdated,
    }, {
      headers: {
        ...CORS_HEADERS,
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error loading articles:', error);
    return NextResponse.json({ error: 'Failed to load articles' }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
