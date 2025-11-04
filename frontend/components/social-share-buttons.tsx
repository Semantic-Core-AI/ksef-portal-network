"use client"

import { useState } from "react"
import { Linkedin, Facebook, Twitter, Link2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface SocialShareButtonsProps {
  shareText: string
  shareUrl?: string
  title?: string
}

export function SocialShareButtons({ shareText, shareUrl, title = "Kalkulator KSeF" }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const url = shareUrl || (typeof window !== "undefined" ? window.location.href : "")

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("Link skopiowany do schowka!")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
      toast.error("Nie udało się skopiować linku")
    }
  }

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedInUrl, "_blank", "width=600,height=600")
  }

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(facebookUrl, "_blank", "width=600,height=600")
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, "_blank", "width=600,height=600")
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button
        size="icon"
        className="bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white"
        onClick={handleLinkedInShare}
        title="Udostępnij na LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </Button>

      <Button
        size="icon"
        className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
        onClick={handleFacebookShare}
        title="Udostępnij na Facebook"
      >
        <Facebook className="w-5 h-5" />
      </Button>

      <Button
        size="icon"
        className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white"
        onClick={handleTwitterShare}
        title="Udostępnij na Twitter"
      >
        <Twitter className="w-5 h-5" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={handleCopyLink}
        title="Kopiuj link"
        className={copied ? "bg-success/10 border-success" : ""}
      >
        <Link2 className={`w-5 h-5 ${copied ? "text-success" : ""}`} />
      </Button>

      {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
        <Button size="icon" variant="outline" onClick={handleNativeShare} title="Udostępnij">
          <Share2 className="w-5 h-5" />
        </Button>
      )}
    </div>
  )
}
