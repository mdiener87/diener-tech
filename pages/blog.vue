<template>
  <main class="flex-grow">
    <!-- Blog Header Section -->
    <section class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 card-transition">
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Thoughts, tutorials, and insights from my development journey
          </p>
          
          <!-- Search and Filter Bar -->
          <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4 card-transition">
            <UInput
              v-model="searchQuery"
              icon="i-heroicons-magnifying-glass"
              placeholder="Search posts..."
              class="flex-grow"
              size="lg"
            />
            <div class="flex items-center justify-between gap-4">
              <UPopover mode="click" :popper="{ placement: 'bottom-end' }">
                <UButton
                  color="gray" 
                  variant="soft"
                  icon="i-heroicons-adjustments-horizontal"
                  size="lg"
                >
                  Filter
                  <template #trailing>
                    <UBadge v-if="selectedCategory" color="primary" variant="subtle" size="xs" class="ml-2">
                      1
                    </UBadge>
                  </template>
                </UButton>
                <template #panel>
                  <div class="p-4 w-64">
                    <p class="font-medium mb-2">Categories</p>
                    <div class="flex flex-wrap gap-2">
                      <UButton
                        v-for="category in categories"
                        :key="category"
                        :variant="selectedCategory === category ? 'solid' : 'ghost'"
                        :color="selectedCategory === category ? 'primary' : 'gray'"
                        size="xs"
                        @click="selectCategory(category)"
                      >
                        {{ category }}
                      </UButton>
                    </div>
                  </div>
                </template>
              </UPopover>
              
              <NuxtLink
                to="/feed.xml"
                class="flex items-center gap-2 text-primary dark:text-primary-400"
                target="_blank"
              >
                <UIcon name="i-heroicons-rss" class="w-5 h-5" />
                <span class="hidden md:inline">RSS Feed</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Featured Post Section -->
    <section v-if="featuredPost && !searchQuery && !selectedCategory" class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center gap-2 mb-4">
            <UIcon name="i-heroicons-star" class="w-5 h-5 text-amber-500" />
            <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Featured Post</h2>
          </div>
          
          <UCard 
            class="overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300"
            :ui="{ body: { padding: 'p-0' } }"
          >
            <div class="grid md:grid-cols-5 gap-0">
              <!-- Featured Image -->
              <div class="md:col-span-2 relative group bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900 dark:to-gray-900 flex items-center justify-center p-0 h-full min-h-[220px] overflow-hidden">
                <template v-if="featuredPost.titleImage">
                  <NuxtImg 
                    :src="featuredPost.titleImage" 
                    :alt="featuredPost.title" 
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                    format="webp"
                    placeholder
                  />
                  <!-- Overlay with subtle gradient for text contrast -->
                  <div class="absolute inset-0 md:hidden bg-gradient-to-t from-black/40 to-transparent"></div>
                  <!-- Hover effect overlay -->
                  <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </template>
                <UIcon v-else name="i-heroicons-document-text" class="w-20 h-20 text-primary/30" />
              </div>
              
              <!-- Content -->
              <div class="md:col-span-3 p-6">
                <h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  {{ featuredPost.title || 'Untitled' }}
                </h3>
                
                <div class="flex items-center gap-3 mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                    {{ formatDate(featuredPost.date) }}
                  </span>
                  <span>•</span>
                  <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-clock" class="w-4 h-4" />
                    {{ featuredPost.readingTime || '5' }} min read
                  </span>
                </div>
                
                <p class="text-gray-600 dark:text-gray-300 mb-6">
                  {{ featuredPost.description || 'No description available.' }}
                </p>
                
                <NuxtLink :to="featuredPost._path">
                  <UButton color="primary" class="mt-auto">
                    Read Article
                    <template #trailing>
                      <UIcon name="i-heroicons-arrow-right" />
                    </template>
                  </UButton>
                </NuxtLink>
              </div>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Blog Posts Grid Section -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <!-- Active Filters Display -->
        <div v-if="searchQuery || selectedCategory" class="mb-8 flex items-center flex-wrap gap-2">
          <span class="text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
          <UBadge v-if="searchQuery" color="gray" class="flex items-center gap-1">
            <span>Search: "{{ searchQuery }}"</span>
            <UButton 
              color="gray" 
              variant="link" 
              icon="i-heroicons-x-mark" 
              size="xs" 
              class="ml-1" 
              @click="searchQuery = ''"
            />
          </UBadge>
          <UBadge v-if="selectedCategory" color="primary" class="flex items-center gap-1">
            <span>Category: {{ selectedCategory }}</span>
            <UButton 
              color="primary" 
              variant="link" 
              icon="i-heroicons-x-mark" 
              size="xs" 
              class="ml-1" 
              @click="selectedCategory = ''"
            />
          </UBadge>
        </div>
        
        <!-- Posts Grid -->
        <div v-if="filteredPosts.length">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UCard
              v-for="post in filteredPosts"
              :key="post._path"
              class="flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden"
              :ui="{ 
                ring: '', 
                header: { padding: post.titleImage ? 'p-0 pb-5' : 'p-5' },
                body: { padding: 'px-5 py-3' },
                footer: { padding: 'p-5' }
              }"
            >
              <template #header>
                <!-- Title Image -->
                <div v-if="post.titleImage" class="w-full aspect-video overflow-hidden relative group mb-4">
                  <NuxtImg 
                    :src="post.titleImage" 
                    :alt="post.title" 
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    format="webp"
                    placeholder
                  />
                  <!-- Optional hover overlay -->
                  <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div class="px-5">
                  <div class="mb-1">
                    <UBadge 
                      v-if="post.category" 
                      color="primary" 
                      variant="subtle" 
                      size="sm"
                      class="mb-2"
                    >
                      {{ post.category }}
                    </UBadge>
                  </div>
                  
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                    {{ post.title || 'Untitled' }}
                  </h2>
                </div>
              </template>
              
              <div class="flex items-center gap-3 mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="flex items-center gap-1">
                  <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                  {{ formatDate(post.date) }}
                </span>
                <span>•</span>
                <span class="flex items-center gap-1">
                  <UIcon name="i-heroicons-clock" class="w-4 h-4" />
                  {{ post.readingTime || '5' }} min read
                </span>
              </div>
              
              <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {{ post.description || 'No description available.' }}
              </p>
              
              <template #footer>
                <div class="border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
                  <NuxtLink
                    :to="post._path"
                    class="text-primary hover:text-primary-700 font-medium flex items-center gap-1 transition-colors"
                  >
                    Continue reading
                    <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
                  </NuxtLink>
                </div>
              </template>
            </UCard>
          </div>
        </div>

        <!-- No Results Message -->
        <div v-else class="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-12 text-center card-transition">
          <UIcon name="i-heroicons-inbox" class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">No posts found</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {{ searchQuery || selectedCategory ? 'Try adjusting your search or filter criteria.' : 'Check back soon for new content.' }}
          </p>
          
          <UButton v-if="searchQuery || selectedCategory" color="gray" @click="resetFilters">
            Clear Filters
          </UButton>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
interface BlogPost {
  _path: string;
  title?: string;
  description?: string;
  date: string;
  category?: string;
  readingTime?: number;
  titleImage?: string;
}

const searchQuery = ref('');
const selectedCategory = ref('');

// Fetch posts
const posts = await queryContent<BlogPost>('blog')
  .where({ _partial: false })
  .sort({ date: -1 })
  .find();

// Get unique categories from posts
const categories = computed(() => {
  const cats = new Set(['All', ...posts.map(post => post.category || '').filter(Boolean)]);
  return Array.from(cats);
});

// Featured post (most recent)
const featuredPost = computed(() => posts[0]);

// Filtered posts
const filteredPosts = computed(() => {
  let filtered = [...posts];
  
  // Remove featured post from regular list when showing featured section
  if (!searchQuery.value && !selectedCategory.value) {
    filtered = filtered.slice(1);
  }
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(post => 
      (post.title || '').toLowerCase().includes(query) ||
      (post.description || '').toLowerCase().includes(query)
    );
  }
  
  // Apply category filter
  if (selectedCategory.value && selectedCategory.value !== 'All') {
    filtered = filtered.filter(post => post.category === selectedCategory.value);
  }
  
  return filtered;
});

// Methods
function selectCategory(category: string) {
  selectedCategory.value = category === 'All' ? '' : category;
}

function resetFilters() {
  searchQuery.value = '';
  selectedCategory.value = '';
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Add SEO metadata
const { setPageMeta } = useSeo();

setPageMeta({
  title: 'Blog',
  description: 'Explore articles and insights on software development, web technologies, and creative projects.',
  type: 'website'
});
</script>

<style scoped>
.card-transition {
  transition: all 0.3s ease;
}

/* Fix container height for transitions */
:deep(.p-popper__popper) {
  z-index: 100;
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
</style>
