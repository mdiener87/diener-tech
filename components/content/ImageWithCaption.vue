<template>
  <figure class="image-with-caption">
    <img :src="useAsset(src)" :alt="alt" />
    <figcaption v-if="calcCaption.length">{{ calcCaption }}</figcaption>
  </figure>
</template>

<script setup>
import useAsset from "nuxt/content/runtime/utils/useAsset";
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
