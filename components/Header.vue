<template>
  <header class="w-full bg-blue-500 text-white py-6 shadow-md">
    <div class="container mx-auto text-center">
      <h1 class="text-4xl font-bold">Welcome to Diener.tech</h1>
      <p class="text-lg mt-2">
        Exploring the intersection of technology, development, and creativity.
      </p>
    </div>
    <div class="flex justify-center">
      <NuxtLink
        to="/"
        class="mt-4 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
      >
        Home
      </NuxtLink>
      <NuxtLink
        to="/blog"
        class="mt-4 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
      >
        Blog
      </NuxtLink>
      <NuxtLink
        to="/about"
        class="mt-4 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
      >
        About
      </NuxtLink>
      <NuxtLink
        to="/blog"
        class="mt-4 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
      >
        Socials
      </NuxtLink>
    </div>
  </header>
</template>

<script setup></script>

<style scoped></style>
