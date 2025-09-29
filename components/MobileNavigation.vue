<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/40" @click="emitClose" />
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div
            v-if="open"
            :class="[
              'absolute inset-y-0 right-0 flex h-full w-full max-w-xs flex-col bg-white',
              panelClasses
            ]"
          >
            <div :class="['flex items-center justify-between border-b px-5 py-4', headerBorderClass]">
              <div class="flex items-center gap-3">
                <div :class="brandClasses">
                  <span class="font-bold text-sm">A</span>
                </div>
                <span :class="brandLabelClasses">Astrone CMS</span>
              </div>
              <button
                type="button"
                :class="closeButtonClasses"
                @click="emitClose"
              >
                <span class="sr-only">Close navigation</span>
                <XMarkIcon class="h-6 w-6" />
              </button>
            </div>

            <nav class="flex-1 overflow-y-auto px-5 py-6">
              <div
                v-for="section in sections"
                :key="section.name"
                class="mb-6 last:mb-0"
              >
                <button
                  type="button"
                  :class="[primaryLinkClasses, section.items && section.items.length ? 'flex items-center justify-between gap-3' : '', !section.route ? 'cursor-default opacity-70' : '']"
                  :disabled="!section.route && !(section.items && section.items.length)"
                  @click="handleSectionClick(section)"
                >
                  <span class="flex-1 text-left">{{ section.name }}</span>
                  <span
                    v-if="section.items && section.items.length"
                    class="ml-2 inline-flex items-center justify-center rounded-md p-1 transition-colors duration-200"
                    :class="isNewDesignEnabled ? 'text-astra-gray-500 hover:text-astra-gray-800' : 'text-[#465FFF] hover:text-[#0F4CAD]'"
                    @click.stop="toggleExpanded(section.id, section.defaultExpanded)"
                  >
                    <ChevronDownIcon
                      class="h-4 w-4 transition-transform"
                      :class="isExpanded(section.id, section.defaultExpanded) ? 'rotate-180' : ''"
                    />
                  </span>
                </button>

                <div
                  v-if="section.items && section.items.length && isExpanded(section.id, section.defaultExpanded)"
                  class="mt-3 space-y-2"
                >
                  <template v-for="item in section.items" :key="section.name + '-' + item.name">
                    <p
                      v-if="item.type === 'section'"
                      :class="sectionLabelClasses"
                    >
                      {{ item.name }}
                    </p>
                    <div v-else class="space-y-2">
                      <button
                        type="button"
                        :class="[getLinkClasses(0), (item.children && item.children.length) ? 'flex items-center justify-between gap-3' : '']"
                        :disabled="!item.route && !(item.children && item.children.length)"
                        @click="handleEntryClick(item)"
                      >
                        <span class="flex-1 text-left">{{ item.name }}</span>
                        <span
                          v-if="item.children && item.children.length"
                          class="ml-2 inline-flex items-center justify-center rounded-md p-1 transition-colors duration-200"
                          :class="isNewDesignEnabled ? 'text-astra-gray-500 hover:text-astra-gray-800' : 'text-[#465FFF] hover:text-[#0F4CAD]'"
                          @click.stop="toggleExpanded(item.id, item.defaultExpanded)"
                        >
                          <ChevronDownIcon
                            class="h-4 w-4 transition-transform"
                            :class="isExpanded(item.id, item.defaultExpanded) ? 'rotate-180' : ''"
                          />
                        </span>
                      </button>

                      <div
                        v-if="item.children && item.children.length && isExpanded(item.id, item.defaultExpanded)"
                        class="space-y-1"
                      >
                        <template v-for="child in item.children" :key="section.name + '-' + item.name + '-' + child.name">
                          <button
                            type="button"
                            :class="[getLinkClasses(1), (child.children && child.children.length) ? 'flex items-center justify-between gap-3' : '']"
                            :disabled="!child.route && !(child.children && child.children.length)"
                            @click="handleEntryClick(child)"
                          >
                            <span class="flex-1 text-left">{{ child.name }}</span>
                            <span
                              v-if="child.children && child.children.length"
                              class="ml-2 inline-flex items-center justify-center rounded-md p-1 transition-colors duration-200"
                              :class="isNewDesignEnabled ? 'text-astra-gray-500 hover:text-astra-gray-800' : 'text-[#465FFF] hover:text-[#0F4CAD]'"
                              @click.stop="toggleExpanded(child.id, child.defaultExpanded)"
                            >
                              <ChevronDownIcon
                                class="h-4 w-4 transition-transform"
                                :class="isExpanded(child.id, child.defaultExpanded) ? 'rotate-180' : ''"
                              />
                            </span>
                          </button>

                          <div
                            v-if="child.children && child.children.length && isExpanded(child.id, child.defaultExpanded)"
                            class="space-y-1"
                          >
                            <button
                              v-for="grandChild in child.children"
                              :key="section.name + '-' + item.name + '-' + child.name + '-' + grandChild.name"
                              type="button"
                              :class="getLinkClasses(2)"
                              :disabled="!grandChild.route"
                              @click="handleEntryClick(grandChild)"
                            >
                              {{ grandChild.name }}
                            </button>
                          </div>
                        </template>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </nav>

            <div :class="['mt-auto border-t px-5 py-6', isNewDesignEnabled ? 'border-astra-slate-300' : 'border-[#D9E7FB]']">
              <div class="flex items-center gap-3">
                <div
                  :class="[
                    'h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold',
                    isNewDesignEnabled
                      ? 'bg-astra-blue text-astra-white'
                      : 'bg-[#1E6AE1] text-white border border-[#0F4CAD] shadow-[0_4px_12px_rgba(30,106,225,0.25)]'
                  ]"
                >
                  EB
                </div>
                <div>
                  <p :class="['text-sm font-semibold', isNewDesignEnabled ? 'text-astra-gray-900' : 'text-[#2B2C2C]']">Emily Brown</p>
                  <p :class="['text-xs', isNewDesignEnabled ? 'text-astra-gray-500' : 'text-[#667085]']">emily.brown@astrone.com</p>
                </div>
              </div>

              <div class="mt-4 space-y-2">
                <button
                  type="button"
                  :class="[
                    'w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-200',
                    isNewDesignEnabled
                      ? 'text-astra-gray-800 hover:bg-astra-gray-100'
                      : 'text-[#1E6AE1] hover:bg-[#DDEBFF]'
                  ]"
                >
                  Profile
                </button>
                <button
                  type="button"
                  :class="[
                    'w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-200',
                    isNewDesignEnabled
                      ? 'text-astra-gray-800 hover:bg-astra-gray-100'
                      : 'text-[#D92D20] hover:bg-[#FEE4E2]'
                  ]"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  sections: {
    type: Array,
    default: () => []
  },
  isNewDesignEnabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const router = useRouter()
const previousOverflow = ref('')
const expandedState = ref(new Map())

const panelClasses = computed(() => {
  return props.isNewDesignEnabled
    ? 'border-l border-astra-slate-300 text-astra-gray-800'
    : 'border-l border-[#D9E7FB] text-[#2B2C2C] shadow-[0_18px_32px_rgba(70,95,255,0.18)]'
})

const headerBorderClass = computed(() => {
  return props.isNewDesignEnabled ? 'border-astra-slate-300' : 'border-[#D9E7FB]'
})

const brandClasses = computed(() => {
  return props.isNewDesignEnabled
    ? 'w-9 h-9 rounded-lg flex items-center justify-center bg-astra-blue text-astra-white'
    : 'w-9 h-9 rounded-lg flex items-center justify-center bg-[#1E6AE1] text-white border border-[#0F4CAD] shadow-[0_3px_8px_rgba(16,80,188,0.25)]'
})

const brandLabelClasses = computed(() => {
  return props.isNewDesignEnabled ? 'text-lg font-semibold text-astra-gray-800' : 'text-lg font-semibold text-[#2B2C2C]'
})

const closeButtonClasses = computed(() => {
  return props.isNewDesignEnabled
    ? 'inline-flex items-center justify-center rounded-lg p-2 text-astra-gray-600 hover:text-astra-gray-900 focus:outline-none focus:ring-2 focus:ring-astra-blue'
    : 'inline-flex items-center justify-center rounded-lg p-2 text-[#465FFF] hover:text-[#0F4CAD] focus:outline-none focus:ring-2 focus:ring-[#465FFF]'
})

const primaryLinkClasses = computed(() => {
  return props.isNewDesignEnabled
    ? 'w-full text-left text-base font-semibold text-astra-gray-900 hover:text-astra-blue'
    : 'w-full text-left text-base font-semibold text-[#1E6AE1] hover:text-[#0F4CAD]'
})

const sectionLabelClasses = computed(() => {
  return props.isNewDesignEnabled
    ? 'mt-4 text-xs font-semibold uppercase tracking-wide text-astra-gray-400'
    : 'mt-4 text-xs font-semibold uppercase tracking-wide text-[#667085]'
})

const getLinkClasses = (level = 0) => {
  const base = 'w-full text-left text-sm font-medium rounded-lg transition-colors duration-200'
  const spacing = [
    'px-3 py-2',
    'px-3 py-2 pl-6',
    'px-3 py-1 pl-9 text-xs'
  ]
  const palette = props.isNewDesignEnabled
    ? 'text-astra-gray-800 hover:bg-astra-gray-100'
    : 'text-[#1E6AE1] hover:bg-[#DDEBFF]'

  const clampedLevel = Math.min(level, spacing.length - 1)
  return `${base} ${spacing[clampedLevel]} ${palette}`
}

const emitClose = () => {
  emit('close')
}

const isExpanded = (id, defaultExpanded = false) => {
  if (!id) {
    return false
  }

  if (!expandedState.value.has(id)) {
    expandedState.value.set(id, defaultExpanded)
  }

  return expandedState.value.get(id)
}

const toggleExpanded = (id, defaultExpanded = false) => {
  if (!id) {
    return
  }

  const next = !isExpanded(id, defaultExpanded)
  const updated = new Map(expandedState.value)
  updated.set(id, next)
  expandedState.value = updated
}

const handleSectionClick = (section) => {
  if (!section) {
    return
  }

  const hasChildren = Array.isArray(section.items) && section.items.length > 0

  if (section.route) {
    handleNavigate(section.route)
    return
  }

  if (hasChildren) {
    toggleExpanded(section.id, section.defaultExpanded)
  }
}

const handleEntryClick = (entry) => {
  if (!entry) {
    return
  }

  const hasChildren = Array.isArray(entry.children) && entry.children.length > 0

  if (entry.route) {
    handleNavigate(entry.route)
    return
  }

  if (hasChildren) {
    toggleExpanded(entry.id, entry.defaultExpanded)
  }
}

const handleNavigate = async (path) => {
  if (!path) {
    return
  }

  await router.push(path)
  emitClose()
}

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    emitClose()
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (!process.client) {
      return
    }

    if (isOpen) {
      expandedState.value = new Map()
      previousOverflow.value = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    } else {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = previousOverflow.value || ''
    }
  }
)

watch(
  () => props.sections,
  () => {
    expandedState.value = new Map()
  },
  { deep: true }
)

onBeforeUnmount(() => {
  if (!process.client) {
    return
  }

  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = previousOverflow.value || ''
})
</script>
