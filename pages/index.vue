<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Content Placeholder -->
      <div class="border-2 border-dashed border-astra-gray-400 rounded-lg p-12 text-center bg-astra-gray-25">
        <div class="space-y-4">
          <Squares2X2Icon class="w-16 h-16 text-astra-gray-400 mx-auto" />
          <h2 class="text-xl font-medium text-astra-gray-700">Welcome to Astrone</h2>
          <p class="text-astra-gray-600 max-w-md mx-auto">
            Your CMS dashboard. Navigate using the top tabs: Website Layout, Mobile Layout, Content, and Settings. Check the sidebar for section-specific options.
          </p>
        </div>
      </div>
      
      <!-- Product Grid (matching screenshot 1) -->
      <div class="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div 
          v-for="i in 6" 
          :key="i"
          class="bg-astra-white border border-astra-slate-300 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div class="flex flex-col items-center space-y-3">
            <div class="w-12 h-12 bg-astra-gray-100 rounded flex items-center justify-center">
              <Squares2X2Icon class="w-6 h-6 text-astra-gray-600" />
            </div>
            <div class="text-center">
              <div class="text-sm font-medium text-astra-gray-800">Product Name</div>
              <div class="text-xs text-astra-gray-600 mt-1">Short Description</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Squares2X2Icon } from '@heroicons/vue/24/outline'

// Only redirect on client-side to avoid SSR issues
if (process.client) {
  await navigateTo('/home/site-analytics')
}

// Set page meta
definePageMeta({
  layout: 'default'
})
</script>
