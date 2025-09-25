<template>
  <div :class="['min-h-full p-6 transition-colors duration-300', isNewDesignEnabled ? 'bg-astra-white' : 'bg-[#ECF9FF]']">
    <div :class="['mx-auto transition-all duration-300', isNewDesignEnabled ? 'max-w-6xl' : 'max-w-5xl']">
      <!-- Intro / welcome banner -->
      <section
        :class="[
          'rounded-2xl border transition-colors duration-300 px-6 py-8 sm:px-10 sm:py-10',
          isNewDesignEnabled
            ? 'border-astra-slate-300 bg-astra-gray-25'
            : 'border-[#D9E7FB] bg-white shadow-[0_18px_40px_rgba(70,95,255,0.08)]'
        ]"
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p
                :class="[
                  'text-sm font-medium transition-colors duration-300',
                  isNewDesignEnabled ? 'text-astra-gray-600' : 'text-[#1E6AE1]'
                ]"
              >
                Welcome,
              </p>
              <h1
                :class="[
                  'transition-colors duration-300',
                  isNewDesignEnabled ? 'text-3xl font-semibold text-astra-gray-800' : 'text-3xl font-semibold text-[#1E6AE1]'
                ]"
              >
                {{ userName }}
              </h1>
              <p
                :class="[
                  'mt-2 text-sm transition-colors duration-300',
                  isNewDesignEnabled ? 'text-astra-gray-600' : 'text-[#4F6075]'
                ]"
              >
                Stay on top of your operations with system health, publishing status, and quick links to critical tools.
              </p>
            </div>
            <div
              :class="[
                'inline-flex items-center gap-3 self-start rounded-xl px-4 py-3 transition-colors duration-300',
                isNewDesignEnabled
                  ? 'bg-astra-white border border-astra-slate-300 shadow-sm'
                  : 'bg-[#F6FAFF] border border-[#D9E7FB] shadow-[0_6px_18px_rgba(70,95,255,0.14)]'
              ]"
            >
              <div
                :class="[
                  'flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300',
                  isNewDesignEnabled ? 'bg-astra-blue-50 text-astra-blue' : 'bg-[#DDEBFF] text-[#1E6AE1]'
                ]"
              >
                <HomeIcon class="h-5 w-5" />
              </div>
              <div>
                <p :class="['text-xs font-semibold uppercase tracking-wide', isNewDesignEnabled ? 'text-astra-gray-600' : 'text-[#4F6075]']">Current Environment</p>
                <p :class="['text-sm font-medium', isNewDesignEnabled ? 'text-astra-gray-800' : 'text-[#1E6AE1]']">Astrone CMS</p>
              </div>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <article :class="cardClasses">
              <header class="flex items-center justify-between">
                <div>
                  <h2 :class="titleClasses">Server Time</h2>
                  <p :class="subtitleClasses">Synchronised from Astrone status endpoint.</p>
                </div>
                <div :class="iconBadgeClasses">
                  <span class="text-lg">🕒</span>
                </div>
              </header>
              <div class="mt-4 flex items-center gap-3">
                <div :class="statusDotClasses"></div>
                <span :class="valueClasses">{{ formattedServerTime }}</span>
              </div>
            </article>

            <article :class="cardClasses">
              <header class="flex items-center justify-between">
                <div>
                  <h2 :class="titleClasses">Your Network Status</h2>
                  <p :class="subtitleClasses">Monitoring connection health.</p>
                </div>
                <div :class="iconBadgeClasses">
                  <span class="text-lg">📶</span>
                </div>
              </header>
              <div class="mt-4 flex items-center gap-3">
                <div :class="networkStatusDot"></div>
                <span :class="valueClasses">{{ networkStatus.label }}</span>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { HomeIcon } from '@heroicons/vue/24/outline'
import { useGeneralSettingsStore } from '~/stores/generalSettings'

const generalSettingsStore = useGeneralSettingsStore()
generalSettingsStore.ensureLoaded()

onMounted(() => {
  generalSettingsStore.ensureLoaded()
})

const isNewDesignEnabled = computed(() => generalSettingsStore.isNewDesignEnabled)

const userName = 'Colin Alcorn'
const now = ref(new Date())

let timer
onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})

const formattedServerTime = computed(() => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'medium'
    }).format(now.value)
  } catch (error) {
    console.warn('Unable to format date, falling back to ISO string', error)
    return now.value.toISOString()
  }
})

const networkStatus = {
  label: 'You are online'
}

const cardClasses = computed(() => [
  'rounded-2xl border transition-colors duration-300 px-5 py-6 shadow-sm',
  isNewDesignEnabled.value
    ? 'border-astra-slate-300 bg-astra-white'
    : 'border-[#D9E7FB] bg-white shadow-[0_12px_28px_rgba(70,95,255,0.12)]'
])

const titleClasses = computed(() => [
  'text-base font-semibold transition-colors duration-300',
  isNewDesignEnabled.value ? 'text-astra-gray-800' : 'text-[#1E6AE1]'
])

const subtitleClasses = computed(() => [
  'text-xs transition-colors duration-300',
  isNewDesignEnabled.value ? 'text-astra-gray-600' : 'text-[#4F6075]'
])

const valueClasses = computed(() => [
  'text-sm font-medium transition-colors duration-300',
  isNewDesignEnabled.value ? 'text-astra-gray-800' : 'text-[#2B2C2C]'
])

const iconBadgeClasses = computed(() => [
  'flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300',
  isNewDesignEnabled.value ? 'bg-astra-blue-50 text-astra-blue' : 'bg-[#DDEBFF] text-[#1E6AE1]'
])

const statusDotClasses = computed(() => [
  'h-3 w-3 rounded-full transition-colors duration-300',
  isNewDesignEnabled.value ? 'bg-[#22C55E]' : 'bg-[#34D399]'
])

const networkStatusDot = computed(() => [
  'h-3 w-3 rounded-full transition-colors duration-300',
  isNewDesignEnabled.value ? 'bg-[#22C55E]' : 'bg-[#34D399]'
])

definePageMeta({
  layout: 'default'
})
</script>
