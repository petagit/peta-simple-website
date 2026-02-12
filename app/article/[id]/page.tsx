'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

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

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then((data: NewsData) => {
        const articleId = parseInt(params.id as string);
        const foundArticle = data.articles[articleId];
        
        if (foundArticle) {
          setArticle(foundArticle);
          
          // Find related articles (same topic, excluding current)
          const related = data.articles
            .filter((a, idx) => a.query === foundArticle.query && idx !== articleId)
            .slice(0, 3);
          setRelatedArticles(related);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load article:', err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading article...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-2xl mb-4">Article not found</div>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
          >
            ← Back to News Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.push('/')}
            className="text-blue-400 hover:text-blue-300 font-medium transition flex items-center gap-2"
          >
            ← Back to SEO News Hub
          </button>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm">
            📊 {article.query}
          </span>
          <span className="text-gray-400 text-sm">
            🕐 {article.age}
          </span>
          <span className="text-gray-400 text-sm">
            🔗 {new URL(article.url).hostname}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 leading-tight">
          {article.title}
        </h1>

        {/* Summary */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">📰 Article Summary</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {article.description}
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex gap-4 mb-12">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-bold text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
          >
            Read Full Article →
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition"
            title="Copy link to this summary"
          >
            📋 Share
          </button>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid gap-4">
              {relatedArticles.map((related, idx) => {
                const relatedId = article ? 
                  (relatedArticles.indexOf(related) !== -1 ? 
                    relatedArticles.indexOf(related) : idx) : idx;
                return (
                  <button
                    key={idx}
                    onClick={() => router.push(`/article/${relatedId}`)}
                    className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all text-left"
                  >
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-400 transition">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {related.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </article>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>🐸 Built by Frog • Updates every 4 hours</p>
        </div>
      </footer>
    </main>
  );
}
