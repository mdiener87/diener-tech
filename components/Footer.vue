<template>
  <footer class="border-t border-gray-200 dark:border-gray-800 mt-auto">
    <UContainer class="py-9 flex flex-col sm:flex-row justify-between gap-6">
      <div>
        <NuxtLink to="/" class="wordmark text-lg"
          >diener<span class="text-primary">.tech</span></NuxtLink
        >
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Built with curiosity. Based in Colorado.
        </p>
      </div>
      <div class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
        <nav
          aria-label="Footer navigation"
          class="flex flex-wrap gap-x-5 gap-y-3"
        >
          <NuxtLink to="/career">Career</NuxtLink
          ><NuxtLink to="/company">DienerTech LLC</NuxtLink
          ><NuxtLink to="/products">Products</NuxtLink
          ><a href="/feed.xml">RSS</a
          ><a href="https://buttondown.com/dienertech">Newsletter</a>
        </nav>
        <p>© 2024–{{ new Date().getFullYear() }} DienerTech LLC</p>
      </div>
    </UContainer>
  </footer>
</template>
