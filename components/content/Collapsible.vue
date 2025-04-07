<template>
  <div class="collapsible-container">
    <BlogCollapsible :title="title" :default-open="defaultOpen">
      <slot></slot>
    </BlogCollapsible>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Toggle Content',
  },
  defaultOpen: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.collapsible-container {
  display: block;
  margin-bottom: 1rem;
}
</style>
