"use client"

import type React from "react"

import type { Article, CardVariant } from "@/lib/types"
import { Calendar, Clock, Star, Eye, MessageCircle, Bookmark, TrendingUp, RefreshCw, CheckCircle2 } from "lucide-react"
import { getCategoryColor, formatRelativeDate, formatNumber } from "@/lib/helpers"
import { isArticleRead, isArticleBookmarked, toggleBookmark } from "@/lib/user-storage"
import Link from "next/link"
import { useState, useEffect } from "react"

interface ArticleCardProps {
  article: Article
  variant: CardVariant
  listView?: boolean
}

export function ArticleCard({ article, variant, listView = false }: ArticleCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isRead, setIsRead] = useState(false)

  useEffect(() => {
    setIsBookmarked(isArticleBookmarked(article.slug))
    setIsRead(isArticleRead(article.slug))
  }, [article.slug])

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newState = toggleBookmark(article.slug)
    setIsBookmarked(newState)
  }

  return (
    <article className={`group cursor-pointer ${listView ? "w-full" : ""}`}>
      <Link href={`/article/${article.slug}`}>
        <div
          className={`bg-white rounded-2xl border border-[#E5E7EB] 
                       overflow-hidden shadow-soft hover:shadow-strong
                       hover:-translate-y-2 transition-all duration-300
                       ${listView ? "flex flex-row" : "flex flex-col h-full"}
                       ${isRead ? "opacity-75" : ""}`}
        >
          {/* Thumbnail Image */}
          <div className={`relative overflow-hidden bg-[#F5F5F5] ${listView ? "w-64 flex-shrink-0" : "aspect-[4/3]"}`}>
            <img
              src={article.thumbnail || "/placeholder.svg"}
              alt={article.title}
              loading="lazy"
              className="object-cover w-full h-full group-hover:scale-105 
                        transition-transform duration-500"
            />

            {/* Badges Overlay */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full 
                               ${getCategoryColor(article.category)}`}
              >
                {article.category}
              </span>

              {article.isTrending && (
                <span
                  className="px-2 py-1 bg-[#DC2626] text-white text-xs 
                                font-bold rounded-full flex items-center gap-1 w-fit shadow-medium"
                >
                  <TrendingUp className="h-3 w-3" /> Trending
                </span>
              )}

              {article.isUpdated && (
                <span
                  className="px-2 py-1 bg-[#16A34A] text-white text-xs 
                                font-medium rounded-full flex items-center gap-1 w-fit shadow-medium"
                >
                  <RefreshCw className="h-3 w-3" /> Zaktualizowane
                </span>
              )}

              {isRead && (
                <span
                  className="px-2 py-1 bg-[#2C6AA8] text-white text-xs 
                                font-medium rounded-full flex items-center gap-1 w-fit shadow-medium"
                >
                  <CheckCircle2 className="h-3 w-3" /> Przeczytane
                </span>
              )}
            </div>

            {/* Bookmark Icon */}
            <button
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm 
                        rounded-full hover:bg-white hover:scale-110 transition-all shadow-soft"
              onClick={handleToggleBookmark}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-[#1E2A5E] text-[#1E2A5E]" : "text-[#6B7280]"}`} />
            </button>
          </div>

          {/* Card Content */}
          <div className="p-6 flex flex-col flex-1">
            {/* Meta Info Row */}
            <div className="flex items-center gap-3 text-xs text-[#6B7280] mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatRelativeDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readingTime} min
              </span>
            </div>

            {/* Title - Now uses Playfair Display via h3 tag */}
            <h3
              className={`font-serif font-bold text-[#111827] mb-3 
                           group-hover:text-[#2C6AA8] transition-colors
                           ${listView ? "text-xl line-clamp-2" : "text-lg line-clamp-2"}`}
            >
              {article.title}
            </h3>

            {/* Excerpt */}
            {!listView && (
              <p className="text-sm text-[#6B7280] mb-4 flex-1 leading-relaxed line-clamp-3">{article.excerpt}</p>
            )}

            {/* Author + Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-[#F5F5F5] mt-auto">
              {/* Author */}
              <div className="flex items-center gap-2">
                <img
                  src={article.author.avatar || "/placeholder.svg"}
                  alt={article.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="text-xs">
                  <p className="font-medium text-[#111827]">{article.author.name}</p>
                  <p className="text-[#6B7280]">{article.author.role}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                {article.rating && (
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-[#C7A83B] text-[#C7A83B]" />
                    {article.rating.average}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {formatNumber(article.views)}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {article.commentsCount}
                </span>
              </div>
            </div>

            {/* CTAs */}
            {variant !== "short" && article.hasCTA && (
              <div className="flex gap-2 mt-4">
                <button
                  className="flex-1 px-4 py-2 bg-[#1E2A5E] text-white 
                                  text-sm font-semibold rounded-lg 
                                  hover:bg-[#151f45] transition-all duration-200
                                  shadow-soft hover:shadow-medium"
                >
                  {article.ctaText}
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
