<template>
  <section :class="[
    'py-12',
    bgClass ? bgClass : 'bg-gray-50 dark:bg-gray-800'
  ]">
    <UContainer>
      <div class="max-w-6xl mx-auto">
        <!-- Section header with customizable title and optional button -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {{ title }}
            </h2>
            <p v-if="subtitle" class="text-gray-600 dark:text-gray-400">
              {{ subtitle }}
            </p>
          </div>
          <UButton
            v-if="viewAllLink"
            :to="viewAllLink"
            color="primary"
            variant="ghost"
            icon="i-heroicons-arrow-right"
            icon-right
          >
            View All Posts
          </UButton>
        </div>

        <!-- Posts Grid -->
        <div v-if="posts.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard
            v-for="post in posts"
            :key="post._path"
            :class="[
              'flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden h-full',
              post.featured 
                ? 'border-2 border-amber-400 dark:border-amber-500 featured-border-glow' 
                : 'border border-gray-200 dark:border-gray-700'
            ]"
            :ui="{ 
              ring: '', 
              base: 'h-full bg-white dark:bg-gray-900',
              body: { padding: 'px-4 pb-4' },
              footer: { padding: 'px-4 pb-4' },
              header: {
                padding: 'p-0',
              },
            }"
          >
            <template #header>
              <!-- Title Image (Clickable) -->
              <div class="p-4 pb-0">
                <NuxtLink
                  :to="post._path"
                  v-if="post.titleImage || post.resolvedTitleImage"
                  class="block w-full h-[200px] overflow-hidden relative group cursor-pointer"
                >
                  <div
                    class="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg"
                  >
                    <NuxtImg
                      :src="post.resolvedTitleImage || resolveImagePath(post)"
                      :alt="post.title"
                      class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 p-2"
                      loading="lazy"
                      format="webp"
                      placeholder
                    />
                  </div>
                  <!-- Hover effect overlay -->
                  <div
                    class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                  ></div>
                </NuxtLink>
                
                <h3 class="text-lg font-semibold mt-4">
                  {{ post.title || 'Untitled' }}
                </h3>
                
                <!-- Featured Post Badge -->
                <UBadge 
                  v-if="post.featured" 
                  color="amber" 
                  variant="solid" 
                  size="sm"
                  class="mt-2 inline-flex items-center gap-1"
                >
                  <UIcon name="i-heroicons-star" class="w-3.5 h-3.5" />
                  Featured Post
                </UBadge>
              </div>
            </template>
            <div class="flex flex-col">
              <!-- Meta information: date and reading time -->
              <div
                class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2"
              >
                <span>{{ formatDate(post.date) }}</span>
                <span>•</span>
                <span>{{ post.readingTime || "5" }} min read</span>
              </div>
              
              <!-- Post description -->
              <p
                class="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4"
              >
                {{ post.description || 'No description available.' }}
              </p>
              
              <!-- Read more link -->
              <div class="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                <NuxtLink
                  :to="post._path"
                  class="text-primary hover:text-primary-700 dark:hover:text-primary-400 font-medium flex items-center gap-1 transition-colors"
                >
                  {{ readMoreText }}
                  <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
                </NuxtLink>
              </div>
            </div>
          </UCard>
        </div>

        <!-- No Results Message -->
        <div v-else class="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-12 text-center">
          <UIcon name="i-heroicons-inbox" class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">No posts available</h3>
          <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {{ noPostsMessage }}
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import { useImagePath } from '~/composables/useImagePath';

const props = defineProps({
  // Title for the section (e.g., "You might also like", "Latest from the Blog")
  title: {
    type: String,
    required: true
  },
  // Optional subtitle
  subtitle: {
    type: String,
    default: ''
  },
  // Blog posts to display
  posts: {
    type: Array,
    required: true
  },
  // Link to view all posts
  viewAllLink: {
    type: String,
    default: '/blog'
  },
  // Read more text
  readMoreText: {
    type: String,
    default: 'Read more'
  },
  // Message to display when no posts are available
  noPostsMessage: {
    type: String,
    default: 'Check back soon for new content.'
  },
  // Background CSS class
  bgClass: {
    type: String,
    default: ''
  }
});

// Get image path resolver
const { resolveBlogImage } = useImagePath();

// Function to resolve image path for a post
function resolveImagePath(post) {
  if (!post.titleImage) return undefined;
  // Make sure we have the correct path format (with leading slash if missing)
  const path = post._path.startsWith('/') ? post._path : `/${post._path}`;
  return resolveBlogImage(post.titleImage, path);
}

// Format date function
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>

<style scoped>
/* Subtle border animation for featured posts */
@keyframes borderGlow {
  0% { border-color: rgba(251, 191, 36, 0.7); }
  50% { border-color: rgba(251, 191, 36, 1); }
  100% { border-color: rgba(251, 191, 36, 0.7); }
}

.featured-border-glow {
  animation: borderGlow 3s ease-in-out infinite;
}

/* Fade animation for loading content */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.grid > * {
  animation: fadeIn 0.4s ease-out forwards;
}

.grid > *:nth-child(1) { animation-delay: 0.1s; }
.grid > *:nth-child(2) { animation-delay: 0.2s; }
.grid > *:nth-child(3) { animation-delay: 0.3s; }
.grid > *:nth-child(4) { animation-delay: 0.4s; }
.grid > *:nth-child(5) { animation-delay: 0.5s; }
.grid > *:nth-child(6) { animation-delay: 0.6s; }

@media (prefers-reduced-motion: reduce) {
  .featured-border-glow {
    animation: none;
  }
  .grid > * {
    animation: none;
  }
}
</style>
