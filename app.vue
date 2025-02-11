<template>
  <div
    class="min-h-screen flex flex-col bg-background dark:bg-background-dark text-text-light dark:text-text-dark transition-colors"
  >
    <Header />
    <main class="max-w-3xl mx-auto px-6 py-6 flex-grow w-full">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup></script>
