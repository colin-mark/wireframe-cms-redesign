import { defineStore } from 'pinia'

export const useGeneralSettingsStore = defineStore('generalSettings', {
  state: () => ({
    settings: [
      {
        id: 'cms-new-design',
        name: 'CMS New Design',
        enabled: true
      }
    ],
    hasLoaded: false
  }),
  getters: {
    isNewDesignEnabled: (state) => {
      const setting = state.settings.find((s) => s.id === 'cms-new-design')
      return setting ? setting.enabled : true
    }
  },
  actions: {
    loadFromLocalStorage() {
      if (process.client) {
        const saved = localStorage.getItem('astrone-general-settings')
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            this.settings = this.settings.map(setting => {
              const savedSetting = parsed.find(s => s.id === setting.id)
              return savedSetting ? { ...setting, enabled: savedSetting.enabled } : setting
            })
          } catch (error) {
            console.error('Error loading general settings from localStorage:', error)
          }
        }
        this.hasLoaded = true
      }
    },

    ensureLoaded() {
      if (!this.hasLoaded) {
        this.loadFromLocalStorage()
      }
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('astrone-general-settings', JSON.stringify(this.settings))
      }
    },

    updateSetting(id, enabled) {
      const setting = this.settings.find(s => s.id === id)
      if (setting) {
        setting.enabled = enabled
        this.saveToLocalStorage()
      }
      this.hasLoaded = true
    }
  }
})
