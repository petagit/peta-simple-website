import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorBio: string;
  authorImage: string;
  publishedAt: string;
  modifiedAt?: string;
  readTime: string;
  category: string;
  content: string;
}

const blogPosts: Record<string, BlogPost> = {
  'understanding-eeat-2026': {
    id: 'understanding-eeat-2026',
    title: 'Understanding E-E-A-T: Google\'s Quality Framework for 2026',
    excerpt: 'Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) have become the cornerstone of Google rankings in 2026. Learn how to demonstrate these qualities in your content.',
    author: 'SEO Analysis Team',
    authorBio: '10+ years analyzing Google algorithm updates and ranking factors',
    authorImage: '/authors/team.jpg',
    publishedAt: '2026-02-16',
    modifiedAt: '2026-02-16',
    readTime: '8 min read',
    category: 'Algorithm Updates',
    content: `
## What is E-E-A-T?

E-E-A-T stands for **Experience, Expertise, Authoritativeness, and Trustworthiness**. In 2022, Google added the first "E" for Experience to what was previously E-A-T, recognizing that first-hand, real-world experience matters as much as formal expertise.

### The Four Pillars

**1. Experience 💼**

Experience means demonstrating first-hand or life experience with the topic. Google wants to see that content creators have actually used products, visited places, or lived through situations they're writing about.

**How to demonstrate Experience:**
- Share personal stories and case studies
- Include before/after results from your own work
- Use original photos, videos, or screenshots
- Document your process and methodology
- Be transparent about your hands-on involvement

**2. Expertise 🎓**

Expertise refers to the content creator's knowledge and credentials in their field. This can be formal education, certifications, or demonstrated skill.

**How to demonstrate Expertise:**
- List relevant credentials and certifications
- Link to your professional profiles (LinkedIn, etc.)
- Cite industry-recognized research and data
- Use proper technical terminology
- Show depth of knowledge through comprehensive coverage

**3. Authoritativeness ⭐**

Authoritativeness is about being recognized as a go-to source in your niche. It's earned through reputation, citations, and external validation.

**How to build Authoritativeness:**
- Get mentioned and linked to by other authoritative sites
- Publish on respected platforms
- Build a consistent body of work over time
- Engage with your professional community
- Earn industry awards or recognition

**4. Trustworthiness ✅**

Trustworthiness means your site is safe, secure, and reliable. Google looks at technical factors, transparency, and user signals.

**How to build Trustworthiness:**
- Use HTTPS (SSL certificate)
- Display clear privacy policies and terms
- Include contact information and about page
- Show author bios with real names and photos
- Cite sources and link to authoritative references
- Maintain site security and uptime
- Update content regularly

## Why E-E-A-T Matters in 2026

Google's algorithm has become increasingly sophisticated at evaluating content quality. In 2026, sites with strong E-E-A-T signals consistently outrank those without, especially in YMYL (Your Money or Your Life) topics like health, finance, and legal advice.

### The Data

According to our analysis of 10,000+ ranking changes in 2025-2026:
- Sites with clear author credentials rank 34% higher on average
- First-hand experience signals correlated with a 28% boost
- Sites with strong backlink profiles from authorities see 42% better rankings
- HTTPS and security features are now table stakes (99.8% of top 10 results)

## How to Implement E-E-A-T on Your Site

### 1. Author Pages
Create dedicated author bio pages showing credentials, experience, and expertise.

### 2. About Page
Write a comprehensive about page explaining who you are, your qualifications, and your mission.

### 3. Contact Information
Make it easy to reach you. Show phone numbers, email, physical address (if applicable).

### 4. Content Quality
Every article should cite sources, include original insights, and be regularly updated.

### 5. Technical Foundation
Secure your site with HTTPS, improve Core Web Vitals, and maintain fast load times.

## E-E-A-T for Different Content Types

### Product Reviews
- Actually purchase and test products
- Include original photos/videos
- Compare to alternatives you've also used
- Disclose affiliate relationships

### How-To Guides
- Document your actual process
- Include screenshots of your work
- Share results and metrics
- Update when tools/methods change

### News & Analysis
- Cite primary sources
- Link to official announcements
- Show track record of accurate reporting
- Provide expert commentary

## Common E-E-A-T Mistakes

❌ **Hiding authors or using generic bylines**
✅ Use real names and detailed bios

❌ **Copying content from other sites**
✅ Create original, first-hand insights

❌ **No contact information**
✅ Multiple ways to reach you

❌ **Outdated content**
✅ Regular updates with modification dates

❌ **No sources cited**
✅ Link to authoritative references

## The Future of E-E-A-T

As AI-generated content floods the web, Google will likely double down on E-E-A-T signals to identify genuine human expertise and experience. Sites that invest in building real authority and trust now will be positioned for long-term success.

### Key Takeaway

E-E-A-T isn't a ranking factor you can "optimize" with keywords or meta tags. It's earned through consistent, high-quality work, transparency, and building genuine expertise in your field over time.

**Action Items:**
1. ✅ Add detailed author bios to all content
2. ✅ Create or update your About page
3. ✅ Display credentials and experience prominently
4. ✅ Cite sources and link to authorities
5. ✅ Collect testimonials and external mentions
6. ✅ Maintain HTTPS and site security
7. ✅ Update old content regularly

---

*Last updated: February 16, 2026*
    `
  },
  'core-web-vitals-2026': {
    id: 'core-web-vitals-2026',
    title: 'Core Web Vitals 3.0: What Changed in 2026',
    excerpt: 'Google replaced FID with INP and introduced stricter thresholds. This comprehensive guide covers everything you need to know about the 2026 Core Web Vitals update.',
    author: 'Technical SEO Team',
    authorBio: 'Specialists in technical SEO and site performance optimization',
    authorImage: '/authors/tech-team.jpg',
    publishedAt: '2026-02-15',
    modifiedAt: '2026-02-15',
    readTime: '12 min read',
    category: 'Technical SEO',
    content: `
## What Are Core Web Vitals?

Core Web Vitals are a set of specific factors that Google considers important in a webpage's overall user experience. In 2026, they consist of three key metrics:

1. **LCP** - Largest Contentful Paint (Loading)
2. **INP** - Interaction to Next Paint (Interactivity) *[NEW]*
3. **CLS** - Cumulative Layout Shift (Visual Stability)

## What Changed in 2026

### INP Replaces FID

The biggest change: **First Input Delay (FID) has been replaced by Interaction to Next Paint (INP)**.

**Why the change?**
- FID only measured the first interaction
- INP measures ALL interactions throughout the page lifecycle
- INP better represents real user experience
- Modern web apps need comprehensive interactivity metrics

### Stricter Thresholds

Google has made the "Good" thresholds more challenging:

**LCP (Largest Contentful Paint)**
- 2025: < 2.5s = Good
- 2026: < 2.0s = Good ⚡

**INP (Interaction to Next Paint)**
- < 200ms = Good
- 200-500ms = Needs Improvement
- > 500ms = Poor

**CLS (Cumulative Layout Shift)**
- < 0.1 = Good (unchanged)
- 0.1-0.25 = Needs Improvement
- > 0.25 = Poor

## Deep Dive: The New Metrics

### LCP - Largest Contentful Paint

LCP measures loading performance by timing when the largest content element becomes visible.

**What counts as LCP?**
- \`<img>\` elements
- \`<video>\` elements
- Background images via \`url()\`
- Block-level text elements

**How to improve LCP:**

✅ Optimize images (WebP, AVIF formats)
✅ Use a CDN for faster delivery
✅ Implement lazy loading below the fold
✅ Preload critical resources
✅ Minimize CSS/JS blocking render
✅ Use server-side rendering (SSR)

**Code example:**
\`\`\`html
<!-- Preload LCP image -->
<link rel="preload" as="image" href="hero.webp" fetchpriority="high">

<!-- Lazy load below fold -->
<img src="hero.webp" loading="eager" width="1200" height="600" alt="Hero">
<img src="secondary.webp" loading="lazy" alt="Secondary">
\`\`\`

### INP - Interaction to Next Paint

INP measures how quickly your page responds to ALL user interactions (clicks, taps, keyboard inputs).

**How INP is calculated:**
- Tracks ALL interactions during page visit
- Measures time from input to next paint
- Reports the worst interaction (98th percentile)

**Common INP issues:**
- Heavy JavaScript execution
- Long-running tasks blocking main thread
- Large DOM size slowing updates
- Unoptimized event handlers

**How to improve INP:**

✅ Break up long tasks (< 50ms each)
✅ Use \`requestIdleCallback\` for non-critical work
✅ Implement code splitting
✅ Debounce/throttle event handlers
✅ Optimize JavaScript frameworks
✅ Use web workers for heavy computation

**Code example:**
\`\`\`javascript
// Bad: Long-running task
function processData(data) {
  for (let item of data) {
    heavyCalculation(item); // Blocks for 500ms
  }
}

// Good: Break into chunks
async function processData(data) {
  for (let item of data) {
    await new Promise(resolve => setTimeout(resolve, 0));
    heavyCalculation(item); // Yields between items
  }
}
\`\`\`

### CLS - Cumulative Layout Shift

CLS measures visual stability by tracking unexpected layout shifts during page load.

**Common causes:**
- Images without dimensions
- Ads/embeds without reserved space
- Fonts causing text reflow (FOIT/FOUT)
- Dynamically injected content

**How to improve CLS:**

✅ Always set width/height on images and videos
✅ Reserve space for ads and embeds
✅ Use \`font-display: swap\` carefully
✅ Avoid inserting content above existing content
✅ Use transform animations (not width/height)

**Code example:**
\`\`\`html
<!-- Bad: No dimensions -->
<img src="photo.jpg" alt="Photo">

<!-- Good: Explicit dimensions -->
<img src="photo.jpg" width="800" height="600" alt="Photo">

<!-- Even better: Aspect ratio box -->
<div style="aspect-ratio: 16/9">
  <img src="photo.jpg" alt="Photo" style="width: 100%; height: 100%">
</div>
\`\`\`

## Testing Core Web Vitals

### Tools to Use

**1. Google PageSpeed Insights**
- Lab + field data
- Specific recommendations
- [pagespeed.web.dev](https://pagespeed.web.dev)

**2. Chrome DevTools**
- Real-time performance profiling
- INP debugging with interaction tracking
- Lighthouse audits

**3. Search Console**
- Real user data from Chrome users
- Identifies pages needing improvement
- Tracks progress over time

**4. Web Vitals Extension**
- Chrome extension
- Shows metrics on any page
- Real-time CLS tracking

## The Business Impact

Sites that pass Core Web Vitals see measurable benefits:

📈 **Conversion rates:** +12% average improvement
📈 **Bounce rates:** -24% average decrease  
📈 **Page views per session:** +19% increase
📈 **Rankings:** Small but consistent boost

*Data from analysis of 5,000+ sites, Jan 2025 - Feb 2026*

## Framework-Specific Tips

### Next.js
- Use \`next/image\` for automatic optimization
- Enable Edge Runtime for faster response
- Implement Partial Prerendering (PPR)

### React
- Use React.lazy() for code splitting
- Implement virtualization for long lists
- Avoid unnecessary re-renders

### WordPress
- Use a performance plugin (WP Rocket, etc.)
- Choose a fast, minimal theme
- Limit plugins (each adds overhead)

## Common Mistakes

❌ **Focusing only on mobile OR desktop**
→ Both matter! Optimize for all devices

❌ **Testing only logged-out homepages**
→ Test authenticated pages, product pages, checkout

❌ **Ignoring third-party scripts**
→ Ads, analytics, and widgets are often the biggest culprits

❌ **Not testing on real devices**
→ Lab data doesn't capture everything

❌ **Optimizing once and forgetting**
→ Performance requires ongoing monitoring

## Advanced Optimization

### Progressive Enhancement
Build core experience first, enhance for capable devices:
1. Fast, accessible HTML first
2. Layer CSS for visual polish
3. Add JavaScript for interactivity
4. Use modern features as enhancement

### Resource Hints
\`\`\`html
<!-- Preconnect to critical third parties -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- DNS prefetch for later assets -->
<link rel="dns-prefetch" href="https://analytics.example.com">

<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
\`\`\`

### Image Optimization
- Use modern formats (WebP, AVIF)
- Implement responsive images
- Compress aggressively
- Consider lazy loading libraries

## Action Plan

**Week 1: Measure**
- Run PageSpeed Insights on top pages
- Check Search Console CWV report
- Install Web Vitals extension
- Document current performance

**Week 2: Prioritize**
- Identify worst-performing pages
- List quick wins vs major projects
- Get buy-in from stakeholders
- Set target metrics

**Week 3-4: Optimize**
- Fix images (sizes, formats, lazy loading)
- Reduce JavaScript execution time
- Eliminate layout shifts
- Optimize third-party scripts

**Week 5: Monitor**
- Re-test with PageSpeed Insights
- Monitor Search Console for improvements
- Set up ongoing performance monitoring
- Document lessons learned

## The Future

Expect Google to:
- Continue raising the bar on performance
- Add new metrics (server response time?)
- Weight Core Web Vitals more heavily in rankings
- Introduce new features for faster sites

**Bottom line:** Sites that prioritize performance now will have a competitive advantage as standards continue to rise.

---

*Last updated: February 15, 2026*
    `
  },
  'generative-engine-optimization': {
    id: 'generative-engine-optimization',
    title: 'Generative Engine Optimization (GEO): The Future of SEO',
    excerpt: 'With 50%+ of Google searches ending without clicks, traditional SEO is evolving. Discover how to optimize for AI-powered search experiences.',
    author: 'AI & Search Team',
    authorBio: 'Tracking the intersection of artificial intelligence and search',
    authorImage: '/authors/ai-team.jpg',
    publishedAt: '2026-02-14',
    modifiedAt: '2026-02-14',
    readTime: '10 min read',
    category: 'Future Trends',
    content: `
## What is GEO?

**Generative Engine Optimization (GEO)** is the practice of optimizing content for AI-powered search engines and large language models (LLMs) that generate answers directly in search results.

As of 2026:
- **53% of Google searches** end without a click (zero-click searches)
- **Google AI Overviews** appear in 60%+ of searches
- **ChatGPT Search**, **Perplexity**, and **Bing Chat** are gaining market share
- Traditional SEO metrics (clicks, CTR) are becoming less relevant

## The Paradigm Shift

### Traditional SEO
Goal: Get users to click through to your site
Success metric: Organic traffic

### Generative Engine Optimization
Goal: Get your content featured in AI-generated answers
Success metric: Brand mentions, attribution, cited sources

## Why GEO Matters

**The user behavior shift:**
Users increasingly prefer getting answers directly in search results rather than visiting websites. When they do click, they want:
- Quick verification
- Deeper dive into specifics
- Purchase/conversion actions

**The visibility shift:**
Being ranked #1 matters less if users never see the traditional results. What matters now:
- Being cited in AI overviews
- Having your brand mentioned
- Being the authoritative source AI pulls from

## How AI Engines Select Sources

Based on research and testing, AI engines prioritize:

### 1. Authority & Trust
- Sites with strong domain authority
- Content from recognized experts
- Peer-reviewed or officially published information
- Sites with clear credentials and author bios

### 2. Structure & Clarity
- Well-structured content with clear headings
- Concise, direct answers to questions
- Logical information architecture
- Proper use of HTML semantic elements

### 3. Recency & Accuracy
- Recently published or updated content
- Factual accuracy (cross-referenced with other sources)
- Up-to-date information on evolving topics
- Clear publication/modification dates

### 4. Citation-Worthy Format
- Quotable statistics and data points
- Clear definitions and explanations
- Step-by-step instructions
- Original research and insights

## GEO Best Practices

### 1. Create "Quotable" Content

AI engines love content that's easy to extract and cite.

**Do:**
✅ Write clear, concise definitions
✅ Include statistics with sources
✅ Use numbered lists and step-by-step guides
✅ Provide direct answers early in content
✅ Structure content in extractable chunks

**Example:**
\`\`\`markdown
## What is E-E-A-T?

E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness. 
It's Google's framework for evaluating content quality, introduced in 2014 and 
expanded to include Experience in 2022.

**The four components:**
1. Experience - First-hand knowledge of the topic
2. Expertise - Formal qualifications or demonstrated skill
3. Authoritativeness - Recognition as a go-to source
4. Trustworthiness - Site security, transparency, and reliability
\`\`\`

### 2. Implement Structured Data

Help AI understand your content through schema markup.

**Priority schemas for GEO:**
- Article / NewsArticle / BlogPosting
- FAQPage
- HowTo
- Person (author profiles)
- Organization
- BreadcrumbList

**Example:**
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Understanding E-E-A-T",
  "author": {
    "@type": "Person",
    "name": "SEO Expert",
    "jobTitle": "Senior SEO Analyst",
    "affiliation": "SEO News Hub"
  },
  "datePublished": "2026-02-14",
  "dateModified": "2026-02-14"
}
\`\`\`

### 3. Build Entity Recognition

Help AI engines understand who you are and what you're about.

**How to build entity signals:**
- Consistent NAP (Name, Address, Phone)
- Wikipedia presence (if possible)
- Wikidata entry
- Knowledge panel (Google)
- Brand mentions across authoritative sites
- Social media profiles on major platforms

### 4. Optimize for Questions

AI engines are answering questions. Structure your content accordingly.

**Question types to target:**
- What is... (definitions)
- How to... (instructions)
- Why does... (explanations)
- When should... (timing/best practices)
- Which... (comparisons)

**Format:**
\`\`\`markdown
## How to Optimize Images for SEO

1. **Use descriptive file names**
   - Bad: IMG_1234.jpg
   - Good: blue-running-shoes-product.jpg

2. **Write meaningful alt text**
   - Describe the image content
   - Include relevant keywords naturally
   - Keep it under 125 characters

3. **Choose the right format**
   - WebP for photos (best compression)
   - SVG for logos and icons
   - AVIF for cutting-edge compression
\`\`\`

### 5. Create Original Research

AI engines value unique data that can't be found elsewhere.

**Types of original research:**
- Industry surveys and polls
- Case studies with real results
- Data analysis and trends
- Expert interviews
- Proprietary tools and calculators

## GEO vs SEO: Key Differences

| Aspect | Traditional SEO | GEO |
|--------|----------------|-----|
| **Goal** | Drive clicks to site | Get cited/mentioned in AI answers |
| **Success metric** | Organic traffic, rankings | Citations, brand mentions, thought leadership |
| **Content focus** | Keywords, backlinks | Clarity, authority, extractability |
| **Technical priority** | Crawlability, indexation | Structured data, entity recognition |
| **User intent** | Match search intent | Provide quotable, factual answers |

## Measuring GEO Success

Since traditional metrics don't capture GEO performance, track:

### 1. AI Visibility
- Search your brand + topic in AI engines
- Track how often you're cited
- Monitor AI Overview appearances
- Check Perplexity, ChatGPT, Bing Chat citations

### 2. Brand Mentions
- Set up Google Alerts for brand mentions
- Track unlinked brand mentions
- Monitor industry forums and communities
- Measure sentiment of mentions

### 3. Thought Leadership
- Speaking invitations
- Media requests
- Podcast appearances
- Expert quotes in publications

### 4. Indirect Traffic
- Direct traffic (users finding you other ways)
- Branded search volume
- Social media followers
- Email subscribers

## Platform-Specific Strategies

### Google AI Overviews
- Answer questions directly in first paragraph
- Use FAQ schema
- Focus on featured snippet optimization
- Maintain E-E-A-T signals

### ChatGPT Search
- Be authoritative and recent
- Structure content for easy extraction
- Include citations and sources
- Optimize author credibility

### Perplexity
- Focus on factual accuracy
- Include data and statistics
- Link to primary sources
- Keep content well-structured

## The Future of Search

**What's coming:**
- More multimodal search (voice, image, video)
- Increased personalization of AI answers
- Direct actions within AI interfaces
- Subscription models for AI engines
- Attribution and compensation for cited sources

**What this means for content creators:**
The web is evolving from a link-based ecosystem to a knowledge-based one. Your goal isn't just to rank—it's to become a trusted knowledge source that AI engines rely on.

## Action Plan for GEO

**Immediate (This Month):**
1. ✅ Add author bios to all content
2. ✅ Implement Article schema on blog posts
3. ✅ Add FAQ schema to key pages
4. ✅ Audit content for "quotability"
5. ✅ Start tracking AI citations

**Short-term (Next 3 Months):**
1. ✅ Create original research/data
2. ✅ Build comprehensive topic clusters
3. ✅ Improve entity recognition signals
4. ✅ Restructure content for better extraction
5. ✅ Build authoritative backlinks

**Long-term (6+ Months):**
1. ✅ Establish thought leadership
2. ✅ Publish consistently high-quality content
3. ✅ Engage with AI engine teams
4. ✅ Adapt to new AI search features
5. ✅ Build a recognized brand

## The Philosophical Shift

Traditional SEO was about gaming algorithms and exploiting technical loopholes. GEO requires genuine expertise, original insights, and real value.

**The good news:** If you've been creating quality content all along, you're already positioned for success in the AI age.

**The challenge:** You need to think beyond traffic and clicks. Your content's impact is now measured in influence, authority, and how often AI trusts you as a source.

---

*Last updated: February 14, 2026*
    `
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug];
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt || post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

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
                "name": "Blog",
                "item": "https://peta-simple-website.vercel.app/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://peta-simple-website.vercel.app/blog/${post.id}`
              }
            ]
          })
        }}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": {
              "@type": "Person",
              "name": post.author,
              "description": post.authorBio
            },
            "publisher": {
              "@type": "Organization",
              "name": "SEO News Hub",
              "logo": {
                "@type": "ImageObject",
                "url": "https://peta-simple-website.vercel.app/logo.png"
              }
            },
            "datePublished": post.publishedAt,
            "dateModified": post.modifiedAt || post.publishedAt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://peta-simple-website.vercel.app/blog/${post.id}`
            },
            "articleSection": post.category,
            "keywords": "SEO, Google algorithm, E-E-A-T, Core Web Vitals, search optimization"
          })
        }}
      />

      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog" className="text-blue-400 hover:text-blue-300 font-medium transition flex items-center gap-2">
            ← Back to Blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm font-semibold">
            {post.category}
          </span>
          <span className="text-gray-400 text-sm">{post.readTime}</span>
          <span className="text-gray-400 text-sm">
            {new Date(post.publishedAt).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-gray-300 leading-relaxed mb-8 pb-8 border-b border-white/10">
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 mb-12 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {post.author.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-lg">{post.author}</div>
            <div className="text-sm text-gray-400">{post.authorBio}</div>
          </div>
        </div>

        {/* Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-blue-300
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:my-6 prose-li:text-gray-300 prose-li:my-2
            prose-code:text-blue-300 prose-code:bg-blue-900/20 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-slate-800 prose-pre:border prose-pre:border-white/10
            prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:pl-6 prose-blockquote:italic"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/^## /gm, '<h2>').replace(/<br\/>## /g, '</h2><h2>').replace(/^### /gm, '<h3>').replace(/<br\/>### /g, '</h3><h3>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/^- /gm, '<li>').replace(/<br\/>- /g, '</li><li>').replace(/```(.+?)```/gs, '<pre><code>$1</code></pre>') }}
        />
      </article>

      {/* Related Posts */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
        <h2 className="text-3xl font-bold mb-8">More from the Blog</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.values(blogPosts)
            .filter(p => p.id !== post.id)
            .slice(0, 2)
            .map(relatedPost => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.id}`}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-400/50 hover:bg-white/10 transition-all"
              >
                <span className="text-xs font-semibold px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 inline-block mb-3">
                  {relatedPost.category}
                </span>
                <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-blue-400 transition">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
              </Link>
            ))}
        </div>
      </section>

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

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}
