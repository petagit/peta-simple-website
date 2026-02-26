import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Article {
  title: string;
  url: string;
  description: string;
  query: string;
  publishedAt: string;
  age: string;
}

interface NewsData {
  lastUpdated: string;
  articles: Article[];
}

function loadNewsData(): NewsData {
  const dataPath = path.join(process.cwd(), 'data', 'seo-news.json');
  if (!fs.existsSync(dataPath)) {
    return { lastUpdated: new Date().toISOString(), articles: [] };
  }
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = (page - 1) * limit;
    
    // Filters
    const query = searchParams.get('query')?.toLowerCase();
    const search = searchParams.get('search')?.toLowerCase();
    
    const newsData = loadNewsData();
    let articles = newsData.articles;
    
    // Filter by query category (e.g., "core web vitals", "Google algorithm update")
    if (query) {
      articles = articles.filter(a => a.query.toLowerCase().includes(query));
    }
    
    // Search in title and description
    if (search) {
      articles = articles.filter(a => 
        a.title.toLowerCase().includes(search) || 
        a.description.toLowerCase().includes(search)
      );
    }
    
    const total = articles.length;
    const paginatedArticles = articles.slice(offset, offset + limit);
    
    return NextResponse.json({
      articles: paginatedArticles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: offset + limit < total
      },
      lastUpdated: newsData.lastUpdated
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('Error loading articles:', error);
    return NextResponse.json({ error: 'Failed to load articles' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
