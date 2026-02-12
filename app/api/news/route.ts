import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'seo-news.json');
    
    // Check if data file exists
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({
        lastUpdated: new Date().toISOString(),
        articles: [],
        totalArticles: 0,
        error: 'No news data available yet'
      });
    }
    
    const data = fs.readFileSync(dataPath, 'utf-8');
    const newsData = JSON.parse(data);
    
    return NextResponse.json(newsData);
  } catch (error) {
    console.error('Error loading news:', error);
    return NextResponse.json({
      lastUpdated: new Date().toISOString(),
      articles: [],
      totalArticles: 0,
      error: 'Failed to load news data'
    }, { status: 500 });
  }
}
