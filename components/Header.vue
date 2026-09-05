<template>
  <header ref="header" class="site-header" @keydown.esc="closeMenus(true)">
    <UContainer class="flex h-20 items-center justify-between gap-4">
      <NuxtLink
        to="/"
        class="playful-logo shrink-0"
        aria-label="Diener.Tech home"
        @mouseenter="changeAccent"
        @focus="changeAccent"
      >
        <span class="logo-diener">Diener</span
        ><span class="logo-tech" :style="{ color: accent }">Tech</span
        ><span class="logo-underline" aria-hidden="true" />
      </NuxtLink>
      <nav aria-label="Main navigation" class="hidden md:block">
        <ul class="flex items-center gap-5 lg:gap-7">
          <li
            v-for="group in groups"
            :key="group.label"
            class="relative"
            @mouseenter="openGroup = group.children ? group.label : null"
            @mouseleave="leavePointer($event)"
            @focusout="leaveGroup($event)"
          >
            <div class="flex items-center gap-1">
              <NuxtLink
                :to="group.to"
                @click="closeMenus()"
                :class="['nav-link', { 'nav-active': isActive(group.to) }]"
                :aria-current="route.path === group.to ? 'page' : undefined"
                >{{ group.label }}</NuxtLink
              >
              <button
                v-if="group.children"
                type="button"
                class="p-1.5 rounded text-gray-500 dark:text-gray-300 hover:text-primary"
                :aria-label="`${group.label} pages`"
                :aria-expanded="openGroup === group.label"
                :aria-controls="`nav-${group.label}`"
                @click="toggleGroup(group.label)"
              >
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
                    :external="link.to === '/feed.xml'"
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
            :to="group.to"
            @click="closeMenus()"
            class="block px-3 py-2 font-semibold text-primary"
            >{{ group.label }}</NuxtLink
          >
          <ul v-if="group.children" class="pl-3">
            <li v-for="link in group.children" :key="link.to">
              <NuxtLink
                :to="link.to"
                :external="link.to === '/feed.xml'"
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
const colors = ["#8b5cf6", "#0d9488", "#db2777", "#2563eb", "#b45309"];
const accentIndex = ref(0);
const accent = computed(() => colors[accentIndex.value]);
function changeAccent() {
  accentIndex.value = (accentIndex.value + 1) % colors.length;
}
const groups = [
  {
    label: "Work",
    to: "/work",
    children: [
      { label: "Personal projects", to: "/projects" },
      { label: "Products & releases", to: "/products" },
      { label: "DienerTech LLC", to: "/company" },
    ],
  },
  {
    label: "Writing",
    to: "/blog",
    children: [
      { label: "SparkNet series", to: "/work/sparknet" },
      { label: "Newsletter", to: "/blog#newsletter" },
      { label: "RSS feed", to: "/feed.xml" },
    ],
  },
  {
    label: "About",
    to: "/about",
    children: [{ label: "Career & experience", to: "/career" }],
  },
  { label: "Contact", to: "/contact" },
];
const isActive = (path: string) =>
  route.path === path ||
  route.path.startsWith(path + "/") ||
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
function leavePointer(event: MouseEvent) {
  if (!(event.currentTarget as HTMLElement).contains(document.activeElement))
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
    changeAccent();
  },
);
</script>
<style scoped>
.playful-logo {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  gap: 0.12em;
  padding: 0.45rem 0;
  font-size: 1.65rem;
  font-weight: 800;
  letter-spacing: -0.045em;
}
.logo-diener {
  color: #3b82f6;
  transition: transform 0.25s ease;
}
.logo-tech {
  font-style: italic;
  display: inline-block;
  transform: translateY(0.12em);
  transition:
    color 0.25s,
    transform 0.25s;
}
.logo-underline {
  position: absolute;
  bottom: 0.15rem;
  left: 0;
  height: 2px;
  width: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #0d9488);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
}
.playful-logo:is(:hover, :focus-visible) .logo-diener {
  transform: translateY(-2px) rotate(-2deg);
}
.playful-logo:is(:hover, :focus-visible) .logo-tech {
  transform: translateY(-1px) rotate(4deg);
}
.playful-logo:is(:hover, :focus-visible) .logo-underline {
  transform: scaleX(1);
}
</style>
