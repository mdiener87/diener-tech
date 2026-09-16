<template>
  <main>
    <section class="section-space">
      <UContainer class="max-w-3xl">
        <p class="eyebrow mb-4">Keep in touch</p>
        <h1 class="editorial-title text-4xl sm:text-6xl">Stay in the loop.</h1>
        <p
          class="mt-5 text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          If you like following along, here are two ways to hear about new
          writing and things I’m building. Pick whichever feels at home.
        </p>
      </UContainer>
    </section>
    <NewsletterSignup />
    <section class="section-space">
      <UContainer class="max-w-3xl">
        <div class="flex items-center gap-3 mb-3">
          <UIcon
            name="i-heroicons-rss"
            class="w-5 h-5 text-primary"
            aria-hidden="true"
          />
          <p class="eyebrow">In your feed reader</p>
        </div>
        <h2 class="editorial-title text-3xl">Prefer RSS?</h2>
        <p class="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
          RSS lets you follow this blog in a feed reader, alongside other sites
          you enjoy. No email address needed. Add this address to your reader:
        </p>
        <p
          class="mt-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 font-mono text-sm break-all select-all"
        >
          https://diener.tech/feed.xml
        </p>
        <UButton
          to="/feed.xml"
          external
          variant="soft"
          size="lg"
          class="mt-5"
          trailing-icon="i-heroicons-arrow-right"
          aria-describedby="rss-help"
          >Open RSS feed (XML)</UButton
        >
        <p id="rss-help" class="mt-3 text-sm text-gray-500 dark:text-gray-400">
          This opens a raw XML document for feed readers. In a browser, it may
          look like code — that’s expected.
        </p>
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
import NewsletterSignup from "~/components/newsletter/NewsletterSignup.vue";

useSeo().setPageMeta({
  title: "Subscribe — Stay in the Loop",
  description:
    "Follow Michael Diener’s writing and projects by email through Buttondown, or subscribe to the DienerTech RSS feed.",
});
</script>
