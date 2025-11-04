"use client"

import { useState } from "react"
import { socialSharing } from "@/lib/viral-growth"
import { X, Twitter, Linkedin, Facebook, Mail, Link2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareModalProps {
  article: {
    title: string
    slug: string
    excerpt: string
  }
  isOpen: boolean
  onClose: () => void
}

export function ShareModal({ article, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleShare = (platform: "twitter" | "linkedin" | "facebook" | "email") => {
    socialSharing.share(article, platform)
    onClose()
  }

  const handleCopyLink = () => {
    socialSharing.copyLink(article)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      onClose()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold text-[#1E2A5E] mb-2">Udostępnij artykuł</h3>
        <p className="text-sm text-gray-600 mb-6">Zdobądź 25 punktów za każde udostępnienie!</p>

        <div className="space-y-3">
          <Button
            onClick={() => handleShare("twitter")}
            className="w-full flex items-center justify-center gap-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white py-3"
          >
            <Twitter className="w-5 h-5" />
            <span>Udostępnij na Twitter</span>
          </Button>

          <Button
            onClick={() => handleShare("linkedin")}
            className="w-full flex items-center justify-center gap-3 bg-[#0A66C2] hover:bg-[#004182] text-white py-3"
          >
            <Linkedin className="w-5 h-5" />
            <span>Udostępnij na LinkedIn</span>
          </Button>

          <Button
            onClick={() => handleShare("facebook")}
            className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#0c63d4] text-white py-3"
          >
            <Facebook className="w-5 h-5" />
            <span>Udostępnij na Facebook</span>
          </Button>

          <Button
            onClick={() => handleShare("email")}
            className="w-full flex items-center justify-center gap-3 bg-gray-600 hover:bg-gray-700 text-white py-3"
          >
            <Mail className="w-5 h-5" />
            <span>Wyślij przez Email</span>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">lub</span>
            </div>
          </div>

          <Button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-3 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111827] py-3"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">Skopiowano!</span>
              </>
            ) : (
              <>
                <Link2 className="w-5 h-5" />
                <span>Skopiuj link</span>
              </>
            )}
          </Button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-800">
            <strong>💡 Wskazówka:</strong> Udostępniaj artykuły ze znajomymi i zdobywaj punkty! Im więcej udostępnień,
            tym wyższy poziom i więcej nagród.
          </p>
        </div>
      </div>
    </div>
  )
}
