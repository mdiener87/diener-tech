<template>
  <footer class="w-full bg-gray shadow-md mt-auto">
    <UContainer class="py-6">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <!-- Newsletter signup -->
        <div class="md:max-w-xs">
          <NewsletterSignup compact />
        </div>

        <!-- Copyright -->
        <p class="text-sm text-gray-600 dark:text-gray-400 md:self-end text-center md:text-right shrink-0">
          © 2024 DienerTech | Built with Nuxt.js
        </p>
      </div>
    </UContainer>
  </footer>
</template>

<script setup>
import NewsletterSignup from '~/components/newsletter/NewsletterSignup.vue'
</script>
