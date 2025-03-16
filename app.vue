<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Fixed Header with Background -->
    <div class="fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-lg">
      <UContainer>
        <Header />
      </UContainer>
    </div>

    <!-- Main Content (Avoid Overlap with Header) -->
    <div class="flex-grow pt-[80px]">
      <UContainer>
        <NuxtPage />
      </UContainer>
    </div>

    <!-- Footer -->
    <Footer class="shadow-md backdrop-blur-lg bg-white/95 dark:bg-gray-900/95" />
  </div>
</template>

<script setup></script>

<style>
/* Base transitions for color mode changes */
html {
  transition: background-color 0.25s ease,
              color 0.25s ease;
}

/* Apply transitions to all elements */
*, *::before, *::after {
  transition: background-color 0.25s ease,
              border-color 0.25s ease,
              color 0.25s ease,
              box-shadow 0.25s ease;
}

/* Page Transition */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

/* Color Mode Button Animation */
.color-mode-button {
  transform-origin: center;
  transition: transform 0.25s ease;
}

.color-mode-button:hover {
  transform: rotate(45deg);
}

/* Dark mode transition effect */
.dark-mode-enter-active,
.dark-mode-leave-active {
  transition: opacity 0.25s ease;
}

.dark-mode-enter-from,
.dark-mode-leave-to {
  opacity: 0;
}
</style>
