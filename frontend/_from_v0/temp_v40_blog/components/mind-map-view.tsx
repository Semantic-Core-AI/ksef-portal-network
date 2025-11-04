"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ZoomIn, ZoomOut, Home, Search, BarChart3, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getRelatedArticles } from "@/lib/helpers"

const CATEGORY_COLORS = {
  Podstawy: "#2563EB",
  Wdrożenie: "#7C3AED",
  Koszty: "#F59E0B",
  Prawo: "#1E3A8A",
  Techniczne: "#0891B2",
  FAQ: "#059669",
  Studia: "#9333EA",
  Aktualności: "#EA580C",
}

interface Node {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  label: string
  category: string
  color: string
  article: any
  connections: string[]
  connectionStrength: Map<string, number>
  fixed: boolean
  fx?: number
  fy?: number
  opacity: number // For entry animation
}

interface MindMapViewProps {
  articles: any[]
}

export function MindMapView({ articles }: MindMapViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()
  const nodesRef = useRef<Node[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [secondSelectedNode, setSecondSelectedNode] = useState<string | null>(null) // For path finding
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("") // Search functionality
  const [hiddenCategories, setHiddenCategories] = useState<Set<string>>(new Set()) // Category filtering
  const [showStats, setShowStats] = useState(true) // Statistics panel toggle
  const animationRef = useRef<number>()
  const animationProgress = useRef(0) // For entry animation

  const calculateConnectionStrength = useCallback((article1: any, article2: any): number => {
    let strength = 0
    if (article1.category === article2.category) strength += 3
    const sharedTags = article1.tags.filter((tag: string) => article2.tags.includes(tag))
    strength += sharedTags.length * 2
    if (article1.difficulty === article2.difficulty) strength += 1
    return strength
  }, [])

  useEffect(() => {
    console.log("[v0] MindMapView mounted, articles count:", articles.length)
    const canvas = canvasRef.current
    if (!canvas) {
      console.log("[v0] Canvas ref is null!")
      return
    }

    console.log("[v0] Canvas dimensions:", canvas.width, "x", canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    const initialNodes: Node[] = articles.map((article, index) => {
      const angle = (index / articles.length) * Math.PI * 2
      const radius = 400 + Math.random() * 300

      const nodeRadius = 20 + Math.random() * 15

      const connections = getRelatedArticles(article, articles, 3).map((a) => a.id)
      const connectionStrength = new Map<string, number>()

      connections.forEach((connId) => {
        const connArticle = articles.find((a) => a.id === connId)
        if (connArticle) {
          connectionStrength.set(connId, calculateConnectionStrength(article, connArticle))
        }
      })

      return {
        id: article.id,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        radius: nodeRadius,
        label: article.title,
        category: article.category,
        color: CATEGORY_COLORS[article.category as keyof typeof CATEGORY_COLORS] || "#2563EB",
        article: article,
        connections,
        connectionStrength,
        fixed: false,
        opacity: 0, // Start invisible for animation
      }
    })

    nodesRef.current = initialNodes
    console.log("[v0] Initialized nodes:", initialNodes.length)
  }, [articles, calculateConnectionStrength])

  useEffect(() => {
    const animateEntry = () => {
      animationProgress.current += 0.02
      if (animationProgress.current < 1) {
        nodesRef.current.forEach((node) => {
          node.opacity = Math.min(1, animationProgress.current)
        })
        requestAnimationFrame(animateEntry)
      } else {
        nodesRef.current.forEach((node) => {
          node.opacity = 1
        })
      }
    }
    animateEntry()
  }, [])

  const updatePhysics = useCallback(() => {
    const nodes = nodesRef.current
    const canvas = canvasRef.current
    if (!canvas) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]

      if (node.fixed || node.id === draggedNode) {
        if (node.fx !== undefined && node.fy !== undefined) {
          node.x = node.fx
          node.y = node.fy
        }
        continue
      }

      if (hoveredNode && hoveredNode !== node.id) {
        const hoveredNodeObj = nodes.find((n) => n.id === hoveredNode)
        if (hoveredNodeObj) {
          const dx = node.x - hoveredNodeObj.x
          const dy = node.y - hoveredNodeObj.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 200) {
            const force = 0.5
            node.vx += (dx / distance) * force
            node.vy += (dy / distance) * force
          }
        }
      }

      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue
        const other = nodes[j]

        const dx = node.x - other.x
        const dy = node.y - other.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > 0 && distance < 300) {
          const force = 0.5 / distance
          node.vx += (dx / distance) * force
          node.vy += (dy / distance) * force
        }
      }

      node.connections.forEach((connId) => {
        const connected = nodes.find((n) => n.id === connId)
        if (connected) {
          const dx = connected.x - node.x
          const dy = connected.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance > 150) {
            const force = 0.001
            node.vx += (dx / distance) * force
            node.vy += (dy / distance) * force
          }
        }
      })

      const dcx = centerX - node.x
      const dcy = centerY - node.y
      node.vx += dcx * 0.0001
      node.vy += dcy * 0.0001

      node.vx *= 0.9
      node.vy *= 0.9

      node.x += node.vx
      node.y += node.vy
    }
  }, [draggedNode, hoveredNode])

  const findPath = useCallback((startId: string, endId: string): string[] => {
    const nodes = nodesRef.current
    const queue: { id: string; path: string[] }[] = [{ id: startId, path: [startId] }]
    const visited = new Set<string>([startId])

    while (queue.length > 0) {
      const { id, path } = queue.shift()!

      if (id === endId) return path

      const node = nodes.find((n) => n.id === id)
      if (node) {
        node.connections.forEach((connId) => {
          if (!visited.has(connId)) {
            visited.add(connId)
            queue.push({ id: connId, path: [...path, connId] })
          }
        })
      }
    }
    return []
  }, [])

  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.log("[v0] drawGraph: Canvas is null")
      return
    }

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true })
    if (!ctx) {
      console.log("[v0] drawGraph: Context is null")
      return
    }

    const nodes = nodesRef.current
    console.log("[v0] drawGraph: Drawing", nodes.length, "nodes")

    const visibleNodes = nodes.filter((node) => {
      const matchesSearch = searchQuery === "" || node.label.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !hiddenCategories.has(node.category)
      return matchesSearch && matchesCategory
    })

    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.translate(canvas.width / 2 + offset.x, canvas.height / 2 + offset.y)
    ctx.scale(zoom, zoom)
    ctx.translate(-canvas.width / 2, -canvas.height / 2)

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"

    if (selectedNode && secondSelectedNode) {
      const path = findPath(selectedNode, secondSelectedNode)
      ctx.strokeStyle = "rgba(234, 179, 8, 0.8)" // Gold
      ctx.lineWidth = 3
      ctx.setLineDash([5, 5])
      for (let i = 0; i < path.length - 1; i++) {
        const node1 = nodes.find((n) => n.id === path[i])
        const node2 = nodes.find((n) => n.id === path[i + 1])
        if (node1 && node2) {
          ctx.beginPath()
          ctx.moveTo(node1.x, node1.y)
          ctx.lineTo(node2.x, node2.y)
          ctx.stroke()
        }
      }
      ctx.setLineDash([])
    }

    visibleNodes.forEach((node) => {
      node.connections.forEach((connId) => {
        const connected = visibleNodes.find((n) => n.id === connId)
        if (connected) {
          const strength = node.connectionStrength.get(connId) || 1
          ctx.globalAlpha = node.opacity * 0.3
          ctx.strokeStyle = "rgba(148, 163, 184, 1)"
          ctx.lineWidth = Math.max(1, strength * 0.5) // Thicker lines for stronger connections
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(connected.x, connected.y)
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      })
    })

    if (selectedNode) {
      const selected = nodes.find((n) => n.id === selectedNode)
      if (selected) {
        selected.connections.forEach((connId) => {
          const connected = nodes.find((n) => n.id === connId)
          if (connected) {
            ctx.strokeStyle = "rgba(59, 130, 246, 0.6)"
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(selected.x, selected.y)
            ctx.lineTo(connected.x, connected.y)
            ctx.stroke()
          }
        })
      }
    }

    visibleNodes.forEach((node) => {
      const isSelected = node.id === selectedNode || node.id === secondSelectedNode
      const isHovered = node.id === hoveredNode
      const isDragged = node.id === draggedNode
      const isHighlighted = searchQuery !== "" && node.label.toLowerCase().includes(searchQuery.toLowerCase())

      ctx.globalAlpha = node.opacity

      ctx.fillStyle = node.color
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fill()

      if (isSelected || isHovered || isDragged || isHighlighted) {
        ctx.strokeStyle = isHighlighted ? "rgba(234, 179, 8, 0.8)" : "rgba(0, 0, 0, 0.3)"
        ctx.lineWidth = isHighlighted ? 3 : 2
        ctx.stroke()
      }

      ctx.globalAlpha = 1

      ctx.font = "14px -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
      ctx.fillStyle = "#1E293B"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"

      const textX = node.x + node.radius + 10
      const textY = node.y

      ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
      ctx.shadowBlur = 3
      ctx.shadowOffsetX = 1
      ctx.shadowOffsetY = 1

      ctx.fillText(node.label, textX, textY)

      ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0
    })

    ctx.restore()

    const minimapCanvas = minimapCanvasRef.current
    if (minimapCanvas) {
      const minimapCtx = minimapCanvas.getContext("2d")
      if (minimapCtx) {
        const scale = 0.1
        minimapCtx.fillStyle = "#F3F4F6"
        minimapCtx.fillRect(0, 0, minimapCanvas.width, minimapCanvas.height)

        minimapCtx.save()
        minimapCtx.scale(scale, scale)

        visibleNodes.forEach((node) => {
          minimapCtx.fillStyle = node.color
          minimapCtx.beginPath()
          minimapCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
          minimapCtx.fill()
        })

        // Draw viewport rectangle
        const viewportX = (canvas.width / 2 - offset.x) / zoom - canvas.width / 2
        const viewportY = (canvas.height / 2 - offset.y) / zoom - canvas.height / 2
        const viewportW = canvas.width / zoom
        const viewportH = canvas.height / zoom

        minimapCtx.strokeStyle = "rgba(59, 130, 246, 0.8)"
        minimapCtx.lineWidth = 2 / scale
        minimapCtx.strokeRect(viewportX, viewportY, viewportW, viewportH)

        minimapCtx.restore()
      }
    }
  }, [
    zoom,
    offset,
    selectedNode,
    secondSelectedNode,
    hoveredNode,
    draggedNode,
    searchQuery,
    hiddenCategories,
    findPath,
  ])

  useEffect(() => {
    const animate = () => {
      updatePhysics()
      drawGraph()
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [updatePhysics, drawGraph])

  const getTransformedCoords = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current
      if (!canvas) return { x: 0, y: 0 }

      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      const mouseX = (clientX - rect.left) * scaleX
      const mouseY = (clientY - rect.top) * scaleY

      const transformedX = (mouseX - canvas.width / 2 - offset.x) / zoom + canvas.width / 2
      const transformedY = (mouseY - canvas.height / 2 - offset.y) / zoom + canvas.height / 2

      return { x: transformedX, y: transformedY }
    },
    [zoom, offset],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (draggedNode) {
        const { x, y } = getTransformedCoords(e.clientX, e.clientY)
        const nodes = nodesRef.current
        const node = nodes.find((n) => n.id === draggedNode)
        if (node) {
          node.x = x
          node.y = y
          node.fx = x
          node.fy = y
        }
        return
      }

      if (isDragging) {
        setOffset({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
        return
      }

      const { x, y } = getTransformedCoords(e.clientX, e.clientY)
      const nodes = nodesRef.current
      const hoveredNode = nodes.find((node) => {
        const dx = x - node.x
        const dy = y - node.y
        return Math.sqrt(dx * dx + dy * dy) <= node.radius
      })

      setHoveredNode(hoveredNode ? hoveredNode.id : null)
    },
    [isDragging, dragStart, draggedNode, getTransformedCoords],
  )

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (draggedNode) return

      const { x, y } = getTransformedCoords(e.clientX, e.clientY)
      const nodes = nodesRef.current

      const clickedNode = nodes.find((node) => {
        const dx = x - node.x
        const dy = y - node.y
        return Math.sqrt(dx * dx + dy * dy) <= node.radius
      })

      if (clickedNode) {
        if (selectedNode === clickedNode.id) {
          router.push(`/article/${clickedNode.article.slug}`)
        } else if (selectedNode && !secondSelectedNode) {
          setSecondSelectedNode(clickedNode.id)
        } else {
          setSelectedNode(clickedNode.id)
          setSecondSelectedNode(null)
        }
      } else {
        setSelectedNode(null)
        setSecondSelectedNode(null)
      }
    },
    [selectedNode, secondSelectedNode, router, draggedNode, getTransformedCoords],
  )

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      const { x, y } = getTransformedCoords(e.clientX, e.clientY)
      const nodes = nodesRef.current

      const clickedNode = nodes.find((node) => {
        const dx = x - node.x
        const dy = y - node.y
        return Math.sqrt(dx * dx + dy * dy) <= node.radius
      })

      if (clickedNode) {
        const canvas = canvasRef.current
        if (!canvas) return

        // Center on node
        setOffset({
          x: canvas.width / 2 - clickedNode.x,
          y: canvas.height / 2 - clickedNode.y,
        })
        setZoom(1.5)
      }
    },
    [getTransformedCoords],
  )

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setZoom((prev) => Math.max(0.5, Math.min(3, prev * delta)))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const { x, y } = getTransformedCoords(e.clientX, e.clientY)
    const nodes = nodesRef.current

    const clickedNode = nodes.find((node) => {
      const dx = x - node.x
      const dy = y - node.y
      return Math.sqrt(dx * dx + dy * dy) <= node.radius
    })

    if (clickedNode) {
      setDraggedNode(clickedNode.id)
      clickedNode.fixed = true
    } else {
      setIsDragging(true)
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
    }
  }

  const handleMouseUp = () => {
    if (draggedNode) {
      const nodes = nodesRef.current
      const node = nodes.find((n) => n.id === draggedNode)
      if (node) {
        node.fixed = true
        node.vx = 0
        node.vy = 0
      }
      setDraggedNode(null)
    }
    setIsDragging(false)
  }

  const handleResetView = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    setSelectedNode(null)
    setSecondSelectedNode(null)
  }

  const toggleCategory = (category: string) => {
    setHiddenCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(category)) {
        newSet.delete(category)
      } else {
        newSet.add(category)
      }
      return newSet
    })
  }

  const visibleNodes = nodesRef.current.filter((node) => {
    const matchesSearch = searchQuery === "" || node.label.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !hiddenCategories.has(node.category)
    return matchesSearch && matchesCategory
  })

  const totalConnections = visibleNodes.reduce((sum, node) => sum + node.connections.length, 0)
  const avgConnections = visibleNodes.length > 0 ? (totalConnections / visibleNodes.length).toFixed(1) : "0"

  return (
    <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-96">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Szukaj artykułów..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-300 shadow-sm"
          />
        </div>
      </div>

      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          size="sm"
          onClick={() => router.push("/")}
          className="bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
          title="Strona główna"
        >
          <Home className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => setZoom((prev) => Math.min(3, prev * 1.2))}
          className="bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
          title="Powiększ"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => setZoom((prev) => Math.max(0.5, prev * 0.8))}
          className="bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
          title="Pomniejsz"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          onClick={handleResetView}
          className="bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
          title="Resetuj widok"
        >
          <Minimize2 className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => setShowStats(!showStats)}
          className="bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
          title="Statystyki"
        >
          <BarChart3 className="w-4 h-4" />
        </Button>
      </div>

      {showStats && (
        <div className="absolute top-4 right-4 z-10 bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-900 font-medium mb-2">
            <BarChart3 className="w-4 h-4" />
            <span>Statystyki Grafu</span>
          </div>
          <div className="space-y-1 text-xs text-gray-700">
            <div className="flex justify-between gap-4">
              <span>Węzły:</span>
              <span className="font-semibold">{visibleNodes.length}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Połączenia:</span>
              <span className="font-semibold">{totalConnections}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Śr. połączeń:</span>
              <span className="font-semibold">{avgConnections}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Zoom:</span>
              <span className="font-semibold">{(zoom * 100).toFixed(0)}%</span>
            </div>
          </div>
          {selectedNode && secondSelectedNode && (
            <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-blue-600">
              Ścieżka: {findPath(selectedNode, secondSelectedNode).length - 1} kroków
            </div>
          )}
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={1600}
        height={1000}
        className="cursor-pointer"
        onWheel={handleWheel}
        onClick={handleCanvasClick}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      <div className="absolute bottom-4 right-4 bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-sm">
        <div className="text-xs font-semibold text-gray-900 mb-2">Kategorie (kliknij aby ukryć):</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
          {Object.entries(CATEGORY_COLORS).map(([category, color]) => {
            const isHidden = hiddenCategories.has(category)
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`flex items-center gap-2 hover:bg-gray-50 px-1 py-0.5 rounded transition-opacity ${
                  isHidden ? "opacity-40" : "opacity-100"
                }`}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-gray-700">{category}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-white border border-gray-300 rounded-lg p-2 shadow-sm">
        <canvas ref={minimapCanvasRef} width={160} height={100} className="rounded" />
      </div>

      <div className="absolute bottom-32 left-4 bg-white border border-gray-300 rounded-lg px-4 py-3 max-w-xs shadow-sm">
        <div className="text-xs text-gray-700 space-y-1">
          <p>🔍 Wyszukaj artykuły w pasku u góry</p>
          <p>🖱️ Kliknij węzeł aby podświetlić połączenia</p>
          <p>🖱️ Kliknij drugi węzeł aby zobaczyć ścieżkę</p>
          <p>🖱️ Kliknij ponownie aby otworzyć artykuł</p>
          <p>🖱️ Podwójne kliknięcie centruje widok</p>
          <p>🎯 Przeciągnij węzeł aby zmienić pozycję</p>
          <p>✋ Przeciągnij tło aby przesunąć widok</p>
          <p>🔍 Scroll aby powiększyć/pomniejszyć</p>
          <p>🏷️ Kliknij kategorię aby ukryć/pokazać</p>
        </div>
      </div>

      {hoveredNode && (
        <div
          className="absolute z-20 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg pointer-events-none"
          style={{
            left: "50%",
            top: "20%",
            transform: "translateX(-50%)",
          }}
        >
          {(() => {
            const node = nodesRef.current.find((n) => n.id === hoveredNode)
            if (!node) return null
            return (
              <div className="space-y-1">
                <div className="font-semibold">{node.article.title}</div>
                <div className="text-gray-300">Kategoria: {node.article.category}</div>
                <div className="text-gray-300">Wyświetlenia: {node.article.views}</div>
                <div className="text-gray-300">Czas czytania: {node.article.readingTime} min</div>
                <div className="text-gray-300">Data: {node.article.date}</div>
                <div className="text-gray-300">Połączenia: {node.connections.length}</div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
