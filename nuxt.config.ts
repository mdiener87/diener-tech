// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  imports: {
    autoImport: true,
  },
  modules: ["@nuxt/content", "@nuxt/ui", "@nuxtjs/color-mode"],
  ui: {
    global: true,
  },
  colorMode: {
    classSuffix: '',
    fallback: 'light',
    storageKey: 'nuxt-color-mode'
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
      appear: true
    }
  }
});