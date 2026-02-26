import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'seo-news.json');
    
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({
        status: 'empty',
        lastUpdated: null,
        totalArticles: 0,
        categories: 0
      });
    }
    
    const data = fs.readFileSync(dataPath, 'utf-8');
    const newsData = JSON.parse(data);
    
    // Get unique categories
    const categories = new Set(newsData.articles.map((a: { query: string }) => a.query));
    
    // Get date range
    const dates = newsData.articles
      .map((a: { publishedAt: string }) => new Date(a.publishedAt).getTime())
      .filter((d: number) => !isNaN(d));
    
    return NextResponse.json({
      status: 'ok',
      lastUpdated: newsData.lastUpdated,
      totalArticles: newsData.articles.length,
      categories: categories.size,
      dateRange: dates.length > 0 ? {
        oldest: new Date(Math.min(...dates)).toISOString(),
        newest: new Date(Math.max(...dates)).toISOString()
      } : null,
      endpoints: {
        articles: '/api/articles',
        articlesWithParams: '/api/articles?page=1&limit=20&search=keyword&query=category',
        categories: '/api/articles/categories',
        meta: '/api/meta',
        legacyNews: '/api/news'
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    });
  } catch (error) {
    console.error('Error loading meta:', error);
    return NextResponse.json({ error: 'Failed to load metadata' }, { status: 500 });
  }
}
