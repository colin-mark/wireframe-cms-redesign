<template>
  <aside
    :class="[
      baseSidebarClass,
      isNewDesignEnabled
        ? 'bg-astra-gray-50 border-astra-slate-300'
        : 'bg-white border-[#D9E7FB] shadow-[4px_0_24px_rgba(70,95,255,0.1)]'
    ]"
  >
    <nav class="p-4 space-y-2">
      <!-- Navigation Items -->
      <div v-for="item in currentSidebarItems" :key="item.name" class="space-y-1">
        <!-- Section Header -->
        <div v-if="item.isSection" :class="getSectionSpacing(item, currentSidebarItems)">
          <div
            v-if="item.__pinnedSection"
            class="flex items-center justify-between px-3"
          >
            <h3
              :class="[
                'text-xs font-semibold uppercase tracking-wider transition-colors duration-300',
                isNewDesignEnabled ? 'text-astra-gray-400' : 'text-[#667085]'
              ]"
            >
              {{ item.name }}
            </h3>
            <button
              type="button"
              :class="[
                'inline-flex h-6 w-6 items-center justify-center rounded-full border transition-colors duration-200',
                isNewDesignEnabled
                  ? 'border-astra-slate-300 text-astra-gray-500 hover:text-astra-blue hover:border-astra-blue'
                  : 'border-[#D9E7FB] text-[#667085] hover:text-[#1E6AE1] hover:border-[#1E6AE1]'
              ]"
              @click.stop="openPinPicker"
            >
              <PlusIcon class="h-4 w-4" />
            </button>
          </div>
          <h3
            v-else
            :class="[
              'text-xs font-semibold uppercase tracking-wider px-3 transition-colors duration-300',
              isNewDesignEnabled ? 'text-astra-gray-400' : 'text-[#667085]'
            ]"
          >
            {{ item.name }}
          </h3>
        </div>
        
        <!-- Main Item -->
        <div 
          v-else
          :class="[
            mainItemBaseClass,
            getMainItemClasses(item)
          ]"
        >
          <NuxtLink 
            :to="item.route || '#'"
            class="flex items-center space-x-3 flex-1"
          >
            <component 
              v-if="item.icon"
              :is="item.icon" 
              :class="[
                'w-5 h-5 flex-shrink-0 transition-colors duration-300',
                getIconClasses(item)
              ]"
            />
            <span
              :class="[
                'text-sm font-medium transition-colors duration-300',
                item.isActive
                  ? (isNewDesignEnabled ? 'text-astra-blue' : 'text-[#465FFF]')
                  : (isNewDesignEnabled ? 'text-astra-gray-700' : 'text-[#374151]')
              ]"
            >
              {{ item.name }}
            </span>
          </NuxtLink>
          
          <ChevronDownIcon 
            v-if="item.children"
            class="w-4 h-4 transition-transform cursor-pointer"
            :class="[
              item.isExpanded ? 'rotate-180' : '',
              item.isActive
                ? (isNewDesignEnabled ? 'text-astra-blue' : 'text-[#465FFF]')
                : (isNewDesignEnabled ? 'text-astra-gray-600' : 'text-[#667085]')
            ]"
            @click="toggleExpanded(item)"
          />

          <button
            v-if="item.__pinnedItem"
            type="button"
            :class="[
              'ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-200',
              isNewDesignEnabled
                ? 'text-astra-gray-500 hover:text-astra-blue hover:bg-astra-blue-50'
                : 'text-[#667085] hover:text-[#1E6AE1] hover:bg-[#DDEBFF]'
            ]"
            @click.stop="unpinFromList(item.route)"
            aria-label="Unpin tab"
          >
            <XMarkIcon class="h-4 w-4" />
          </button>
        </div>
        
        <!-- Sub Items -->
        <div 
          v-if="item.children && item.isExpanded" 
          :class="[
            'ml-8 space-y-1 border-l pl-4 transition-colors duration-300',
            isNewDesignEnabled ? 'border-astra-slate-300' : 'border-[#D9E7FB]'
          ]"
        >
          <div v-for="subItem in item.children" :key="subItem.name" class="space-y-1">
            <!-- Sub Item with potential children -->
            <div class="flex items-center justify-between">
              <NuxtLink
                :to="subItem.route || '#'"
                :class="[
                  'flex-1 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200',
                  getSubItemClasses(subItem)
                ]"
              >
                <span
                  :class="[
                    'text-sm transition-colors duration-300',
                    subItem.isActive
                      ? (isNewDesignEnabled ? 'text-astra-blue' : 'text-[#465FFF]')
                      : (isNewDesignEnabled ? 'text-astra-gray-600' : 'text-[#4B5563]')
                  ]"
                >
                  {{ subItem.name }}
                </span>
              </NuxtLink>
              
              <ChevronDownIcon 
                v-if="subItem.children"
                class="w-3 h-3 transition-transform cursor-pointer mr-3"
                :class="[
                  subItem.isExpanded ? 'rotate-180' : '',
                  subItem.isActive
                    ? (isNewDesignEnabled ? 'text-astra-blue' : 'text-[#465FFF]')
                    : (isNewDesignEnabled ? 'text-astra-gray-600' : 'text-[#667085]')
                ]"
                @click="toggleExpanded(subItem)"
              />
            </div>
            
            <!-- Sub-Sub Items (Grandchildren) -->
            <div 
              v-if="subItem.children && subItem.isExpanded" 
              :class="[
                'ml-6 space-y-1 border-l pl-3 transition-colors duration-300',
                isNewDesignEnabled ? 'border-astra-slate-300' : 'border-[#D9E7FB]'
              ]"
            >
              <NuxtLink
                v-for="grandChild in subItem.children" 
                :key="grandChild.name"
                :to="grandChild.route || '#'"
                :class="[
                  'block px-3 py-1 rounded-lg cursor-pointer transition-colors duration-200 text-xs',
                  getGrandChildClasses(grandChild)
                ]"
              >
                {{ grandChild.name }}
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>
    </nav>
  </aside>

  <Teleport to="body">
    <div v-if="isPinPickerOpen" class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-black/40" @click="closePinPicker" />

      <div
        :class="[
          'absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-6 shadow-lg transition-colors duration-300',
          isNewDesignEnabled
            ? 'bg-astra-white border-astra-slate-300'
            : 'bg-white border-[#D9E7FB]'
        ]"
      >
        <div class="flex items-center justify-between">
          <h2
            :class="[
              'text-lg font-semibold transition-colors duration-300',
              isNewDesignEnabled ? 'text-astra-gray-800' : 'text-[#1E6AE1]'
            ]"
          >
            Pin Tabs
          </h2>
          <button
            type="button"
            :class="[
              'inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200',
              isNewDesignEnabled
                ? 'text-astra-gray-500 hover:text-astra-gray-800 hover:bg-astra-gray-100'
                : 'text-[#667085] hover:text-[#0F4CAD] hover:bg-[#DDEBFF]'
            ]"
            @click="closePinPicker"
            aria-label="Close pin tabs"
          >
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>

        <div class="mt-4">
          <input
            v-model="pinSearchQuery"
            type="search"
            placeholder="Search tabs..."
            :class="[
              'w-full rounded-lg px-4 py-2 text-sm transition-colors duration-300 focus:outline-none focus:ring-2',
              isNewDesignEnabled
                ? 'border border-astra-slate-300 focus:ring-astra-blue'
                : 'border border-[#D9E7FB] focus:ring-[#465FFF]'
            ]"
          />
        </div>

        <div class="mt-4 max-h-80 overflow-y-auto">
          <p
            v-if="!filteredPinOptions.length"
            :class="[
              'py-8 text-center text-sm transition-colors duration-300',
              isNewDesignEnabled ? 'text-astra-gray-500' : 'text-[#667085]'
            ]"
          >
            No tabs found.
          </p>
          <ul v-else class="space-y-2">
            <li
              v-for="option in filteredPinOptions"
              :key="option.path"
              :class="[
                'flex items-center justify-between rounded-lg border px-3 py-2 transition-colors duration-200',
                isPinned(option.path)
                  ? (isNewDesignEnabled ? 'border-astra-blue bg-astra-blue-50 text-astra-blue' : 'border-[#1E6AE1] bg-[#DDEBFF] text-[#1E6AE1]')
                  : (isNewDesignEnabled ? 'border-astra-slate-300 text-astra-gray-700 hover:border-astra-blue hover:bg-astra-blue-25 hover:text-astra-blue' : 'border-[#D9E7FB] text-[#1E6AE1] hover:border-[#1E6AE1] hover:bg-[#ECF4FF]')
              ]"
            >
              <div class="flex items-center space-x-3">
                <component
                  v-if="option.icon"
                  :is="option.icon"
                  class="h-5 w-5"
                />
                <span class="text-sm font-medium">{{ option.name }}</span>
              </div>
              <button
                type="button"
                :class="[
                  'inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200',
                  isPinned(option.path)
                    ? (isNewDesignEnabled ? 'bg-astra-blue text-astra-white hover:bg-astra-blue/90' : 'bg-[#1E6AE1] text-white hover:bg-[#0F4CAD]')
                    : (isNewDesignEnabled ? 'bg-astra-gray-100 text-astra-gray-700 hover:bg-astra-blue hover:text-astra-white' : 'bg-[#ECF4FF] text-[#1E6AE1] hover:bg-[#1E6AE1] hover:text-white')
                ]"
                @click="togglePinnedState(option)"
                :aria-label="isPinned(option.path) ? 'Unpin tab' : 'Pin tab'"
              >
                <template v-if="isPinned(option.path)">
                  <XMarkIcon class="h-4 w-4" />
                </template>
                <template v-else>
                  <PlusIcon class="h-4 w-4" />
                </template>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFeaturesStore } from '~/stores/features'
import { ChevronDownIcon, PlusIcon, XMarkIcon, HomeIcon, RectangleStackIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, CogIcon } from '@heroicons/vue/24/outline'
import { sidebarItemsMap, filterSidebarItems, getAllSidebarLinks } from '~/utils/sidebar-items'
import { useGeneralSettingsStore } from '~/stores/generalSettings'
import { useTabHistoryStore } from '~/stores/tabHistory'
import { useTabPinsStore } from '~/stores/tabPins'

const route = useRoute()
const featuresStore = useFeaturesStore()
const generalSettingsStore = useGeneralSettingsStore()
const tabHistoryStore = useTabHistoryStore()
const tabPinsStore = useTabPinsStore()

// Load features from localStorage on component mount
if (process.client) {
  featuresStore.loadFromLocalStorage()
  generalSettingsStore.ensureLoaded()
  tabHistoryStore.load()
  tabPinsStore.load()
}

onMounted(() => {
  generalSettingsStore.ensureLoaded()
  tabHistoryStore.load()
  tabPinsStore.load()
})


// Reactive sidebar items
const currentSidebarItems = ref([])
const isNewDesignEnabled = computed(() => generalSettingsStore.isNewDesignEnabled)
const recentTabs = computed(() => tabHistoryStore.recentTabs)
const pinnedTabs = computed(() => tabPinsStore.pinnedTabs)
const baseSidebarClass = 'w-64 h-full overflow-y-auto border-r transition-colors duration-300'
const mainItemBaseClass = 'flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 group'

const getMainItemClasses = (item) => {
  if (isNewDesignEnabled.value) {
    return item.isActive
      ? 'bg-astra-blue-50 text-astra-blue'
      : 'text-astra-gray-700 hover:bg-astra-white hover:text-astra-gray-900'
  }
  return item.isActive
    ? 'bg-[#DDEBFF] text-[#1E6AE1] border border-[#1E6AE1]'
    : 'text-[#1E6AE1] hover:bg-[#ECF4FF] hover:text-[#0F4CAD] border border-transparent'
}

const getIconClasses = (item) => {
  if (item.isActive) {
    return isNewDesignEnabled.value ? 'text-astra-blue' : 'text-[#1E6AE1]'
  }
  return isNewDesignEnabled.value ? 'text-astra-gray-600' : 'text-[#4F6075]'
}

const getSubItemClasses = (subItem) => {
  if (isNewDesignEnabled.value) {
    return subItem.isActive
      ? 'bg-astra-blue-50'
      : 'text-astra-gray-600 hover:bg-astra-white hover:text-astra-gray-900'
  }
  return subItem.isActive
    ? 'bg-[#DDEBFF] text-[#1E6AE1] border border-[#1E6AE1]'
    : 'text-[#1E6AE1] hover:bg-[#ECF4FF] hover:text-[#0F4CAD] border border-transparent'
}

const getGrandChildClasses = (grandChild) => {
  if (isNewDesignEnabled.value) {
    return grandChild.isActive
      ? 'bg-astra-blue-50 text-astra-blue'
      : 'text-astra-gray-500 hover:bg-astra-white hover:text-astra-gray-700'
  }
  return grandChild.isActive
    ? 'bg-[#DDEBFF] text-[#1E6AE1]'
    : 'text-[#1E6AE1] hover:bg-[#ECF4FF] hover:text-[#0F4CAD]'
}

const routeIconCache = new Map()

const topNavigationTabs = [
  { name: 'Home', route: '/home/dashboard', icon: HomeIcon },
  { name: 'Content', route: '/content', icon: DocumentTextIcon },
  { name: 'Layout', route: '/website-layout', icon: RectangleStackIcon },
  { name: 'Messaging', route: '/messaging', icon: ChatBubbleLeftRightIcon, requiresMobileApp: true },
  { name: 'Settings', route: '/settings', icon: CogIcon }
]

const isPinPickerOpen = ref(false)
const pinSearchQuery = ref('')

const searchIconInItems = (items = [], targetRoute, parentIcon = null) => {
  for (const item of items) {
    if (!item || item.isSection) {
      continue
    }

    const icon = item.icon || parentIcon || null

    if (item.route === targetRoute) {
      return icon
    }

    if (item.children) {
      const childIcon = searchIconInItems(item.children, targetRoute, icon)
      if (childIcon) {
        return childIcon
      }
    }
  }

  return null
}

const getIconForRoute = (route) => {
  if (!route) {
    return null
  }

  if (routeIconCache.has(route)) {
    return routeIconCache.get(route)
  }

  let icon = null

  const values = Object.values(sidebarItemsMap)
  for (let i = 0; i < values.length; i += 1) {
    icon = searchIconInItems(values[i], route)
    if (icon) {
      break
    }
  }

  routeIconCache.set(route, icon)
  return icon
}

const allSidebarLinks = computed(() => getAllSidebarLinks(featuresStore))

const availablePinOptions = computed(() => {
  const dedup = new Map()

  for (const link of allSidebarLinks.value) {
    if (!link.route) {
      continue
    }

    const icon = getIconForRoute(link.route)
    dedup.set(link.route, {
      name: link.name,
      route: link.route,
      path: link.route,
      icon
    })
  }

  for (const tab of topNavigationTabs) {
    if (tab.requiresMobileApp && !featuresStore.isMobileAppEnabled) {
      continue
    }

    const route = tab.route
    if (!dedup.has(route)) {
      dedup.set(route, {
        name: tab.name,
        route,
        path: route,
        icon: tab.icon
      })
    }
  }

  return Array.from(dedup.values()).sort((a, b) => a.name.localeCompare(b.name))
})

const filteredPinOptions = computed(() => {
  const query = pinSearchQuery.value.trim().toLowerCase()
  if (!query) {
    return availablePinOptions.value
  }

  return availablePinOptions.value.filter(option => option.name.toLowerCase().includes(query))
})

const openPinPicker = () => {
  isPinPickerOpen.value = true
}

const closePinPicker = () => {
  isPinPickerOpen.value = false
  pinSearchQuery.value = ''
}

const isPinned = (routePath) => pinnedTabs.value.some(tab => tab.path === routePath)

const togglePinnedState = (option) => {
  if (!option || !option.path) {
    return
  }

  if (isPinned(option.path)) {
    tabPinsStore.unpin(option.path)
  } else {
    tabPinsStore.pin({ name: option.name, path: option.path })
  }
}

const unpinFromList = (routePath) => {
  tabPinsStore.unpin(routePath)
}

const findActiveSidebarItem = (items = []) => {
  for (const item of items) {
    if (item.isSection) {
      continue
    }

    if (item.isActive && item.route) {
      return item
    }

    if (item.children) {
      const child = findActiveSidebarItem(item.children)
      if (child) {
        return child
      }
    }
  }

  return null
}

const recordSidebarVisit = (items = []) => {
  const activeItem = findActiveSidebarItem(items)
  if (!activeItem || !activeItem.route) {
    return
  }

  if (activeItem.route === '/home/dashboard') {
    return
  }

  tabHistoryStore.recordVisit({
    name: activeItem.name,
    path: activeItem.route
  })
}

const findItemByRoute = (items = [], targetRoute, parent = null) => {
  for (const item of items) {
    if (item.isSection) {
      continue
    }

    if (item.route === targetRoute) {
      return { item, parent }
    }

    if (item.children) {
      const result = findItemByRoute(item.children, targetRoute, item)
      if (result) {
        return result
      }
    }
  }

  return null
}

const injectRecentTabsSection = (items = []) => {
  const dashboardIndex = items.findIndex(item => item.route === '/home/dashboard')
  if (dashboardIndex === -1) {
    return items
  }

  const validRecentTabs = recentTabs.value.filter(tab => tab && tab.name && tab.path)

  const recentSectionEntry = {
    name: 'Recently Visited',
    isSection: true,
    __recentSection: true
  }

  const recentItems = validRecentTabs.map(tab => {
    const match = findItemByRoute(items, tab.path)
    const icon = match?.item?.icon || match?.parent?.icon || getIconForRoute(tab.path)

    return {
      name: tab.name,
      route: tab.path,
      icon,
      isActive: false,
      isExpanded: false,
      __recentItem: true
    }
  })

  const pinnedSectionEntry = {
    name: 'Pinned Tabs',
    isSection: true,
    __pinnedSection: true
  }

  const pinnedItemsEntries = pinnedTabs.value.map(tab => {
    const icon = tab.icon || getIconForRoute(tab.path)
    return {
      name: tab.name,
      route: tab.path,
      icon,
      isActive: false,
      isExpanded: false,
      __pinnedItem: true
    }
  })

  const toInsert = []

  if (recentItems.length) {
    toInsert.push(recentSectionEntry, ...recentItems)
  }

  toInsert.push(pinnedSectionEntry)
  if (pinnedItemsEntries.length) {
    toInsert.push(...pinnedItemsEntries)
  }

  if (!toInsert.length) {
    return items
  }

  const result = [...items]
  result.splice(dashboardIndex + 1, 0, ...toInsert)
  return result
}

// Function to update sidebar items based on route
const cloneItems = (items = []) => {
  return items.map(item => {
    const cloned = {
      ...item,
      // Ensure we keep icon/component references
      icon: item.icon,
      children: item.children ? cloneItems(item.children) : undefined
    }
    return cloned
  })
}

const markActiveItems = (items) => {
  items.forEach(item => {
    const previouslyExpanded = item.isExpanded
    item.isActive = item.route === route.path
    if (item.children) {
      markActiveItems(item.children)
      const childExpanded = item.children.some(child => child.isActive || child.isExpanded)
      item.isExpanded = childExpanded || previouslyExpanded
    }
  })
}

const updateSidebarItems = () => {
  let items = []

  if (sidebarItemsMap[route.path]) {
    items = cloneItems(sidebarItemsMap[route.path])
  } else {
    const parentRoute = Object.keys(sidebarItemsMap).find(key => route.path.startsWith(key) && key !== '/')
    if (parentRoute) {
      items = cloneItems(sidebarItemsMap[parentRoute])
    } else {
      items = cloneItems(sidebarItemsMap['/'])
    }
  }

  items = filterSidebarItems(items, featuresStore)
  markActiveItems(items)
  recordSidebarVisit(items)
  items = injectRecentTabsSection(items)
  markActiveItems(items)
  currentSidebarItems.value = items
}

// Watch for route changes and feature changes
watch(() => route.path, updateSidebarItems, { immediate: true })
watch(() => route.path, closePinPicker)
watch(() => featuresStore.isWebsiteEnabled, updateSidebarItems)
watch(() => featuresStore.isMobileAppEnabled, updateSidebarItems)
watch(
  () => tabPinsStore.pinnedTabs,
  () => {
    updateSidebarItems()
  },
  { deep: true }
)

// Function to determine section spacing based on position
const getSectionSpacing = (item, items) => {
  if (item.__recentSection || item.__pinnedSection) {
    return 'pt-8 pb-2'
  }

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
