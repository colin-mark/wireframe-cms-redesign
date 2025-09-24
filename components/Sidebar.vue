<template>
  <aside class="w-64 bg-astra-gray-50 border-r border-astra-slate-300 h-full overflow-y-auto">
    <nav class="p-4 space-y-2">
      <!-- Navigation Items -->
      <div v-for="item in currentSidebarItems" :key="item.name" class="space-y-1">
        <!-- Section Header -->
        <div v-if="item.isSection" :class="getSectionSpacing(item, currentSidebarItems)">
          <h3 class="text-xs font-semibold text-astra-gray-400 uppercase tracking-wider px-3">
            {{ item.name }}
          </h3>
        </div>
        
        <!-- Main Item -->
        <div 
          v-else
          class="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors group"
          :class="item.isActive 
            ? 'bg-astra-blue-50 text-astra-blue' 
            : 'text-astra-gray-700 hover:bg-astra-white hover:text-astra-gray-900'"
        >
          <NuxtLink 
            :to="item.route || '#'"
            class="flex items-center space-x-3 flex-1"
          >
            <component 
              :is="item.icon" 
              class="w-5 h-5 flex-shrink-0"
              :class="item.isActive ? 'text-astra-blue' : 'text-astra-gray-600'"
            />
            <span class="text-sm font-medium">{{ item.name }}</span>
          </NuxtLink>
          
          <ChevronDownIcon 
            v-if="item.children"
            class="w-4 h-4 transition-transform cursor-pointer"
            :class="[
              item.isExpanded ? 'rotate-180' : '',
              item.isActive ? 'text-astra-blue' : 'text-astra-gray-600'
            ]"
            @click="toggleExpanded(item)"
          />
        </div>
        
        <!-- Sub Items -->
        <div 
          v-if="item.children && item.isExpanded" 
          class="ml-8 space-y-1 border-l border-astra-slate-300 pl-4"
        >
          <div v-for="subItem in item.children" :key="subItem.name" class="space-y-1">
            <!-- Sub Item with potential children -->
            <div class="flex items-center justify-between">
              <NuxtLink
                :to="subItem.route || '#'"
                class="flex-1 px-3 py-2 rounded-lg cursor-pointer transition-colors"
                :class="subItem.isActive 
                  ? 'bg-astra-blue-50 text-astra-blue' 
                  : 'text-astra-gray-600 hover:bg-astra-white hover:text-astra-gray-900'"
              >
                <span class="text-sm">{{ subItem.name }}</span>
              </NuxtLink>
              
              <ChevronDownIcon 
                v-if="subItem.children"
                class="w-3 h-3 transition-transform cursor-pointer mr-3"
                :class="[
                  subItem.isExpanded ? 'rotate-180' : '',
                  subItem.isActive ? 'text-astra-blue' : 'text-astra-gray-600'
                ]"
                @click="toggleExpanded(subItem)"
              />
            </div>
            
            <!-- Sub-Sub Items (Grandchildren) -->
            <div 
              v-if="subItem.children && subItem.isExpanded" 
              class="ml-6 space-y-1 border-l border-astra-slate-300 pl-3"
            >
              <NuxtLink
                v-for="grandChild in subItem.children" 
                :key="grandChild.name"
                :to="grandChild.route || '#'"
                class="block px-3 py-1 rounded-lg cursor-pointer transition-colors"
                :class="grandChild.isActive 
                  ? 'bg-astra-blue-50 text-astra-blue' 
                  : 'text-astra-gray-500 hover:bg-astra-white hover:text-astra-gray-700'"
              >
                <span class="text-xs">{{ grandChild.name }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFeaturesStore } from '~/stores/features'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { sidebarItemsMap, filterSidebarItems } from '~/utils/sidebar-items'

const route = useRoute()
const featuresStore = useFeaturesStore()

// Load features from localStorage on component mount
if (process.client) {
  featuresStore.loadFromLocalStorage()
}


// Reactive sidebar items
const currentSidebarItems = ref([])

// Function to update sidebar items based on route
const updateSidebarItems = () => {
  let items = []
  
  // Check if the current route path exactly matches a key in sidebarItemsMap
  if (sidebarItemsMap[route.path]) {
    items = JSON.parse(JSON.stringify(sidebarItemsMap[route.path]))
  } else {
    // If not, find a matching parent route (e.g., /home/hsnb1 should match /home)
    const parentRoute = Object.keys(sidebarItemsMap).find(key => route.path.startsWith(key) && key !== '/')
    if (parentRoute) {
      // Deep clone to avoid modifying the original map
      items = JSON.parse(JSON.stringify(sidebarItemsMap[parentRoute]))
      // Find and activate the current item or its parent
      items.forEach(item => {
        item.isActive = item.route === route.path
        if (item.children) {
          item.children.forEach(subItem => {
            subItem.isActive = subItem.route === route.path
            if (subItem.isActive) {
              item.isExpanded = true // Expand parent if sub-item is active
            }
          })
        }
      })
    } else {
      // Fallback to home sidebar if no match
      items = JSON.parse(JSON.stringify(sidebarItemsMap['/']))
    }
  }
  
  // Apply feature filtering
  items = filterSidebarItems(items, featuresStore)
  
  currentSidebarItems.value = items
}

// Watch for route changes and feature changes
watch(() => route.path, updateSidebarItems, { immediate: true })
watch(() => featuresStore.isWebsiteEnabled, updateSidebarItems)
watch(() => featuresStore.isMobileAppEnabled, updateSidebarItems)

// Function to determine section spacing based on position
const getSectionSpacing = (item, items) => {
  const index = items.findIndex(i => i === item)
  const isFirstSection = index === 0 || !items.slice(0, index).some(i => i.isSection)
  
  // First section gets less padding, subsequent sections get more
  return isFirstSection ? 'pt-4 pb-2' : 'pt-8 pb-2'
}

// Toggle expanded state for items with children
const toggleExpanded = (item) => {
  if (item.children) {
    item.isExpanded = !item.isExpanded
  }
}
</script>
