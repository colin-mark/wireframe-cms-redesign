<template>
  <div
    :class="[
      'h-screen w-screen flex flex-col overflow-hidden transition-colors duration-300',
      isNewDesignEnabled ? 'bg-astra-white' : 'bg-[#ECF9FF]'
    ]"
  >
    <!-- Top Bar - Full Width -->
    <TopBar />
    
    <!-- Main Layout Area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <Sidebar />
      
      <!-- Page Content -->
      <main :class="['flex-1 overflow-auto transition-colors duration-300', isNewDesignEnabled ? '' : 'bg-[#ECF9FF]']">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useGeneralSettingsStore } from '~/stores/generalSettings'

const generalSettingsStore = useGeneralSettingsStore()
generalSettingsStore.ensureLoaded()

onMounted(() => {
  generalSettingsStore.ensureLoaded()
})

const isNewDesignEnabled = computed(() => generalSettingsStore.isNewDesignEnabled)
</script>
