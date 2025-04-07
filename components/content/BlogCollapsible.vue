<template>
  <div class="collapsible-content">
    <div 
      class="collapsible-header" 
      @click="toggleCollapse"
      :class="{ 'is-open': !isCollapsed }"
    >
      <UButton
        variant="ghost"
        class="collapsible-button"
        :icon="isCollapsed ? 'i-heroicons-chevron-right' : 'i-heroicons-chevron-down'"
      >
        {{ title }}
      </UButton>
    </div>
    
    <transition
      name="collapse-transition"
      @enter="startTransition"
      @after-enter="endTransition"
      @before-leave="startTransition"
      @after-leave="endTransition"
    >
      <div 
        v-show="!isCollapsed"
        class="collapsible-body"
        ref="content"
      >
        <div class="collapsible-body-inner p-4">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Toggle Content',
  },
  defaultOpen: {
    type: Boolean,
    default: false,
  }
});

const isCollapsed = ref(!props.defaultOpen);
const content = ref(null);

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}

function startTransition(el) {
  // Force reflow to ensure proper transition
  void el.offsetHeight;
  
  // If we're collapsing, first set height to current scrollHeight
  if (isCollapsed.value && el.style.height === 'auto') {
    el.style.height = `${el.scrollHeight}px`;
    // Force reflow again
    void el.offsetHeight;
  }
  
  // Then set target height based on collapsed state
  el.style.height = isCollapsed.value ? '0px' : `${el.scrollHeight}px`;
}

function endTransition(el) {
  // Only set height to auto when expanded
  // Otherwise, keep it at 0px when collapsed
  el.style.height = !isCollapsed.value ? 'auto' : '0px';
}

onMounted(() => {
  // Set the initial height based on the collapsed state
  if (content.value) {
    if (!isCollapsed.value) {
      // If it should start open, delay setting to auto
      // for the component to fully render first
      setTimeout(() => {
        content.value.style.height = 'auto';
      }, 50);
    } else {
      content.value.style.height = '0px';
    }
  }
});
</script>

<style scoped>
.collapsible-content {
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 0.5rem;
  margin: 1rem 0;
  overflow: hidden;
}

.collapsible-header {
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: var(--color-bg-subtle, #f8fafc);
  transition: background-color 0.2s;
}

.collapsible-header:hover {
  background-color: var(--color-bg-muted, #f1f5f9);
}

.collapsible-header.is-open {
  border-bottom: 1px solid var(--color-border, #e2e8f0);
}

.collapsible-button {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 600;
}

.collapsible-body {
  height: 0;
  overflow: hidden;
  will-change: height;
  transition: height 0.3s ease-in-out;
}

.collapsible-body-inner {
  background-color: var(--color-bg, #ffffff);
}

/* Dark mode adjustments */
:root.dark .collapsible-header {
  background-color: var(--color-bg-subtle, #1e293b);
}

:root.dark .collapsible-header:hover {
  background-color: var(--color-bg-muted, #334155);
}

:root.dark .collapsible-body-inner {
  background-color: var(--color-bg, #0f172a);
}
</style>
