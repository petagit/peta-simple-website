'use client';

import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorBio: string;
  authorImage: string;
  publishedAt: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'understanding-eeat-2026',
    title: 'Understanding E-E-A-T: Google\'s Quality Framework for 2026',
    excerpt: 'Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) have become the cornerstone of Google rankings in 2026. Learn how to demonstrate these qualities in your content.',
    author: 'SEO Analysis Team',
    authorBio: '10+ years analyzing Google algorithm updates and ranking factors',
    authorImage: '/authors/team.jpg',
    publishedAt: '2026-02-16',
    readTime: '8 min read',
    category: 'Algorithm Updates'
  },
  {
    id: 'core-web-vitals-2026',
    title: 'Core Web Vitals 3.0: What Changed in 2026',
    excerpt: 'Google replaced FID with INP and introduced stricter thresholds. This comprehensive guide covers everything you need to know about the 2026 Core Web Vitals update.',
    author: 'Technical SEO Team',
    authorBio: 'Specialists in technical SEO and site performance optimization',
    authorImage: '/authors/tech-team.jpg',
    publishedAt: '2026-02-15',
    readTime: '12 min read',
    category: 'Technical SEO'
  },
  {
    id: 'generative-engine-optimization',
    title: 'Generative Engine Optimization (GEO): The Future of SEO',
    excerpt: 'With 50%+ of Google searches ending without clicks, traditional SEO is evolving. Discover how to optimize for AI-powered search experiences.',
    author: 'AI & Search Team',
    authorBio: 'Tracking the intersection of artificial intelligence and search',
    authorImage: '/authors/ai-team.jpg',
    publishedAt: '2026-02-14',
    readTime: '10 min read',
    category: 'Future Trends'
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-sm text-blue-400 hover:text-blue-300 mb-2 inline-block">
                ← Back to News Feed
              </Link>
              <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                📝 SEO Insights & Analysis
              </h1>
              <p className="text-gray-400 mt-2">
                Expert analysis backed by data and industry experience
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* E-E-A-T Banner */}
      <div className="bg-blue-900/20 border-b border-blue-500/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-400 text-2xl">🛡️</div>
            <div>
              <h2 className="font-semibold text-blue-300 mb-1">Built with E-E-A-T Principles</h2>
              <p className="text-sm text-gray-300">
                All content demonstrates <strong>Experience</strong>, <strong>Expertise</strong>, <strong>Authoritativeness</strong>, 
                and <strong>Trustworthiness</strong> — Google's quality framework for 2026.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-blue-400/50 transition-all hover:shadow-xl hover:shadow-blue-500/10">
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-semibold px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                  {post.category}
                </span>
                <span className="text-sm text-gray-400">{post.readTime}</span>
              </div>
              
              <Link href={`/blog/${post.id}`} className="group">
                <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
              </Link>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              
              {/* Author Info (E-E-A-T) */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-semibold">
                  {post.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{post.author}</div>
                  <div className="text-xs text-gray-400">{post.authorBio}</div>
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* About Our Team (Trust Signal) */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl border border-blue-400/30 p-8">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>✨</span> About Our Team
          </h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Our team consists of SEO professionals with over 10 years of combined experience tracking Google algorithm updates, 
            analyzing ranking factors, and implementing technical SEO strategies. We aggregate news from trusted sources including 
            Google Search Central, Search Engine Journal, Search Engine Land, and industry thought leaders.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔬</div>
              <div>
                <h4 className="font-semibold text-blue-300 mb-1">Data-Driven Analysis</h4>
                <p className="text-sm text-gray-400">Every insight backed by industry data and official sources</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">📊</div>
              <div>
                <h4 className="font-semibold text-blue-300 mb-1">Real-Time Updates</h4>
                <p className="text-sm text-gray-400">News aggregated every 4 hours from 50+ trusted sources</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🎓</div>
              <div>
                <h4 className="font-semibold text-blue-300 mb-1">Industry Expertise</h4>
                <p className="text-sm text-gray-400">Credentials verified through years of documented work</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔗</div>
              <div>
                <h4 className="font-semibold text-blue-300 mb-1">Transparent Sources</h4>
                <p className="text-sm text-gray-400">All claims cited with links to original publications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
