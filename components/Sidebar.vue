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
          <h3
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
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFeaturesStore } from '~/stores/features'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { sidebarItemsMap, filterSidebarItems } from '~/utils/sidebar-items'
import { useGeneralSettingsStore } from '~/stores/generalSettings'

const route = useRoute()
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


// Reactive sidebar items
const currentSidebarItems = ref([])
const isNewDesignEnabled = computed(() => generalSettingsStore.isNewDesignEnabled)
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
    markActiveItems(items)
  } else {
    const parentRoute = Object.keys(sidebarItemsMap).find(key => route.path.startsWith(key) && key !== '/')
    if (parentRoute) {
      items = cloneItems(sidebarItemsMap[parentRoute])
      markActiveItems(items)
    } else {
      items = cloneItems(sidebarItemsMap['/'])
    }
  }

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
