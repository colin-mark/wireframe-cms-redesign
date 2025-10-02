import { defineStore } from 'pinia'

const STORAGE_KEY = 'astrone-tab-history'
const MAX_HISTORY = 5
const SKIP_ROUTES = new Set(['/','/home/dashboard','/website-layout/navigation'])

export const useTabHistoryStore = defineStore('tabHistory', {
  state: () => ({
    recentTabs: []
  }),

  actions: {
    recordVisit(tab) {
      if (!tab || !tab.name || !tab.path) {
        return
      }

      const normalized = {
        name: tab.name,
        path: tab.path
      }

      if (SKIP_ROUTES.has(normalized.path)) {
        return
      }

      const next = [
        normalized,
        ...this.recentTabs.filter(item => item.path !== normalized.path)
      ].slice(0, MAX_HISTORY)

      const isSameOrder =
        this.recentTabs.length === next.length &&
        this.recentTabs.every((item, index) => item.path === next[index].path)

      if (isSameOrder) {
        return
      }

      this.recentTabs = next

      this.persist()
    },

    load() {
      if (!process.client) {
        return
      }

      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        return
      }

      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          this.recentTabs = parsed
            .filter(item => item && item.name && item.path && !SKIP_ROUTES.has(item.path))
            .slice(0, MAX_HISTORY)
        }
      } catch (error) {
        console.warn('Unable to parse tab history from storage', error)
      }
    },

    persist() {
      if (!process.client) {
        return
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.recentTabs))
      } catch (error) {
        console.warn('Unable to persist tab history to storage', error)
      }
    }
  }
})
