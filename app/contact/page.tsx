import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with SEO News Hub. Questions about our news aggregation, partnership opportunities, or technical support.',
  openGraph: {
    title: 'Contact SEO News Hub',
    description: 'Questions, feedback, or partnership opportunities? Get in touch with our team.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Breadcrumb Schema */}
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
                "name": "Contact",
                "item": "https://peta-simple-website.vercel.app/contact"
              }
            ]
          })
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How often is the SEO news updated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our news aggregator runs every 4 hours, pulling the latest SEO news from over 50 trusted sources including Google Search Central, Search Engine Journal, Search Engine Land, and industry experts."
                }
              },
              {
                "@type": "Question",
                "name": "What sources do you aggregate news from?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We monitor 50+ trusted SEO sources including Google Search Central, Search Engine Journal, Search Engine Land, Moz, Ahrefs, Semrush blogs, and leading SEO professionals and thought leaders."
                }
              },
              {
                "@type": "Question",
                "name": "Is SEO News Hub free to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! SEO News Hub is completely free with no paywalls, no ads, and no tracking. Our mission is to make SEO news accessible to everyone."
                }
              },
              {
                "@type": "Question",
                "name": "Can I contribute content or guest posts?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We're currently focused on news aggregation from established sources. For guest post inquiries or content partnerships, please reach out via GitHub issues with your proposal."
                }
              },
              {
                "@type": "Question",
                "name": "How do I report a bug or suggest a feature?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Please open an issue on our GitHub repository at github.com/petagit/peta-simple-website. We welcome all feedback and suggestions!"
                }
              }
            ]
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
            Contact Us
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro */}
        <section className="mb-12">
          <p className="text-xl text-gray-200 leading-relaxed">
            Have questions, feedback, or partnership opportunities? We'd love to hear from you!
          </p>
        </section>

        {/* Contact Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://github.com/petagit/peta-simple-website/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-400/50 hover:bg-white/10 transition-all group"
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-3 text-blue-300 group-hover:text-blue-400 transition">
                GitHub Issues
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Report bugs, request features, or discuss improvements on our public GitHub repository.
              </p>
              <span className="text-blue-400 text-sm font-semibold">
                Open an Issue →
              </span>
            </a>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-3 text-blue-300">
                Email
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                For partnership inquiries or private matters, reach out via the contact information on our GitHub profile.
              </p>
              <a 
                href="https://github.com/petagit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-sm font-semibold hover:text-blue-300 transition"
              >
                View Profile →
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">❓ Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-blue-300 group-hover:text-blue-400 transition">
                How often is the SEO news updated?
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Our news aggregator runs every 4 hours, pulling the latest SEO news from over 50 trusted sources 
                including Google Search Central, Search Engine Journal, Search Engine Land, and industry experts.
              </p>
            </details>

            <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-blue-300 group-hover:text-blue-400 transition">
                What sources do you aggregate news from?
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed">
                We monitor 50+ trusted SEO sources including Google Search Central, Search Engine Journal, 
                Search Engine Land, Moz, Ahrefs, Semrush blogs, and leading SEO professionals and thought leaders. 
                All articles link back to the original source.
              </p>
            </details>

            <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-blue-300 group-hover:text-blue-400 transition">
                Is SEO News Hub free to use?
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Yes! SEO News Hub is completely free with no paywalls, no ads, and no tracking. 
                Our mission is to make SEO news accessible to everyone.
              </p>
            </details>

            <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-blue-300 group-hover:text-blue-400 transition">
                Can I contribute content or guest posts?
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed">
                We're currently focused on news aggregation from established sources. For guest post inquiries 
                or content partnerships, please reach out via GitHub issues with your proposal.
              </p>
            </details>

            <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-blue-300 group-hover:text-blue-400 transition">
                How do I report a bug or suggest a feature?
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Please open an issue on our{' '}
                <a
                  href="https://github.com/petagit/peta-simple-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  GitHub repository
                </a>
                . We welcome all feedback and suggestions!
              </p>
            </details>

            <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-blue-300 group-hover:text-blue-400 transition">
                Can I use your API or data feed?
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Currently, we don't offer a public API. However, our project is open source on GitHub, 
                and you're welcome to fork the repository and adapt it for your needs (with attribution).
              </p>
            </details>

            <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group">
              <summary className="font-bold text-lg cursor-pointer text-blue-300 group-hover:text-blue-400 transition">
                How can I support this project?
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Star our GitHub repository, share SEO News Hub with your network, and contribute by reporting 
                bugs or suggesting improvements. Community support helps us grow!
              </p>
            </details>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">📚 Helpful Resources</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/about"
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-400/50 hover:bg-white/10 transition-all"
            >
              <h3 className="font-bold mb-2 text-blue-300">About Us</h3>
              <p className="text-sm text-gray-400">Learn about our team and mission</p>
            </Link>
            
            <Link
              href="/blog"
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-400/50 hover:bg-white/10 transition-all"
            >
              <h3 className="font-bold mb-2 text-blue-300">SEO Blog</h3>
              <p className="text-sm text-gray-400">Expert analysis and insights</p>
            </Link>
            
            <a
              href="https://github.com/petagit/peta-simple-website"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-400/50 hover:bg-white/10 transition-all"
            >
              <h3 className="font-bold mb-2 text-blue-300">GitHub Repository</h3>
              <p className="text-sm text-gray-400">View source code and contribute</p>
            </a>
            
            <Link
              href="/sitemap.xml"
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-400/50 hover:bg-white/10 transition-all"
            >
              <h3 className="font-bold mb-2 text-blue-300">Sitemap</h3>
              <p className="text-sm text-gray-400">Browse all pages</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Dive In?</h2>
            <p className="text-lg mb-6 text-blue-100">
              Explore the latest SEO news and insights
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition"
            >
              View News Feed →
            </Link>
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
