<template>
  <main class="flex-grow">
    <section
      class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 card-transition"
    >
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <p class="text-sm font-semibold uppercase tracking-wide text-primary mb-3">
            Company
          </p>
          <h1 class="text-4xl md:text-5xl font-bold mb-6">DienerTech LLC</h1>
          <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl">
            DienerTech LLC develops, publishes, and maintains software under
            the DienerTech name.
          </p>
        </div>
      </UContainer>
    </section>

    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          <UCard class="h-full">
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon
                  name="i-heroicons-user-circle"
                  class="w-7 h-7 text-primary shrink-0"
                />
                <h2 class="text-2xl font-bold">Michael Diener</h2>
              </div>
            </template>

            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Michael Diener is the founder and software engineer behind
              DienerTech. He designs and builds software across frontend,
              backend, cloud, data, and immersive systems.
            </p>
            <UButton
              to="/about"
              variant="link"
              class="px-0 mt-4"
              trailing-icon="i-heroicons-arrow-right"
            >
              About Michael
            </UButton>
          </UCard>

          <UCard class="h-full">
            <template #header>
              <div class="flex items-center gap-3">
                <UIcon
                  name="i-heroicons-building-office-2"
                  class="w-7 h-7 text-primary shrink-0"
                />
                <h2 class="text-2xl font-bold">DienerTech</h2>
              </div>
            </template>

            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              DienerTech is the product and publishing arm of DienerTech LLC,
              focused on practical software, developer tools, and technical
              projects built by Michael Diener.
            </p>
            <UButton
              to="/products"
              variant="link"
              class="px-0 mt-4"
              trailing-icon="i-heroicons-arrow-right"
            >
              Explore DienerTech products
            </UButton>
          </UCard>
        </div>
      </UContainer>
    </section>

    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-6">Company information</h2>
          <dl
            class="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700"
          >
            <div class="grid gap-1 sm:grid-cols-3 sm:gap-6 p-5">
              <dt class="font-medium text-gray-600 dark:text-gray-400">
                Legal name
              </dt>
              <dd class="sm:col-span-2">DienerTech LLC</dd>
            </div>
            <div class="grid gap-1 sm:grid-cols-3 sm:gap-6 p-5">
              <dt class="font-medium text-gray-600 dark:text-gray-400">
                Founder
              </dt>
              <dd class="sm:col-span-2">Michael Diener</dd>
            </div>
            <div class="grid gap-1 sm:grid-cols-3 sm:gap-6 p-5">
              <dt class="font-medium text-gray-600 dark:text-gray-400">
                Contact
              </dt>
              <dd class="sm:col-span-2">
                <NuxtLink to="/contact" class="text-primary hover:underline">
                  Contact DienerTech
                </NuxtLink>
              </dd>
            </div>
          </dl>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
const { setPageMeta } = useSeo();

setPageMeta({
  title: "DienerTech LLC",
  description:
    "Company information for DienerTech LLC, the publisher and operator of DienerTech products built by Michael Diener.",
  type: "website",
  canonicalUrl: "https://diener.tech/company",
});
</script>
