/**
 * Create Knowledge Edges Directly via Strapi Service
 *
 * Bypasses API permissions - runs directly in Strapi context
 */

export default async ({ strapi }) => {
  console.log('\n🔗 Creating Knowledge Edges directly via Strapi service...\n');

  // Get all articles
  const articles = await strapi.db.query('api::article.article').findMany({
    select: ['id', 'title', 'slug', 'category'],
    limit: 100
  });

  console.log(`Found ${articles.length} articles\n`);

  // Create a slug → article mapping
  const articlesBySlug = new Map();
  articles.forEach(article => {
    articlesBySlug.set(article.slug, article);
  });

  // Define test edges
  const edges = [
    {
      source: 'ksef-2026-kompletny-przewodnik',
      target: 'jak-obliczyc-koszt-wdrozenia-ksef-w-2026',
      type: 'BUILDS_ON',
      weight: 0.9,
      anchor: 'Sprawdź koszty wdrożenia'
    },
    {
      source: 'ksef-2026-kompletny-przewodnik',
      target: 'ksef-api-kompletna-dokumentacja-integracji',
      type: 'RELATED_TO',
      weight: 0.85,
      anchor: 'Zobacz dokumentację API'
    },
    {
      source: 'ksef-2026-kompletny-przewodnik',
      target: 'top-5-bledow-przy-wdrazaniu-ksef',
      type: 'RELATED_TO',
      weight: 0.8,
      anchor: 'Uniknij częstych błędów'
    },
    {
      source: 'jak-obliczyc-koszt-wdrozenia-ksef-w-2026',
      target: 'ksef-api-kompletna-dokumentacja-integracji',
      type: 'PREREQUISITE',
      weight: 0.75,
      anchor: 'Techniczne aspekty integracji'
    },
    {
      source: 'jak-obliczyc-koszt-wdrozenia-ksef-w-2026',
      target: 'top-5-bledow-przy-wdrazaniu-ksef',
      type: 'RELATED_TO',
      weight: 0.85,
      anchor: 'Uniknij kosztownych błędów'
    },
    {
      source: 'top-5-bledow-przy-wdrazaniu-ksef',
      target: 'ksef-2026-kompletny-przewodnik',
      type: 'PREREQUISITE',
      weight: 0.7,
      anchor: 'Poznaj podstawy KSeF'
    },
    {
      source: 'ksef-api-kompletna-dokumentacja-integracji',
      target: 'top-5-bledow-przy-wdrazaniu-ksef',
      type: 'RELATED_TO',
      weight: 0.6,
      anchor: 'Typowe błędy integracji'
    }
  ];

  let created = 0;
  let skipped = 0;

  for (const [index, edge] of edges.entries()) {
    const sourceArticle = articlesBySlug.get(edge.source);
    const targetArticle = articlesBySlug.get(edge.target);

    if (!sourceArticle) {
      console.log(`⚠️  [${index + 1}/${edges.length}] Skipped: ${edge.source} (not found)`);
      skipped++;
      continue;
    }

    if (!targetArticle) {
      console.log(`⚠️  [${index + 1}/${edges.length}] Skipped: ${edge.target} (not found)`);
      skipped++;
      continue;
    }

    try {
      await strapi.db.query('api::knowledge-edge.knowledge-edge').create({
        data: {
          sourceArticle: sourceArticle.id,
          targetArticle: targetArticle.id,
          relationshipType: edge.type,
          weight: edge.weight,
          anchorText: edge.anchor,
          linkContext: 'SIDEBAR',
          isActive: true,
          isVisible: true,
          qualityScore: 0.8,
          confidenceScore: 1.0,
          provenanceType: 'EDITORIAL',
          impressionCount: '0',
          clickCount: '0',
          clickThroughRate: 0.0
        }
      });

      console.log(`✅ [${index + 1}/${edges.length}] Created: ${sourceArticle.title} → ${targetArticle.title}`);
      created++;
    } catch (error) {
      console.error(`❌ [${index + 1}/${edges.length}] Failed: ${edge.source} → ${edge.target}`);
      console.error(`   Error: ${error.message}`);
    }
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log(`✅ Created: ${created} edges`);
  console.log(`⚠️  Skipped: ${skipped} edges`);
  console.log('═══════════════════════════════════════════════════\n');

  // Run graph analysis
  console.log('📊 Running graph analysis...\n');

  try {
    const graphService = strapi.service('api::article.graph');
    await graphService.runFullAnalysis();
    console.log('✅ Graph analysis completed!\n');
  } catch (error) {
    console.error('❌ Graph analysis failed:', error.message);
  }

  // Show stats
  const totalEdges = await strapi.db.query('api::knowledge-edge.knowledge-edge').count();
  const totalArticles = await strapi.db.query('api::article.article').count();

  console.log('📊 Final Statistics:');
  console.log(`   Articles: ${totalArticles}`);
  console.log(`   Edges: ${totalEdges}`);
  console.log(`   Avg Degree: ${totalEdges > 0 ? ((totalEdges * 2) / totalArticles).toFixed(2) : 0}`);
  console.log('');
};
