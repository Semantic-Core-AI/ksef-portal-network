"use client"

import Link from "next/link"
import { ArrowRight, Clock, Eye, Star } from "lucide-react"
import { formatNumber, getCategoryColor } from "@/lib/helpers"
import type { Article } from "@/lib/types"

interface RelatedArticlesProps {
  articles: Article[]
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null

  return (
    <section className="bg-white rounded-2xl p-8 md:p-12 border border-[#E5E7EB]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-[#1E2A5E]">Powiązane artykuły</h2>
        <p className="text-sm text-[#6B7280]">Wybrane automatycznie na podstawie tematyki</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="group block bg-[#FAFAFA] rounded-xl overflow-hidden border border-[#E5E7EB] 
                     hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#1E2A5E] to-[#2C6AA8]">
              <img
                src={article.thumbnail || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Category Badge */}
              <span
                className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(article.category)}`}
              >
                {article.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-[#1E2A5E] mb-2 line-clamp-2 group-hover:text-[#2C6AA8] transition-colors">
                {article.title}
              </h3>

              <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{article.excerpt}</p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-[#6B7280]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readingTime} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {formatNumber(article.views)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {article.rating.average}
                  </span>
                </div>
              </div>

              {/* Read More Link */}
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#2C6AA8] group-hover:gap-3 transition-all">
                Czytaj więcej
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Internal Linking Info */}
      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-[#2C6AA8] rounded-r-lg">
        <p className="text-sm text-[#374151]">
          <strong>Inteligentne linkowanie:</strong> Te artykuły zostały automatycznie dobrane na podstawie kategorii,
          tagów i poziomu trudności, aby zapewnić Ci najbardziej wartościowe treści powiązane tematycznie.
        </p>
      </div>
    </section>
  )
}
