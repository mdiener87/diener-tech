<template>
  <header class="w-full py-4 shadow-md bg-gray">
    <UContainer class="flex items-center justify-between">
      <NuxtLink
        to="/"
        class="dienertech-logo group relative inline-block overflow-hidden"
      >
        <span
          class="logo-text text-2xl font-bold relative z-10 transition duration-300"
        >
          <span
            class="logo-diener inline-block text-primary transition-transform duration-300 group-hover:transform group-hover:translate-y-[-2px]"
            >Diener</span
          >
          <span
            class="logo-tech inline-block italic transform sm:translate-x-[1em] transition-all duration-300 group-hover:text-primary group-hover:translate-x-0"
            :class="randomColorClass"
            >Tech</span
          >
        </span>
        <span
          class="logo-underline absolute bottom-0 left-0 h-[2px] w-0 bg-primary transform transition-all duration-300 ease-out group-hover:w-full"
        ></span>
        <span
          class="logo-glow absolute -z-10 opacity-0 blur-md bg-primary/20 inset-0 scale-75 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-110"
        ></span>
      </NuxtLink>

      <!-- Center: Navigation Links (Hidden on Smaller Screens) -->
      <UHorizontalNavigation :links="navLinks" class="hidden sm:flex pl-5" />

      <!-- Right: Color Mode + Mobile Menu Button -->
      <div class="flex items-center gap-4">
        <UPopover
          v-model="mobileMenuOpen"
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
                    @click="closeMobileMenu"
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Career", to: "/career" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

// Mobile menu state
const mobileMenuOpen = ref(false);

// Function to close mobile menu
const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

// Define a list of attractive Tailwind color classes
const colorOptions = [
  "text-indigo-500",
  "text-emerald-500",
  "text-violet-500",
  "text-amber-500",
  "text-teal-500",
  "text-rose-500",
  "text-cyan-500",
  "text-fuchsia-500",
  "text-lime-500",
  "text-sky-500",
];

// Create a reactive reference for the current color class
const randomColorClass = ref("");

// Function to select a random color from the options
const selectRandomColor = () => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * colorOptions.length);
  } while (colorOptions[newIndex] === randomColorClass.value);
  randomColorClass.value = colorOptions[newIndex];
};

// Initialize with a random color on component mount
onMounted(() => {
  selectRandomColor();
});

// Change color on route change if using Vue Router
const router = useRouter();
if (router) {
  router.afterEach(() => {
    selectRandomColor();
    closeMobileMenu(); // Close mobile menu on navigation
  });
}
</script>

<style scoped>
.dienertech-logo {
  /* Base styles to ensure it looks good by default */
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

/* Individual character animations on hover */
.logo-text:hover .logo-diener {
  transform: translateY(-2px);
}

.logo-text:hover .logo-tech {
  transform: translateY(1px);
}

@media (prefers-reduced-motion: reduce) {
  .dienertech-logo * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
