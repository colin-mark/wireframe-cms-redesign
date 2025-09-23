<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <div class="border-2 border-dashed border-astra-gray-400 rounded-lg p-12 text-center bg-astra-gray-25">
        <div class="space-y-4">
          <div class="w-16 h-16 bg-astra-blue rounded-lg flex items-center justify-center mx-auto">
            <DocumentTextIcon class="w-8 h-8 text-astra-white" />
          </div>
          <h2 class="text-xl font-medium text-astra-gray-700">Add New Article</h2>
          <p class="text-astra-gray-600 max-w-md mx-auto">
            Create a new article with rich content, media, and publishing settings.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DocumentTextIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'default'
})
</script>
