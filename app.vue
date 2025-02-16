<template>
  <div
    class="min-h-screen flex flex-col bg-background dark:bg-background-dark text-text-light dark:text-text-dark transition-colors"
  >
    <Header />
    <main class="max-w-3xl mx-auto px-6 py-6 flex-grow w-full">
      <Transition name="fade" mode="out-in">
        <NuxtPage />
      </Transition>
    </main>
    <Footer />
  </div>
</template>

<script setup></script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
