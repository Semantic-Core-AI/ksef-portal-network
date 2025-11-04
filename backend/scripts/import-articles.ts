/**
 * Import articles from blog-data.ts to Strapi
 *
 * Usage:
 *   npx ts-node scripts/import-articles.ts
 *
 * Or with API token:
 *   API_TOKEN=your_token npx ts-node scripts/import-articles.ts
 */

import { mockArticles } from './blog-data';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.API_TOKEN || '';

interface StrapiArticle {
  data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    thumbnail: string;
    category: string;
    tags: string[];
    difficulty: string;
    contentType: string;
    author: {
      name: string;
      avatar: string;
      role: string;
      bio: string;
    };
    publishedAt: string;
    readingTime: number;
    views: number;
    commentsCount: number;
    rating: {
      average: number;
      count: number;
    };
    isFeatured: boolean;
    isTrending: boolean;
    isUpdated: boolean;
    isBookmarked: boolean;
    hasCTA: boolean;
    ctaText?: string;
    ctaAction?: string;
    seoTitle?: string;
    seoDescription?: string;
  };
}

// Transform frontend article to Strapi format
function transformArticle(article: typeof mockArticles[0]): StrapiArticle {
  return {
    data: {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: `# ${article.title}\n\n${article.excerpt}`,
      thumbnail: article.thumbnail,
      category: article.category,
      tags: article.tags,
      difficulty: article.difficulty,
      contentType: article.contentType,
      author: {
        name: article.author.name,
        avatar: article.author.avatar,
        role: article.author.role,
        bio: article.author.bio,
      },
      publishedAt: article.publishedAt,
      readingTime: article.readingTime,
      views: article.views,
      commentsCount: article.commentsCount,
      rating: {
        average: article.rating.average,
        count: article.rating.count,
      },
      isFeatured: article.isFeatured,
      isTrending: article.isTrending,
      isUpdated: article.isUpdated,
      isBookmarked: article.isBookmarked,
      hasCTA: article.hasCTA,
      ctaText: article.ctaText,
      ctaAction: article.ctaAction,
      seoTitle: article.title.substring(0, 60),
      seoDescription: article.excerpt.substring(0, 160),
    },
  };
}

// Import single article
async function importArticle(article: typeof mockArticles[0], index: number) {
  const transformedArticle = transformArticle(article);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (API_TOKEN) {
    headers['Authorization'] = `Bearer ${API_TOKEN}`;
  }

  try {
    const response = await fetch(`${STRAPI_URL}/api/articles`, {
      method: 'POST',
      headers,
      body: JSON.stringify(transformedArticle),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const data = await response.json();
    console.log(`✅ [${index + 1}/${mockArticles.length}] Imported: ${article.title}`);
    return data;
  } catch (error) {
    console.error(`❌ [${index + 1}/${mockArticles.length}] Failed: ${article.title}`);
    console.error(`   Error: ${error.message}`);
    return null;
  }
}

// Main import function
async function importAllArticles() {
  console.log('🚀 Starting import of articles to Strapi...\n');
  console.log(`📊 Total articles to import: ${mockArticles.length}`);
  console.log(`🔗 Strapi URL: ${STRAPI_URL}`);
  console.log(`🔑 API Token: ${API_TOKEN ? '✅ Provided' : '❌ Not provided (using public access)'}\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < mockArticles.length; i++) {
    const result = await importArticle(mockArticles[i], i);
    if (result) {
      successCount++;
    } else {
      failCount++;
    }

    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n' + '='.repeat(60));
  console.log('📈 Import Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📊 Total: ${mockArticles.length}`);
  console.log('='.repeat(60));

  if (failCount > 0) {
    console.log('\n⚠️  Some imports failed. Common reasons:');
    console.log('   1. API permissions not set (Settings → Roles → Public → Article → create)');
    console.log('   2. Missing API token (set API_TOKEN env variable)');
    console.log('   3. Strapi not running (check http://localhost:1337)');
    console.log('\n💡 To fix permissions:');
    console.log('   1. Open http://localhost:1337/admin');
    console.log('   2. Go to Settings → Roles → Public');
    console.log('   3. Enable: find, findOne, create for Article');
    console.log('   4. Save and re-run this script');
  } else {
    console.log('\n🎉 All articles imported successfully!');
    console.log('🔗 View them at: http://localhost:1337/admin/content-manager/collection-types/api::article.article');
  }
}

// Run import
importAllArticles().catch((error) => {
  console.error('💥 Fatal error during import:');
  console.error(error);
  process.exit(1);
});
