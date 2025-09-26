<template>
  <header
    :class="[
      'h-16 flex items-center px-6 z-10 transition-colors duration-300',
      isNewDesignEnabled
        ? 'bg-astra-white border-b border-astra-slate-300'
        : 'bg-white border-b border-[#D9E7FB] shadow-[0_4px_16px_rgba(70,95,255,0.08)]'
    ]"
  >
    <div class="flex items-center justify-between w-full">
      <!-- Left Side: Brand + Site Title + Tabs -->
      <div class="flex items-center gap-10">
        <div class="flex items-center gap-6">
          <!-- Brand -->
          <div class="flex items-center space-x-3">
            <div
              :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300',
                isNewDesignEnabled
                  ? 'bg-astra-blue text-astra-white'
                  : 'bg-[#1E6AE1] text-white border border-[#0F4CAD] shadow-[0_3px_8px_rgba(16,80,188,0.25)]'
              ]"
            >
              <span class="font-bold text-sm">A</span>
            </div>
            <span
              :class="[
                'font-semibold text-lg transition-colors duration-300',
                isNewDesignEnabled ? 'text-astra-gray-800' : 'text-[#2B2C2C]'
              ]"
            >
              Astrone
            </span>
          </div>

        <!-- Site Branding -->
        <div
          :class="[
            'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200',
            isNewDesignEnabled
              ? 'text-astra-gray-800 bg-transparent'
              : 'bg-white text-[#1E6AE1] shadow-[0_3px_10px_rgba(30,106,225,0.15)]'
          ]"
        >
          <img :src="auburnLogo" alt="Auburn Tigers logo" class="h-6 w-6 rounded" />
          <span class="text-sm font-medium whitespace-nowrap">
            Auburn Tigers - Official Athletics Website
          </span>
        </div>
        </div>

        <!-- Tab Navigation -->
        <nav class="flex space-x-1 ml-2">
          <template v-for="tab in tabs" :key="tab.name">
          <NuxtLink
              v-if="!tab.requiresMobileApp || featuresStore.isMobileAppEnabled"
              :to="tab.path"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                isNewDesignEnabled
                  ? (isTabActive(tab)
                      ? 'text-astra-blue bg-astra-blue-50'
                      : 'text-astra-gray-600 hover:text-astra-gray-800 hover:bg-astra-gray-50')
                  : (isTabActive(tab)
                      ? 'bg-[#1E6AE1] text-white shadow-[0_4px_12px_rgba(30,106,225,0.35)]'
                      : 'text-[#1E6AE1] hover:bg-[#DDEBFF] hover:text-[#0F4CAD]')
              ]"
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
          <MagnifyingGlassIcon
            :class="[
              'absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300',
              isNewDesignEnabled ? 'text-astra-gray-600' : 'text-[#465FFF]'
            ]"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            :class="[
              'pl-10 pr-4 py-2 w-64 text-sm rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300',
              isNewDesignEnabled
                ? 'border border-astra-slate-300 focus:ring-astra-blue focus:border-transparent'
                : 'border border-[#D9E7FB] bg-white shadow-[0_8px_24px_rgba(70,95,255,0.12)] focus:ring-[#465FFF] focus:border-transparent'
            ]"
            @focus="handleSearchFocus"
            @blur="handleSearchBlur"
            @keydown.enter.prevent="handleSearchEnter"
            @keydown.esc.prevent="handleSearchEscape"
          />

          <div
            v-if="showSearchResults"
            :class="[
              'absolute left-0 right-0 mt-2 rounded-lg z-50 transition-colors duration-300',
              isNewDesignEnabled
                ? 'bg-astra-white border border-astra-slate-300 shadow-lg'
                : 'bg-white border border-[#D9E7FB] shadow-[0_18px_32px_rgba(70,95,255,0.18)]'
            ]"
          >
            <ul class="max-h-64 overflow-y-auto py-2">
              <li v-for="link in filteredSidebarLinks" :key="link.route">
                <button
                  type="button"
                  :class="[
                    'w-full text-left px-4 py-2 text-sm transition-colors duration-200',
                    isNewDesignEnabled
                      ? 'text-astra-gray-800 hover:bg-astra-gray-50'
                      : 'text-[#2B2C2C] hover:bg-[#ECF9FF]'
                  ]"
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
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300',
                isNewDesignEnabled
                  ? 'bg-astra-gray-400 text-astra-white'
                  : 'bg-white text-[#465FFF] border border-[#D9E7FB] shadow-[0_4px_12px_rgba(70,95,255,0.16)]'
              ]"
            >
              <span class="text-sm font-medium">EB</span>
            </div>
            <ChevronDownIcon :class="['w-4 h-4 transition-colors duration-300', isNewDesignEnabled ? 'text-astra-gray-600' : 'text-[#465FFF]']" />
          </MenuButton>
          
          <MenuItems
            :class="[
              'absolute right-0 top-full mt-2 w-48 rounded-lg py-2 z-50 transition-colors duration-300',
              isNewDesignEnabled
                ? 'bg-astra-white border border-astra-slate-300 shadow-lg'
                : 'bg-white border border-[#D9E7FB] shadow-[0_18px_32px_rgba(70,95,255,0.18)]'
            ]"
          >
            <MenuItem>
              <div
                :class="[
                  'px-4 py-2 text-sm cursor-pointer transition-colors duration-200',
                  isNewDesignEnabled
                    ? 'text-astra-gray-800 hover:bg-astra-gray-50'
                    : 'text-[#2B2C2C] hover:bg-[#ECF9FF]'
                ]"
              >
                Profile
              </div>
            </MenuItem>
            <MenuItem>
              <div
                :class="[
                  'px-4 py-2 text-sm cursor-pointer transition-colors duration-200',
                  isNewDesignEnabled
                    ? 'text-astra-gray-800 hover:bg-astra-gray-50'
                    : 'text-[#2B2C2C] hover:bg-[#ECF9FF]'
                ]"
              >
                Settings
              </div>
            </MenuItem>
            <MenuItem>
              <div
                :class="[
                  'px-4 py-2 text-sm cursor-pointer transition-colors duration-200',
                  isNewDesignEnabled
                    ? 'text-astra-gray-800 hover:bg-astra-gray-50'
                    : 'text-[#2B2C2C] hover:bg-[#ECF9FF]'
                ]"
              >
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
  ChevronDownIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/vue/24/outline'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch, onMounted } from 'vue'
import { useFeaturesStore } from '~/stores/features'
import { getAllSidebarLinks } from '~/utils/sidebar-items'
import { useGeneralSettingsStore } from '~/stores/generalSettings'
import auburnLogo from '~/assets/auburn-logo.webp'

const route = useRoute()
const router = useRouter()
const featuresStore = useFeaturesStore()
const generalSettingsStore = useGeneralSettingsStore()

// Load features from localStorage on component mount
if (process.client) {
  featuresStore.loadFromLocalStorage()
  generalSettingsStore.ensureLoaded()
}

onMounted(() => {
  generalSettingsStore.ensureLoaded()
})

const isNewDesignEnabled = computed(() => generalSettingsStore.isNewDesignEnabled)

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
