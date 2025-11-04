"use client"

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, Pause, Play } from 'lucide-react'

interface ArticleAudioPlayerProps {
  title: string
  content: string
  excerpt?: string
}

export function ArticleAudioPlayer({ title, content, excerpt }: ArticleAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    // Check if browser supports Web Speech API
    setIsSupported('speechSynthesis' in window)
  }, [])

  // Extract text content from markdown/blocks
  const extractTextContent = (content: any): string => {
    if (typeof content === 'string') {
      // Remove markdown formatting
      return content
        .replace(/#{1,6}\s/g, '') // Remove headings
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/`(.*?)`/g, '$1') // Remove inline code
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
        .replace(/\n{3,}/g, '\n\n') // Normalize line breaks
        .trim()
    }

    // If blocks format, we'd need to traverse and extract text
    // For now, return empty string for blocks (to be implemented if needed)
    return ''
  }

  const handlePlay = () => {
    if (!isSupported) {
      alert('Twoja przeglądarka nie obsługuje funkcji odczytywania tekstu.')
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    if (isPaused && utteranceRef.current) {
      // Resume paused speech
      window.speechSynthesis.resume()
      setIsPaused(false)
      setIsPlaying(true)
      return
    }

    // Create new utterance
    const textToRead = `${title}. ${excerpt ? excerpt + '. ' : ''}${extractTextContent(content)}`
    const utterance = new SpeechSynthesisUtterance(textToRead)

    // Configure for Polish language
    utterance.lang = 'pl-PL'
    utterance.rate = 0.9 // Slightly slower for better comprehension
    utterance.pitch = 1
    utterance.volume = 1

    // Try to find Polish voice
    const voices = window.speechSynthesis.getVoices()
    const polishVoice = voices.find(voice => voice.lang.startsWith('pl'))
    if (polishVoice) {
      utterance.voice = polishVoice
    }

    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      utteranceRef.current = null
    }

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event)
      setIsPlaying(false)
      setIsPaused(false)
      utteranceRef.current = null
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const handlePause = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause()
      setIsPaused(true)
      setIsPlaying(false)
    }
  }

  const handleStop = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    utteranceRef.current = null
  }

  if (!isSupported) {
    return null // Don't show button if not supported
  }

  return (
    <div className="flex items-center gap-2">
      {!isPlaying && !isPaused && (
        <button
          onClick={handlePlay}
          className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors"
          title="Odsłuchaj artykuł"
        >
          <Volume2 className="h-5 w-5 text-[#2C6AA8]" />
        </button>
      )}

      {isPlaying && (
        <button
          onClick={handlePause}
          className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors"
          title="Wstrzymaj odczytywanie"
        >
          <Pause className="h-5 w-5 text-[#2C6AA8]" />
        </button>
      )}

      {isPaused && (
        <button
          onClick={handlePlay}
          className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors"
          title="Wznów odczytywanie"
        >
          <Play className="h-5 w-5 text-[#2C6AA8]" />
        </button>
      )}

      {(isPlaying || isPaused) && (
        <button
          onClick={handleStop}
          className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors"
          title="Zatrzymaj odczytywanie"
        >
          <VolumeX className="h-5 w-5 text-[#DC2626]" />
        </button>
      )}
    </div>
  )
}
