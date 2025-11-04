"use client"

import { mockArticles } from "@/lib/data"
import { notFound } from "next/navigation"
import {
  ChevronRight,
  Calendar,
  RefreshCw,
  BookOpen,
  Eye,
  Star,
  MessageCircle,
  Bookmark,
  Share2,
  Printer,
  ArrowUp,
} from "lucide-react"
import { formatRelativeDate, formatNumber, getRelatedArticles } from "@/lib/helpers"
import { RelatedArticles } from "@/components/related-articles"
import { ReadingProgress } from "@/components/reading-progress"
import { markArticleAsRead, addToReadingHistory, isArticleBookmarked, toggleBookmark } from "@/lib/user-storage"
import { HighlightsPanel } from "@/components/highlights-panel"
import { CitationGenerator } from "@/components/citation-generator"
import { streakSystem, knowledgeScoreSystem, achievementSystem } from "@/lib/viral-growth"
import { ShareModal } from "@/components/share-modal"
import { useEffect, useState } from "react"

export default function ArticleClient({ params }: { params: { slug: string } }) {
  const article = mockArticles.find((a) => a.slug === params.slug)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    if (article) {
      markArticleAsRead(article.slug)
      addToReadingHistory(article.slug)
      setIsBookmarked(isArticleBookmarked(article.slug))

      streakSystem.updateStreak()
      knowledgeScoreSystem.addPoints("read", 1)

      const score = knowledgeScoreSystem.getScore()
      const streak = streakSystem.getStreak()
      achievementSystem.checkAndUnlock("read", score.articlesRead)
      achievementSystem.checkAndUnlock("streak", streak.currentStreak)
    }
  }, [article])

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(article, mockArticles, 3)

  const handleToggleBookmark = () => {
    const newState = toggleBookmark(article.slug)
    setIsBookmarked(newState)
  }

  return (
    <article className="min-h-screen bg-[#FAFAFA]">
      <ReadingProgress readingTime={article.readingTime} />

      <HighlightsPanel articleSlug={article.slug} />

      {/* Article Header */}
      <header className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-6">
            <a href="/" className="hover:text-[#0F4C81]">
              Home
            </a>
            <ChevronRight className="h-4 w-4" />
            <a href="/" className="hover:text-[#0F4C81]">
              {article.category}
            </a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[#111827] font-medium">Artykuł</span>
          </nav>

          {/* Category Badge */}
          <span
            className="inline-block px-3 py-1 bg-blue-100 text-blue-700 
                        text-sm font-semibold rounded-full mb-4"
          >
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6 leading-tight">{article.title}</h1>

          {/* Author + Meta */}
          <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-[#E5E7EB]">
            {/* Author */}
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar || "/placeholder.svg"}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-[#111827]">{article.author.name}</p>
                <p className="text-sm text-[#6B7280]">{article.author.role}</p>
              </div>
            </div>

            {/* Dates */}
            <div className="flex flex-col gap-1 text-sm text-[#6B7280]">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Opublikowano: {formatRelativeDate(article.publishedAt)}
              </span>
              {article.isUpdated && (
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-[#16A34A]" />
                  Zaktualizowano: {formatRelativeDate(article.updatedAt)}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B7280] ml-auto">
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> {article.readingTime} min czytania
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> {formatNumber(article.views)} wyświetleń
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {article.rating.average}/5 (
                {article.rating.count})
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" /> {article.commentsCount} komentarzy
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleToggleBookmark}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
                ${
                  isBookmarked
                    ? "bg-[#1E2A5E] text-white hover:bg-[#151f45]"
                    : "bg-[#F5F5F5] hover:bg-[#E5E7EB] text-[#111827]"
                }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              {isBookmarked ? "Zapisano" : "Zapisz"}
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#F5F5F5] 
                            hover:bg-[#E5E7EB] rounded-lg transition-colors text-sm font-medium"
            >
              <Share2 className="h-4 w-4" />
              Udostępnij
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-[#F5F5F5] 
                            hover:bg-[#E5E7EB] rounded-lg transition-colors text-sm font-medium"
            >
              <Printer className="h-4 w-4" />
              Drukuj
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
          <img
            src={article.thumbnail || "/placeholder.svg"}
            alt="Featured image"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none bg-white rounded-2xl p-8 md:p-12">
          <p className="text-lg leading-relaxed text-[#374151]">{article.excerpt}</p>

          <h2 className="text-3xl font-bold text-[#111827] mt-12 mb-4">Wprowadzenie</h2>
          <p className="text-lg leading-relaxed text-[#374151]">
            Krajowy System e-Faktur (KSeF) to rewolucyjna zmiana w sposobie wystawiania i przechowywania faktur VAT w
            Polsce. Od <strong>1 lutego 2026 roku</strong>, wszystkie firmy będą zobowiązane do korzystania z systemu. W
            tym artykule przedstawiamy kompleksowy przewodnik po wszystkich aspektach wdrożenia KSeF.
          </p>

          <div className="not-prose my-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
            <p className="text-[#374151]">
              <strong>Ważna informacja:</strong> Termin obowiązkowego wdrożenia KSeF został przesunięty z 1 lipca 2024
              na 1 lutego 2026 roku zgodnie z ustawą z dnia 15 maja 2024 r.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-[#111827] mt-12 mb-4">Kluczowe informacje</h2>
          <p className="text-lg leading-relaxed text-[#374151]">
            System KSeF wprowadza szereg zmian w procesie fakturowania. Najważniejsze z nich to:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-lg text-[#374151]">
            <li>Obowiązek wystawiania faktur elektronicznych przez wszystkie firmy</li>
            <li>Centralne przechowywanie faktur w systemie Ministerstwa Finansów</li>
            <li>Automatyczna weryfikacja poprawności faktur</li>
            <li>Możliwość integracji z systemami księgowymi</li>
            <li>Kary za niewdrożenie systemu w terminie</li>
          </ul>

          <h2 className="text-3xl font-bold text-[#111827] mt-12 mb-4">Podsumowanie</h2>
          <p className="text-lg leading-relaxed text-[#374151]">
            Wdrożenie KSeF to nieunikniony krok dla wszystkich firm działających w Polsce. Wczesne przygotowanie i wybór
            odpowiedniego oprogramowania może znacząco ułatwić ten proces i zmniejszyć koszty wdrożenia.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <CitationGenerator article={article} />
      </div>

      {/* Related Articles Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <RelatedArticles articles={relatedArticles} />
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#0F4C81] text-white 
                  rounded-full shadow-xl hover:shadow-2xl hover:scale-110 
                  transition-all duration-200 flex items-center justify-center z-40"
      >
        <ArrowUp className="h-6 w-6" />
      </button>

      <ShareModal
        article={{
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
        }}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </article>
  )
}
