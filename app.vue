<template>
  <div class="min-h-screen flex flex-col">
    <!-- Fixed Header with Background -->
    <div class="fixed top-0 left-0 w-full z-50 bg-gray shadow-md backdrop-blur-lg">
      <UContainer>
        <Header />
      </UContainer>
    </div>

    <!-- Main Content (Avoid Overlap with Header) -->
    <UPage class="flex-grow pt-[80px] bg-gray">
      <Transition name="fade" mode="out-in">
        <div>
          <NuxtPage />
        </div>
      </Transition>
    </UPage>

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

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
