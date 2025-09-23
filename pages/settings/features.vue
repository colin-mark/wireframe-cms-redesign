<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-semibold text-astra-gray-800">Features</h1>
      </div>

      <!-- Features List -->
      <div class="bg-astra-white rounded-lg shadow-sm border border-astra-slate-300">
        <!-- Header Row -->
        <div class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-astra-slate-300 bg-astra-gray-50">
          <div class="col-span-1 text-sm font-medium text-astra-gray-700">Enabled</div>
          <div class="col-span-6 text-sm font-medium text-astra-gray-700">Name</div>
          <div class="col-span-4 text-sm font-medium text-astra-gray-700">Config</div>
          <div class="col-span-1"></div>
        </div>

                <!-- Feature Items -->
                <div v-for="(feature, index) in localFeatures" :key="feature.id" 
                     :class="['grid grid-cols-12 gap-4 px-6 py-4 border-b border-astra-slate-300 hover:bg-astra-gray-25 transition-colors', 
                              index === localFeatures.length - 1 ? 'border-b-0' : '']">
                  
                  <!-- Enabled Checkbox -->
                  <div class="col-span-1 flex items-center">
                    <input 
                      :id="`feature-${feature.id}`"
                      v-model="feature.enabled"
                      type="checkbox" 
                      class="w-4 h-4 text-astra-blue bg-astra-white border-astra-slate-300 rounded focus:ring-astra-blue focus:ring-2"
                    />
                  </div>

                  <!-- Name -->
                  <div class="col-span-6 flex items-center">
                    <label :for="`feature-${feature.id}`" class="text-sm font-medium text-astra-gray-800 cursor-pointer">
                      {{ feature.name }}
                    </label>
                  </div>

                  <!-- Config (empty for now) -->
                  <div class="col-span-4 flex items-center">
                    <!-- Config options can be added here later -->
                  </div>

                  <!-- Actions (empty for now) -->
                  <div class="col-span-1 flex items-center justify-end">
                    <!-- Action buttons can be added here later -->
                  </div>
                </div>
      </div>

              <!-- Save Button -->
              <div class="mt-6 flex justify-between items-center">
                <!-- Success/Error Message or Unsaved Changes -->
                <div class="text-sm">
                  <span v-if="saveMessage" :class="saveMessage.includes('Error') ? 'text-red-600' : 'text-green-600'">
                    {{ saveMessage }}
                  </span>
                  <span v-else-if="hasUnsavedChanges" class="text-orange-600">
                    You have unsaved changes
                  </span>
                </div>
                
                <!-- Save Button -->
                <button 
                  @click="saveFeatures"
                  :disabled="isSaving || !hasUnsavedChanges"
                  :class="[
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    hasUnsavedChanges && !isSaving
                      ? 'bg-astra-blue text-astra-white hover:bg-astra-blue/90'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  ]"
                >
                  <span v-if="isSaving">Saving...</span>
                  <span v-else>Save</span>
                </button>
              </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useFeaturesStore } from '~/stores/features'

// Use Pinia store
const featuresStore = useFeaturesStore()

// Local state for editing (before save)
const localFeatures = ref([
  {
    id: 'mobile-app',
    name: 'Mobile App',
    enabled: true
  },
  {
    id: 'website',
    name: 'Website',
    enabled: true
  }
])

// State for save feedback
const isSaving = ref(false)
const saveMessage = ref('')

// Check if there are unsaved changes
const hasUnsavedChanges = computed(() => {
  return localFeatures.value.some(localFeature => {
    const storeFeature = featuresStore.features.find(f => f.id === localFeature.id)
    return !storeFeature || storeFeature.enabled !== localFeature.enabled
  })
})

// Load saved features from localStorage on component mount
onMounted(() => {
  featuresStore.loadFromLocalStorage()
  // Initialize local features with store values
  localFeatures.value = localFeatures.value.map(feature => {
    const storeFeature = featuresStore.features.find(f => f.id === feature.id)
    return storeFeature ? { ...feature, enabled: storeFeature.enabled } : feature
  })
})

// Save function with localStorage persistence
const saveFeatures = async () => {
  isSaving.value = true
  saveMessage.value = ''
  
  try {
    // Update the store with local changes
    localFeatures.value.forEach(localFeature => {
      featuresStore.updateFeature(localFeature.id, localFeature.enabled)
    })
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    console.log('Features saved:', featuresStore.features)
    saveMessage.value = 'Features saved successfully!'
    
    // Clear message after 3 seconds
    setTimeout(() => {
      saveMessage.value = ''
    }, 3000)
    
  } catch (error) {
    console.error('Error saving features:', error)
    saveMessage.value = 'Error saving features. Please try again.'
  } finally {
    isSaving.value = false
  }
}

definePageMeta({
  layout: 'default'
})
</script>
