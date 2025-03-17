<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      class="color-mode-button"
      @click="toggleColorMode"
    />
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

// Add a smooth transition when toggling color mode
function toggleColorMode() {
  // Add transition class to body
  document.documentElement.classList.add('transitioning');
  
  // Toggle dark mode
  isDark.value = !isDark.value;
  
  // Remove transition class after animation completes
  setTimeout(() => {
    document.documentElement.classList.remove('transitioning');
  }, 500);
}
</script>
