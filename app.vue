<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-100">
    <!-- Header -->
    <header class="w-full bg-blue-500 text-white py-6 shadow-md">
      <div class="container mx-auto text-center">
        <h1 class="text-4xl font-bold">Welcome to Diener.tech</h1>
        <p class="text-lg mt-2">
          Exploring the intersection of technology, development, and creativity.
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto p-6 text-center">
      <!-- About Section -->
      <UCard class="mb-6 shadow-lg">
        <template #header>
          <h2 class="text-xl font-bold">About This Site</h2>
        </template>
        <p>
          Diener.tech is a personal portfolio and blog showcasing my journey in
          software development, creative projects, and more. Whether you're here
          to explore my work or read my thoughts on technology, you're in the
          right place.
        </p>
      </UCard>

      <!-- Blog Link Section -->
      <UCard class="shadow-lg">
        <template #header>
          <h2 class="text-xl font-bold">Check Out the Blog</h2>
        </template>
        <p>Stay up-to-date with my latest posts on technology, tutorials, and projects.</p>
        <NuxtLink
          to="/blog"
          class="mt-4 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        >
          Visit the Blog
        </NuxtLink>
      </UCard>
    </main>

    <!-- Footer -->
    <footer class="w-full bg-gray-800 text-gray-400 py-4 text-center">
      <p>© 2024 Diener.tech | Built with Nuxt.js</p>
    </footer>
  </div>
</template>

<script setup>
</script>

<style>
</style>
