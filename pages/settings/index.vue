<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <div class="border-2 border-dashed border-astra-gray-400 rounded-lg p-12 text-center bg-astra-gray-25">
        <div class="space-y-4">
          <div class="w-16 h-16 bg-astra-blue rounded-lg flex items-center justify-center mx-auto">
            <CogIcon class="w-8 h-8 text-astra-white" />
          </div>
          <h2 class="text-xl font-medium text-astra-gray-700">Settings</h2>
          <p class="text-astra-gray-600 max-w-md mx-auto">
            Configure general settings, appearance, user permissions, integrations, and backup options. Check the sidebar for all settings categories.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CogIcon } from '@heroicons/vue/24/outline'

// Redirect to the first settings item only on exact /settings route
if (process.client) {
  const route = useRoute()
  if (route.path === '/settings') {
    await navigateTo('/settings/user-management')
  }
}

definePageMeta({
  layout: 'default'
})
</script>
