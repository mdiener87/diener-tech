<template>
  <div class="container mx-auto py-6">
    <h1 class="text-3xl font-bold mb-4">Blog</h1>
    <p class="text-lg text-gray-600 mb-6">Explore my latest posts:</p>

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

// Query all blog posts
const posts = await queryContent("blog").sort({ date: -1 }).find();

console.log("DEBUG posts", posts);
</script>
