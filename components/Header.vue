<template>
  <header class="w-full py-4 shadow-md bg-gray">
    <UContainer class="flex items-center justify-between">
      <NuxtLink to="/" class="text-2xl font-bold text-primary">
        Diener.tech
      </NuxtLink>

      <!-- Center: Navigation Links (Hidden on Smaller Screens) -->
      <UHorizontalNavigation :links="navLinks" class="hidden sm:flex pl-5" />

      <!-- Right: Color Mode + Mobile Menu Button -->
      <div class="flex items-center gap-4">
        <UPopover
          mode="click"
          :popper="{ placement: 'bottom-end' }"
          class="sm:hidden"
        >
          <UButton icon="i-heroicons-bars-3" size="lg" variant="ghost" />

          <template #panel>
            <div class="bg-gray p-2 rounded-md shadow-md w-48">
              <ul class="flex flex-col">
                <li v-for="link in navLinks" :key="link.to">
                  <ULink
                    :to="link.to"
                    class="block px-4 py-2 rounded"
                    active-class="text-primary"
                    inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {{ link.label }}
                  </ULink>
                </li>
              </ul>
            </div>
          </template>
        </UPopover>

        <ColorMode />
      </div>
    </UContainer>
  </header>
</template>

<script setup>
const navLinks = [
  { label: "Home", to: "/" },
  { label: "Career", to: "/career" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
</script>
