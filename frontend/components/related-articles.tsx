/**
 * RelatedArticles Component
 *
 * Displays Knowledge Graph-based article recommendations
 * using PageRank and relationship metadata
 */

import Link from "next/link"
import { Clock, TrendingUp, Link2, ArrowRight } from "lucide-react"
import type { ArticleRecommendation } from "@/lib/strapi"

interface RelatedArticlesProps {
  recommendations: ArticleRecommendation[]
}

const relationshipTypeLabels: Record<string, string> = {
  RELATED_TO: "Powiązany temat",
  PREREQUISITE: "Wymagana wiedza",
  BUILDS_ON: "Rozszerza",
  SIMILAR_TO: "Podobny artykuł",
  CONTRASTS: "Porównanie",
  NEXT_IN_SEQUENCE: "Następny krok",
  PARENT_CHILD: "Powiązany hierarchicznie",
  EXEMPLIFIES: "Przykład",
  SUMMARIZES: "Podsumowanie",
}

const relationshipTypeColors: Record<string, string> = {
  RELATED_TO: "bg-blue-100 text-blue-700",
  PREREQUISITE: "bg-purple-100 text-purple-700",
  BUILDS_ON: "bg-green-100 text-green-700",
  SIMILAR_TO: "bg-cyan-100 text-cyan-700",
  CONTRASTS: "bg-orange-100 text-orange-700",
  NEXT_IN_SEQUENCE: "bg-indigo-100 text-indigo-700",
  PARENT_CHILD: "bg-pink-100 text-pink-700",
  EXEMPLIFIES: "bg-yellow-100 text-yellow-700",
  SUMMARIZES: "bg-gray-100 text-gray-700",
}

export default function RelatedArticles({ recommendations }: RelatedArticlesProps) {
  if (!recommendations || recommendations.length === 0) {
    return null
  }

  // Deduplicate by article ID (in case same article appears multiple times)
  const uniqueRecommendations = recommendations.reduce((acc, current) => {
    const exists = acc.find(item => item.id === current.id)
    if (!exists) {
      acc.push(current)
    }
    return acc
  }, [] as ArticleRecommendation[])

  // Limit to top 3
  const top3Recommendations = uniqueRecommendations.slice(0, 3)

  return (
    <div className="bg-gradient-to-br from-white to-[#F9FAFB] rounded-2xl border-2 border-[#2C6AA8]/20 p-8 shadow-strong">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-gradient-to-br from-[#2C6AA8] to-[#1E5A8E] rounded-lg">
          <Link2 className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#111827]">
          📚 TOP 3 Rekomendowane Artykuły
        </h2>
      </div>

      <p className="text-[#6B7280] mb-6 text-sm">
        {top3Recommendations[0]?.relationshipType ? (
          <>⚡ Inteligentnie dobrane na podstawie analizy <span className="font-semibold text-[#2C6AA8]">Knowledge Graph</span> (PageRank, HITS, relacje semantyczne)</>
        ) : (
          <>📖 Inne artykuły z bazy wiedzy</>
        )}
      </p>

      <div className="space-y-4">
        {top3Recommendations.map((article, index) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="block group"
          >
            <div className={`p-6 rounded-xl border-2 hover:shadow-strong transition-all duration-300 ${
              index === 0
                ? 'border-[#C7A83B] bg-gradient-to-r from-[#C7A83B]/5 to-white hover:from-[#C7A83B]/10'
                : index === 1
                ? 'border-[#94A3B8] bg-gradient-to-r from-[#94A3B8]/5 to-white hover:from-[#94A3B8]/10'
                : 'border-[#CD7F32] bg-gradient-to-r from-[#CD7F32]/5 to-white hover:from-[#CD7F32]/10'
            }`}>
              <div className="flex items-start gap-4">
                {/* Rank Badge with medals */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md ${
                  index === 0
                    ? 'bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-white'
                    : index === 1
                    ? 'bg-gradient-to-br from-[#C0C0C0] to-[#808080] text-white'
                    : 'bg-gradient-to-br from-[#CD7F32] to-[#8B4513] text-white'
                }`}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Relationship Type & PageRank */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {article.relationshipType && (
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          relationshipTypeColors[article.relationshipType] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {relationshipTypeLabels[article.relationshipType] ||
                          article.relationshipType}
                      </span>
                    )}

                    {article.pageRank !== undefined && article.pageRank > 0.5 && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-[#C7A83B]/10 text-[#C7A83B] text-xs font-semibold rounded">
                        <TrendingUp className="h-3 w-3" />
                        PageRank: {article.pageRank.toFixed(2)}
                      </span>
                    )}

                    {article.weight !== undefined && article.weight > 0.8 && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                        Silne powiązanie: {(article.weight * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>

                  {/* Anchor Text (if available) */}
                  {article.anchorText && (
                    <div className="text-xs text-[#6B7280] italic mb-2">
                      "{article.anchorText}"
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#2C6AA8] transition-colors mb-2 line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-[#6B7280] line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#9CA3AF]">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readingTime || 5} min</span>
                    </div>

                    {article.category && (
                      <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] rounded">
                        {article.category}
                      </span>
                    )}

                    {article.difficulty && (
                      <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] rounded">
                        {article.difficulty}
                      </span>
                    )}

                    {article.authorityScore !== undefined && article.authorityScore > 0.3 && (
                      <span className="text-purple-600 font-medium">
                        Authority: {article.authorityScore.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0 text-[#9CA3AF] group-hover:text-[#2C6AA8] transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Knowledge Graph Footer */}
      <div className="mt-6 pt-6 border-t-2 border-[#2C6AA8]/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {top3Recommendations[0]?.relationshipType ? (
            <div className="text-sm">
              <div className="text-[#6B7280] mb-1">
                🧠 <span className="font-semibold text-[#111827]">Inteligentna selekcja</span> oparta na:
              </div>
              <div className="text-xs text-[#9CA3AF] pl-5">
                PageRank • HITS Algorithm • Graph Centrality • Semantic Relations
              </div>
            </div>
          ) : (
            <div className="text-sm">
              <div className="text-[#6B7280]">
                📚 <span className="font-semibold text-[#111827]">Polecane artykuły</span> z bazy wiedzy
              </div>
            </div>
          )}
          <Link
            href="/baza-wiedzy"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2C6AA8] hover:bg-[#235587] text-white font-medium rounded-lg transition-all shadow-soft"
          >
            Przeglądaj wszystkie artykuły
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
