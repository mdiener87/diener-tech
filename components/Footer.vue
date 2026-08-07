<template>
  <footer class="w-full bg-gray shadow-md mt-auto">
    <UContainer class="py-6">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <!-- Newsletter signup -->
        <div class="md:max-w-xs">
          <NewsletterSignup compact />
        </div>

        <!-- Company and legal information -->
        <div
          class="text-sm text-gray-600 dark:text-gray-400 md:self-end text-center md:text-right shrink-0 space-y-1"
        >
          <p>© 2024–2026 DienerTech LLC</p>
          <p>
            DienerTech is operated by
            <NuxtLink
              to="/company"
              class="font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              DienerTech LLC
            </NuxtLink>.
          </p>
          <p class="text-xs">Built with Nuxt.js</p>
        </div>
      </div>
    </UContainer>
  </footer>
</template>

<script setup>
import NewsletterSignup from '~/components/newsletter/NewsletterSignup.vue'
</script>
