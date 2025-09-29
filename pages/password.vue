<template>
  <div class="min-h-screen flex items-center justify-center bg-astra-gray-25 p-6">
    <div class="w-full max-w-md rounded-2xl border border-astra-slate-300 bg-white p-8 shadow-lg">
      <h1 class="text-2xl font-semibold text-astra-gray-800">Enter Password</h1>
      <p class="mt-2 text-sm text-astra-gray-600">This mockup is protected. Please enter the shared password to continue.</p>

      <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label for="password" class="text-sm font-medium text-astra-gray-700">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="mt-1 w-full rounded-lg border border-astra-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-astra-blue"
            required
            autofocus
          />
        </div>

        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

        <button
          type="submit"
          class="w-full rounded-lg bg-astra-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-astra-blue/90"
        >
          Unlock
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from '#imports'
import { recordAuthSession } from '~/utils/auth-session'

const route = useRoute()
const router = useRouter()
const password = ref('')
const error = ref('')

const handleSubmit = () => {
  if (password.value === 'astronemockup') {
    recordAuthSession()
    const redirect = route.query.redirect?.toString() || '/home/dashboard'
    router.replace(redirect)
  } else {
    error.value = 'Incorrect password. Please try again.'
  }
}

definePageMeta({
  layout: false
})
</script>
