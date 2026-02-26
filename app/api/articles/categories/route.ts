import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'seo-news.json');
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({ categories: [] });
    }
    
    const data = fs.readFileSync(dataPath, 'utf-8');
    const newsData = JSON.parse(data);
    
    // Extract unique categories (queries) with counts
    const categoryMap = new Map<string, number>();
    for (const article of newsData.articles) {
      const query = article.query;
      categoryMap.set(query, (categoryMap.get(query) || 0) + 1);
    }
    
    const categories = Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    
    return NextResponse.json({
      categories,
      total: categories.length
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('Error loading categories:', error);
    return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
  }
}
