'use client'

import { useState, useMemo } from 'react'
import { Search, Bookmark, FileText, Network, ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import KnowledgeMapVisualization from '@/components/knowledge-map-visualization'
import type { FullGraphData } from '@/lib/strapi'

type Tab = 'search' | 'annotations' | 'citations' | 'map'

interface KnowledgeMapPageProps {
  graphData: FullGraphData
}

export default function KnowledgeMapPage({ graphData }: KnowledgeMapPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('map')
  const [searchQuery, setSearchQuery] = useState('')

  // Search filtering with useMemo for performance
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return []
    }

    const query = searchQuery.toLowerCase().trim()

    return graphData.nodes
      .filter(node => {
        // Search in title
        const titleMatch = node.title.toLowerCase().includes(query)

        // Search in category
        const categoryMatch = node.category?.toLowerCase().includes(query)

        // Search in slug
        const slugMatch = node.slug.toLowerCase().includes(query)

        return titleMatch || categoryMatch || slugMatch
      })
      .sort((a, b) => {
        // Sort by PageRank (most important first)
        return (b.pageRank || 0) - (a.pageRank || 0)
      })
      .slice(0, 50) // Limit to top 50 results
  }, [searchQuery, graphData.nodes])

  const tabs = [
    {
      id: 'search' as Tab,
      label: 'Wyszukiwanie',
      icon: Search,
      description: 'Szukaj artykułów w grafie wiedzy'
    },
    {
      id: 'annotations' as Tab,
      label: 'Zaznaczenia',
      icon: Bookmark,
      description: 'Highlights & Annotations (Harvard)'
    },
    {
      id: 'citations' as Tab,
      label: 'Cytowania',
      icon: FileText,
      description: 'Zobacz cytowania i odniesienia'
    },
    {
      id: 'map' as Tab,
      label: 'Mapa Wiedzy',
      icon: Network,
      description: 'Interaktywna wizualizacja grafu'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Navy with Texture like Hero */}
      <div className="relative bg-gradient-to-br from-[#0A1628] via-[#0F1B3A] to-[#1E2A5E] overflow-hidden">
        {/* Background Pattern - Diagonal Stripes */}
        <div className="absolute inset-0 opacity-[0.15]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 15px,
                rgba(255,255,255,0.08) 15px,
                rgba(255,255,255,0.08) 30px
              )`,
            }}
          />
        </div>

        {/* Gradient Overlay (top fade) */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold text-white mb-3">
            <span className="text-[#C7A83B]">Graf Wiedzy</span> KSeF
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Odkryj powiązania między artykułami i społeczności tematyczne
          </p>
        </div>

        {/* Bottom Fade */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-4 border-b-2 transition-colors
                    ${isActive
                      ? 'border-blue-600 text-blue-600 font-medium'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }
                  `}
                  title={tab.description}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-6">
        {/* Search Tab */}
        {activeTab === 'search' && (
          <div className="bg-white rounded-lg p-8">
            <div className="max-w-4xl mx-auto">
              {/* Search Header */}
              <div className="text-center mb-8">
                <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold text-gray-900 mb-3">
                  Wyszukiwanie w <span className="text-[#C7A83B]">Grafie Wiedzy</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Przeszukaj {graphData.stats.totalNodes} artykułów po tytule, kategorii lub słowach kluczowych
                </p>
              </div>

              {/* Search Input */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Szukaj artykułów..."
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    autoFocus
                  />
                </div>
                {searchQuery && (
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Znaleziono: <strong className="text-gray-900">{searchResults.length}</strong> artykułów
                    </span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Wyczyść
                    </button>
                  </div>
                )}
              </div>

              {/* Search Results */}
              <div>
                {!searchQuery && (
                  <div className="text-center py-12">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-2xl mx-auto">
                      <h3 className="font-medium text-gray-900 mb-3">Jak wyszukiwać:</h3>
                      <ul className="space-y-2 text-left text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          Wpisz tytuł lub fragment tytułu artykułu
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          Szukaj po kategorii (np. "Podstawy", "Wdrożenie", "Techniczne")
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          Wyniki sortowane według ważności (PageRank)
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          Kliknij artykuł aby przejść do pełnej treści
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {searchQuery && searchResults.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
                      <p className="text-yellow-800 font-medium mb-2">
                        Nie znaleziono artykułów dla zapytania: <em className="font-bold">{searchQuery}</em>
                      </p>
                      <p className="text-sm text-yellow-700">
                        Spróbuj użyć innych słów kluczowych lub sprawdź pisownię
                      </p>
                    </div>
                  </div>
                )}

                {searchQuery && searchResults.length > 0 && (
                  <div className="space-y-3">
                    {searchResults.map((node) => {
                      // Calculate connection count
                      const connections = graphData.links.filter(
                        link => link.source === node.id || link.target === node.id
                      ).length

                      return (
                        <Link
                          key={node.id}
                          href={`/article/${node.slug}`}
                          className="block bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-500 hover:shadow-lg transition-all group"
                        >
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <FileText className="w-6 h-6 text-blue-600 group-hover:text-white" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {node.title}
                              </h3>

                              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                {/* Category */}
                                {node.category && (
                                  <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    {node.category}
                                  </span>
                                )}

                                {/* PageRank Score */}
                                <span className="inline-flex items-center gap-1">
                                  <TrendingUp className="w-4 h-4 text-green-600" />
                                  <span className="font-medium text-green-700">
                                    PageRank: {(node.pageRank || 0).toFixed(3)}
                                  </span>
                                </span>

                                {/* Connections */}
                                <span className="inline-flex items-center gap-1">
                                  <Network className="w-4 h-4 text-purple-600" />
                                  <span className="font-medium text-purple-700">
                                    {connections} połączeń
                                  </span>
                                </span>
                              </div>
                            </div>

                            {/* Arrow */}
                            <div className="flex-shrink-0">
                              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Annotations Tab */}
        {activeTab === 'annotations' && (
          <div className="bg-white rounded-lg p-8 text-center">
            <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold text-gray-900 mb-3">
              Highlights & <span className="text-[#C7A83B]">Annotations</span>
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              System zaznaczania i adnotacji w stylu Harvard
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-sm text-gray-700 text-left">
                Ta funkcja pozwoli Ci:
              </p>
              <ul className="mt-4 space-y-2 text-left text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  Zaznaczać ważne fragmenty artykułów
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  Dodawać własne notatki i komentarze
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  Organizować wiedzę w sposób akademicki
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  Eksportować zaznaczenia do cytowań
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Citations Tab */}
        {activeTab === 'citations' && (
          <div className="bg-white rounded-lg p-8 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold text-gray-900 mb-3">
              <span className="text-[#C7A83B]">Cytowania</span> i Przypisy
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Generuj cytowania w różnych formatach akademickich
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="text-left">
                  <h3 className="font-medium text-gray-900 mb-2">Dostępne formaty:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="w-20 font-mono text-xs bg-white px-2 py-1 rounded border">APA</span>
                      <span>American Psychological Association</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-20 font-mono text-xs bg-white px-2 py-1 rounded border">MLA</span>
                      <span>Modern Language Association</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-20 font-mono text-xs bg-white px-2 py-1 rounded border">Chicago</span>
                      <span>Chicago Manual of Style</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-20 font-mono text-xs bg-white px-2 py-1 rounded border">Harvard</span>
                      <span>Harvard Referencing System</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Map Tab */}
        {activeTab === 'map' && (
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold text-gray-900 mb-3">
                  Interaktywna <span className="text-[#C7A83B]">Mapa Wiedzy</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Wizualizacja {graphData.stats.totalNodes} artykułów połączonych {graphData.stats.totalLinks} relacjami
                  w {graphData.stats.communities} społecznościach tematycznych
                </p>
              </div>

              {/* Graph Visualization */}
              <div className="relative" style={{ height: '800px' }}>
                <KnowledgeMapVisualization
                  data={graphData}
                  width={1200}
                  height={800}
                  onNodeClick={(node) => {
                    // Navigate to article
                    if (typeof window !== 'undefined') {
                      window.location.href = `/article/${node.slug}`
                    }
                  }}
                />
              </div>

              {/* Instructions */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Jak korzystać z mapy:</h3>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• <strong>Kliknij węzeł</strong> aby zobaczyć szczegóły artykułu</li>
                  <li>• <strong>Przeciągnij</strong> aby zmienić pozycję węzła</li>
                  <li>• <strong>Scrolluj</strong> aby powiększyć/pomniejszyć</li>
                  <li>• <strong>Najedź myszką</strong> aby podświetlić powiązania</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
