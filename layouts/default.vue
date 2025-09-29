<template>
  <div
    :class="[
      'h-screen w-screen flex flex-col overflow-hidden transition-colors duration-300',
      isNewDesignEnabled ? 'bg-astra-white' : 'bg-[#ECF9FF]'
    ]"
  >
    <!-- Top Bar - Full Width -->
    <TopBar @toggle-mobile-nav="toggleMobileNav" />
    
    <!-- Main Layout Area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <div class="hidden lg:block">
        <Sidebar />
      </div>
      
      <!-- Page Content -->
      <main :class="['flex-1 overflow-auto transition-colors duration-300', isNewDesignEnabled ? '' : 'bg-[#ECF9FF]']">
        <slot />
      </main>
    </div>

    <MobileNavigation
      :open="isMobileViewport && isMobileNavOpen"
      :sections="mobileNavigationSections"
      :is-new-design-enabled="isNewDesignEnabled"
      @close="closeMobileNav"
    />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from '#imports'
import { useGeneralSettingsStore } from '~/stores/generalSettings'
import { useFeaturesStore } from '~/stores/features'
import { getMobileNavigationSections } from '~/utils/sidebar-items'
import MobileNavigation from '~/components/MobileNavigation.vue'

const generalSettingsStore = useGeneralSettingsStore()
const featuresStore = useFeaturesStore()

generalSettingsStore.ensureLoaded()

if (process.client) {
  featuresStore.loadFromLocalStorage()
}

onMounted(() => {
  generalSettingsStore.ensureLoaded()
  featuresStore.loadFromLocalStorage()
  updateViewport()

  if (process.client) {
    window.addEventListener('resize', updateViewport)
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('resize', updateViewport)
  }
})

const isNewDesignEnabled = computed(() => generalSettingsStore.isNewDesignEnabled)
const mobileNavigationSections = computed(() => getMobileNavigationSections(featuresStore))

const isMobileNavOpen = ref(false)
const isMobileViewport = ref(false)
const mobileBreakpoint = 1024

const updateViewport = () => {
  if (!process.client) {
    return
  }

  const next = window.innerWidth < mobileBreakpoint
  isMobileViewport.value = next

  if (!next) {
    isMobileNavOpen.value = false
  }
}

const toggleMobileNav = () => {
  if (!isMobileViewport.value) {
    return
  }
  isMobileNavOpen.value = !isMobileNavOpen.value
}

const closeMobileNav = () => {
  isMobileNavOpen.value = false
}

const route = useRoute()

watch(() => route.path, () => {
  isMobileNavOpen.value = false
})
</script>
