import { notFound } from "next/navigation"
import { getArticleBySlug, getRecommendations, mapCtaActionToUrl } from "@/lib/strapi"
import { Clock, Calendar, Eye, MessageCircle, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import RelatedArticles from "@/components/related-articles"
import { ArticleContent } from "@/components/article-content"
import { ArticleShareButton } from "@/components/article-share-button"
import { ArticleBookmarkButton } from "@/components/article-bookmark-button"
import ArticleComments from "@/components/article-comments"
import { AudioPlayer } from "@/components/audio-player"

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // Fetch Top 3 Knowledge Graph recommendations
  let recommendations = await getRecommendations(article.id, 3)

  // Fallback: If Knowledge Graph API fails, show other articles
  if (!recommendations || recommendations.length === 0) {
    const { getArticles } = await import("@/lib/strapi")
    const allArticles = await getArticles()
    recommendations = allArticles
      .filter(a => a.id !== article.id) // Exclude current article
      .slice(0, 3) as any
  }

  const difficultyColors = {
    Podstawowy: "bg-green-100 text-green-700",
    Średni: "bg-yellow-100 text-yellow-700",
    Zaawansowany: "bg-red-100 text-red-700",
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header/Navigation */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container max-w-[1280px] mx-auto px-4 py-4">
          <Link
            href="/baza-wiedzy"
            className="inline-flex items-center gap-2 text-[#2C6AA8] hover:text-[#235587] font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Powrót do bazy wiedzy
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <article className="container max-w-[900px] mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-[#6B7280] mb-6">
          <Link href="/" className="hover:text-[#2C6AA8]">
            Home
          </Link>
          {" / "}
          <Link href="/baza-wiedzy" className="hover:text-[#2C6AA8]">
            Baza Wiedzy
          </Link>
          {" / "}
          <span className="text-[#111827]">{article.category || "Artykuł"}</span>
        </div>

        {/* Article Header */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 mb-8 shadow-soft">
          {/* Category & Difficulty */}
          <div className="flex flex-nowrap items-center gap-2 mb-4 overflow-x-auto">
            {article.category && (
              <span className="px-2.5 py-0.5 bg-[#2C6AA8] text-white text-[10px] font-semibold rounded-full whitespace-nowrap">
                {article.category}
              </span>
            )}
            {article.difficulty && (
              <span className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full whitespace-nowrap ${difficultyColors[article.difficulty] || 'bg-gray-100 text-gray-700'}`}>
                {article.difficulty}
              </span>
            )}
            {article.contentType && (
              <span className="px-2.5 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-[10px] font-semibold rounded-full whitespace-nowrap">
                {article.contentType}
              </span>
            )}
            {article.isFeatured && (
              <span className="px-2.5 py-0.5 bg-[#C7A83B] text-white text-[10px] font-semibold rounded-full whitespace-nowrap">
                FEATURED
              </span>
            )}
            {article.isTrending && (
              <span className="px-2.5 py-0.5 bg-[#DC2626] text-white text-[10px] font-semibold rounded-full whitespace-nowrap">
                TRENDING
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-[14px] font-serif font-bold text-[#111827] mb-6 leading-tight">{article.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#6B7280] mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.readingTime || 5} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Data najnowszej aktualizacji: {new Date(article.publishedAt).toLocaleDateString("pl-PL")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{(article.viewCount || 0).toLocaleString()} wyświetleń</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>{article.commentsCount || 0} komentarzy (zarejestrowani użytkownicy)</span>
            </div>
            {article.ratingAverage && article.ratingAverage > 0 && (
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-[#F59E0B]" />
                <span className="font-semibold">{article.ratingAverage}</span>
                <span>({article.ratingCount || 0})</span>
              </div>
            )}
          </div>

          {/* Excerpt */}
          <p className="text-xs font-serif italic text-[#1E2A5E] leading-relaxed mb-8">{article.excerpt}</p>

          {/* Author */}
          <div className="flex items-center gap-4 pt-6 border-t border-[#E5E7EB]">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2C6AA8] to-[#1E5A8E] flex items-center justify-center text-white font-bold text-lg">
              {(article.author?.name || "EK")
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[#111827]">{article.author?.name || "Ekspert KSeF"}</div>
              <div className="text-sm text-[#6B7280]">{article.author?.role || "Autor"}</div>
            </div>
            <div className="flex items-center gap-2">
              <ArticleShareButton
                title={article.title}
                url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}/article/${slug}`}
                description={article.excerpt}
              />
              <ArticleBookmarkButton
                articleId={article.id}
                title={article.title}
                slug={slug}
              />
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {article.thumbnail && !article.thumbnail.includes("placeholder") && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-medium">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        )}

        {/* Audio Player */}
        {article.audioFile?.url && (
          <div className="mb-8">
            <AudioPlayer
              audioUrl={article.audioFile.url}
              title={article.title}
              defaultPlaybackRate={article.audioPlaybackRate}
            />
          </div>
        )}

        {/* Article Body */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 mb-8 shadow-soft">
          <ArticleContent content={article.content} />

          <div className="mt-8">
            <hr style={{marginTop: '32px', marginBottom: '32px', borderColor: '#E5E7EB'}} />

            <blockquote style={{borderLeft: '4px solid #2C6AA8', paddingLeft: '16px', marginTop: '16px', marginBottom: '16px', fontStyle: 'italic', color: '#6B7280'}}>
              <p style={{marginBottom: '0'}}>
                <strong style={{fontWeight: '600', color: '#111827'}}>Autor:</strong> {article.author?.name || "Ekspert KSeF"} - {article.author?.bio || "Certyfikowany ekspert KSeF"}
              </p>
            </blockquote>

            {/* CTA - Always show */}
            <div className="not-prose mt-8 p-6 bg-gradient-to-br from-[#2C6AA8] to-[#1E5A8E] rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Gotowy na kolejny krok?</h3>
              <p className="mb-4 text-white/90">
                Skorzystaj z naszych narzędzi aby lepiej zrozumieć wdrożenie KSeF w Twojej firmie.
              </p>
              <Link
                href={article.ctaAction ? mapCtaActionToUrl(article.ctaAction) : "/baza-wiedzy"}
                className="inline-block px-6 py-3 bg-[#C7A83B] hover:bg-[#B8992C] text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                {article.ctaText || "Przeglądaj bazę wiedzy"} →
              </Link>
            </div>
          </div>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 mb-8 shadow-soft">
            <h3 className="text-lg font-semibold text-[#111827] mb-4">Tagi</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-[#F3F4F6] hover:bg-[#2C6AA8] hover:text-white text-[#374151] text-sm font-medium rounded-full transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="mb-8">
          <ArticleComments comments={article.comments} />
        </div>

        {/* Knowledge Graph Recommendations */}
        <RelatedArticles recommendations={recommendations} />

        {/* Back to list */}
        <div className="text-center">
          <Link
            href="/baza-wiedzy"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C6AA8] hover:bg-[#235587] text-white font-semibold rounded-lg transition-colors shadow-soft"
          >
            <ArrowLeft className="h-5 w-5" />
            Wróć do bazy wiedzy
          </Link>
        </div>
      </article>
    </div>
  )
}
