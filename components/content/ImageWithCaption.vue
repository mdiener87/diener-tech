<template>
  <figure class="image-with-caption">
    <img :src="resolvedSrc" :alt="alt" />
    <figcaption v-if="calcCaption.length">{{ calcCaption }}</figcaption>
  </figure>
</template>

<script setup>
import { resolveImagePath } from '~/utils/imagePathResolver';

const props = defineProps({
  src: String,
  alt: String,
  caption: String,
  context: String, // Optional context to use for resolving relative paths
});

// Get the current route
const route = useRoute();

// Calculate the context based on the route or provided context
const imageContext = computed(() => {
  // If a context is explicitly provided, use it
  if (props.context) {
    return props.context;
  }
  
  // Extract context from route path if it's a blog post
  if (route.path.startsWith('/blog/')) {
    // Parse the blog slug from the path
    // For path like /blog/post-title, extract 'post-title'
    const pathParts = route.path.split('/');
    if (pathParts.length >= 3) {
      return pathParts[2]; // The blog post slug
    }
  }
  
  // Default: no specific context
  return '';
});

// Resolve the image source
const resolvedSrc = computed(() => {
  return resolveImagePath(props.src, imageContext.value);
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
