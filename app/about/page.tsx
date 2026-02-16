import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about SEO News Hub - your trusted source for real-time SEO news, Google algorithm updates, and search optimization insights since 2024.',
  openGraph: {
    title: 'About SEO News Hub',
    description: 'Meet the team behind the leading SEO news aggregator',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://peta-simple-website.vercel.app"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": "https://peta-simple-website.vercel.app/about"
              }
            ]
          })
        }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SEO News Hub",
            "url": "https://peta-simple-website.vercel.app",
            "logo": "https://peta-simple-website.vercel.app/logo.png",
            "description": "Real-time SEO news aggregator covering Google algorithm updates, Core Web Vitals, ranking factors, and search optimization trends.",
            "foundingDate": "2024",
            "sameAs": [
              "https://github.com/petagit/peta-simple-website"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "url": "https://peta-simple-website.vercel.app/contact"
            }
          })
        }}
      />

      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-sm text-blue-400 hover:text-blue-300 mb-2 inline-block">
            ← Back to News Hub
          </Link>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            About SEO News Hub
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Statement */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-2xl border border-blue-400/30 p-8">
            <h2 className="text-3xl font-bold mb-4">🎯 Our Mission</h2>
            <p className="text-xl text-gray-200 leading-relaxed">
              To provide SEO professionals, marketers, and website owners with real-time, accurate, 
              and actionable search engine optimization news from the most trusted sources in the industry.
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl mb-4">📡</div>
              <h3 className="text-xl font-bold mb-3 text-blue-300">Real-Time Aggregation</h3>
              <p className="text-gray-300 leading-relaxed">
                We monitor 50+ trusted SEO sources every 4 hours, including Google Search Central, 
                Search Engine Journal, Search Engine Land, and industry thought leaders.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3 text-blue-300">Smart Filtering</h3>
              <p className="text-gray-300 leading-relaxed">
                Our system filters noise and surfaces the most important updates about algorithm changes, 
                Core Web Vitals, ranking factors, and technical SEO developments.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3 text-blue-300">Expert Analysis</h3>
              <p className="text-gray-300 leading-relaxed">
                Our blog provides in-depth analysis of major SEO trends, algorithm updates, 
                and best practices backed by data and 10+ years of industry experience.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-blue-300">Fast & Free</h3>
              <p className="text-gray-300 leading-relaxed">
                No paywalls, no ads, no tracking. Just fast, accessible SEO news delivered 
                to you in a clean, modern interface.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">👥 Our Team</h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <p className="text-gray-300 leading-relaxed mb-6">
              SEO News Hub is maintained by a team of SEO professionals, data engineers, and web developers 
              with over 10 years of combined experience in search engine optimization, algorithm tracking, 
              and technical SEO implementation.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                  SA
                </div>
                <h3 className="font-bold text-lg mb-1">SEO Analysis Team</h3>
                <p className="text-sm text-gray-400 mb-2">Algorithm Tracking</p>
                <p className="text-xs text-gray-500">10+ years analyzing Google updates</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                  TS
                </div>
                <h3 className="font-bold text-lg mb-1">Technical SEO Team</h3>
                <p className="text-sm text-gray-400 mb-2">Performance Optimization</p>
                <p className="text-xs text-gray-500">Specialists in Core Web Vitals & site speed</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                  AI
                </div>
                <h3 className="font-bold text-lg mb-1">AI & Search Team</h3>
                <p className="text-sm text-gray-400 mb-2">Future Trends</p>
                <p className="text-xs text-gray-500">Tracking AI-powered search evolution</p>
              </div>
            </div>
          </div>
        </section>

        {/* E-E-A-T Principles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">🛡️ Our E-E-A-T Commitment</h2>
          <div className="space-y-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2 text-blue-300">💼 Experience</h3>
              <p className="text-gray-300">
                Our team has hands-on experience implementing SEO strategies for websites of all sizes, 
                from local businesses to enterprise e-commerce sites.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2 text-blue-300">🎓 Expertise</h3>
              <p className="text-gray-300">
                With 10+ years in the industry, we've tracked hundreds of algorithm updates and understand 
                the technical nuances of how search engines work.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2 text-blue-300">⭐ Authoritativeness</h3>
              <p className="text-gray-300">
                We cite all sources, link to original publications, and aggregate from industry-recognized 
                authorities like Google Search Central and leading SEO publications.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2 text-blue-300">✅ Trustworthiness</h3>
              <p className="text-gray-300">
                Transparent sourcing, no misleading claims, regular updates, and a commitment to accuracy. 
                All news is attributed to its original source.
              </p>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">⚙️ Technology</h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <p className="text-gray-300 leading-relaxed mb-6">
              SEO News Hub is built with modern web technologies to ensure fast performance, 
              accessibility, and excellent user experience:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span><strong>Next.js 16</strong> - React framework with server-side rendering for optimal performance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span><strong>Brave Search API</strong> - Privacy-focused search aggregation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span><strong>TypeScript</strong> - Type-safe code for reliability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span><strong>Tailwind CSS</strong> - Modern, responsive design</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span><strong>Vercel</strong> - Edge deployment for global CDN distribution</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-6 text-blue-100">
              Get the latest SEO news delivered automatically every 4 hours
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition"
              >
                View News Feed
              </Link>
              <Link
                href="/blog"
                className="px-8 py-3 bg-blue-800 text-white rounded-lg font-bold hover:bg-blue-900 transition"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="font-bold mb-3 text-blue-300">SEO News Hub</h3>
              <p className="text-sm text-gray-400">
                Real-time SEO news aggregator updated every 4 hours
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-blue-300">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-blue-300">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/petagit/peta-simple-website" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">GitHub</a></li>
                <li><Link href="/sitemap.xml" className="text-gray-400 hover:text-white transition">Sitemap</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm pt-6 border-t border-white/10">
            <p>🐸 Built by Frog • Powered by Brave Search API</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
