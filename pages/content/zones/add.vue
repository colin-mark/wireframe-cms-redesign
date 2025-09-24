<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <div class="border-2 border-dashed border-astra-gray-400 rounded-lg p-12 text-center bg-astra-gray-25">
        <div class="space-y-4">
          <div class="w-16 h-16 bg-astra-blue rounded-lg flex items-center justify-center mx-auto">
            <GlobeAltIcon class="w-8 h-8 text-astra-white" />
          </div>
          <h2 class="text-xl font-medium text-astra-gray-700">Add Zone</h2>
          <p class="text-astra-gray-600 max-w-md mx-auto">
            Create a new zone to organize regional or audience-specific content.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GlobeAltIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'default'
})
</script>
