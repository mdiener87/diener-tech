<template>
  <header class="w-full py-6 shadow-md">
    <div class="container mx-auto text-center">
      <h1 class="text-4xl font-bold">Welcome to Diener.tech</h1>
      <p class="text-lg mt-2">
        Exploring the intersection of technology, development, and creativity.
      </p>
    </div>
    <div class="flex justify-center items-baseline">
      <NuxtLink
        to="/"
        class="mt-4 inline-block font-semibold py-2 px-4 rounded nuxt-link"
      >
        Home
      </NuxtLink>
      <NuxtLink
        to="/blog"
        class="mt-4 inline-block font-semibold py-2 px-4 rounded"
      >
        Blog
      </NuxtLink>
      <NuxtLink
        to="/about"
        class="mt-4 inline-block font-semibold py-2 px-4 rounded"
      >
        About
      </NuxtLink>
      <NuxtLink
        to="/contact"
        class="mt-4 inline-block font-semibold py-2 px-4 rounded"
      >
        Contact
      </NuxtLink>
      <ColorMode class="m-4"></ColorMode>
    </div>
    
  </header>
</template>

<script setup></script>