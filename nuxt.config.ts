// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js'
  },
  ssr: true,
  loading: false, // Disable the default loading indicator
  nitro: {
    preset: 'netlify',
    prerender: {
      // Ignore 404 errors during prerendering
      failOnError: false,
      crawlLinks: true
    },
    routeRules: {
      '/**': { prerender: true }
    }
  }
})
