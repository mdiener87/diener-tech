<template>
  <main class="flex-grow">
    <ContentDoc>
      <template #default="{ doc }">
        <div v-if="doc">
          <!-- Blog Post Layout -->
          <template v-if="isBlogPost">
            <!-- Blog Post Header -->
            <section class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
              <UContainer>
                <div class="max-w-3xl mx-auto">
                  <!-- Back to Blog Link -->
                  <NuxtLink to="/blog" class="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 mb-8 transition-colors">
                    <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
                    <span>Back to Blog</span>
                  </NuxtLink>
                  
                  <article class="animate-fade-in">
                    <!-- Category -->
                    <UBadge v-if="doc.category" color="primary" variant="subtle" size="md" class="mb-4">
                      {{ doc.category }}
                    </UBadge>
                    
                    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                      {{ doc.title }}
                    </h1>
                    
                    <div class="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
                      <!-- Date -->
                      <div v-if="doc.date" class="flex items-center gap-2">
                        <UIcon name="i-heroicons-calendar" class="w-5 h-5" />
                        <time :datetime="doc.date">{{ formatDate(doc.date) }}</time>
                      </div>
                      
                      <!-- Reading Time -->
                      <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-clock" class="w-5 h-5" />
                        <span>{{ doc.readingTime || '5' }} min read</span>
                      </div>
                    </div>
                    
                    <!-- Featured Image (if available) -->
                    <div v-if="doc.image" class="relative w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
                      <img :src="doc.image" :alt="doc.title" class="w-full h-full object-cover" />
                    </div>
                    
                    <!-- Tags -->
                    <div v-if="doc.tags && doc.tags.length" class="flex flex-wrap gap-2 mb-8">
                      <UBadge v-for="tag in doc.tags" :key="tag" color="gray" variant="subtle">
                        {{ tag }}
                      </UBadge>
                    </div>
                  </article>
                </div>
              </UContainer>
            </section>
            
            <!-- Blog Content Section -->
            <section class="py-12 bg-white dark:bg-gray-900">
              <UContainer>
                <div class="max-w-3xl mx-auto">
                  <div class="prose dark:prose-invert prose-lg max-w-none">
                    <ContentRenderer :value="doc" />
                    
                    <!-- Display referenced projects after the blog content -->
                    <div v-if="doc.relatedProjects && doc.relatedProjects.length > 0" class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 class="text-xl font-bold mb-6">Related Projects</h3>
                      <div class="space-y-8">
                        <ProjectReference 
                          v-for="projectId in doc.relatedProjects" 
                          :key="projectId" 
                          :project-id="projectId" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <!-- Social Sharing Links -->
                  <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Share this post</h3>
                    <div class="flex gap-4">
                      <UButton 
                        color="gray" 
                        variant="soft" 
                        icon="i-heroicons-link" 
                        square
                        @click="copyPageUrl"
                      />
                      <UTooltip :text="copySuccess ? 'Copied!' : 'Copy link'">
                        <div></div>
                      </UTooltip>
                      <a 
                        :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(doc.title)}`" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <UButton color="sky" variant="soft" square>
                          <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis" class="w-5 h-5" />
                        </UButton>
                      </a>
                      <a 
                        :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <UButton color="blue" variant="soft" square>
                          <UIcon name="i-heroicons-square-2-stack" class="w-5 h-5" />
                        </UButton>
                      </a>
                    </div>
                  </div>
                </div>
              </UContainer>
            </section>
            
            <!-- Related Articles Section (if available) -->
            <section v-if="relatedPosts.length" class="py-12 bg-gray-50 dark:bg-gray-800">
              <UContainer>
                <div class="max-w-6xl mx-auto">
                  <h2 class="text-2xl font-bold mb-8 text-gray-900 dark:text-white">You might also like</h2>
                  
                  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <UCard
                      v-for="post in relatedPosts"
                      :key="post._path"
                      class="hover:shadow-lg transition-all duration-300"
                    >
                      <template #header>
                        <h3 class="text-lg font-semibold">{{ post.title }}</h3>
                      </template>
                      <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <span>{{ formatDate(post.date) }}</span>
                        <span>•</span>
                        <span>{{ post.readingTime || '5' }} min read</span>
                      </div>
                      <p class="text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                        {{ post.description }}
                      </p>
                      <NuxtLink
                        :to="post._path"
                        class="text-primary hover:underline font-medium"
                      >
                        Read more
                      </NuxtLink>
                    </UCard>
                  </div>
                </div>
              </UContainer>
            </section>
          </template>
          
          <!-- Default Content Page Layout -->
          <template v-else>
            <section class="py-12">
              <UContainer>
                <div class="max-w-4xl mx-auto prose dark:prose-invert prose-lg">
                  <h1 class="text-3xl md:text-4xl font-bold mb-8">{{ doc.title }}</h1>
                  <ContentRenderer :value="doc" />
                </div>
              </UContainer>
            </section>
          </template>
        </div>
      </template>
      <template #not-found>
        <Error404 />
      </template>
    </ContentDoc>
  </main>
</template>

<script setup lang="ts">
import { notFound } from '~/utils/error';
import { ref, computed, onMounted } from 'vue';

// Handle 404 errors for non-content routes
const route = useRoute();
const slug = Array.isArray(route.params.slug) 
  ? route.params.slug.join('/') 
  : route.params.slug;

// Check if the current path is a blog post
const isBlogPost = computed(() => slug.startsWith('blog/') && slug !== 'blog');

// Page URL for social sharing
const pageUrl = computed(() => {
  if (process.client) {
    return window.location.href;
  }
  return `https://diener.tech/${slug}`;
});

// Copy to clipboard functionality
const copySuccess = ref(false);
function copyPageUrl() {
  if (process.client) {
    navigator.clipboard.writeText(pageUrl.value)
      .then(() => {
        copySuccess.value = true;
        setTimeout(() => {
          copySuccess.value = false;
        }, 2000);
      });
  }
}

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

// Fetch related posts for blog posts
const relatedPosts = ref([]);

onMounted(async () => {
  if (isBlogPost.value && data.value) {
    // Get the current post's category or tags if available
    const category = data.value.category;
    const tags = data.value.tags || [];
    
    // Query posts with same category or tags, excluding current post
    const related = await queryContent('blog')
      .where({ _partial: false, _path: { $ne: `/${slug}` } })
      .sort({ date: -1 })
      .limit(3)
      .find();
    
    // If we have a category or tags, sort by relevance
    if (category || tags.length) {
      // Score posts by relevance (same category or matching tags)
      const scored = related.map(post => {
        let score = 0;
        if (category && post.category === category) score += 3;
        if (tags.length && post.tags) {
          const matchingTags = post.tags.filter(tag => tags.includes(tag));
          score += matchingTags.length;
        }
        return { ...post, score };
      });
      
      // Sort by relevance score (high to low), then by date
      scored.sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date));
      relatedPosts.value = scored.slice(0, 3);
    } else {
      // If no category/tags, just use most recent
      relatedPosts.value = related.slice(0, 3);
    }
  }
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

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Enhance typography for blog posts */
:deep(.prose) {
  line-height: 1.8;
}

:deep(.prose h2) {
  margin-top: 2em;
  font-weight: 700;
  color: var(--color-primary-600);
}

:deep(.prose h3) {
  margin-top: 1.5em;
  font-weight: 600;
}

:deep(.prose img) {
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

:deep(.prose a) {
  color: var(--color-primary-600);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  transition: border-color 0.3s ease;
}

:deep(.prose a:hover) {
  border-color: transparent;
}

:deep(.prose blockquote) {
  font-style: italic;
  border-left-color: var(--color-primary-200);
  background-color: var(--color-gray-50);
  border-radius: 0.25rem;
  padding: 1rem 1.5rem;
}

:deep(.prose code) {
  background-color: var(--color-gray-100);
  border-radius: 0.25rem;
  padding: 0.2em 0.4em;
  font-size: 0.9em;
}

.dark :deep(.prose blockquote) {
  border-left-color: var(--color-primary-800);
  background-color: var(--color-gray-800);
}

.dark :deep(.prose code) {
  background-color: var(--color-gray-800);
}
</style>