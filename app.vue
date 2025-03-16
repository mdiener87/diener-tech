<template>
  <div class="min-h-screen flex flex-col">
    <!-- Fixed Header with Background -->
    <div class="fixed top-0 left-0 w-full z-50 bg-gray shadow-md backdrop-blur-lg">
      <UContainer>
        <Header />
      </UContainer>
    </div>

    <!-- Main Content (Avoid Overlap with Header) -->
    <div class="flex-grow pt-[80px] bg-gray">
      <UContainer>
        <NuxtPage />
      </UContainer>
    </div>

    <!-- Footer -->
    <Footer class="shadow-md backdrop-blur-lg" />
  </div>
</template>

<script setup></script>

<style>
html {
  transition: background-color 0.25s ease, color 0.25s ease;
}

/* Ensures header content isn't transparent */
.fixed-header {
  background-color: rgba(255, 255, 255, 0.95); /* Light mode */
  backdrop-filter: blur(8px); /* Adds blur effect */
}

.dark .fixed-header {
  background-color: rgba(17, 24, 39, 0.95); /* Dark mode */
}

/* Page Transition */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
