import { MindMapView } from "@/components/mind-map-view"
import { mockArticles } from "@/lib/data"
import { Navbar } from "@/components/navbar"

export default function MindMapPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="container-custom py-12">
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-[#1E2A5E] mb-3">Mapa Wiedzy KSeF</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Wizualna reprezentacja powiązań między artykułami. Eksploruj tematy i odkrywaj nowe połączenia.
          </p>
        </div>

        <MindMapView articles={mockArticles} />
      </main>
    </div>
  )
}
