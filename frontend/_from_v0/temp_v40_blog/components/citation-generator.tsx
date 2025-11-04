"use client"

import { useState } from "react"
import { citationGenerator, type Citation } from "@/lib/university-features"
import { BookOpen, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CitationGeneratorProps {
  article: {
    title: string
    author: { name: string }
    publishedAt: string
    slug: string
  }
}

export function CitationGenerator({ article }: CitationGeneratorProps) {
  const [format, setFormat] = useState<"APA" | "MLA" | "Chicago" | "ISO690">("APA")
  const [copied, setCopied] = useState(false)

  const citation: Citation = {
    articleTitle: article.title,
    author: article.author.name,
    publishDate: article.publishedAt,
    url: `https://ksef.expert/article/${article.slug}`,
    accessDate: new Date().toLocaleDateString("pl-PL"),
  }

  const getCitation = () => {
    switch (format) {
      case "APA":
        return citationGenerator.generateAPA(citation)
      case "MLA":
        return citationGenerator.generateMLA(citation)
      case "Chicago":
        return citationGenerator.generateChicago(citation)
      case "ISO690":
        return citationGenerator.generateISO690(citation)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCitation())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E8EAF6] rounded-lg p-6 border-2 border-[#2C6AA8]">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-[#2C6AA8]" />
        <h3 className="font-serif text-xl text-[#1E2A5E]">Cytuj ten artykuł</h3>
      </div>

      <div className="flex gap-2 mb-4">
        {(["APA", "MLA", "Chicago", "ISO690"] as const).map((fmt) => (
          <Button
            key={fmt}
            variant={format === fmt ? "default" : "outline"}
            size="sm"
            onClick={() => setFormat(fmt)}
            className={format === fmt ? "bg-[#2C6AA8] hover:bg-[#1E5A98]" : ""}
          >
            {fmt}
          </Button>
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
        <p className="text-sm text-gray-700 leading-relaxed">{getCitation()}</p>
      </div>

      <Button onClick={copyToClipboard} className="w-full bg-[#C7A83B] hover:bg-[#B8991A] text-[#1E2A5E]">
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Skopiowano!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            Kopiuj cytowanie
          </>
        )}
      </Button>
    </div>
  )
}
