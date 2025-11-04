import type { CardVariant, Article } from "./types"

export const getCardVariant = (index: number): CardVariant => {
  const pattern: CardVariant[] = [
    "medium",
    "short",
    "tall",
    "medium",
    "short",
    "extra-tall",
    "medium",
    "short",
    "tall",
    "medium",
    "short",
    "medium",
  ]
  return pattern[index % pattern.length]
}

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    Podstawy: "bg-blue-100 text-blue-700",
    Koszty: "bg-green-100 text-green-700",
    Wdrożenie: "bg-purple-100 text-purple-700",
    Prawo: "bg-red-100 text-red-700",
    Techniczne: "bg-orange-100 text-orange-700",
    Studia: "bg-pink-100 text-pink-700",
    Aktualności: "bg-yellow-100 text-yellow-700",
  }
  return colors[category] || "bg-neutral-100 text-neutral-700"
}

export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Dzisiaj"
  if (diffDays === 1) return "Wczoraj"
  if (diffDays < 7) return `${diffDays} dni temu`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tyg. temu`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} mies. temu`
  return `${Math.floor(diffDays / 365)} lat temu`
}

export const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export const getRelatedArticles = (currentArticle: Article, allArticles: Article[], limit = 3): Article[] => {
  // Filter out current article
  const otherArticles = allArticles.filter((a) => a.id !== currentArticle.id)

  // Calculate relevance score for each article
  const scoredArticles = otherArticles.map((article) => {
    let score = 0

    // Same category = +10 points
    if (article.category === currentArticle.category) {
      score += 10
    }

    // Shared tags = +5 points per tag
    const sharedTags = article.tags.filter((tag) => currentArticle.tags.includes(tag))
    score += sharedTags.length * 5

    // Same difficulty level = +3 points
    if (article.difficulty === currentArticle.difficulty) {
      score += 3
    }

    // Same content type = +2 points
    if (article.contentType === currentArticle.contentType) {
      score += 2
    }

    // Trending articles = +1 point
    if (article.isTrending) {
      score += 1
    }

    // Recently updated = +1 point
    if (article.isUpdated) {
      score += 1
    }

    return { article, score }
  })

  // Sort by score (descending) and return top N
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.article)
}
