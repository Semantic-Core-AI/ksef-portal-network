export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  thumbnail: string
  category: "Podstawy" | "Koszty" | "Wdrożenie" | "Prawo" | "Techniczne" | "Studia" | "Aktualności"
  tags: string[]
  difficulty: "Podstawowy" | "Średni" | "Zaawansowany"
  contentType: "Artykuł" | "Przewodnik" | "Infografika" | "Video" | "Checklist" | "FAQ"
  author: {
    name: string
    avatar: string
    role: string
    bio: string
  }
  publishedAt: string
  updatedAt: string
  readingTime: number
  views: number
  commentsCount: number
  rating: {
    average: number
    count: number
  }
  isFeatured: boolean
  isTrending: boolean
  isUpdated: boolean
  isBookmarked: boolean
  hasCTA: boolean
  ctaText?: string
  ctaAction?: string
}

export type CardVariant = "short" | "medium" | "tall" | "extra-tall"
