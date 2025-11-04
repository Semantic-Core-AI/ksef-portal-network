/**
 * Knowledge Graph Statistics Component
 * Displays live stats from the KSeF Knowledge Graph as trust indicators
 */

import { Network, GitBranch, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { getFullGraph } from "@/lib/strapi"

export async function KnowledgeGraphStats() {
  const graphData = await getFullGraph()

  if (!graphData) {
    return null
  }

  const stats = [
    {
      icon: Network,
      value: graphData.stats.totalNodes,
      label: "Artykułów w grafie wiedzy",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-600"
    },
    {
      icon: GitBranch,
      value: graphData.stats.totalLinks,
      label: "Połączeń semantycznych",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-600"
    },
    {
      icon: Users,
      value: graphData.stats.communities,
      label: "Społeczności tematyczne",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      iconColor: "text-green-600"
    },
    {
      icon: TrendingUp,
      value: "AI-driven",
      label: "Rekomendacje oparte na ML",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-600"
    }
  ]

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-16 px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Network className="w-4 h-4" />
            <span>Knowledge Graph Technology</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Graf Wiedzy KSeF w liczbach
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Zaawansowana technologia Knowledge Graph z algorytmami PageRank, HITS i Community Detection
            zapewnia najlepsze rekomendacje treści
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="relative group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
              >
                {/* Icon */}
                <div className={`${stat.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                </div>

                {/* Value */}
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/mapa-wiedzy"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            <Network className="w-6 h-6" />
            <span>Odkryj Interaktywną Mapę Wiedzy</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Wizualizacja powiązań między artykułami • Algorytmy machine learning • Rekomendacje AI
          </p>
        </div>

        {/* Technical Details */}
        <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-400">PageRank Algorithm</h3>
              <p className="text-sm text-gray-300">
                Algorytm Google PageRank identyfikuje najważniejsze artykuły w grafie na podstawie
                struktury połączeń i wagowanych relacji.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 text-purple-400">HITS (Authority & Hub)</h3>
              <p className="text-sm text-gray-300">
                Hyperlink-Induced Topic Search wykrywa artykuły-autorytety (najlepsze źródła wiedzy)
                oraz huby (najlepsze punkty wyjścia).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 text-green-400">Community Detection</h3>
              <p className="text-sm text-gray-300">
                Algorytm Louvain grupuje artykuły w {graphData.stats.communities} społeczności tematyczne,
                odkrywając naturalne klastry tematów.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
