<template>
  <header ref="header" class="site-header" @keydown.esc="closeMenus(true)">
    <UContainer class="flex h-20 items-center justify-between gap-4">
      <NuxtLink
        to="/"
        class="brand-home-link inline-flex shrink-0 rounded py-2"
        aria-label="DienerTech home"
      >
        <BrandLogo interactive />
      </NuxtLink>
      <nav aria-label="Main navigation" class="hidden md:block">
        <ul class="flex items-center gap-5 lg:gap-7">
          <li
            v-for="group in groups"
            :key="group.label"
            class="relative"
            @focusout="leaveGroup($event)"
          >
            <div class="flex items-center gap-1">
              <NuxtLink
                v-if="!group.children"
                :to="group.to"
                @click="closeMenus()"
                :class="['nav-link', { 'nav-active': isActive(group.to) }]"
                :aria-current="route.path === group.to ? 'page' : undefined"
                >{{ group.label }}</NuxtLink
              >
              <button
                v-if="group.children"
                type="button"
                :class="[
                  'nav-link inline-flex items-center gap-2 rounded',
                  { 'nav-active': isActive(group.to) },
                ]"
                :aria-expanded="openGroup === group.label"
                :aria-controls="`nav-${group.label}`"
                @click="toggleGroup(group.label)"
              >
                {{ group.label }}
                <UIcon
                  name="i-heroicons-chevron-down"
                  class="w-3 h-3 transition-transform"
                  :class="{ 'rotate-180': openGroup === group.label }"
                />
              </button>
            </div>
            <div
              v-if="group.children"
              v-show="openGroup === group.label"
              :id="`nav-${group.label}`"
              class="absolute top-full left-0 pt-3 w-60"
            >
              <ul
                class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-2"
              >
                <li v-for="link in group.children" :key="link.to">
                  <NuxtLink
                    :to="link.to"
                    @click="closeMenus()"
                    class="block px-4 py-3 text-sm rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800"
                    :aria-current="route.path === link.to ? 'page' : undefined"
                    >{{ link.label }}</NuxtLink
                  >
                </li>
              </ul>
            </div>
          </li>
        </ul>
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
      class="md:hidden border-t border-gray-200 dark:border-gray-800 px-5 py-3 max-h-[calc(100dvh-5rem)] overflow-y-auto"
    >
      <ul class="divide-y divide-gray-200 dark:divide-gray-800">
        <li v-for="group in groups" :key="group.label" class="py-2">
          <NuxtLink
            v-if="!group.children"
            :to="group.to"
            @click="closeMenus()"
            class="block px-3 py-2 font-semibold text-primary"
            >{{ group.label }}</NuxtLink
          >
          <p v-else class="px-3 py-2 font-semibold text-primary">
            {{ group.label }}
          </p>
          <ul v-if="group.children" class="pl-3">
            <li v-for="link in group.children" :key="link.to">
              <NuxtLink
                :to="link.to"
                @click="closeMenus()"
                class="block rounded-lg px-3 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >{{ link.label }}</NuxtLink
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
const route = useRoute();
const header = ref<HTMLElement>();
const menuButton = ref<HTMLButtonElement>();
const mobileMenuOpen = ref(false);
const openGroup = ref<string | null>(null);
const groups = [
  {
    label: "Work",
    to: "/work",
    children: [
      { label: "Selected work", to: "/work" },
      { label: "Personal projects", to: "/projects" },
      { label: "Products & releases", to: "/products" },
      { label: "DienerTech LLC", to: "/company" },
    ],
  },
  {
    label: "Writing",
    to: "/blog",
    children: [
      { label: "Blog", to: "/blog" },
      { label: "SparkNet series", to: "/work/sparknet" },
      { label: "Subscribe", to: "/subscribe" },
    ],
  },
  {
    label: "About",
    to: "/about",
    children: [
      { label: "About Michael", to: "/about" },
      { label: "Career & experience", to: "/career" },
    ],
  },
  { label: "Contact", to: "/contact" },
];
const isActive = (path: string) =>
  route.path === path ||
  route.path.startsWith(path + "/") ||
  (path === "/blog" && route.path === "/subscribe") ||
  (path === "/work" &&
    /^\/(products|projects|company)(\/|$)/.test(route.path)) ||
  (path === "/about" && route.path === "/career");
function toggleGroup(label: string) {
  openGroup.value = openGroup.value === label ? null : label;
}
function closeMenus(returnFocus = false) {
  if (returnFocus) {
    if (mobileMenuOpen.value) menuButton.value?.focus();
    else if (openGroup.value)
      header.value
        ?.querySelector<HTMLButtonElement>(
          `button[aria-controls="nav-${openGroup.value}"]`,
        )
        ?.focus();
  }
  mobileMenuOpen.value = false;
  openGroup.value = null;
}
function leaveGroup(event: FocusEvent) {
  if (
    !(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node)
  )
    openGroup.value = null;
}
function outsideClick(event: PointerEvent) {
  if (!header.value?.contains(event.target as Node)) closeMenus();
}
onMounted(() => document.addEventListener("pointerdown", outsideClick));
onBeforeUnmount(() =>
  document.removeEventListener("pointerdown", outsideClick),
);
watch(
  () => route.fullPath,
  () => {
    closeMenus();
  },
);
</script>
