<template>
  <span
    class="brand-logo"
    :class="{ 'brand-logo--monogram': monogram }"
    aria-hidden="true"
  >
    <img
      :src="`/branding/dienertech-${asset}-on-light.svg`"
      alt=""
      :width="monogram ? 40 : 196"
      :height="monogram ? 40 : 44"
      class="block dark:hidden"
    />
    <img
      :src="`/branding/dienertech-${asset}-on-dark.svg`"
      alt=""
      :width="monogram ? 40 : 196"
      :height="monogram ? 40 : 44"
      class="hidden dark:block"
    />
    <span v-if="interactive" class="brand-signal"><span /></span>
  </span>
</template>

<script setup lang="ts">
// The enclosing link or heading supplies the accessible name. CSS follows the
// site's selected theme, including a saved preference that differs from the OS.
const props = withDefaults(
  defineProps<{ monogram?: boolean; interactive?: boolean }>(),
  {
    monogram: false,
    interactive: false,
  },
);
const asset = computed(() => (props.monogram ? "monogram" : "logo"));
</script>

<style scoped>
.brand-logo {
  position: relative;
  display: inline-block;
  width: 12.25rem;
  vertical-align: middle;
}
.brand-logo--monogram {
  width: 2.5rem;
}
.brand-logo img {
  width: 100%;
  height: auto;
}
.brand-signal {
  position: absolute;
  bottom: -3px;
  left: 4px;
  right: 4px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, #0f766e, #2563eb);
  opacity: 0;
  transform: scaleX(0.15);
  transform-origin: left;
  transition:
    transform 400ms ease,
    opacity 200ms ease;
}
.brand-signal span {
  position: absolute;
  top: -2px;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0f766e;
  box-shadow: 0 0 8px #5eead4;
}
.dark .brand-signal {
  background: linear-gradient(90deg, #5eead4, #60a5fa);
}
.dark .brand-signal span {
  background: #5eead4;
}
.brand-home-link:is(:hover, :focus-visible) .brand-signal {
  opacity: 1;
  transform: scaleX(1);
}
.brand-home-link:is(:hover, :focus-visible) .brand-signal span {
  animation: send-signal 850ms ease-in-out both;
}
@keyframes send-signal {
  from {
    left: 0;
  }
  to {
    left: calc(100% - 6px);
  }
}
@media (prefers-reduced-motion: reduce) {
  .brand-signal {
    transition: none;
  }
  .brand-home-link:is(:hover, :focus-visible) .brand-signal span {
    animation: none;
  }
}
</style>
