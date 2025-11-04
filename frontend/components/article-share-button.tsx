"use client"

import { useState, useEffect } from 'react'
import { Share2, Check } from 'lucide-react'

interface ArticleShareButtonProps {
  title: string
  url: string
  description?: string
}

export function ArticleShareButton({ title, url, description }: ArticleShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    // Check if Web Share API is available (client-side only)
    setCanShare(typeof navigator !== 'undefined' && !!navigator.share)
  }, [])

  const handleShare = async () => {
    // Try Web Share API first (native mobile sharing)
    if (canShare && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description || '',
          url: url,
        })
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or error:', error)
      }
    } else {
      // Fallback: Copy link to clipboard
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error('Failed to copy link:', error)
        alert('Nie udało się skopiować linku')
      }
    }
  }

  return (
    <button
      onClick={handleShare}
      className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors relative"
      title="Udostępnij artykuł"
    >
      {copied ? (
        <Check className="h-5 w-5 text-green-600" />
      ) : (
        <Share2 className="h-5 w-5 text-[#6B7280]" />
      )}

      {copied && (
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
          Skopiowano!
        </span>
      )}
    </button>
  )
}
