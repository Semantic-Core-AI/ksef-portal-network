"use client"

import { useState, useEffect } from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'

interface ArticleBookmarkButtonProps {
  articleId: number
  title: string
  slug: string
}

interface BookmarkedArticle {
  id: number
  title: string
  slug: string
  savedAt: string
}

export function ArticleBookmarkButton({ articleId, title, slug }: ArticleBookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    // Check if article is already bookmarked
    const bookmarks = getBookmarks()
    setIsBookmarked(bookmarks.some(b => b.id === articleId))
  }, [articleId])

  const getBookmarks = (): BookmarkedArticle[] => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('ksef-bookmarks')
    return saved ? JSON.parse(saved) : []
  }

  const saveBookmarks = (bookmarks: BookmarkedArticle[]) => {
    localStorage.setItem('ksef-bookmarks', JSON.stringify(bookmarks))
  }

  const toggleBookmark = () => {
    const bookmarks = getBookmarks()

    if (isBookmarked) {
      // Remove bookmark
      const filtered = bookmarks.filter(b => b.id !== articleId)
      saveBookmarks(filtered)
      setIsBookmarked(false)
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 2000)
    } else {
      // Add bookmark
      const newBookmark: BookmarkedArticle = {
        id: articleId,
        title,
        slug,
        savedAt: new Date().toISOString()
      }
      saveBookmarks([...bookmarks, newBookmark])
      setIsBookmarked(true)
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 2000)
    }
  }

  return (
    <button
      onClick={toggleBookmark}
      className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors relative"
      title={isBookmarked ? "Usuń z zapisanych" : "Zapisz artykuł"}
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-5 w-5 text-[#2C6AA8]" />
      ) : (
        <Bookmark className="h-5 w-5 text-[#6B7280]" />
      )}

      {showTooltip && (
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
          {isBookmarked ? 'Zapisano!' : 'Usunięto'}
        </span>
      )}
    </button>
  )
}
