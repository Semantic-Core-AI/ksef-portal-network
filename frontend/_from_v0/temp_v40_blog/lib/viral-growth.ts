// Viral Growth Mechanisms - 10x better than Dropbox, Duolingo, LinkedIn

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  joinedAt: string
  referralCode: string
  referredBy?: string
}

export interface ReadingStreak {
  currentStreak: number
  longestStreak: number
  lastReadDate: string
  totalDaysRead: number
}

export interface KnowledgeScore {
  totalPoints: number
  level: number
  articlesRead: number
  articlesShared: number
  highlightsCreated: number
  commentsPosted: number
  referralsSuccessful: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

export interface ShareEvent {
  articleSlug: string
  platform: "twitter" | "linkedin" | "facebook" | "email" | "copy"
  timestamp: string
  referralCode: string
}

export interface ReferralReward {
  type: "premium_access" | "exclusive_content" | "badge" | "points"
  value: number
  description: string
}

// Dropbox-style Referral System
export const referralSystem = {
  generateReferralCode: (userId: string): string => {
    return `KSEF-${userId.substring(0, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`
  },

  trackReferral: (referralCode: string, newUserId: string) => {
    const referrals = referralSystem.getReferrals()
    referrals.push({
      code: referralCode,
      newUserId,
      timestamp: new Date().toISOString(),
      rewardClaimed: false,
    })
    localStorage.setItem("ksef_referrals", JSON.stringify(referrals))
  },

  getReferrals: () => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem("ksef_referrals")
    return data ? JSON.parse(data) : []
  },

  getRewards: (referralCount: number): ReferralReward[] => {
    const rewards: ReferralReward[] = []

    if (referralCount >= 1) {
      rewards.push({
        type: "points",
        value: 100,
        description: "100 punktów za pierwszego znajomego",
      })
    }

    if (referralCount >= 3) {
      rewards.push({
        type: "exclusive_content",
        value: 1,
        description: "Dostęp do ekskluzywnych artykułów",
      })
    }

    if (referralCount >= 5) {
      rewards.push({
        type: "premium_access",
        value: 30,
        description: "30 dni Premium za 5 znajomych",
      })
    }

    if (referralCount >= 10) {
      rewards.push({
        type: "badge",
        value: 1,
        description: 'Odznaka "Ambasador Wiedzy"',
      })
    }

    return rewards
  },
}

// Duolingo-style Streaks & Gamification
export const streakSystem = {
  updateStreak: (): ReadingStreak => {
    const streak = streakSystem.getStreak()
    const today = new Date().toDateString()
    const lastRead = new Date(streak.lastReadDate).toDateString()

    if (today === lastRead) {
      return streak
    }

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toDateString()

    if (lastRead === yesterdayStr) {
      streak.currentStreak += 1
      streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak)
    } else {
      streak.currentStreak = 1
    }

    streak.lastReadDate = new Date().toISOString()
    streak.totalDaysRead += 1

    localStorage.setItem("ksef_streak", JSON.stringify(streak))
    return streak
  },

  getStreak: (): ReadingStreak => {
    if (typeof window === "undefined")
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastReadDate: new Date().toISOString(),
        totalDaysRead: 0,
      }

    const data = localStorage.getItem("ksef_streak")
    return data
      ? JSON.parse(data)
      : {
          currentStreak: 0,
          longestStreak: 0,
          lastReadDate: new Date().toISOString(),
          totalDaysRead: 0,
        }
  },

  getStreakMotivation: (streak: number): string => {
    if (streak === 0) return "Zacznij swoją passę czytania!"
    if (streak < 3) return `${streak} dni z rzędu! Kontynuuj!`
    if (streak < 7) return `${streak} dni! Jesteś na dobrej drodze! 🔥`
    if (streak < 30) return `${streak} dni! Niesamowite! 🚀`
    return `${streak} dni! Jesteś legendą! 👑`
  },
}

// LinkedIn-style Knowledge Score & Levels
export const knowledgeScoreSystem = {
  calculateScore: (): KnowledgeScore => {
    const score = knowledgeScoreSystem.getScore()
    return score
  },

  addPoints: (action: "read" | "share" | "highlight" | "comment" | "referral", amount = 1) => {
    const score = knowledgeScoreSystem.getScore()

    const pointsMap = {
      read: 10,
      share: 25,
      highlight: 5,
      comment: 15,
      referral: 100,
    }

    score.totalPoints += pointsMap[action] * amount

    switch (action) {
      case "read":
        score.articlesRead += amount
        break
      case "share":
        score.articlesShared += amount
        break
      case "highlight":
        score.highlightsCreated += amount
        break
      case "comment":
        score.commentsPosted += amount
        break
      case "referral":
        score.referralsSuccessful += amount
        break
    }

    score.level = Math.floor(score.totalPoints / 500) + 1

    localStorage.setItem("ksef_knowledge_score", JSON.stringify(score))
    return score
  },

  getScore: (): KnowledgeScore => {
    if (typeof window === "undefined")
      return {
        totalPoints: 0,
        level: 1,
        articlesRead: 0,
        articlesShared: 0,
        highlightsCreated: 0,
        commentsPosted: 0,
        referralsSuccessful: 0,
      }

    const data = localStorage.getItem("ksef_knowledge_score")
    return data
      ? JSON.parse(data)
      : {
          totalPoints: 0,
          level: 1,
          articlesRead: 0,
          articlesShared: 0,
          highlightsCreated: 0,
          commentsPosted: 0,
          referralsSuccessful: 0,
        }
  },

  getLevelTitle: (level: number): string => {
    if (level < 5) return "Początkujący"
    if (level < 10) return "Entuzjasta"
    if (level < 20) return "Ekspert"
    if (level < 50) return "Mistrz"
    return "Legenda"
  },

  getNextLevelPoints: (currentPoints: number): number => {
    const currentLevel = Math.floor(currentPoints / 500) + 1
    return currentLevel * 500
  },
}

// Achievement System
export const achievementSystem = {
  checkAndUnlock: (action: string, value: number): Achievement | null => {
    const achievements = achievementSystem.getAll()
    const unlockedIds = achievements.map((a) => a.id)

    const allAchievements: Achievement[] = [
      {
        id: "first_read",
        title: "Pierwszy Krok",
        description: "Przeczytaj pierwszy artykuł",
        icon: "📖",
        unlockedAt: "",
        rarity: "common",
      },
      {
        id: "read_10",
        title: "Czytelnik",
        description: "Przeczytaj 10 artykułów",
        icon: "📚",
        unlockedAt: "",
        rarity: "common",
      },
      {
        id: "read_50",
        title: "Bibliotekarz",
        description: "Przeczytaj 50 artykułów",
        icon: "🏛️",
        unlockedAt: "",
        rarity: "rare",
      },
      {
        id: "streak_7",
        title: "Tydzień Mocy",
        description: "Czytaj 7 dni z rzędu",
        icon: "🔥",
        unlockedAt: "",
        rarity: "rare",
      },
      {
        id: "streak_30",
        title: "Miesiąc Wiedzy",
        description: "Czytaj 30 dni z rzędu",
        icon: "💎",
        unlockedAt: "",
        rarity: "epic",
      },
      {
        id: "share_10",
        title: "Ambasador",
        description: "Udostępnij 10 artykułów",
        icon: "🌟",
        unlockedAt: "",
        rarity: "rare",
      },
      {
        id: "referral_5",
        title: "Influencer",
        description: "Zaproś 5 znajomych",
        icon: "👥",
        unlockedAt: "",
        rarity: "epic",
      },
      {
        id: "level_10",
        title: "Ekspert KSeF",
        description: "Osiągnij poziom 10",
        icon: "🎓",
        unlockedAt: "",
        rarity: "epic",
      },
      {
        id: "complete_category",
        title: "Specjalista",
        description: "Przeczytaj wszystkie artykuły z kategorii",
        icon: "🏆",
        unlockedAt: "",
        rarity: "legendary",
      },
    ]

    const conditions: Record<string, (val: number) => boolean> = {
      first_read: (val) => val >= 1,
      read_10: (val) => val >= 10,
      read_50: (val) => val >= 50,
      streak_7: (val) => val >= 7,
      streak_30: (val) => val >= 30,
      share_10: (val) => val >= 10,
      referral_5: (val) => val >= 5,
      level_10: (val) => val >= 10,
      complete_category: (val) => val >= 1,
    }

    for (const achievement of allAchievements) {
      if (!unlockedIds.includes(achievement.id) && conditions[achievement.id]?.(value)) {
        achievement.unlockedAt = new Date().toISOString()
        achievements.push(achievement)
        localStorage.setItem("ksef_achievements", JSON.stringify(achievements))
        return achievement
      }
    }

    return null
  },

  getAll: (): Achievement[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem("ksef_achievements")
    return data ? JSON.parse(data) : []
  },
}

// Social Sharing with Attribution
export const socialSharing = {
  share: (article: { title: string; slug: string }, platform: "twitter" | "linkedin" | "facebook" | "email") => {
    const url = `${window.location.origin}/article/${article.slug}`
    const text = `${article.title} - Przeczytaj na KSEF.EXPERT`

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
    }

    // Track share event
    socialSharing.trackShare(article.slug, platform)

    // Add points for sharing
    knowledgeScoreSystem.addPoints("share", 1)

    // Open share window
    if (platform !== "email") {
      window.open(shareUrls[platform], "_blank", "width=600,height=400")
    } else {
      window.location.href = shareUrls[platform]
    }
  },

  copyLink: (article: { title: string; slug: string }) => {
    const url = `${window.location.origin}/article/${article.slug}`
    navigator.clipboard.writeText(url)
    socialSharing.trackShare(article.slug, "copy")
    knowledgeScoreSystem.addPoints("share", 1)
  },

  trackShare: (articleSlug: string, platform: "twitter" | "linkedin" | "facebook" | "email" | "copy") => {
    const shares = socialSharing.getShares()
    shares.push({
      articleSlug,
      platform,
      timestamp: new Date().toISOString(),
      referralCode: referralSystem.generateReferralCode("user"),
    })
    localStorage.setItem("ksef_shares", JSON.stringify(shares))
  },

  getShares: (): ShareEvent[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem("ksef_shares")
    return data ? JSON.parse(data) : []
  },

  getShareCount: (articleSlug: string): number => {
    return socialSharing.getShares().filter((s) => s.articleSlug === articleSlug).length
  },
}

// Leaderboard System
export const leaderboardSystem = {
  getTopReaders: (limit = 10) => {
    // Mock data - in production, this would come from a backend
    return [
      { name: "Jan Kowalski", points: 5420, level: 11, avatar: "/placeholder.svg" },
      { name: "Anna Nowak", points: 4890, level: 10, avatar: "/placeholder.svg" },
      { name: "Piotr Wiśniewski", points: 4320, level: 9, avatar: "/placeholder.svg" },
      { name: "Maria Wójcik", points: 3850, level: 8, avatar: "/placeholder.svg" },
      { name: "Tomasz Kamiński", points: 3420, level: 7, avatar: "/placeholder.svg" },
    ].slice(0, limit)
  },

  getUserRank: (): number => {
    const score = knowledgeScoreSystem.getScore()
    const topReaders = leaderboardSystem.getTopReaders(100)
    const userRank = topReaders.findIndex((r) => r.points < score.totalPoints)
    return userRank === -1 ? topReaders.length + 1 : userRank + 1
  },
}
