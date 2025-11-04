'use strict';

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    data.seoScore = 0;
    data.seoQuality = 'NOT_CHECKED';
    console.log('📝 Lifecycle: beforeCreate - Tworzę nowy artykuł...');
  },

  async afterCreate(event) {
    const { result } = event;
    console.log('✅ Lifecycle: afterCreate - Artykuł stworzony: "' + result.title + '" (ID: ' + result.id + ')');
    
    if (result.publishedAt) {
      console.log('🚀 Lifecycle: Artykuł opublikowany od razu!');
    } else {
      console.log('💾 Lifecycle: Artykuł zapisany jako DRAFT');
    }
  },

  async afterUpdate(event) {
    const { result } = event;
    console.log('📝 Lifecycle: afterUpdate - Artykuł zaktualizowany: "' + result.title + '" (ID: ' + result.id + ')');
    
    if (result.publishedAt) {
      console.log('🚀 Lifecycle: Artykuł został opublikowany!');
      console.log('📊 Lifecycle: Slug artykułu: ' + result.slug);
    }
  },

  async afterDelete(event) {
    const { result } = event;
    console.log('🗑️  Lifecycle: Artykuł usunięty: "' + result.title + '"');
  }
};
