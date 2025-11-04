'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import type { ForceGraphMethods, NodeObject, LinkObject } from 'react-force-graph-2d'

// Dynamic import to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Ładowanie grafu...</div>
})

// Category colors matching screenshot
const CATEGORY_COLORS = {
  'Podstawy': '#3B82F6',      // Blue
  'Wdrożenie': '#8B5CF6',    // Purple
  'Prawo': '#EF4444',         // Red
  'Techniczne': '#06B6D4',   // Cyan
  'FAQ': '#EC4899',          // Pink
  'Aktualności': '#F97316',   // Orange
  'Koszty': '#10B981',       // Green
  'Studia': '#F59E0B'        // Amber
} as const

interface GraphNode extends NodeObject {
  id: number
  title: string
  slug: string
  category: keyof typeof CATEGORY_COLORS
  pageRank: number
  authorityScore: number
  hubScore: number
  community: number
  totalDegree: number
  betweenness: number
}

interface GraphLink extends LinkObject {
  id: number
  source: number | GraphNode
  target: number | GraphNode
  type: string
  weight: number
  label: string
}

interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
  stats: {
    totalNodes: number
    totalLinks: number
    communities: number
  }
}

interface KnowledgeMapVisualizationProps {
  data: GraphData
  onNodeClick?: (node: GraphNode) => void
  width?: number
  height?: number
}

export default function KnowledgeMapVisualization({
  data,
  onNodeClick,
  width = 800,
  height = 600
}: KnowledgeMapVisualizationProps) {
  const graphRef = useRef<ForceGraphMethods>()
  const [highlightNodes, setHighlightNodes] = useState(new Set())
  const [highlightLinks, setHighlightLinks] = useState(new Set())
  const [hoverNode, setHoverNode] = useState<GraphNode | null>(null)
  const [isLayoutSaved, setIsLayoutSaved] = useState(false)

  // LocalStorage key for saving node positions
  const LAYOUT_STORAGE_KEY = 'ksef-graph-layout-v1'

  // Load saved node positions from localStorage
  const loadSavedPositions = useCallback(() => {
    if (typeof window === 'undefined') return null

    try {
      const saved = localStorage.getItem(LAYOUT_STORAGE_KEY)
      if (saved) {
        const positions = JSON.parse(saved)
        setIsLayoutSaved(true)
        return positions
      }
    } catch (error) {
      console.error('Failed to load saved layout:', error)
    }
    return null
  }, [LAYOUT_STORAGE_KEY])

  // Save current node positions to localStorage
  const saveCurrentLayout = useCallback(() => {
    if (typeof window === 'undefined') return

    try {
      const positions: Record<number, { x: number; y: number }> = {}

      data.nodes.forEach(node => {
        if (node.x !== undefined && node.y !== undefined) {
          positions[node.id] = { x: node.x, y: node.y }
        }
      })

      localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(positions))
      setIsLayoutSaved(true)
      console.log('✅ Układ grafu zapisany!', Object.keys(positions).length, 'węzłów')
    } catch (error) {
      console.error('Failed to save layout:', error)
    }
  }, [data.nodes, LAYOUT_STORAGE_KEY])

  // Reset to default layout (clear localStorage)
  const resetLayout = useCallback(() => {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(LAYOUT_STORAGE_KEY)
      setIsLayoutSaved(false)

      // Remove fixed positions from all nodes
      data.nodes.forEach(node => {
        node.fx = undefined
        node.fy = undefined
      })

      // Restart simulation
      if (graphRef.current) {
        graphRef.current.d3ReheatSimulation()
      }

      console.log('🔄 Układ grafu zresetowany - graf odbuduje się od nowa')
    } catch (error) {
      console.error('Failed to reset layout:', error)
    }
  }, [data.nodes, LAYOUT_STORAGE_KEY])

  // Category filtering state - all categories enabled by default
  const [enabledCategories, setEnabledCategories] = useState<Set<string>>(
    new Set(Object.keys(CATEGORY_COLORS))
  )

  // Toggle category visibility
  const toggleCategory = (category: string) => {
    setEnabledCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(category)) {
        newSet.delete(category)
      } else {
        newSet.add(category)
      }
      return newSet
    })
  }

  // Filter graph data based on enabled categories
  const filteredData = {
    nodes: data.nodes.filter(node => enabledCategories.has(node.category)),
    links: data.links.filter(link => {
      const sourceNode = data.nodes.find(n => n.id === (typeof link.source === 'object' ? link.source.id : link.source))
      const targetNode = data.nodes.find(n => n.id === (typeof link.target === 'object' ? link.target.id : link.target))
      return sourceNode && targetNode && enabledCategories.has(sourceNode.category) && enabledCategories.has(targetNode.category)
    }),
    stats: {
      ...data.stats,
      totalNodes: data.nodes.filter(node => enabledCategories.has(node.category)).length,
      totalLinks: data.links.filter(link => {
        const sourceNode = data.nodes.find(n => n.id === (typeof link.source === 'object' ? link.source.id : link.source))
        const targetNode = data.nodes.find(n => n.id === (typeof link.target === 'object' ? link.target.id : link.target))
        return sourceNode && targetNode && enabledCategories.has(sourceNode.category) && enabledCategories.has(targetNode.category)
      }).length
    }
  }

  // Load saved positions on mount
  useEffect(() => {
    const savedPositions = loadSavedPositions()

    if (savedPositions) {
      console.log('📍 Ładowanie zapisanego układu grafu...')

      // Apply saved positions to ALL nodes (not just filtered)
      data.nodes.forEach(node => {
        const saved = savedPositions[node.id]
        if (saved) {
          // Set fixed position
          node.fx = saved.x
          node.fy = saved.y
          // Also set current position to avoid animation from (0,0)
          node.x = saved.x
          node.y = saved.y
        }
      })

      console.log('✅ Układ załadowany dla', Object.keys(savedPositions).length, 'węzłów')
    }
  }, [data.nodes, loadSavedPositions]) // Run when data changes

  // Navigation controls
  const handleZoomIn = () => {
    if (graphRef.current) {
      graphRef.current.zoom(1.5, 300)
    }
  }

  const handleZoomOut = () => {
    if (graphRef.current) {
      graphRef.current.zoom(0.5, 300)
    }
  }

  const handleResetView = () => {
    if (graphRef.current) {
      graphRef.current.zoomToFit(400)
    }
  }

  // Handle node hover
  const handleNodeHover = useCallback((node: GraphNode | null) => {
    const newHighlightNodes = new Set()
    const newHighlightLinks = new Set()

    if (node) {
      newHighlightNodes.add(node.id)

      // Highlight connected nodes and links
      filteredData.links.forEach(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source
        const targetId = typeof link.target === 'object' ? link.target.id : link.target

        if (sourceId === node.id || targetId === node.id) {
          newHighlightLinks.add(link.id)
          newHighlightNodes.add(sourceId)
          newHighlightNodes.add(targetId)
        }
      })
    }

    setHighlightNodes(newHighlightNodes)
    setHighlightLinks(newHighlightLinks)
    setHoverNode(node)
  }, [filteredData.links])

  // Handle node click
  const handleNodeClick = useCallback((node: GraphNode) => {
    if (onNodeClick) {
      onNodeClick(node)
    }

    // Center on clicked node
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 1000)
      graphRef.current.zoom(2, 500)
    }
  }, [onNodeClick])

  // Handle node drag end - make position PERMANENT (sticky nodes) + AUTO-SAVE
  const handleNodeDragEnd = useCallback((node: GraphNode) => {
    // Fix node position permanently - it won't move anymore
    node.fx = node.x
    node.fy = node.y

    // Auto-save layout after dragging (with small delay to batch multiple drags)
    setTimeout(() => {
      saveCurrentLayout()
    }, 500)
  }, [saveCurrentLayout])

  // Wrap text to multiple lines (max 3 lines)
  const wrapText = (text: string, maxWidth: number, ctx: CanvasRenderingContext2D): string[] => {
    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = ''

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const metrics = ctx.measureText(testLine)

      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }

    if (currentLine) {
      lines.push(currentLine)
    }

    return lines.slice(0, 3) // Max 3 lines
  }

  // Node canvas rendering - Obsidian-style
  const paintNode = useCallback((node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const isHighlighted = highlightNodes.has(node.id)
    const isHovered = hoverNode?.id === node.id
    const color = CATEGORY_COLORS[node.category] || '#6B7280'

    // Node size based on PageRank (Obsidian-like sizing)
    const baseSize = 4
    const size = baseSize + (node.pageRank * 8)

    // Draw outer glow for hovered/highlighted nodes
    if (isHovered || isHighlighted) {
      ctx.shadowColor = color
      ctx.shadowBlur = 15
      ctx.fillStyle = color + '40'
      ctx.beginPath()
      ctx.arc(node.x!, node.y!, size + 6, 0, 2 * Math.PI)
      ctx.fill()
      ctx.shadowBlur = 0
    }

    // Draw node circle
    ctx.fillStyle = isHovered ? color : isHighlighted ? color : color + 'DD'
    ctx.beginPath()
    ctx.arc(node.x!, node.y!, size, 0, 2 * Math.PI)
    ctx.fill()

    // Draw border
    if (isHovered || isHighlighted) {
      ctx.strokeStyle = '#FFFFFF'
      ctx.lineWidth = 2.5
      ctx.stroke()
    } else {
      ctx.strokeStyle = color + '60'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw label with Inter font - NO BOX
    const label = node.title
    const fontSize = Math.max(9, 11 / globalScale)
    const maxWidth = 140 / globalScale

    // Use Inter font (delikatny)
    ctx.font = `${fontSize}px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    // Wrap text to multiple lines
    const lines = wrapText(label, maxWidth, ctx)
    const lineHeight = fontSize * 1.4

    // Draw text with subtle shadow (NO background box)
    ctx.shadowColor = 'rgba(255, 255, 255, 0.9)'
    ctx.shadowBlur = 4
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    lines.forEach((line, i) => {
      const y = node.y! + size + 6 + (i * lineHeight)
      ctx.fillStyle = isHighlighted ? '#1F2937' : '#4B5563'
      ctx.fillText(line, node.x!, y)
    })

    // Reset shadow
    ctx.shadowBlur = 0
  }, [highlightNodes, hoverNode])

  // Link canvas rendering - Obsidian-style smooth links
  const paintLink = useCallback((link: GraphLink, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const isHighlighted = highlightLinks.has(link.id)

    // Obsidian-like link styling
    ctx.strokeStyle = isHighlighted ? '#8B5CF6' : '#E5E7EB'
    ctx.lineWidth = isHighlighted ? 2 / globalScale : 1 / globalScale
    ctx.globalAlpha = isHighlighted ? 0.8 : 0.4

    // Draw link
    const sourceNode = typeof link.source === 'object' ? link.source : null
    const targetNode = typeof link.target === 'object' ? link.target : null

    if (sourceNode && targetNode) {
      ctx.beginPath()
      ctx.moveTo(sourceNode.x!, sourceNode.y!)
      ctx.lineTo(targetNode.x!, targetNode.y!)
      ctx.stroke()
    }

    ctx.globalAlpha = 1
  }, [highlightLinks])

  return (
    <div className="relative w-full h-full bg-gray-50 rounded-lg border border-gray-200">
      <ForceGraph2D
        ref={graphRef}
        graphData={filteredData}
        width={width}
        height={height}
        nodeId="id"
        nodeLabel={(node: GraphNode) => `
          <div class="p-2 bg-white rounded shadow-lg">
            <div class="font-bold text-sm">${node.title}</div>
            <div class="text-xs text-gray-600 mt-1">
              <div>Kategoria: ${node.category}</div>
              <div>PageRank: ${node.pageRank.toFixed(3)}</div>
              <div>Połączenia: ${node.totalDegree}</div>
              <div>Społeczność: #${node.community}</div>
            </div>
          </div>
        `}
        nodeCanvasObject={paintNode}
        linkCanvasObject={paintLink}
        linkCurvature={0.15}
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        onNodeDragEnd={handleNodeDragEnd}
        cooldownTime={2500}
        d3AlphaDecay={0.0228}
        d3VelocityDecay={0.4}
        d3Force={{
          charge: { strength: -120, distanceMax: 300 },
          link: { distance: 80 }
        }}
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
      />

      {/* Hover info panel - COMPREHENSIVE NODE STATISTICS */}
      {hoverNode && (() => {
        // Calculate incoming and outgoing connections
        const outgoingLinks = filteredData.links.filter(link => {
          const sourceId = typeof link.source === 'object' ? link.source.id : link.source
          return sourceId === hoverNode.id
        })
        const incomingLinks = filteredData.links.filter(link => {
          const targetId = typeof link.target === 'object' ? link.target.id : link.target
          return targetId === hoverNode.id
        })

        return (
          <div className="absolute top-64 left-4 bg-white p-5 rounded-xl shadow-2xl border-2 border-blue-500 max-w-sm z-[100] backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.98)' }}>
            <h3 className="font-bold text-base mb-3 text-gray-900 border-b pb-2">{hoverNode.title}</h3>

            {/* Category badge */}
            <div className="mb-3">
              <span
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: CATEGORY_COLORS[hoverNode.category] }}
              >
                {hoverNode.category}
              </span>
            </div>

            {/* Graph Statistics */}
            <div className="space-y-2 text-xs">
              <div className="bg-blue-50 p-2 rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-blue-900">📊 PageRank Score</span>
                  <span className="font-bold text-blue-700">{hoverNode.pageRank.toFixed(4)}</span>
                </div>
                <div className="text-[10px] text-blue-600">Ważność węzła w grafie</div>
              </div>

              <div className="bg-purple-50 p-2 rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-purple-900">⭐ Authority Score</span>
                  <span className="font-bold text-purple-700">{hoverNode.authorityScore.toFixed(4)}</span>
                </div>
                <div className="text-[10px] text-purple-600">Autorytet (HITS algorithm)</div>
              </div>

              <div className="bg-green-50 p-2 rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-green-900">🔗 Hub Score</span>
                  <span className="font-bold text-green-700">{hoverNode.hubScore.toFixed(4)}</span>
                </div>
                <div className="text-[10px] text-green-600">Węzeł centralny (HITS algorithm)</div>
              </div>

              <div className="bg-orange-50 p-2 rounded">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-orange-900">🌉 Betweenness</span>
                  <span className="font-bold text-orange-700">{hoverNode.betweenness.toFixed(4)}</span>
                </div>
                <div className="text-[10px] text-orange-600">Most kluczowy w sieci</div>
              </div>

              <div className="bg-pink-50 p-2 rounded">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-pink-900">🔄 Połączenia</span>
                    <span className="font-bold text-pink-700">{hoverNode.totalDegree}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-pink-600">
                    <span>↗ Wychodzące: {outgoingLinks.length}</span>
                    <span>↘ Przychodzące: {incomingLinks.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 p-2 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-indigo-900">👥 Społeczność</span>
                  <span className="font-bold text-indigo-700">#{hoverNode.community}</span>
                </div>
                <div className="text-[10px] text-indigo-600">Klaster tematyczny (Louvain)</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200 text-[10px] text-gray-500">
              💡 Kliknij węzeł aby przejść do artykułu
            </div>
          </div>
        )
      })()}

      {/* Legend - moved to left side with toggle functionality */}
      <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-[220px]">
        <h4 className="font-bold text-sm mb-2 text-gray-800">Kategorie</h4>
        <p className="text-xs text-gray-500 mb-3">Kliknij aby ukryć/pokazać</p>
        <div className="space-y-2">
          {Object.entries(CATEGORY_COLORS).map(([category, color]) => {
            const isEnabled = enabledCategories.has(category)
            const categoryNodeCount = data.nodes.filter(n => n.category === category).length

            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`flex items-center gap-2 text-xs w-full p-2 rounded hover:bg-gray-50 transition-all ${
                  !isEnabled ? 'opacity-40' : 'opacity-100'
                }`}
                title={isEnabled ? `Kliknij aby ukryć ${category}` : `Kliknij aby pokazać ${category}`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all ${!isEnabled ? 'opacity-30' : ''}`}
                  style={{ backgroundColor: color }}
                />
                <span className={`flex-1 text-left ${!isEnabled ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {category}
                </span>
                <span className={`text-xs font-mono ${!isEnabled ? 'text-gray-400' : 'text-gray-500'}`}>
                  {categoryNodeCount}
                </span>
              </button>
            )
          })}
        </div>

        {/* Toggle all button */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <button
            onClick={() => {
              if (enabledCategories.size === Object.keys(CATEGORY_COLORS).length) {
                // Disable all
                setEnabledCategories(new Set())
              } else {
                // Enable all
                setEnabledCategories(new Set(Object.keys(CATEGORY_COLORS)))
              }
            }}
            className="w-full text-xs text-blue-600 hover:text-blue-800 font-medium py-1 hover:bg-blue-50 rounded transition-colors"
          >
            {enabledCategories.size === Object.keys(CATEGORY_COLORS).length ? 'Ukryj wszystkie' : 'Pokaż wszystkie'}
          </button>
        </div>
      </div>

      {/* Navigation Controls - BIGGER & MORE VISIBLE */}
      <div className="absolute bottom-24 right-6 flex flex-col gap-3 z-50">
        <button
          onClick={handleZoomIn}
          className="bg-white hover:bg-blue-600 p-4 rounded-xl shadow-2xl border-2 border-gray-300 hover:border-blue-600 transition-all group"
          title="Powiększ (Zoom In)"
          aria-label="Powiększ"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 group-hover:text-white">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
            <line x1="11" x2="11" y1="8" y2="14"></line>
            <line x1="8" x2="14" y1="11" y2="11"></line>
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white hover:bg-blue-600 p-4 rounded-xl shadow-2xl border-2 border-gray-300 hover:border-blue-600 transition-all group"
          title="Pomniejsz (Zoom Out)"
          aria-label="Pomniejsz"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 group-hover:text-white">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
            <line x1="8" x2="14" y1="11" y2="11"></line>
          </svg>
        </button>
        <button
          onClick={handleResetView}
          className="bg-white hover:bg-green-600 p-4 rounded-xl shadow-2xl border-2 border-gray-300 hover:border-green-600 transition-all group"
          title="Resetuj widok (Home)"
          aria-label="Resetuj widok"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 group-hover:text-white">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
            <path d="M21 3v5h-5"></path>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
            <path d="M3 21v-5h5"></path>
          </svg>
        </button>

        {/* SEPARATOR */}
        <div className="h-px bg-gray-300 my-2"></div>

        {/* SAVE LAYOUT - Manual save button */}
        <button
          onClick={saveCurrentLayout}
          className={`bg-white hover:bg-amber-600 p-4 rounded-xl shadow-2xl border-2 transition-all group ${
            isLayoutSaved ? 'border-amber-500' : 'border-gray-300 hover:border-amber-600'
          }`}
          title="Zapisz układ na stałe (Auto-save włączony)"
          aria-label="Zapisz układ"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${isLayoutSaved ? 'text-amber-600' : 'text-gray-700'} group-hover:text-white`}>
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
        </button>

        {/* RESET LAYOUT */}
        <button
          onClick={resetLayout}
          className="bg-white hover:bg-red-600 p-4 rounded-xl shadow-2xl border-2 border-gray-300 hover:border-red-600 transition-all group"
          title="Resetuj układ grafu (usuń zapisane pozycje)"
          aria-label="Resetuj układ"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 group-hover:text-white">
            <polyline points="1 4 1 10 7 10"></polyline>
            <polyline points="23 20 23 14 17 14"></polyline>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
          </svg>
        </button>
      </div>

      {/* Stats */}
      <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow text-xs">
        <div className="flex items-center gap-3">
          <span className="text-gray-600">
            {filteredData.stats.totalNodes} / {data.stats.totalNodes} węzłów • {filteredData.stats.totalLinks} / {data.stats.totalLinks} połączeń • {data.stats.communities} społeczności
          </span>
          {isLayoutSaved && (
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Układ zapisany
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
