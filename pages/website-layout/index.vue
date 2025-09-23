<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <div class="border-2 border-dashed border-astra-gray-400 rounded-lg p-12 text-center bg-astra-gray-25">
        <div class="space-y-4">
          <div class="w-16 h-16 bg-astra-blue rounded-lg flex items-center justify-center mx-auto">
            <ComputerDesktopIcon class="w-8 h-8 text-astra-white" />
          </div>
          <h2 class="text-xl font-medium text-astra-gray-700">Website Layout</h2>
          <p class="text-astra-gray-600 max-w-md mx-auto">
            Configure your website structure, components, templates, and responsive settings. Check the sidebar for layout-specific options.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ComputerDesktopIcon } from '@heroicons/vue/24/outline'

// Only redirect on client-side to avoid SSR issues and only for the exact /website-layout route
if (process.client) {
  const route = useRoute()
  if (route.path === '/website-layout') {
    await navigateTo('/website-layout/navigation')
  }
}

definePageMeta({
  layout: 'default'
})
</script>
