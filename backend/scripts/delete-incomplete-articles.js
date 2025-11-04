/**
 * Delete incomplete articles (without images)
 * Run with: node scripts/delete-incomplete-articles.js
 */

const strapi = require('@strapi/strapi');

async function deleteIncompleteArticles() {
  const appContext = await strapi({ distDir: './dist' }).load();

  try {
    console.log('🔍 Fetching all articles...');

    const articles = await appContext.entityService.findMany('api::article.article', {
      populate: ['gridImage', 'featuredImage', 'author'],
    });

    console.log(`📊 Total articles: ${articles.length}`);

    const incomplete = articles.filter(article => {
      return !article.gridImage && !article.featuredImage;
    });

    console.log(`❌ Incomplete articles (no images): ${incomplete.length}`);

    if (incomplete.length === 0) {
      console.log('✅ No incomplete articles found!');
      process.exit(0);
    }

    console.log('\n📋 Articles to delete:');
    incomplete.forEach(art => {
      console.log(`  - [${art.id}] ${art.title}`);
    });

    console.log(`\n🗑️  Deleting ${incomplete.length} incomplete articles...`);

    for (const article of incomplete) {
      await appContext.entityService.delete('api::article.article', article.id);
      console.log(`  ✓ Deleted: ${article.title}`);
    }

    console.log(`\n✅ Successfully deleted ${incomplete.length} incomplete articles!`);

    const remaining = await appContext.entityService.findMany('api::article.article');
    console.log(`📊 Remaining articles: ${remaining.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await appContext.destroy();
    process.exit(0);
  }
}

deleteIncompleteArticles();
