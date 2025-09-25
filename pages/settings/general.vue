<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-semibold text-astra-gray-800">General CMS Settings</h1>
        <p class="mt-1 text-sm text-astra-gray-600">
          Manage CMS-wide toggles that control platform functionality.
        </p>
      </div>

      <!-- Settings List -->
      <div class="bg-astra-white rounded-lg shadow-sm border border-astra-slate-300">
        <!-- Card Title -->
        <div class="px-6 py-4 border-b border-astra-slate-300">
          <h2 class="text-base font-semibold text-astra-gray-800">Settings</h2>
        </div>

        <!-- Header Row -->
        <div class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-astra-slate-300 bg-astra-gray-50">
          <div class="col-span-1 text-sm font-medium text-astra-gray-700">Enabled</div>
          <div class="col-span-7 text-sm font-medium text-astra-gray-700">Setting</div>
          <div class="col-span-3 text-sm font-medium text-astra-gray-700">Details</div>
          <div class="col-span-1"></div>
        </div>

        <!-- Settings Items -->
        <div
          v-for="(setting, index) in localSettings"
          :key="setting.id"
          :class="[
            'grid grid-cols-12 gap-4 px-6 py-4 border-b border-astra-slate-300 hover:bg-astra-gray-25 transition-colors',
            index === localSettings.length - 1 ? 'border-b-0' : ''
          ]"
        >
          <!-- Enabled Checkbox -->
          <div class="col-span-1 flex items-center">
            <input
              :id="`setting-${setting.id}`"
              v-model="setting.enabled"
              type="checkbox"
              class="w-4 h-4 text-astra-blue bg-astra-white border-astra-slate-300 rounded focus:ring-astra-blue focus:ring-2"
            />
          </div>

          <!-- Setting Name -->
          <div class="col-span-7 flex items-center">
            <label :for="`setting-${setting.id}`" class="text-sm font-medium text-astra-gray-800 cursor-pointer">
              {{ setting.name }}
            </label>
          </div>

          <!-- Setting Details (placeholder for future use) -->
          <div class="col-span-3 flex items-center text-sm text-astra-gray-600">
            <span class="italic">Coming soon</span>
          </div>

          <!-- Actions (placeholder) -->
          <div class="col-span-1 flex items-center justify-end"></div>
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
          @click="saveSettings"
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
import { useGeneralSettingsStore } from '~/stores/generalSettings'

const generalSettingsStore = useGeneralSettingsStore()

const localSettings = ref([
  {
    id: 'cms-new-design',
    name: 'CMS New Design',
    enabled: true
  }
])

const isSaving = ref(false)
const saveMessage = ref('')

const hasUnsavedChanges = computed(() => {
  return localSettings.value.some(localSetting => {
    const storedSetting = generalSettingsStore.settings.find(s => s.id === localSetting.id)
    return !storedSetting || storedSetting.enabled !== localSetting.enabled
  })
})

generalSettingsStore.ensureLoaded()

onMounted(() => {
  generalSettingsStore.ensureLoaded()
  localSettings.value = localSettings.value.map(setting => {
    const storeSetting = generalSettingsStore.settings.find(s => s.id === setting.id)
    return storeSetting ? { ...setting, enabled: storeSetting.enabled } : setting
  })
})

const saveSettings = async () => {
  isSaving.value = true
  saveMessage.value = ''

  try {
    localSettings.value.forEach(localSetting => {
      generalSettingsStore.updateSetting(localSetting.id, localSetting.enabled)
    })

    await new Promise(resolve => setTimeout(resolve, 500))

    console.log('Settings saved:', generalSettingsStore.settings)
    saveMessage.value = 'Settings saved successfully!'

    setTimeout(() => {
      saveMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Error saving settings:', error)
    saveMessage.value = 'Error saving settings. Please try again.'
  } finally {
    isSaving.value = false
  }
}

definePageMeta({
  layout: 'default'
})
</script>
