<template>
  <main class="flex-grow">
    <section
      class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 card-transition"
    >
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <p class="text-sm font-semibold uppercase tracking-wide text-primary mb-3">
            DienerTech LLC
          </p>
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Products</h1>
          <p class="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Open source tools owned by DienerTech LLC and built for broader use
            beyond a single experiment or personal portfolio project.
          </p>
        </div>
      </UContainer>
    </section>

    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="mb-10">
          <h2 class="text-3xl font-bold mb-4">Available Products</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Practical software releases with public documentation, source code,
            and installable builds.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <UCard
            v-for="product in products"
            :key="product.id"
            class="h-full overflow-hidden border border-gray-200 dark:border-gray-800 product-card"
            :ui="{ body: { padding: 'p-0' } }"
          >
            <div class="flex flex-col h-full">
              <NuxtLink
                :to="product.productUrl"
                class="block h-60 bg-gray-100 dark:bg-gray-800 overflow-hidden"
              >
                <NuxtImg
                  :src="product.image"
                  :alt="`${product.title} application screenshot`"
                  class="h-full w-full object-contain transition-transform duration-700"
                />
              </NuxtLink>

              <div class="flex flex-col gap-4 p-6 h-full">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-sm font-semibold text-primary mb-1">
                      {{ product.owner }}
                    </p>
                    <h3 class="text-xl font-bold leading-tight">
                      {{ product.title }}
                    </h3>
                  </div>
                  <UBadge color="emerald" variant="soft">
                    {{ product.status }}
                  </UBadge>
                </div>

                <p class="font-medium text-gray-800 dark:text-gray-200">
                  {{ product.tagline }}
                </p>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ product.description }}
                </p>

                <div class="flex flex-wrap gap-2">
                  <UBadge
                    v-for="type in product.types"
                    :key="type"
                    color="primary"
                    variant="subtle"
                    size="xs"
                  >
                    {{ type }}
                  </UBadge>
                </div>

                <div class="flex flex-wrap gap-3 mt-auto">
                  <UButton
                    :to="product.productUrl"
                    color="primary"
                    icon="i-heroicons-arrow-right"
                    size="sm"
                  >
                    View Product
                  </UButton>
                  <UButton
                    :to="product.releaseUrl"
                    target="_blank"
                    color="gray"
                    variant="soft"
                    icon="i-heroicons-arrow-down-tray"
                    size="sm"
                  >
                    Download
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
const { products } = useProducts();

const { setPageMeta } = useSeo();

setPageMeta({
  title: "Products",
  description:
    "Explore DienerTech LLC products, including open source tools and installable software releases.",
  type: "website",
  canonicalUrl: "https://diener.tech/products",
});
</script>

<style scoped>
.card-transition {
  transition: all 0.3s ease;
}

.product-card {
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 35px -15px rgba(0, 0, 0, 0.25);
}

.product-card:hover img {
  transform: scale(1.03);
}
</style>
