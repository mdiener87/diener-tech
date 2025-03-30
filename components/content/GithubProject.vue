<template>
  <UCard class="github-project overflow-hidden h-full">
    <div class="flex flex-col sm:flex-row">
      <!-- Project Image or Default Icon -->
      <a :href="url" target="_blank" rel="noopener noreferrer" class="shrink-0 sm:w-40">
        <div
          class="relative w-full h-40 sm:w-40 sm:h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden sm:rounded-l"
        >
          <img
            v-if="src"
            :src="src"
            :alt="name"
            class="w-full h-full object-cover"
          />
          <UIcon
            v-else
            name="i-heroicons-code-bracket-square"
            class="text-gray-400 dark:text-gray-600 h-24 w-24"
          />
        </div>
      </a>

      <!-- Project Info -->
      <div class="p-4 sm:pl-5 flex-1 flex flex-col justify-center">
        <div class="flex items-center mb-2">
          <UIcon name="i-heroicons-code-bracket" class="text-primary mr-2 flex-shrink-0" />
          <h3 class="text-lg font-semibold leading-tight">{{ name }}</h3>
        </div>
        <p
          v-if="description"
          class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3"
        >
          {{ description }}
        </p>
        <ULink
          :to="url"
          target="_blank"
          class="inline-flex items-center text-xs text-primary hover:text-primary-dark"
        >
          <UIcon name="i-heroicons-arrow-top-right-on-square" class="mr-1" />
          <span>View on GitHub</span>
        </ULink>
      </div>
    </div>
  </UCard>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validator: (value) => value.includes("github.com"),
  },
  description: {
    type: String,
    default: "",
  },
  src: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.github-project {
  transition: transform 0.2s, box-shadow 0.2s;
}

.github-project:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

@media (min-width: 640px) {
  .github-project img {
    transition: transform 0.3s ease;
  }
  
  .github-project:hover img {
    transform: scale(1.05);
  }
}
</style>
