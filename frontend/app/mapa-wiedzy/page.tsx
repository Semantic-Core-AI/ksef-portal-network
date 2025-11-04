import { Suspense } from 'react'
import ClientWrapper from './client-wrapper'
import { getFullGraph } from '@/lib/strapi'

export const metadata = {
  title: 'Mapa Wiedzy - KSeF Expert',
  description: 'Interaktywna wizualizacja grafu wiedzy KSeF - odkryj powiązania między artykułami'
}

export default async function MapaWiedzyPage() {
  const graphData = await getFullGraph()

  if (!graphData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mapa Wiedzy</h1>
        <p className="text-gray-600">
          Nie udało się załadować grafu wiedzy. Spróbuj ponownie później.
        </p>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">Ładowanie mapy wiedzy...</div>
        </div>
      }
    >
      <ClientWrapper graphData={graphData} />
    </Suspense>
  )
}
