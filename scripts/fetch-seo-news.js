#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

async function fetchSEONews() {
  const { default: fetch } = await import('node-fetch');
  
  console.log('🔍 Fetching SEO news...');
  
  // Search for latest SEO news
  const queries = [
    'Google algorithm update',
    'SEO ranking factors',
    'search engine optimization news',
    'Google Search Console update',
    'core web vitals'
  ];
  
  const articles = [];
  const timestamp = new Date().toISOString();
  
  for (const query of queries) {
    try {
      const response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=3&freshness=pd`, {
        headers: {
          'Accept': 'application/json',
          'X-Subscription-Token': process.env.BRAVE_API_KEY || ''
        }
      });
      
      if (!response.ok) continue;
      
      const data = await response.json();
      
      if (data.web?.results) {
        data.web.results.forEach(result => {
          articles.push({
            title: result.title,
            url: result.url,
            description: result.description,
            query: query,
            publishedAt: timestamp,
            age: result.age || 'recent'
          });
        });
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error fetching "${query}":`, error.message);
    }
  }
  
  // Load existing articles
  const dataDir = path.join(__dirname, '../data');
  const dataFile = path.join(dataDir, 'seo-news.json');
  let existingArticles = [];
  
  if (fs.existsSync(dataFile)) {
    try {
      const existing = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      existingArticles = existing.articles || [];
      console.log(`📚 Loaded ${existingArticles.length} existing articles`);
    } catch (err) {
      console.warn('⚠️ Could not load existing articles:', err.message);
    }
  }
  
  // Merge new articles with existing (dedupe by URL, keep newest)
  const allArticles = [...articles, ...existingArticles];
  const articleMap = new Map();
  
  // Keep the first occurrence of each URL (newest first in our array)
  allArticles.forEach(article => {
    if (!articleMap.has(article.url)) {
      articleMap.set(article.url, article);
    }
  });
  
  const uniqueArticles = Array.from(articleMap.values());
  
  // Sort by publishedAt (newest first)
  uniqueArticles.sort((a, b) => 
    new Date(b.publishedAt) - new Date(a.publishedAt)
  );
  
  // Keep max 100 articles to prevent infinite growth
  const finalArticles = uniqueArticles.slice(0, 100);
  
  console.log(`✅ Total: ${finalArticles.length} articles (${articles.length} new, ${existingArticles.length} existing)`);
  
  // Save to data file
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const newsData = {
    lastUpdated: timestamp,
    articles: finalArticles,
    totalArticles: finalArticles.length
  };
  
  fs.writeFileSync(
    path.join(dataDir, 'seo-news.json'),
    JSON.stringify(newsData, null, 2)
  );
  
  console.log('💾 Saved to data/seo-news.json');
  
  // Generate summary
  const summary = generateSummary(uniqueArticles);
  return { newsData, summary };
}

function generateSummary(articles) {
  const topics = {};
  articles.forEach(a => {
    if (!topics[a.query]) topics[a.query] = 0;
    topics[a.query]++;
  });
  
  return `📰 **SEO News Update**

Found ${articles.length} articles:
${Object.entries(topics).map(([topic, count]) => `• ${topic}: ${count} articles`).join('\n')}

Top stories:
${articles.slice(0, 5).map((a, i) => `${i+1}. ${a.title}`).join('\n')}

Updated: ${new Date().toLocaleString('en-US', { timeZone: 'America/Vancouver' })}`;
}

if (require.main === module) {
  fetchSEONews()
    .then(({ summary }) => {
      console.log('\n' + summary);
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Error:', err);
      process.exit(1);
    });
}

module.exports = { fetchSEONews, generateSummary };
