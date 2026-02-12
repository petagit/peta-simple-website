'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  totalArticles: number;
}

export default function SEONewsHub() {
  const router = useRouter();
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  useEffect(() => {
    // Load news data
    fetch('/api/news')
      .then(res => res.json())
      .then(data => setNewsData(data))
      .catch(err => console.error('Failed to load news:', err));
  }, []);

  if (!newsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading SEO news...</div>
      </div>
    );
  }

  const topics = Array.from(new Set(newsData.articles.map(a => a.query)));
  const filteredArticles = selectedTopic === 'all' 
    ? newsData.articles 
    : newsData.articles.filter(a => a.query === selectedTopic);

  const lastUpdated = new Date(newsData.lastUpdated).toLocaleString('en-US', {
    timeZone: 'America/Vancouver',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                🔍 SEO News Hub
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Last updated: {lastUpdated} PST • {newsData.totalArticles} articles
              </p>
            </div>
            <div className="text-right">
              <div className="inline-block px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                <span className="text-green-400 text-sm font-semibold">🔴 LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Topic Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedTopic('all')}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedTopic === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            All ({newsData.totalArticles})
          </button>
          {topics.map(topic => {
            const count = newsData.articles.filter(a => a.query === topic).length;
            return (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedTopic === topic
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {topic} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, i) => {
            // Find the original index in the full articles array
            const originalIndex = newsData?.articles.findIndex(a => a.url === article.url) ?? i;
            
            return (
              <button
                key={i}
                onClick={() => router.push(`/article/${originalIndex}`)}
                className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 text-left w-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {article.age}
                  </span>
                  <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
                
                <h2 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-sm text-gray-400 line-clamp-3 mb-3">
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="truncate">{new URL(article.url).hostname}</span>
                  <span>📊 {article.query}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>🐸 Built by Frog • Updates every 4 hours • Powered by Brave Search API</p>
          <p className="mt-2">Next update in ~{Math.ceil((4 - (new Date().getHours() % 4)) % 4)} hours</p>
        </div>
      </footer>
    </main>
  );
}
