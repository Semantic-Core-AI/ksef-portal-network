/**
 * Create Test Graph Data
 *
 * Creates sample articles and knowledge edges for testing
 */

const STRAPI_URL = 'http://localhost:1337';

interface TestArticle {
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
}

const TEST_ARTICLES: TestArticle[] = [
  {
    title: 'KSeF - Co to jest i jak działa?',
    slug: 'ksef-co-to-jest',
    excerpt: 'Kompleksowy przewodnik po Krajowym Systemie e-Faktur (KSeF). Dowiedz się wszystko o obowiązkowym systemie fakturowania.',
    content: '# KSeF - Co to jest i jak działa?\n\nKrajowy System e-Faktur (KSeF) to rządowy system służący do wystawiania, odbierania i przechowywania faktur ustrukturyzowanych...',
    thumbnail: '/images/ksef-intro.jpg',
    category: 'Podstawy',
    tags: ['ksef', 'podstawy', 'e-faktura'],
    difficulty: 'Podstawowy',
    contentType: 'Przewodnik',
    author: {
      name: 'Jan Kowalski',
      avatar: '/avatars/jan.jpg',
      role: 'Ekspert KSeF',
      bio: 'Specjalista z 10-letnim doświadczeniem w e-fakturowaniu'
    },
    publishedAt: '2025-01-15T10:00:00Z',
    readingTime: 8,
    views: 2500,
    commentsCount: 45,
    rating: { average: 4.8, count: 120 },
    isFeatured: true,
    isTrending: true,
    isUpdated: false,
    isBookmarked: false,
    hasCTA: true
  },
  {
    title: 'Koszty wdrożenia KSeF',
    slug: 'koszty-wdrozenia-ksef',
    excerpt: 'Ile kosztuje wdrożenie KSeF w firmie? Sprawdź szczegółowy rozkład kosztów i opcje finansowania.',
    content: '# Koszty wdrożenia KSeF\n\nWdrożenie KSeF wiąże się z różnymi kosztami w zależności od wielkości firmy...',
    thumbnail: '/images/ksef-costs.jpg',
    category: 'Koszty',
    tags: ['ksef', 'koszty', 'wdrożenie', 'budżet'],
    difficulty: 'Średni',
    contentType: 'Artykuł',
    author: {
      name: 'Anna Nowak',
      avatar: '/avatars/anna.jpg',
      role: 'Analityk Finansowy',
      bio: 'Specjalistka od budżetowania projektów IT'
    },
    publishedAt: '2025-01-20T14:00:00Z',
    readingTime: 12,
    views: 1800,
    commentsCount: 32,
    rating: { average: 4.5, count: 85 },
    isFeatured: false,
    isTrending: true,
    isUpdated: false,
    isBookmarked: false,
    hasCTA: true
  },
  {
    title: 'Obowiązkowe wdrożenie KSeF - terminy',
    slug: 'obowiazkowe-wdrozenie-ksef',
    excerpt: 'Kiedy KSeF stanie się obowiązkowy? Sprawdź harmonogram i przygotuj się na zmiany.',
    content: '# Obowiązkowe wdrożenie KSeF\n\nSystem KSeF stanie się obowiązkowy zgodnie z ustawowymi terminami...',
    thumbnail: '/images/ksef-deadline.jpg',
    category: 'Prawo',
    tags: ['ksef', 'prawo', 'terminy', 'obowiązek'],
    difficulty: 'Podstawowy',
    contentType: 'Artykuł',
    author: {
      name: 'Piotr Wiśniewski',
      avatar: '/avatars/piotr.jpg',
      role: 'Prawnik',
      bio: 'Ekspert prawa podatkowego i gospodarczego'
    },
    publishedAt: '2025-01-25T09:00:00Z',
    readingTime: 6,
    views: 3200,
    commentsCount: 78,
    rating: { average: 4.9, count: 156 },
    isFeatured: true,
    isTrending: false,
    isUpdated: false,
    isBookmarked: false,
    hasCTA: false
  },
  {
    title: 'Integracja KSeF z systemami księgowymi',
    slug: 'integracja-ksef-systemy',
    excerpt: 'Jak zintegrować KSeF z Twoim systemem księgowym? Przewodnik techniczny dla programistów.',
    content: '# Integracja KSeF z systemami księgowymi\n\nIntegracja wymaga użycia API KSeF...',
    thumbnail: '/images/ksef-integration.jpg',
    category: 'Techniczne',
    tags: ['ksef', 'api', 'integracja', 'programowanie'],
    difficulty: 'Zaawansowany',
    contentType: 'Przewodnik',
    author: {
      name: 'Tomasz Zieliński',
      avatar: '/avatars/tomasz.jpg',
      role: 'Senior Developer',
      bio: 'Full-stack developer z focus na integracje systemowe'
    },
    publishedAt: '2025-02-01T11:00:00Z',
    readingTime: 15,
    views: 1200,
    commentsCount: 24,
    rating: { average: 4.7, count: 62 },
    isFeatured: false,
    isTrending: false,
    isUpdated: true,
    isBookmarked: false,
    hasCTA: true
  },
  {
    title: 'Top 5 błędów przy wdrażaniu KSeF',
    slug: 'bledy-wdrazanie-ksef',
    excerpt: 'Najczęstsze błędy firm przy wdrażaniu KSeF i jak ich uniknąć.',
    content: '# Top 5 błędów przy wdrażaniu KSeF\n\n1. Brak przygotowania zespołu...',
    thumbnail: '/images/ksef-mistakes.jpg',
    category: 'Wdrożenie',
    tags: ['ksef', 'wdrożenie', 'błędy', 'porady'],
    difficulty: 'Średni',
    contentType: 'Artykuł',
    author: {
      name: 'Jan Kowalski',
      avatar: '/avatars/jan.jpg',
      role: 'Ekspert KSeF',
      bio: 'Specjalista z 10-letnim doświadczeniem w e-fakturowaniu'
    },
    publishedAt: '2025-02-05T13:00:00Z',
    readingTime: 7,
    views: 2100,
    commentsCount: 56,
    rating: { average: 4.6, count: 98 },
    isFeatured: false,
    isTrending: true,
    isUpdated: false,
    isBookmarked: false,
    hasCTA: true
  }
];

interface TestEdge {
  sourceSlug: string;
  targetSlug: string;
  relationshipType: string;
  weight: number;
  anchorText?: string;
  linkContext: string;
}

const TEST_EDGES: TestEdge[] = [
  // KSeF intro → Costs
  {
    sourceSlug: 'ksef-co-to-jest',
    targetSlug: 'koszty-wdrozenia-ksef',
    relationshipType: 'BUILDS_ON',
    weight: 0.9,
    anchorText: 'Sprawdź koszty wdrożenia',
    linkContext: 'INLINE'
  },
  // KSeF intro → Deadlines
  {
    sourceSlug: 'ksef-co-to-jest',
    targetSlug: 'obowiazkowe-wdrozenie-ksef',
    relationshipType: 'RELATED_TO',
    weight: 0.95,
    anchorText: 'Kiedy KSeF będzie obowiązkowy?',
    linkContext: 'SIDEBAR'
  },
  // KSeF intro → Integration
  {
    sourceSlug: 'ksef-co-to-jest',
    targetSlug: 'integracja-ksef-systemy',
    relationshipType: 'BUILDS_ON',
    weight: 0.7,
    anchorText: 'Dowiedz się o integracji technicznej',
    linkContext: 'FOOTER'
  },
  // Costs → Integration
  {
    sourceSlug: 'koszty-wdrozenia-ksef',
    targetSlug: 'integracja-ksef-systemy',
    relationshipType: 'PREREQUISITE',
    weight: 0.8,
    anchorText: 'Przeczytaj o aspektach technicznych',
    linkContext: 'INLINE'
  },
  // Costs → Mistakes
  {
    sourceSlug: 'koszty-wdrozenia-ksef',
    targetSlug: 'bledy-wdrazanie-ksef',
    relationshipType: 'RELATED_TO',
    weight: 0.85,
    anchorText: 'Uniknij kosztownych błędów',
    linkContext: 'SIDEBAR'
  },
  // Deadlines → Mistakes
  {
    sourceSlug: 'obowiazkowe-wdrozenie-ksef',
    targetSlug: 'bledy-wdrazanie-ksef',
    relationshipType: 'RELATED_TO',
    weight: 0.75,
    anchorText: 'Unikaj najczęstszych pułapek',
    linkContext: 'SIDEBAR'
  },
  // Integration → Mistakes
  {
    sourceSlug: 'integracja-ksef-systemy',
    targetSlug: 'bledy-wdrozenie-ksef',
    relationshipType: 'RELATED_TO',
    weight: 0.7,
    anchorText: 'Zobacz typowe błędy integracji',
    linkContext: 'FOOTER'
  },
  // Mistakes → Intro (circular reference)
  {
    sourceSlug: 'bledy-wdrazanie-ksef',
    targetSlug: 'ksef-co-to-jest',
    relationshipType: 'PREREQUISITE',
    weight: 0.6,
    anchorText: 'Poznaj podstawy KSeF',
    linkContext: 'SIDEBAR'
  }
];

async function createArticles() {
  console.log('\n🚀 Creating test articles...\n');

  const createdArticles = new Map<string, any>();

  for (const [index, articleData] of TEST_ARTICLES.entries()) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: articleData })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP ${response.status}: ${error}`);
      }

      const result = await response.json();
      createdArticles.set(articleData.slug, result.data);

      console.log(`✅ [${index + 1}/${TEST_ARTICLES.length}] Created: ${articleData.title}`);
    } catch (error: any) {
      console.error(`❌ [${index + 1}/${TEST_ARTICLES.length}] Failed: ${articleData.title}`);
      console.error(`   Error: ${error.message}`);
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return createdArticles;
}

async function createEdges(articles: Map<string, any>) {
  console.log('\n🔗 Creating knowledge edges...\n');

  for (const [index, edgeData] of TEST_EDGES.entries()) {
    try {
      const sourceArticle = articles.get(edgeData.sourceSlug);
      const targetArticle = articles.get(edgeData.targetSlug);

      if (!sourceArticle || !targetArticle) {
        console.warn(`⚠️  Skipping edge: ${edgeData.sourceSlug} → ${edgeData.targetSlug} (articles not found)`);
        continue;
      }

      const response = await fetch(`${STRAPI_URL}/api/knowledge-edges`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            sourceArticle: sourceArticle.id,
            targetArticle: targetArticle.id,
            relationshipType: edgeData.relationshipType,
            weight: edgeData.weight,
            anchorText: edgeData.anchorText,
            linkContext: edgeData.linkContext,
            isActive: true,
            isVisible: true,
            provenanceType: 'EDITORIAL'
          }
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP ${response.status}: ${error}`);
      }

      console.log(`✅ [${index + 1}/${TEST_EDGES.length}] Created edge: ${edgeData.sourceSlug} → ${edgeData.targetSlug}`);
    } catch (error: any) {
      console.error(`❌ [${index + 1}/${TEST_EDGES.length}] Failed: ${edgeData.sourceSlug} → ${edgeData.targetSlug}`);
      console.error(`   Error: ${error.message}`);
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

async function runGraphAnalysis() {
  console.log('\n📊 Running graph analysis...\n');

  try {
    const response = await fetch(`${STRAPI_URL}/api/graph/run-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const result = await response.json();
    console.log('✅ Graph analysis completed');
    console.log(result);
  } catch (error: any) {
    console.error('❌ Graph analysis failed');
    console.error(`   Error: ${error.message}`);
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  🎓 KSeF Knowledge Graph - Test Data Creation');
  console.log('═══════════════════════════════════════════════════');
  console.log(`\n🔗 Strapi URL: ${STRAPI_URL}\n`);

  const articles = await createArticles();
  await createEdges(articles);
  await runGraphAnalysis();

  console.log('\n═══════════════════════════════════════════════════');
  console.log('  ✅ Test data creation complete!');
  console.log('═══════════════════════════════════════════════════');
  console.log(`\n📊 Created:`);
  console.log(`   - ${articles.size} articles`);
  console.log(`   - ${TEST_EDGES.length} knowledge edges`);
  console.log(`\n🔗 View in Strapi:`);
  console.log(`   - Articles: ${STRAPI_URL}/admin/content-manager/collection-types/api::article.article`);
  console.log(`   - Edges: ${STRAPI_URL}/admin/content-manager/collection-types/api::knowledge-edge.knowledge-edge`);
  console.log(`\n🧪 Test recommendations:`);
  console.log(`   - GET ${STRAPI_URL}/api/graph/stats`);
  console.log(`   - GET ${STRAPI_URL}/api/graph/recommendations/1?limit=5`);
  console.log('');
}

main().catch(console.error);
