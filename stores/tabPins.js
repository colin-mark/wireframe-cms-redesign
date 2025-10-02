import { defineStore } from 'pinia'

const STORAGE_KEY = 'astrone-pinned-tabs'
const MAX_PINS = 10

export const useTabPinsStore = defineStore('tabPins', {
  state: () => ({
    pinnedTabs: []
  }),

  actions: {
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
          this.pinnedTabs = parsed
            .filter(item => item && item.name && item.path)
            .slice(0, MAX_PINS)
        }
      } catch (error) {
        console.warn('Unable to load pinned tabs from storage', error)
      }
    },

    persist() {
      if (!process.client) {
        return
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.pinnedTabs))
      } catch (error) {
        console.warn('Unable to persist pinned tabs to storage', error)
      }
    },

    pin(tab) {
      if (!tab || !tab.name || !tab.path) {
        return
      }

      const normalized = {
        name: tab.name,
        path: tab.path
      }

      const exists = this.pinnedTabs.some(item => item.path === normalized.path)
      if (exists) {
        return
      }

      this.pinnedTabs = [normalized, ...this.pinnedTabs].slice(0, MAX_PINS)
      this.persist()
    },

    unpin(path) {
      if (!path) {
        return
      }

      const next = this.pinnedTabs.filter(item => item.path !== path)
      if (next.length === this.pinnedTabs.length) {
        return
      }

      this.pinnedTabs = next
      this.persist()
    }
  }
})
