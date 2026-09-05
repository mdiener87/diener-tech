<template>
  <header class="site-header" @keydown.esc="closeMenu">
    <UContainer class="flex h-20 items-center justify-between gap-4">
      <NuxtLink to="/" class="wordmark shrink-0" aria-label="Diener.Tech home"
        >diener<span class="text-primary">.tech</span></NuxtLink
      >
      <nav
        aria-label="Main navigation"
        class="hidden md:flex items-center gap-7"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :aria-current="isActive(link.to) ? 'page' : undefined"
          :class="['nav-link', { 'nav-active': isActive(link.to) }]"
          >{{ link.label }}</NuxtLink
        >
      </nav>
      <div class="flex items-center gap-2">
        <ColorMode />
        <button
          ref="menuButton"
          type="button"
          class="md:hidden p-3 text-primary rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          :aria-label="mobileMenuOpen ? 'Close navigation' : 'Open navigation'"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-navigation"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <UIcon
            :name="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            class="w-5 h-5"
          />
        </button>
      </div>
    </UContainer>
    <nav
      v-show="mobileMenuOpen"
      id="mobile-navigation"
      aria-label="Mobile navigation"
      class="md:hidden border-t border-gray-200 dark:border-gray-800 px-4 py-3 grid grid-cols-2 gap-2"
    >
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="rounded-lg px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
        :aria-current="isActive(link.to) ? 'page' : undefined"
        @click="mobileMenuOpen = false"
        >{{ link.label }}</NuxtLink
      >
    </nav>
  </header>
</template>
<script setup lang="ts">
const route = useRoute();
const mobileMenuOpen = ref(false);
const menuButton = ref<HTMLButtonElement>();
function closeMenu() {
  if (!mobileMenuOpen.value) return;
  mobileMenuOpen.value = false;
  menuButton.value?.focus();
}
const links = [
  { label: "Work", to: "/work" },
  { label: "Writing", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
const isActive = (path: string) =>
  route.path === path ||
  route.path.startsWith(path + "/") ||
  (path === "/work" && /^\/(products|projects)(\/|$)/.test(route.path)) ||
  (path === "/about" && route.path === "/career");
watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false;
  },
);
</script>
