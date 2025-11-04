/**
 * Strapi API Client
 * Handles all communication with the Strapi backend
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export interface StrapiArticle {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: {
    url: string
    formats?: any
  }
  gridImage?: {
    url: string
    formats?: any
  }
  audioFile?: {
    url: string
    name?: string
    mime?: string
    size?: number
  }
  audioPlaybackRate?: "x05" | "x075" | "x10" | "x125" | "x15"
  category?: "Podstawy" | "Koszty" | "Wdrożenie" | "Prawo" | "Techniczne" | "Studia" | "Aktualności"
  tags?: string[]
  difficulty?: "Podstawowy" | "Średni" | "Zaawansowany"
  contentType?: "Artykuł" | "Przewodnik" | "Infografika" | "Video" | "Checklist" | "FAQ"
  publishedAt: string
  readingTime?: number
  viewCount?: number
  commentsCount?: number
  ratingAverage?: number
  ratingCount?: number
  isFeatured?: boolean
  isTrending?: boolean
  isUpdated?: boolean
  hasCTA?: boolean
  ctaText?: string
  ctaAction?: "Kalkulator NIE wdrożenia" | "Mapa wiedzy" | "Baza wiedzy" | "Quiz gotowości" | "Centrum pytań" | "Kontakt" | "Strona główna"
  metaTitle?: string
  metaDescription?: string
  createdAt: string
  updatedAt: string
  author?: {
    id?: number
    name?: string
    academicTitle?: "dr" | "dr hab." | "prof. dr hab." | "mgr" | "inż." | "mgr inż." | "lic."
    avatar?: {
      url: string
      formats?: any
    }
    role?: string
    bio?: string
    email?: string
    linkedin?: string
    website?: string
  }
  comments?: Array<{
    id: number
    authorName: string
    authorEmail: string
    authorAvatar?: {
      url: string
      formats?: any
    }
    content: string
    rating: number
    isApproved: boolean
    createdAt: string
  }>
  // Knowledge Graph metrics
  pageRank?: number
  authorityScore?: number
  hubScore?: number
  inDegree?: number
  outDegree?: number
  totalDegree?: number
}

export interface ArticleRecommendation extends StrapiArticle {
  relationshipType?: string
  weight?: number
  anchorText?: string
  linkContext?: string
}

export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

/**
 * Fetch all published articles from Strapi
 */
export async function getArticles(): Promise<StrapiArticle[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?populate=*&sort=publishedAt:desc`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status}`)
    }

    const json: StrapiResponse<StrapiArticle[]> = await res.json()
    return json.data
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

/**
 * Fetch a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<StrapiArticle | null> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.status}`)
    }

    const json: StrapiResponse<StrapiArticle[]> = await res.json()

    if (json.data.length === 0) {
      return null
    }

    return json.data[0]
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

/**
 * Fetch articles by category
 */
export async function getArticlesByCategory(category: string): Promise<StrapiArticle[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?filters[category][$eq]=${category}&populate=*&sort=publishedAt:desc`,
      {
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch articles by category: ${res.status}`)
    }

    const json: StrapiResponse<StrapiArticle[]> = await res.json()
    return json.data
  } catch (error) {
    console.error('Error fetching articles by category:', error)
    return []
  }
}

/**
 * Fetch featured articles
 */
export async function getFeaturedArticles(): Promise<StrapiArticle[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?filters[isFeatured][$eq]=true&populate=*&sort=publishedAt:desc`,
      {
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch featured articles: ${res.status}`)
    }

    const json: StrapiResponse<StrapiArticle[]> = await res.json()
    return json.data
  } catch (error) {
    console.error('Error fetching featured articles:', error)
    return []
  }
}

/**
 * Fetch recommended articles based on Knowledge Graph
 */
export async function getRecommendations(articleId: number, limit: number = 5): Promise<ArticleRecommendation[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/graph/recommendations/${articleId}?limit=${limit}`,
      {
        next: { revalidate: 30 }, // Revalidate every 30 seconds
      }
    )

    if (!res.ok) {
      console.warn(`Failed to fetch recommendations: ${res.status}`)
      return []
    }

    const json = await res.json()

    if (!json.success || !json.data) {
      return []
    }

    return json.data
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return []
  }
}

/**
 * Fetch full knowledge graph for visualization
 */
export interface GraphNode {
  id: number
  title: string
  slug: string
  category: string
  pageRank: number
  authorityScore: number
  hubScore: number
  community: number
  totalDegree: number
  betweenness: number
}

export interface GraphLink {
  id: number
  source: number
  target: number
  type: string
  weight: number
  label: string
}

export interface FullGraphData {
  nodes: GraphNode[]
  links: GraphLink[]
  stats: {
    totalNodes: number
    totalLinks: number
    communities: number
  }
}

export async function getFullGraph(): Promise<FullGraphData | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/graph/full`, {
      cache: 'no-store', // Always fetch fresh data for graph
    })

    if (!res.ok) {
      console.warn(`Failed to fetch full graph: ${res.status}`)
      return null
    }

    const json = await res.json()

    if (!json.success || !json.data) {
      return null
    }

    return json.data
  } catch (error) {
    console.error('Error fetching full graph:', error)
    return null
  }
}

/**
 * Map CTA action name to URL
 */
export function mapCtaActionToUrl(action?: string): string {
  const ctaActionMap: Record<string, string> = {
    "Kalkulator NIE wdrożenia": "/kalkulator",
    "Mapa wiedzy": "/mapa-wiedzy",
    "Baza wiedzy": "/baza-wiedzy",
    "Quiz gotowości": "/quiz",
    "Centrum pytań": "/centrum-pytan",
    "Kontakt": "/kontakt",
    "Strona główna": "/",
  }

  return action ? (ctaActionMap[action] || "/") : "/"
}

/**
 * Transform Strapi article to frontend Article format
 */
export function transformStrapiArticle(article: StrapiArticle): any {
  const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

  return {
    id: String(article.id),
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt || '',
    thumbnail: article.featuredImage?.url ? `${STRAPI_BASE_URL}${article.featuredImage.url}` : '/placeholder.svg',
    gridImage: article.gridImage?.url
      ? `${STRAPI_BASE_URL}${article.gridImage.url}`
      : article.featuredImage?.url
      ? `${STRAPI_BASE_URL}${article.featuredImage.url}`
      : '/placeholder.svg',
    category: article.category || 'Podstawy',
    tags: article.tags || [],
    difficulty: article.difficulty || 'Podstawowy',
    contentType: article.contentType || 'Artykuł',
    author: {
      name: article.author?.academicTitle
        ? `${article.author.academicTitle} ${article.author.name}`
        : article.author?.name || 'Ekspert KSeF',
      avatar: article.author?.avatar?.url ? { url: `${STRAPI_BASE_URL}${article.author.avatar.url}` } : { url: '/placeholder-avatar.svg' },
      role: article.author?.role || 'Ekspert',
      bio: article.author?.bio || '',
    },
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt || article.publishedAt,
    readingTime: article.readingTime || 5,
    viewCount: article.viewCount || 0,
    commentsCount: article.commentsCount || 0,
    rating: {
      average: article.ratingAverage || 0,
      count: article.ratingCount || 0,
    },
    isFeatured: article.isFeatured || false,
    isTrending: article.isTrending || false,
    isUpdated: article.isUpdated || false,
    isBookmarked: false,
    hasCTA: article.hasCTA || false,
    ctaText: article.ctaText,
    ctaAction: article.ctaAction,
  }
}
