const BOOKMARKS_KEY = 'atlas_bookmarked_datasets'
const PREFERENCES_KEY = 'atlas_user_preferences'

export interface UserPreferences {
  viewMode: 'grid' | 'table'
  defaultDomain: string
  enableSoundEffects: boolean
  reducedMotion: boolean
}

export function getBookmarks(): string[] {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY)
    return data ? JSON.parse(data) : ['ds-aral-sea', 'ds-arctic-permafrost']
  } catch {
    return ['ds-aral-sea', 'ds-arctic-permafrost']
  }
}

export function toggleBookmark(datasetId: string): string[] {
  try {
    const current = getBookmarks()
    const updated = current.includes(datasetId)
      ? current.filter(id => id !== datasetId)
      : [...current, datasetId]
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated))
    return updated
  } catch {
    return []
  }
}

export function isDatasetBookmarked(datasetId: string): boolean {
  return getBookmarks().includes(datasetId)
}

export function getUserPreferences(): UserPreferences {
  try {
    const data = localStorage.getItem(PREFERENCES_KEY)
    if (data) return JSON.parse(data)
  } catch {
    // fallback
  }
  return {
    viewMode: 'grid',
    defaultDomain: 'All',
    enableSoundEffects: false,
    reducedMotion: false,
  }
}

export function saveUserPreferences(prefs: Partial<UserPreferences>): UserPreferences {
  try {
    const current = getUserPreferences()
    const updated = { ...current, ...prefs }
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated))
    return updated
  } catch {
    return getUserPreferences()
  }
}
