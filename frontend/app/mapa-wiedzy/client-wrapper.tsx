'use client'

import dynamic from 'next/dynamic'
import type { FullGraphData } from '@/lib/strapi'

// Dynamically import KnowledgeMapPage with no SSR to prevent "window is not defined" errors
const KnowledgeMapPage = dynamic(() => import('./knowledge-map-page'), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="animate-pulse">Ładowanie mapy wiedzy...</div>
    </div>
  )
})

interface ClientWrapperProps {
  graphData: FullGraphData
}

export default function ClientWrapper({ graphData }: ClientWrapperProps) {
  return <KnowledgeMapPage graphData={graphData} />
}
