// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  imports: {
    autoImport: true,
  },
  modules: [
    "@nuxt/content", 
    "@nuxt/ui", 
    "@nuxtjs/color-mode",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "nuxt-schema-org",
    "@nuxt/image",
    "nuxt-cloudflare-analytics",
  ],
  // Configure modules
  cloudflareAnalytics: {
    token: process.env.NUXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN
  },
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
  },
  // SEO Configuration
  site: {
    url: 'https://diener.tech', // Replace with your actual domain
    name: 'Diener.tech',
    description: 'Personal portfolio and blog showcasing software development, creative projects, and more.',
    defaultLocale: 'en',
  },
  sitemap: {
    // Sitemap configuration
    urls: [], // Additional URLs to include
    // Will automatically include routes from your pages directory
  },
  robots: {
    // Robots.txt configuration for v4
    sitemap: ['https://diener.tech/sitemap.xml'],
    groups: [
      {
        userAgent: '*',
        allow: ['/']
      }
    ],
    disallowNonIndexableRoutes: true,
  },
  schemaOrg: {
    // Schema.org configuration
    identity: {
      type: 'Person',
      name: 'Your Name', // Replace with your name
      url: 'https://diener.tech', // Replace with your site URL
    }
  },
  image: {
    // Image optimization
    provider: 'ipx',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
});