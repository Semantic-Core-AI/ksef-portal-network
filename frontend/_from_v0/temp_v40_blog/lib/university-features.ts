export interface Highlight {
  id: string
  articleSlug: string
  text: string
  note: string
  color: "yellow" | "green" | "blue" | "pink"
  position: { start: number; end: number }
  createdAt: string
}

export interface Citation {
  articleTitle: string
  author: string
  publishDate: string
  url: string
  accessDate: string
}

export interface MindMapNode {
  id: string
  label: string
  category: string
  connections: string[]
  x: number
  y: number
}

// Harvard - Highlights & Annotations System
export const highlightStorage = {
  save: (highlight: Highlight) => {
    const highlights = highlightStorage.getAll()
    highlights.push(highlight)
    localStorage.setItem("ksef_highlights", JSON.stringify(highlights))
  },

  getAll: (): Highlight[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem("ksef_highlights")
    return data ? JSON.parse(data) : []
  },

  getByArticle: (slug: string): Highlight[] => {
    return highlightStorage.getAll().filter((h) => h.articleSlug === slug)
  },

  delete: (id: string) => {
    const highlights = highlightStorage.getAll().filter((h) => h.id !== id)
    localStorage.setItem("ksef_highlights", JSON.stringify(highlights))
  },
}

// Stanford - Smart Search with Semantic Analysis
export const smartSearch = {
  analyze: (query: string, articles: any[]) => {
    const keywords = query.toLowerCase().split(" ")

    return articles
      .map((article) => {
        let score = 0

        // Title matching (highest weight)
        keywords.forEach((keyword) => {
          if (article.title.toLowerCase().includes(keyword)) score += 10
        })

        // Description matching
        keywords.forEach((keyword) => {
          if (article.description.toLowerCase().includes(keyword)) score += 5
        })

        // Category matching
        keywords.forEach((keyword) => {
          if (article.category.toLowerCase().includes(keyword)) score += 7
        })

        // Tags matching
        article.tags.forEach((tag: string) => {
          keywords.forEach((keyword) => {
            if (tag.toLowerCase().includes(keyword)) score += 3
          })
        })

        // Semantic synonyms (Polish)
        const synonyms: Record<string, string[]> = {
          wdrożenie: ["implementacja", "uruchomienie", "instalacja"],
          koszty: ["cena", "wydatki", "opłaty"],
          prawo: ["przepisy", "regulacje", "ustawa"],
          techniczne: ["technologia", "it", "system"],
        }

        keywords.forEach((keyword) => {
          Object.entries(synonyms).forEach(([key, values]) => {
            if (keyword === key || values.includes(keyword)) {
              if (
                article.title.toLowerCase().includes(key) ||
                values.some((v) => article.title.toLowerCase().includes(v))
              ) {
                score += 4
              }
            }
          })
        })

        return { ...article, relevanceScore: score }
      })
      .filter((article) => article.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
  },
}

// Cambridge - Citations Generator
export const citationGenerator = {
  generateAPA: (citation: Citation): string => {
    const { articleTitle, author, publishDate, url, accessDate } = citation
    const date = new Date(publishDate)
    const year = date.getFullYear()

    return `${author} (${year}). ${articleTitle}. KSEF.EXPERT. Retrieved ${accessDate}, from ${url}`
  },

  generateMLA: (citation: Citation): string => {
    const { articleTitle, author, publishDate, url, accessDate } = citation

    return `${author}. "${articleTitle}." KSEF.EXPERT, ${publishDate}, ${url}. Accessed ${accessDate}.`
  },

  generateChicago: (citation: Citation): string => {
    const { articleTitle, author, publishDate, url, accessDate } = citation

    return `${author}. "${articleTitle}." KSEF.EXPERT. ${publishDate}. ${url} (accessed ${accessDate}).`
  },

  generateISO690: (citation: Citation): string => {
    const { articleTitle, author, publishDate, url, accessDate } = citation

    return `${author}. ${articleTitle}. KSEF.EXPERT [online]. ${publishDate} [viewed ${accessDate}]. Available from: ${url}`
  },
}

// MIT - Mind Map Generator
export const mindMapGenerator = {
  generateFromArticles: (articles: any[]): MindMapNode[] => {
    const categories = Array.from(new Set(articles.map((a) => a.category)))
    const nodes: MindMapNode[] = []

    // Create category nodes
    categories.forEach((category, index) => {
      const angle = (index / categories.length) * 2 * Math.PI
      const radius = 300

      nodes.push({
        id: `cat-${category}`,
        label: category,
        category: "root",
        connections: [],
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      })
    })

    // Create article nodes
    articles.forEach((article, index) => {
      const categoryNode = nodes.find((n) => n.label === article.category)
      if (!categoryNode) return

      const categoryArticles = articles.filter((a) => a.category === article.category)
      const articleIndex = categoryArticles.findIndex((a) => a.id === article.id)
      const angle = (articleIndex / categoryArticles.length) * 2 * Math.PI
      const radius = 150

      const node: MindMapNode = {
        id: article.id,
        label: article.title.substring(0, 30) + "...",
        category: article.category,
        connections: [categoryNode.id],
        x: categoryNode.x + Math.cos(angle) * radius,
        y: categoryNode.y + Math.sin(angle) * radius,
      }

      nodes.push(node)
      categoryNode.connections.push(article.id)
    })

    return nodes
  },
}
