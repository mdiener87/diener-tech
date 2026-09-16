<template>
  <section class="py-9 bg-blue-50/70 dark:bg-gray-800/50">
    <UContainer
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-5"
    >
      <div>
        <h2 class="text-xl font-semibold tracking-tight">Stay in the loop.</h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
          New writing and things I’m building, by email or RSS. Your choice.
        </p>
      </div>
      <UButton
        to="/subscribe"
        size="lg"
        trailing-icon="i-heroicons-arrow-right"
        class="self-start sm:self-center"
        >Subscribe</UButton
      >
    </UContainer>
  </section>
</template>
