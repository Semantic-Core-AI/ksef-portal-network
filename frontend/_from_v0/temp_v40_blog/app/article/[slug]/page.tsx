import ArticleClient from "./ArticleClient"

export function generateStaticParams() {
  // Assuming mockArticles is imported from '@/lib/data' in a server context
  // If mockArticles is not directly available here, you might need to fetch it.
  // For this example, we'll assume it's accessible or fetched.
  const mockArticles = require("@/lib/data").mockArticles
  return mockArticles.map((article: { slug: string }) => ({
    slug: article.slug,
  }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return <ArticleClient params={params} />
}
