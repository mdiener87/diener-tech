<template>
  <div
    class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
  >
    <a href="#main-content" class="skip-link">Skip to content</a>
    <Header />
    <div id="main-content" tabindex="-1" class="flex-grow outline-none">
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>
