import { defineStore } from 'pinia'

export const useFeaturesStore = defineStore('features', {
  state: () => ({
    features: [
      {
        id: 'mobile-app',
        name: 'Mobile App',
        enabled: true
      },
      {
        id: 'website',
        name: 'Website',
        enabled: true
      }
    ]
  }),

  getters: {
    isMobileAppEnabled: (state) => {
      const feature = state.features.find(f => f.id === 'mobile-app')
      return feature ? feature.enabled : true
    },
    
    isWebsiteEnabled: (state) => {
      const feature = state.features.find(f => f.id === 'website')
      return feature ? feature.enabled : true
    }
  },

  actions: {
    loadFromLocalStorage() {
      if (process.client) {
        const saved = localStorage.getItem('astrone-features')
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            this.features = this.features.map(feature => {
              const savedFeature = parsed.find(s => s.id === feature.id)
              return savedFeature ? { ...feature, enabled: savedFeature.enabled } : feature
            })
          } catch (error) {
            console.error('Error loading features from localStorage:', error)
          }
        }
      }
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('astrone-features', JSON.stringify(this.features))
      }
    },

    updateFeature(id, enabled) {
      const feature = this.features.find(f => f.id === id)
      if (feature) {
        feature.enabled = enabled
        this.saveToLocalStorage()
      }
    }
  }
})
