"use client"

import Image from "next/image"
import Link from "next/link"
import { Network, Highlighter, Search, FileText } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] shadow-soft">
      <div className="container max-w-[1280px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-block">
            <Image
              src="/ksef-expert-logo-navy.svg"
              alt="KSEF.EXPERT"
              width={500}
              height={113}
              className="h-[113px] w-auto"
              priority
            />
          </Link>

          <div className="flex items-center gap-3">
            {/* Stanford - Smart Search */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F3F4F6] 
                         text-[#1E2A5E] border border-[#E5E7EB] rounded-lg transition-colors 
                         font-medium shadow-sm hover:shadow-md"
              title="Smart Search (Stanford)"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline">Wyszukiwanie</span>
            </button>

            {/* Harvard - Highlights */}
            <Link
              href="/?highlights=true"
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F3F4F6] 
                         text-[#1E2A5E] border border-[#E5E7EB] rounded-lg transition-colors 
                         font-medium shadow-sm hover:shadow-md"
              title="Highlights & Annotations (Harvard)"
            >
              <Highlighter className="w-5 h-5" />
              <span className="hidden md:inline">Zaznaczenia</span>
            </Link>

            {/* Cambridge - Citations */}
            <Link
              href="/?citations=true"
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F3F4F6] 
                         text-[#1E2A5E] border border-[#E5E7EB] rounded-lg transition-colors 
                         font-medium shadow-sm hover:shadow-md"
              title="Citations Generator (Cambridge)"
            >
              <FileText className="w-5 h-5" />
              <span className="hidden md:inline">Cytowania</span>
            </Link>

            {/* MIT - Mind Map */}
            <Link
              href="/mind-map"
              className="flex items-center gap-2 px-4 py-2 bg-[#2C6AA8] hover:bg-[#1E5A98] 
                         text-white rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
              title="Mind Map View (MIT)"
            >
              <Network className="w-5 h-5" />
              <span className="hidden md:inline">Mapa Wiedzy</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
