<template>
  <header class="w-full py-4 shadow-md bg-gray">
    <UContainer class="flex items-center justify-between">
      <NuxtLink to="/" class="text-2xl font-bold text-primary">
        Diener.tech
      </NuxtLink>

      <UHorizontalNavigation
        :links="navLinks"
        class=""
      />

      <ColorMode class="pr-1" />
    </UContainer>
  </header>
</template>

<script setup>
const navLinks = [
  { label: "Home", to: "/" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" }
];
</script>
