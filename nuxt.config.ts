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
    },
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    }
  }
});