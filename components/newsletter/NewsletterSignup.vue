<template>
  <section class="section-space bg-blue-50/70 dark:bg-gray-800/50">
    <UContainer class="max-w-3xl">
      <p class="eyebrow mb-3">In your inbox</p>
      <h2 class="editorial-title text-3xl sm:text-4xl">
        A note from me, now and then.
      </h2>
      <p class="text-gray-600 dark:text-gray-300 mt-4 mb-6 leading-relaxed">
        Get new essays, build logs, and short notes from the workshop. AI
        engineering, open source software, and the things I learn by making
        them.
      </p>
      <!-- A native form lets Buttondown show validation and confirmation steps. -->
      <form
        action="https://buttondown.com/api/emails/embed-subscribe/dienertech"
        method="post"
        class="max-w-xl"
      >
        <label :for="emailId" class="block text-sm font-medium mb-2"
          >Email address</label
        >
        <div class="flex flex-col sm:flex-row gap-3">
          <input
            :id="emailId"
            type="email"
            name="email"
            autocomplete="email"
            required
            placeholder="you@example.com"
            class="min-w-0 flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-base"
          />
          <input type="hidden" name="embed" value="1" />
          <UButton
            type="submit"
            size="lg"
            trailing-icon="i-heroicons-arrow-right"
            class="justify-center"
            >Subscribe</UButton
          >
        </div>
      </form>
      <p class="mt-4 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
        Continue to Buttondown to complete your subscription. Unsubscribe
        anytime.
      </p>
    </UContainer>
  </section>
</template>
<script setup lang="ts">
const emailId = useId();
</script>
