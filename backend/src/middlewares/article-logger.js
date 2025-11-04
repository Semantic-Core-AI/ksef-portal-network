'use strict';

module.exports = {
  register({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['api::article.article'],

      beforeCreate(event) {
        const { data } = event.params;
        data.seoScore = 0;
        data.seoQuality = 'NOT_CHECKED';
        console.log('📝 SUBSCRIBER: beforeCreate - Tworzę artykuł...');
      },

      afterCreate(event) {
        const { result } = event;
        console.log('✅ SUBSCRIBER: afterCreate - Artykuł stworzony: "' + result.title + '" (ID: ' + result.id + ')');
        
        if (result.publishedAt) {
          console.log('🚀 SUBSCRIBER: Opublikowany od razu!');
        } else {
          console.log('💾 SUBSCRIBER: Zapisany jako DRAFT');
        }
      },

      afterUpdate(event) {
        const { result } = event;
        console.log('📝 SUBSCRIBER: afterUpdate - Zaktualizowany: "' + result.title + '"');
        
        if (result.publishedAt) {
          console.log('🚀 SUBSCRIBER: Artykuł OPUBLIKOWANY!');
          console.log('📊 SUBSCRIBER: Slug: ' + result.slug);
        }
      },

      afterDelete(event) {
        const { result } = event;
        console.log('🗑️  SUBSCRIBER: Usunięty: "' + result.title + '"');
      }
    });
  },

  bootstrap(/*{ strapi }*/) {},
};
