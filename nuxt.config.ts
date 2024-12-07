// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  router: {
    options: {
      strict: true, // Ensure correct path handling
    },
  },

  modules: ['@nuxt/ui'],
})