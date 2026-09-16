<template>
  <footer class="border-t border-gray-200 dark:border-gray-800 mt-auto">
    <UContainer class="py-9 flex flex-col sm:flex-row justify-between gap-6">
      <div>
        <NuxtLink
          to="/"
          class="inline-flex rounded"
          aria-label="DienerTech home"
        >
          <BrandLogo />
        </NuxtLink>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Built with curiosity. Based in Colorado.
        </p>
      </div>
      <div class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
        <NuxtLink to="/subscribe" class="text-link inline-block"
          >Subscribe via email or RSS →</NuxtLink
        >
        <p>© 2024–{{ new Date().getFullYear() }} DienerTech LLC</p>
      </div>
    </UContainer>
  </footer>
</template>
