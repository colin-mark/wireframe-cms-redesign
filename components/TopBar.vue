<template>
  <header class="bg-astra-white border-b border-astra-slate-300 h-16 flex items-center px-6 z-10">
    <div class="flex items-center justify-between w-full">
      <!-- Left Side: Brand + Dropdown + Tabs -->
      <div class="flex items-center space-x-8">
        <!-- Brand -->
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-astra-blue rounded-lg flex items-center justify-center">
            <span class="text-astra-white font-bold text-sm">A</span>
          </div>
          <span class="text-astra-gray-800 font-semibold text-lg">Astrone</span>
        </div>

        <!-- Product Dropdown -->
        <Menu as="div" class="relative">
          <MenuButton class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-astra-gray-50 transition-colors">
            <Squares2X2Icon class="w-5 h-5 text-astra-gray-600" />
            <ChevronDownIcon class="w-4 h-4 text-astra-gray-600" />
          </MenuButton>
          
          <MenuItems class="absolute left-0 top-full mt-2 w-80 bg-astra-white border border-astra-slate-300 rounded-lg shadow-lg p-4 z-50">
            <div class="grid grid-cols-2 gap-3">
              <MenuItem v-for="product in products" :key="product.name">
                <div class="flex items-start space-x-3 p-3 rounded-lg hover:bg-astra-gray-50 cursor-pointer">
                  <div class="w-8 h-8 bg-astra-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <component :is="Squares2X2Icon" class="w-4 h-4 text-astra-gray-600" />
                  </div>
                  <div class="min-w-0">
                    <div class="text-sm font-medium text-astra-gray-800">{{ product.name }}</div>
                    <div class="text-xs text-astra-gray-600 mt-1">{{ product.description }}</div>
                  </div>
                </div>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>

        <!-- Tab Navigation -->
        <nav class="flex space-x-1">
          <template v-for="tab in tabs" :key="tab.name">
            <NuxtLink
              v-if="!tab.requiresMobileApp || featuresStore.isMobileAppEnabled"
              :to="tab.path"
              class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="isTabActive(tab) 
                ? 'text-astra-blue bg-astra-blue-50' 
                : 'text-astra-gray-600 hover:text-astra-gray-800 hover:bg-astra-gray-50'"
            >
              {{ tab.name }}
            </NuxtLink>
          </template>
        </nav>
      </div>

      <!-- Right Side: Search + Avatar -->
      <div class="flex items-center space-x-4">
        <!-- Search -->
        <div class="relative">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-astra-gray-600" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="pl-10 pr-4 py-2 w-64 text-sm border border-astra-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-astra-blue focus:border-transparent"
            @focus="handleSearchFocus"
            @blur="handleSearchBlur"
            @keydown.enter.prevent="handleSearchEnter"
            @keydown.esc.prevent="handleSearchEscape"
          />

          <div
            v-if="showSearchResults"
            class="absolute left-0 right-0 mt-2 bg-astra-white border border-astra-slate-300 rounded-lg shadow-lg z-50"
          >
            <ul class="max-h-64 overflow-y-auto py-2">
              <li v-for="link in filteredSidebarLinks" :key="link.route">
                <button
                  type="button"
                  class="w-full text-left px-4 py-2 text-sm text-astra-gray-800 hover:bg-astra-gray-50"
                  @mousedown.prevent="selectSearchResult(link)"
                >
                  {{ link.name }}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- Avatar Dropdown -->
        <Menu as="div" class="relative">
          <MenuButton class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-astra-gray-400 rounded-full flex items-center justify-center">
              <span class="text-astra-white text-sm font-medium">EB</span>
            </div>
            <ChevronDownIcon class="w-4 h-4 text-astra-gray-600" />
          </MenuButton>
          
          <MenuItems class="absolute right-0 top-full mt-2 w-48 bg-astra-white border border-astra-slate-300 rounded-lg shadow-lg py-2 z-50">
            <MenuItem>
              <div class="px-4 py-2 text-sm text-astra-gray-800 hover:bg-astra-gray-50 cursor-pointer">
                Profile
              </div>
            </MenuItem>
            <MenuItem>
              <div class="px-4 py-2 text-sm text-astra-gray-800 hover:bg-astra-gray-50 cursor-pointer">
                Settings
              </div>
            </MenuItem>
            <MenuItem>
              <div class="px-4 py-2 text-sm text-astra-gray-800 hover:bg-astra-gray-50 cursor-pointer">
                Sign out
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { 
  Squares2X2Icon, 
  ChevronDownIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/vue/24/outline'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useFeaturesStore } from '~/stores/features'
import { getAllSidebarLinks } from '~/utils/sidebar-items'

const route = useRoute()
const router = useRouter()
const featuresStore = useFeaturesStore()

// Load features from localStorage on component mount
if (process.client) {
  featuresStore.loadFromLocalStorage()
}

// Tab navigation data
const tabs = [
  { name: 'Home', path: '/' },
  { name: 'Layout', path: '/website-layout' },
  { name: 'Content', path: '/content' },
  { name: 'Messaging', path: '/messaging', requiresMobileApp: true },
  { name: 'Settings', path: '/settings' }
]

const searchQuery = ref('')
const isSearchFocused = ref(false)

const allSidebarLinks = computed(() => getAllSidebarLinks(featuresStore))

const filteredSidebarLinks = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  const links = allSidebarLinks.value

  if (!query) {
    return links
  }

  return links.filter(link => link.name.toLowerCase().includes(query))
})

const showSearchResults = computed(() => {
  return isSearchFocused.value && filteredSidebarLinks.value.length > 0
})

const selectSearchResult = (link) => {
  if (!link || !link.route) {
    return
  }

  searchQuery.value = ''
  isSearchFocused.value = false
  router.push(link.route)
}

const handleSearchFocus = () => {
  isSearchFocused.value = true
}

const handleSearchBlur = () => {
  setTimeout(() => {
    isSearchFocused.value = false
  }, 100)
}

const handleSearchEnter = () => {
  const [firstResult] = filteredSidebarLinks.value
  if (firstResult) {
    selectSearchResult(firstResult)
  }
}

const handleSearchEscape = () => {
  searchQuery.value = ''
  isSearchFocused.value = false
}

watch(() => route.path, () => {
  searchQuery.value = ''
  isSearchFocused.value = false
})

// Product dropdown data
const products = [
  { name: 'Product Name', description: 'Short Description' },
  { name: 'Product Name', description: 'Short Description' },
  { name: 'Product Name', description: 'Short Description' },
  { name: 'Product Name', description: 'Short Description' },
  { name: 'Product Name', description: 'Short Description' },
  { name: 'Product Name', description: 'Short Description' }
]

// Function to check if a tab is active (handles nested routes)
const isTabActive = (tab) => {
  // For home tab, only match exact path or home routes
  if (tab.path === '/') {
    return route.path === '/' || route.path.startsWith('/home/')
  }
  
  // For other tabs, match if current path starts with the tab path
  return route.path.startsWith(tab.path)
}
</script>
