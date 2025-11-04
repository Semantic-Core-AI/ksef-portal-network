'use strict';

module.exports = (plugin) => {
  const originalCreate = plugin.controllers['collection-types'].create;
  const originalUpdate = plugin.controllers['collection-types'].update;

  plugin.controllers['collection-types'].create = async (ctx) => {
    console.log('📝 ADMIN API: Creating document...');
    console.log('   Model:', ctx.params.model);
    
    const result = await originalCreate(ctx);
    
    console.log('✅ ADMIN API: Document created!');
    if (result && result.data) {
      console.log('   Title:', result.data.title || result.data.attributes?.title || 'N/A');
      console.log('   ID:', result.data.id || result.data.documentId || 'N/A');
    }
    
    return result;
  };

  plugin.controllers['collection-types'].update = async (ctx) => {
    console.log('📝 ADMIN API: Updating document...');
    console.log('   Model:', ctx.params.model);
    console.log('   ID:', ctx.params.id);
    
    const result = await originalUpdate(ctx);
    
    console.log('✅ ADMIN API: Document updated!');
    if (result && result.data) {
      const data = result.data;
      console.log('   Title:', data.title || data.attributes?.title || 'N/A');
      
      const isPublished = data.publishedAt || data.attributes?.publishedAt;
      if (isPublished) {
        console.log('🚀 ADMIN API: Document is PUBLISHED!');
        console.log('   Slug:', data.slug || data.attributes?.slug || 'N/A');
      } else {
        console.log('💾 ADMIN API: Document is DRAFT');
      }
    }
    
    return result;
  };

  return plugin;
};
