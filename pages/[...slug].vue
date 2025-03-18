<template>
  <div class="container mx-auto py-10 px-6">
    <ContentDoc>
      <template #default="{ doc }">
        <div v-if="doc">
          <ContentRenderer :value="doc" />
        </div>
      </template>
      <template #not-found>
        <Error404 />
      </template>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
import { notFound } from '~/utils/error';

// Handle 404 errors for non-content routes
const route = useRoute();
const slug = Array.isArray(route.params.slug) 
  ? route.params.slug.join('/') 
  : route.params.slug;

// Check if this is a content route
const { data } = await useAsyncData(`content-${slug}`, () => {
  return queryContent().where({ _path: `/${slug}` }).findOne();
});

// If no content found and not a valid route, throw 404
if (!data.value) {
  notFound(`Page not found: ${slug}`);
}
</script>