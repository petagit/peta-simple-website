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
  
  // Deduplicate by URL
  const uniqueArticles = Array.from(
    new Map(articles.map(a => [a.url, a])).values()
  ).slice(0, 15); // Keep top 15
  
  console.log(`✅ Found ${uniqueArticles.length} unique articles`);
  
  // Save to data file
  const dataDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const newsData = {
    lastUpdated: timestamp,
    articles: uniqueArticles,
    totalArticles: uniqueArticles.length
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
