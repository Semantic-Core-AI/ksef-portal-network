"use client"

import type { StrapiArticle } from "@/lib/strapi"
import { BookOpen, Star, Eye, MessageCircle, ArrowRight, Flame } from "lucide-react"
import { formatNumber } from "@/lib/blog-helpers"
import Link from "next/link"

interface FeaturedContentProps {
  articles: StrapiArticle[]
}

export function FeaturedContent({ articles }: FeaturedContentProps) {
  const featured = articles.filter((a) => a.isFeatured).slice(0, 4)
  const [main, ...secondary] = featured

  if (!main || featured.length === 0) return null

  return (
    <div className="container max-w-[1280px] mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Featured Article */}
        <Link href={`/article/${main.slug}`} className="lg:col-span-2 group cursor-pointer">
          <div
            className="relative overflow-hidden rounded-2xl bg-white border border-[#E5E7EB] 
                        shadow-medium hover:shadow-strong
                        hover:-translate-y-2 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-[21/9] overflow-hidden">
              <img
                src={
                  main.gridImage?.url
                    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${main.gridImage.url}`
                    : main.featuredImage?.url
                    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${main.featuredImage.url}`
                    : "/placeholder.svg"
                }
                alt={main.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-[#DC2626] text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-medium">
                  <Flame className="h-3 w-3" /> FEATURED
                </span>
                {main.isUpdated && (
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-[#111827] text-xs font-medium rounded-full shadow-soft">
                    📅 Zaktualizowano
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {main.category && (
                <span
                  className="inline-block px-3 py-1 bg-[#2C6AA8]/10 text-[#2C6AA8]
                              text-xs font-semibold rounded-full mb-4"
                >
                  {main.category}
                </span>
              )}

              <h2
                className="text-3xl font-serif font-bold text-[#111827] mb-3 leading-tight
                           group-hover:text-[#2C6AA8] transition-colors"
              >
                {main.title}
              </h2>

              <p className="text-[#6B7280] text-lg mb-6 line-clamp-2 leading-relaxed">{main.excerpt}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B7280]">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" /> {main.readingTime || 5} min czytania
                </span>
                {main.ratingAverage && main.ratingAverage > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-[#C7A83B] text-[#C7A83B]" /> {main.ratingAverage}/5
                    {main.ratingCount && main.ratingCount > 0 && ` (${main.ratingCount})`}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" /> {formatNumber(main.viewCount || 0)} wyświetleń
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" /> {main.commentsCount || 0} komentarzy
                </span>
              </div>

              <button
                className="mt-6 inline-flex items-center gap-2 text-[#2C6AA8] 
                              font-semibold group/btn hover:text-[#235587]"
              >
                Czytaj więcej
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </Link>

        {/* Secondary Featured Articles */}
        {secondary.map((article) => (
          <Link key={article.id} href={`/article/${article.slug}`} className="group cursor-pointer">
            <div
              className="relative overflow-hidden rounded-xl bg-white border border-[#E5E7EB]
                          shadow-soft hover:shadow-medium
                          hover:-translate-y-1 transition-all duration-300 h-full"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={
                    article.gridImage?.url
                      ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${article.gridImage.url}`
                      : article.featuredImage?.url
                      ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${article.featuredImage.url}`
                      : "/placeholder.svg"
                  }
                  alt={article.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                {article.category && (
                  <span
                    className="inline-block px-2 py-1 bg-[#F5F5F5] text-[#374151]
                                text-xs font-medium rounded mb-3"
                  >
                    {article.category}
                  </span>
                )}
                <h3
                  className="text-xl font-serif font-bold text-[#111827] mb-2 line-clamp-2 leading-tight
                             group-hover:text-[#2C6AA8] transition-colors"
                >
                  {article.title}
                </h3>
                <p className="text-[#6B7280] text-sm mb-4 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                  <span>📖 {article.readingTime || 5} min</span>
                  {article.ratingAverage && article.ratingAverage > 0 && (
                    <span>⭐ {article.ratingAverage}/5</span>
                  )}
                  <span>👁️ {formatNumber(article.viewCount || 0)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
