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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // WebSite structured data
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SEO News Hub",
    "alternateName": "SEO News Aggregator",
    "url": "https://peta-simple-website.vercel.app",
    "description": "Real-time SEO news aggregator covering Google algorithm updates, Core Web Vitals, ranking factors, and search optimization trends.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://peta-simple-website.vercel.app/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SEO News Hub",
    "url": "https://peta-simple-website.vercel.app",
    "logo": "https://peta-simple-website.vercel.app/logo.png",
    "description": "Real-time SEO news aggregator updated every 4 hours",
    "sameAs": [
      "https://github.com/petagit/peta-simple-website"
    ]
  };

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
  
  // Filter by topic
  let filteredArticles = selectedTopic === 'all' 
    ? newsData.articles 
    : newsData.articles.filter(a => a.query === selectedTopic);
  
  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredArticles = filteredArticles.filter(a => 
      a.title.toLowerCase().includes(query) ||
      a.description.toLowerCase().includes(query) ||
      a.url.toLowerCase().includes(query)
    );
  }
  
  // Sort by date
  filteredArticles = [...filteredArticles].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const lastUpdated = new Date(newsData.lastUpdated).toLocaleString('en-US', {
    timeZone: 'America/Vancouver',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white animate-gradient-x">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

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
            <div className="text-right flex items-center gap-4">
              <button
                onClick={() => router.push('/blog')}
                className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg border border-blue-500/30 transition-all text-sm font-medium"
              >
                📝 Blog & Insights
              </button>
              <div className="inline-block px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30 pulse-glow">
                <span className="text-green-400 text-sm font-semibold">🔴 LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search & Sort Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          {/* Sort Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('newest')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                sortBy === 'newest'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              ↓ Newest
            </button>
            <button
              onClick={() => setSortBy('oldest')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                sortBy === 'oldest'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              ↑ Oldest
            </button>
          </div>
        </div>
        
        {/* Results Count */}
        {(searchQuery || selectedTopic !== 'all') && (
          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredArticles.length} of {newsData.totalArticles} articles
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        )}
      </div>

      {/* Topic Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
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
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2">No articles found</h2>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No results for "${searchQuery}"`
                : 'No articles in this category'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTopic('all');
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, i) => {
            // Find the original index in the full articles array
            const originalIndex = newsData?.articles.findIndex(a => a.url === article.url) ?? i;
            
            return (
              <button
                key={i}
                onClick={() => router.push(`/article/${originalIndex}`)}
                className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 text-left w-full transform-gpu will-change-transform"
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
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-6">
            <div>
              <h3 className="font-bold mb-3 text-blue-300">SEO News Hub</h3>
              <p className="text-sm text-gray-400">
                Real-time SEO news aggregator updated every 4 hours
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-blue-300">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => router.push('/')} className="text-gray-400 hover:text-white transition">Home</button></li>
                <li><button onClick={() => router.push('/blog')} className="text-gray-400 hover:text-white transition">Blog</button></li>
                <li><button onClick={() => router.push('/about')} className="text-gray-400 hover:text-white transition">About</button></li>
                <li><button onClick={() => router.push('/contact')} className="text-gray-400 hover:text-white transition">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-blue-300">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/petagit/peta-simple-website" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">GitHub</a></li>
                <li><button onClick={() => router.push('/sitemap.xml')} className="text-gray-400 hover:text-white transition">Sitemap</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-blue-300">Latest Posts</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => router.push('/blog/understanding-eeat-2026')} className="text-gray-400 hover:text-white transition">Understanding E-E-A-T</button></li>
                <li><button onClick={() => router.push('/blog/core-web-vitals-2026')} className="text-gray-400 hover:text-white transition">Core Web Vitals 3.0</button></li>
                <li><button onClick={() => router.push('/blog/generative-engine-optimization')} className="text-gray-400 hover:text-white transition">GEO: Future of SEO</button></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm pt-6 border-t border-white/10">
            <p>🐸 Built by Frog • Updates every 4 hours • Powered by Brave Search API</p>
            <p className="mt-2">Next update in ~{Math.ceil((4 - (new Date().getHours() % 4)) % 4)} hours</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
