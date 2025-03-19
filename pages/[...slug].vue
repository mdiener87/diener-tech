<template>
  <div class="container mx-auto py-10 px-6">
    <!-- Back to Blog Link for blog posts -->
    <div v-if="isBlogPost" class="mb-6">
      <NuxtLink to="/blog" class="text-primary flex items-center gap-2 hover:underline">
        <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
        Back to Blog
      </NuxtLink>
    </div>
    
    <ContentDoc>
      <template #default="{ doc }">
        <div v-if="doc">
          <!-- Blog Post Header -->
          <header v-if="isBlogPost" class="mb-8">
            <h1 class="text-3xl lg:text-4xl font-bold mb-3">{{ doc.title }}</h1>
            <div class="flex flex-wrap items-center gap-3 text-gray-500">
              <time v-if="doc.date" :datetime="doc.date">{{ formatDate(doc.date) }}</time>
              <span v-if="doc.date">•</span>
              <span v-if="doc.readingTime">{{ doc.readingTime }} min read</span>
              <span v-else-if="doc.date">5 min read</span>
              <div v-if="doc.tags && doc.tags.length" class="flex flex-wrap gap-2 mt-2 md:mt-0">
                <UBadge v-for="tag in doc.tags" :key="tag" color="primary" variant="soft">
                  {{ tag }}
                </UBadge>
              </div>
            </div>
          </header>
          
          <!-- Content -->
          <article :class="{'prose dark:prose-invert max-w-none': true, 'mb-12': isBlogPost}">
            <ContentRenderer :value="doc" />
          </article>
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

// Check if the current path is a blog post
const isBlogPost = computed(() => slug.startsWith('blog/') && slug !== 'blog');

// Format date for blog posts
function formatDate(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Check if this is a content route
const { data } = await useAsyncData(`content-${slug}`, () => {
  return queryContent().where({ _path: `/${slug}` }).findOne();
});

// Set SEO metadata for blog posts
if (data.value && isBlogPost.value) {
  const { setPageMeta } = useSeo();
  
  setPageMeta({
    title: data.value.title || 'Blog Post',
    description: data.value.description || 'Blog post on DienerTech',
    type: 'article',
    image: data.value.image,
    publishedTime: data.value.date,
    tags: data.value.tags
  });
}

// If no content found and not a valid route, throw 404
if (!data.value) {
  notFound(`Page not found: ${slug}`);
}
</script>