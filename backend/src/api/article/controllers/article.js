'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  async create(ctx) {
    console.log('📝 CONTROLLER: Creating article...');
    
    // Ustaw domyślne wartości SEO
    if (ctx.request.body.data) {
      ctx.request.body.data.seoScore = 0;
      ctx.request.body.data.seoQuality = 'NOT_CHECKED';
    }
    
    // Wywołaj oryginalną metodę create
    const response = await super.create(ctx);
    
    console.log('✅ CONTROLLER: Article created!');
    console.log('   Title:', response.data.title || response.data.attributes?.title);
    console.log('   ID:', response.data.id || response.data.documentId);
    
    return response;
  },

  async update(ctx) {
    const articleId = ctx.params.id;
    console.log('📝 CONTROLLER: Updating article ID:', articleId);
    
    // Wywołaj oryginalną metodę update
    const response = await super.update(ctx);
    
    console.log('✅ CONTROLLER: Article updated!');
    console.log('   Title:', response.data.title || response.data.attributes?.title);
    
    const article = response.data;
    const isPublished = article.publishedAt || article.attributes?.publishedAt;
    
    if (isPublished) {
      console.log('🚀 CONTROLLER: Article is PUBLISHED!');
      console.log('   Slug:', article.slug || article.attributes?.slug);
      console.log('   Published at:', isPublished);
    } else {
      console.log('💾 CONTROLLER: Article is DRAFT');
    }
    
    return response;
  },

  async delete(ctx) {
    console.log('🗑️  CONTROLLER: Deleting article ID:', ctx.params.id);
    
    const response = await super.delete(ctx);
    
    console.log('✅ CONTROLLER: Article deleted!');
    
    return response;
  }
}));
