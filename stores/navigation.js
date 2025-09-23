import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    sidebarExpanded: true,
    activeTab: 'one',
    activeSidebarItem: null
  }),
  
  actions: {
    toggleSidebar() {
      this.sidebarExpanded = !this.sidebarExpanded
    },
    
    setActiveTab(tab) {
      this.activeTab = tab
    },
    
    setActiveSidebarItem(item) {
      this.activeSidebarItem = item
    }
  }
})
