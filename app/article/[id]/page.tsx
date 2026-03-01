import { notFound } from 'next/navigation';
import Link from 'next/link';
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

function loadArticles(): Article[] {
  const dataPath = path.join(process.cwd(), 'data', 'seo-news.json');
  if (!fs.existsSync(dataPath)) return [];
  const data: NewsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  return data.articles || [];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const articles = loadArticles();
  const article = articles[parseInt(id)];
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const articles = loadArticles();
  const articleId = parseInt(id);
  const article = articles[articleId] ?? null;

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((a, idx) => a.query === article.query && idx !== articleId)
    .slice(0, 3);

  const hostname = (() => {
    try { return new URL(article.url).hostname; } catch { return article.url; }
  })();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 font-medium transition flex items-center gap-2"
          >
            ← Back to SEO News Hub
          </Link>
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
            🔗 {hostname}
          </span>
        </div>

        {/* H1 Title — visible in raw HTML for crawlers */}
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

        {/* CTA */}
        <div className="flex gap-4 mb-12">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-bold text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
          >
            Read Full Article →
          </a>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid gap-4">
              {relatedArticles.map((related, idx) => {
                const relatedIndex = articles.indexOf(related);
                return (
                  <Link
                    key={idx}
                    href={`/article/${relatedIndex}`}
                    className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all text-left block"
                  >
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-400 transition">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {related.description}
                    </p>
                  </Link>
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
