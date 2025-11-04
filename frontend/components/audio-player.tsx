"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Download, Headphones } from "lucide-react"

interface AudioPlayerProps {
  audioUrl: string
  title?: string
  defaultPlaybackRate?: string
}

export function AudioPlayer({ audioUrl, title, defaultPlaybackRate }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Convert Strapi format (x05, x075, x10, x125, x15) to number
  const convertPlaybackRate = (strapiRate: string): number => {
    const mapping: Record<string, number> = {
      'x05': 0.5,
      'x075': 0.75,
      'x10': 1,
      'x125': 1.25,
      'x15': 1.5
    }
    return mapping[strapiRate] || 1
  }

  // Load playback rate from localStorage or use default from Strapi
  useEffect(() => {
    const savedRate = localStorage.getItem('audioPlaybackRate')
    if (savedRate) {
      const rate = parseFloat(savedRate)
      if (rate >= 0.5 && rate <= 1.5) {
        setPlaybackRate(rate)
      }
    } else if (defaultPlaybackRate) {
      const rate = convertPlaybackRate(defaultPlaybackRate)
      setPlaybackRate(rate)
    }
  }, [defaultPlaybackRate])

  // Apply playback rate to audio element
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.playbackRate = playbackRate
  }, [playbackRate])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = Number(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = Number(e.target.value)
    audio.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume || 0.5
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate)
    localStorage.setItem('audioPlaybackRate', rate.toString())
    setShowSpeedMenu(false)
  }

  const getSpeedLabel = (rate: number) => {
    if (rate === 1) return 'Normalny'
    return `${rate}x`
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  const fullAudioUrl = audioUrl.startsWith('http') ? audioUrl : `${STRAPI_BASE_URL}${audioUrl}`

  return (
    <div className="not-prose bg-gradient-to-br from-[#1E2A5E] to-[#2C6AA8] rounded-2xl p-6 shadow-strong">
      <audio ref={audioRef} src={fullAudioUrl} preload="metadata" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
          <Headphones className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg leading-tight">
            Posłuchaj artykułu
          </h3>
          {title && (
            <p className="text-white/70 text-sm mt-1 line-clamp-1">{title}</p>
          )}
        </div>
        <a
          href={fullAudioUrl}
          download
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          title="Pobierz audio"
        >
          <Download className="h-5 w-5 text-white" />
        </a>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-white
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:shadow-lg
                     [&::-moz-range-thumb]:w-4
                     [&::-moz-range-thumb]:h-4
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-white
                     [&::-moz-range-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:border-0
                     [&::-moz-range-thumb]:shadow-lg"
          style={{
            background: `linear-gradient(to right, white ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) ${(currentTime / (duration || 1)) * 100}%)`
          }}
        />
        <div className="flex justify-between text-white/80 text-xs mt-2 font-medium">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="w-14 h-14 bg-white hover:bg-white/90 rounded-full
                     flex items-center justify-center transition-all
                     shadow-lg hover:shadow-xl hover:scale-105"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6 text-[#1E2A5E] fill-[#1E2A5E]" />
          ) : (
            <Play className="h-6 w-6 text-[#1E2A5E] fill-[#1E2A5E] ml-0.5" />
          )}
        </button>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 flex-1">
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-white" />
            ) : (
              <Volume2 className="h-5 w-5 text-white" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-3
                       [&::-webkit-slider-thumb]:h-3
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-white
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-moz-range-thumb]:w-3
                       [&::-moz-range-thumb]:h-3
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-white
                       [&::-moz-range-thumb]:cursor-pointer
                       [&::-moz-range-thumb]:border-0"
          />
        </div>

        {/* Playback Speed Control */}
        <div className="hidden sm:flex items-center gap-2 text-white/80 text-sm relative">
          <button
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors min-w-[80px] text-center"
          >
            {getSpeedLabel(playbackRate)}
          </button>

          {/* Speed Dropdown Menu */}
          {showSpeedMenu && (
            <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl overflow-hidden z-10 min-w-[120px]">
              {[0.5, 0.75, 1, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handleSpeedChange(rate)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                    playbackRate === rate ? 'bg-blue-50 text-[#2C6AA8] font-semibold' : 'text-gray-700'
                  }`}
                >
                  {getSpeedLabel(rate)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
