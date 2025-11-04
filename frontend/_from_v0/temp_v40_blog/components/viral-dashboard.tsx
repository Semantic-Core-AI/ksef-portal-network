"use client"

import { useState, useEffect } from "react"
import {
  streakSystem,
  knowledgeScoreSystem,
  achievementSystem,
  referralSystem,
  leaderboardSystem,
  type ReadingStreak,
  type KnowledgeScore,
  type Achievement,
} from "@/lib/viral-growth"
import { Flame, Trophy, Share2, Users, TrendingUp, Award, Target, Zap, Crown, Star, Copy, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ViralDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [streak, setStreak] = useState<ReadingStreak | null>(null)
  const [score, setScore] = useState<KnowledgeScore | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [referralCode, setReferralCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [userRank, setUserRank] = useState(0)

  useEffect(() => {
    setStreak(streakSystem.getStreak())
    setScore(knowledgeScoreSystem.getScore())
    setAchievements(achievementSystem.getAll())
    setReferralCode(referralSystem.generateReferralCode("user"))
    setUserRank(leaderboardSystem.getUserRank())
  }, [])

  const copyReferralLink = () => {
    const link = `${window.location.origin}?ref=${referralCode}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!streak || !score) return null

  const nextLevelPoints = knowledgeScoreSystem.getNextLevelPoints(score.totalPoints)
  const progressToNextLevel = ((score.totalPoints % 500) / 500) * 100

  const rarityColors = {
    common: "bg-gray-100 text-gray-700 border-gray-300",
    rare: "bg-blue-100 text-blue-700 border-blue-300",
    epic: "bg-purple-100 text-purple-700 border-purple-300",
    legendary: "bg-yellow-100 text-yellow-700 border-yellow-300",
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-4 bg-white rounded-2xl shadow-xl border-2 border-[#E5E7EB] p-4 z-40 hover:shadow-2xl transition-all hover:scale-105"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-600">{streak.currentStreak}</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <Star className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-bold text-blue-600">{score.level}</span>
          </div>
          <Trophy className="w-5 h-5 text-[#C7A83B]" />
        </div>
      </button>
    )
  }

  return (
    <div className="fixed right-4 bottom-4 w-80 bg-white rounded-2xl shadow-xl border-2 border-[#E5E7EB] p-6 z-40 max-h-[calc(100vh-120px)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#1E2A5E] flex items-center gap-2">
          <Trophy className="w-6 h-6 text-[#C7A83B]" />
          Twój Profil
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm">
            <Crown className="w-4 h-4 text-[#C7A83B]" />
            <span className="font-bold text-[#1E2A5E]">#{userRank}</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Zamknij"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Reading Streak */}
      <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Passa Czytania</span>
          <Flame className="w-5 h-5 text-orange-500" />
        </div>
        <div className="text-3xl font-bold text-orange-600 mb-1">{streak.currentStreak} dni</div>
        <div className="text-xs text-gray-600">{streakSystem.getStreakMotivation(streak.currentStreak)}</div>
        <div className="mt-2 text-xs text-gray-500">Najdłuższa passa: {streak.longestStreak} dni</div>
      </div>

      {/* Knowledge Score & Level */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Poziom Wiedzy</span>
          <Star className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold text-blue-600">{score.level}</span>
          <span className="text-sm text-gray-600">{knowledgeScoreSystem.getLevelTitle(score.level)}</span>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>{score.totalPoints} pkt</span>
            <span>{nextLevelPoints} pkt</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          <div className="flex items-center gap-1">
            <Target className="w-3 h-3 text-blue-500" />
            <span>{score.articlesRead} przeczytanych</span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="w-3 h-3 text-blue-500" />
            <span>{score.articlesShared} udostępnień</span>
          </div>
        </div>
      </div>

      {/* Referral Program */}
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Program Poleceń</span>
          <Users className="w-5 h-5 text-green-500" />
        </div>
        <p className="text-xs text-gray-600 mb-3">Zaproś znajomych i odblokowuj nagrody!</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralCode}
            readOnly
            className="flex-1 px-3 py-2 text-xs bg-white border border-green-300 rounded-lg"
          />
          <Button onClick={copyReferralLink} size="sm" className="bg-green-500 hover:bg-green-600 text-white">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <div className="mt-3 space-y-1 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-green-500" />
            <span>1 znajomy = 100 punktów</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-green-500" />
            <span>5 znajomych = 30 dni Premium</span>
          </div>
        </div>
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-[#1E2A5E]">Osiągnięcia</span>
            <Award className="w-5 h-5 text-[#C7A83B]" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {achievements.slice(0, 6).map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border-2 ${rarityColors[achievement.rarity]} text-center`}
                title={achievement.description}
              >
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <div className="text-xs font-medium line-clamp-1">{achievement.title}</div>
              </div>
            ))}
          </div>
          {achievements.length > 6 && (
            <button className="w-full mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium">
              Zobacz wszystkie ({achievements.length})
            </button>
          )}
        </div>
      )}

      {/* Leaderboard Preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-[#1E2A5E]">Top Czytelnicy</span>
          <TrendingUp className="w-5 h-5 text-[#C7A83B]" />
        </div>
        <div className="space-y-2">
          {leaderboardSystem.getTopReaders(3).map((reader, index) => (
            <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center w-6 h-6 bg-[#C7A83B] text-white text-xs font-bold rounded-full">
                {index + 1}
              </div>
              <img src={reader.avatar || "/placeholder.svg"} alt={reader.name} className="w-8 h-8 rounded-full" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-900 truncate">{reader.name}</div>
                <div className="text-xs text-gray-500">Lvl {reader.level}</div>
              </div>
              <div className="text-xs font-bold text-[#2C6AA8]">{reader.points}</div>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 px-4 py-2 bg-[#2C6AA8] hover:bg-[#1E5A98] text-white text-sm font-medium rounded-lg transition-colors">
          Zobacz Pełną Listę
        </button>
      </div>
    </div>
  )
}
