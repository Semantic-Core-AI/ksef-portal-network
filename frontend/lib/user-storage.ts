export interface UserData {
  readArticles: string[] // article slugs
  bookmarkedArticles: string[] // article slugs
  readingHistory: Array<{
    slug: string
    timestamp: number
  }>
}

const STORAGE_KEY = "ksef_user_data"

export function getUserData(): UserData {
  if (typeof window === "undefined") {
    return { readArticles: [], bookmarkedArticles: [], readingHistory: [] }
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error reading user data:", error)
  }

  return { readArticles: [], bookmarkedArticles: [], readingHistory: [] }
}

export function saveUserData(data: UserData): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving user data:", error)
  }
}

export function markArticleAsRead(slug: string): void {
  const data = getUserData()
  if (!data.readArticles.includes(slug)) {
    data.readArticles.push(slug)
    saveUserData(data)
  }
}

export function isArticleRead(slug: string): boolean {
  const data = getUserData()
  return data.readArticles.includes(slug)
}

export function toggleBookmark(slug: string): boolean {
  const data = getUserData()
  const index = data.bookmarkedArticles.indexOf(slug)

  if (index > -1) {
    data.bookmarkedArticles.splice(index, 1)
    saveUserData(data)
    return false
  } else {
    data.bookmarkedArticles.push(slug)
    saveUserData(data)
    return true
  }
}

export function isArticleBookmarked(slug: string): boolean {
  const data = getUserData()
  return data.bookmarkedArticles.includes(slug)
}

export function addToReadingHistory(slug: string): void {
  const data = getUserData()

  // Remove existing entry if present
  data.readingHistory = data.readingHistory.filter((item) => item.slug !== slug)

  // Add to beginning
  data.readingHistory.unshift({
    slug,
    timestamp: Date.now(),
  })

  // Keep only last 20 items
  data.readingHistory = data.readingHistory.slice(0, 20)

  saveUserData(data)
}

export function getReadingHistory(): Array<{ slug: string; timestamp: number }> {
  const data = getUserData()
  return data.readingHistory
}
