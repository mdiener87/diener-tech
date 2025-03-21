<template>
  <ClientOnly>
    <button 
      class="color-mode-button p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none" 
      aria-label="Toggle color mode"
      @click="toggleColorMode"
    >
      <transition name="mode-switch" mode="out-in">
        <div v-if="isDark" key="dark" class="w-6 h-6 relative">
          <!-- Moon SVG with Stars (optimized) -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 text-primary fill-current">
            <!-- Background -->
            <rect width="24" height="24" fill="transparent" />
            
            <!-- Static Stars (only animate on hover) -->
            <circle cx="5" cy="5" r="0.5" class="text-primary fill-current star" />
            <circle cx="19" cy="7" r="0.7" class="text-primary fill-current star" />
            <circle cx="7" cy="18" r="0.6" class="text-primary fill-current star" />
            <circle cx="17" cy="18" r="0.5" class="text-primary fill-current star" />
            
            <!-- Moon (static by default, only animates on hover) -->
            <path d="M12,21 Q8,21 5.5,18.5 Q3,16 3,12 Q3,8 5.5,5.5 Q8,3 12,3 Q12,3 12,3 Q12,3 12,3 Q12,7 14.5,9.5 Q17,12 21,12 Q21,12 21,12 Q21,12 21,12 Q21,16 18.5,18.5 Q16,21 12,21 Z" class="moon-body" />
            
            <!-- Moon Crater (static by default) -->
            <circle cx="8" cy="9" r="1" class="text-slate-800 fill-current moon-crater" />
          </svg>
        </div>
        <div v-else key="light" class="w-6 h-6 relative">
          <!-- Sun SVG (optimized) -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 text-amber-500 fill-current">
            <circle cx="12" cy="12" r="5" class="sun-circle" />
            <g class="sun-rays">
              <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </g>
          </svg>
        </div>
      </transition>
    </button>
    <template #fallback>
      <div class="w-10 h-10" />
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

<style scoped>
.mode-switch-enter-active,
.mode-switch-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}

.mode-switch-enter-from,
.mode-switch-leave-to {
  opacity: 0;
  transform: rotate(45deg) scale(0.7);
}

.mode-switch-enter-to,
.mode-switch-leave-from {
  opacity: 1;
  transform: rotate(0) scale(1);
}

/* Remove constant animations in favor of CSS transitions */
.sun-circle, .sun-rays, .moon-body, .moon-crater, .star {
  transition: transform 0.3s, filter 0.3s;
}

/* Only add hover animations */
.color-mode-button:hover .sun-rays {
  animation: pulse 1.5s 1; /* Run once, not infinite */
}

.color-mode-button:hover .moon-body {
  filter: drop-shadow(0 0 2px currentColor);
}

.color-mode-button:hover .star {
  animation: twinkle 2s 1; /* Run once, not infinite */
}

/* Hover effects for moon crater */
.color-mode-button:hover .moon-crater {
  transform: translateX(-1px);
}

/* Hover effects for sun circle */
.color-mode-button:hover .sun-circle {
  transform: scale(1.1);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes twinkle {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}
</style>