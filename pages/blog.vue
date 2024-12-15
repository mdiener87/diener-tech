<template>
  <div class="container flex flex-col flex-grow mx-auto py-6">
    <h1 class="text-3xl font-bold mb-4">Blog</h1>
    <h3>Explore my latest posts:</h3>

    <!-- Blog Posts -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="post in posts" :key="post._path" class="hover:shadow-lg">
        <template #header>
          <h2 class="text-xl font-semibold">{{ post.title }}</h2>
        </template>
        <p class="text-gray-700 mb-4">{{ post.description }}</p>
        <NuxtLink
          :to="post._path"
          class="inline-block text-blue-500 hover:underline font-semibold"
        >
          Read More
        </NuxtLink>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const posts = await queryContent("blog")
  .where({ _partial: false }) // Exclude partials
  .sort({ date: -1 }) // Sort by date descending
  .find();
</script>
