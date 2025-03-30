<template>
  <figure class="image-with-caption">
    <img :src="src" :alt="alt" />
    <figcaption v-if="calcCaption.length">{{ calcCaption }}</figcaption>
  </figure>
</template>

<script setup>
const props = defineProps({
  src: String,
  alt: String,
  caption: String,
});

const calcCaption = computed(() => {
  return props.caption || props.alt || "";
});
</script>

<style scoped>
.image-with-caption {
  text-align: center;
  margin: 0;
}
.image-with-caption figcaption {
  font-size: 0.9rem;
  margin-top: 0.25rem;
  color: #555;
}
</style>
