"use client"

import { useState } from "react"
import { MessageCircle, ChevronDown, ChevronUp, Star } from "lucide-react"

interface Comment {
  id: number
  authorName: string
  authorEmail: string
  authorAvatar?: {
    url: string
    formats?: any
  }
  content: string
  rating: number
  isApproved: boolean
  createdAt: string
}

interface ArticleCommentsProps {
  comments?: Comment[]
}

export default function ArticleComments({ comments = [] }: ArticleCommentsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Only show approved comments
  const approvedComments = comments.filter(comment => comment.isApproved)
  const commentsCount = approvedComments.length

  if (commentsCount === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-soft">
        <div className="flex items-center gap-2 text-[#6B7280]">
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">Brak komentarzy</span>
        </div>
        <p className="text-sm text-[#6B7280] mt-2">
          Ten artykuł nie ma jeszcze żadnych komentarzy.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-soft">
      {/* Header with toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between group hover:bg-[#F9FAFB] -m-6 p-6 rounded-2xl transition-colors"
      >
        <div className="flex items-center gap-3">
          <MessageCircle className="h-5 w-5 text-[#2C6AA8]" />
          <h3 className="text-lg font-semibold text-[#111827]">
            Komentarze ({commentsCount})
          </h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-[#6B7280] group-hover:text-[#2C6AA8] transition-colors" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#6B7280] group-hover:text-[#2C6AA8] transition-colors" />
        )}
      </button>

      {/* Comments list */}
      {isExpanded && (
        <div className="mt-6 space-y-6">
          {approvedComments.map((comment) => (
            <div
              key={comment.id}
              className="border-l-4 border-[#2C6AA8] pl-4 pb-4 border-b border-[#E5E7EB] last:border-b-0"
            >
              {/* Comment Header */}
              <div className="flex items-start gap-3 mb-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {comment.authorAvatar?.url ? (
                    <img
                      src={comment.authorAvatar.url}
                      alt={comment.authorName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#E5E7EB]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2C6AA8] to-[#1E5A8E] flex items-center justify-center text-white font-bold text-sm">
                      {comment.authorName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                  )}
                </div>

                {/* Author Info & Rating */}
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="font-semibold text-[#111827]">
                        {comment.authorName}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {new Date(comment.createdAt).toLocaleDateString("pl-PL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < comment.rating
                              ? "fill-[#F59E0B] text-[#F59E0B]"
                              : "text-[#E5E7EB]"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm font-semibold text-[#6B7280]">
                        {comment.rating}/5
                      </span>
                    </div>
                  </div>

                  {/* Comment Content */}
                  <p className="text-sm text-[#374151] mt-3 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer hint */}
      {!isExpanded && (
        <p className="text-xs text-[#6B7280] mt-4 text-center">
          Kliknij aby rozwinąć i przeczytać komentarze
        </p>
      )}
    </div>
  )
}
