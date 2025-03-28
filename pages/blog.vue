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
              :trailing="searchQuery ? true : undefined"
            >
              <template #trailing v-if="searchQuery">
                <UButton color="gray" variant="link" icon="i-heroicons-x-mark" @click="searchQuery = ''" />
              </template>
            </UInput>
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
                    <UBadge v-if="selectedTags.length" color="primary" variant="subtle" size="xs" class="ml-2">
                      {{ selectedTags.length }}
                    </UBadge>
                  </template>
                </UButton>
                <template #panel>
                  <div class="p-4 w-64">
                    <p class="font-medium mb-2">Tags</p>
                    <div class="flex flex-wrap gap-2">
                      <UButton
                        v-for="tag in tags"
                        :key="tag"
                        :variant="tag === 'All' ? 'ghost' : (selectedTags.includes(tag) ? 'solid' : 'ghost')"
                        :color="tag === 'All' ? 'gray' : 'primary'"
                        size="xs"
                        class="transition-colors"
                        @click="toggleTag(tag)"
                      >
                        {{ tag }}
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
    <section v-if="featuredPost && !searchQuery && !selectedTags.length" class="py-12 bg-white dark:bg-gray-900 card-transition">
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
              <!-- Featured Image (Clickable) -->
              <NuxtLink :to="featuredPost._path" class="md:col-span-2 relative group bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900 dark:to-gray-900 flex items-center justify-center p-6 h-full min-h-[300px] max-h-[400px] overflow-hidden cursor-pointer rounded-l-lg">
                <template v-if="featuredPost.titleImage">
                  <div class="w-full h-full flex items-center justify-center">
                    <NuxtImg 
                      :src="featuredPost.titleImage" 
                      :alt="featuredPost.title" 
                      class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                      format="webp"
                      placeholder
                    />
                  </div>
                  <!-- Hover effect overlay -->
                  <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </template>
                <UIcon v-else name="i-heroicons-document-text" class="w-20 h-20 text-primary/30" />
              </NuxtLink>
              
              <!-- Content -->
              <div class="md:col-span-3 p-6 flex flex-col">
                <!-- Category Badge -->
                <UBadge 
                  v-if="featuredPost.category" 
                  color="primary" 
                  variant="subtle" 
                  size="sm"
                  class="mb-2 self-start"
                >
                  {{ featuredPost.category }}
                </UBadge>
                
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
                
                <!-- Tags for Featured Post -->
                <div v-if="featuredPost.tags && featuredPost.tags.length" class="flex flex-wrap gap-2 mb-4">
                  <UBadge 
                    v-for="tag in featuredPost.tags" 
                    :key="tag" 
                    color="primary" 
                    variant="subtle"
                    class="cursor-pointer hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                    @click.stop="toggleTag(tag)"
                  >
                    {{ tag }}
                  </UBadge>
                </div>
                
                <p class="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                  {{ featuredPost.description || 'No description available.' }}
                </p>
                
                <div class="mt-auto">
                  <NuxtLink :to="featuredPost._path">
                    <UButton color="primary">
                      Read Article
                      <template #trailing>
                        <UIcon name="i-heroicons-arrow-right" />
                      </template>
                    </UButton>
                  </NuxtLink>
                </div>
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
        <div v-if="searchQuery || selectedTags.length" class="mb-8 flex items-center flex-wrap gap-2">
          <span class="text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
          <UBadge 
            v-if="searchQuery" 
            color="primary" 
            class="flex items-center gap-1 cursor-pointer hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
            @click="searchQuery = ''"
          >
            <span>Search: "{{ searchQuery }}"</span>
            <UIcon 
              name="i-heroicons-x-mark" 
              class="w-4 h-4 ml-1"
            />
          </UBadge>
          <template v-if="selectedTags.length">
            <UBadge 
              v-for="tag in selectedTags" 
              :key="tag" 
              color="primary" 
              class="flex items-center gap-1 cursor-pointer hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
              @click="removeTag(tag)"
            >
              <span>Tag: {{ tag }}</span>
              <UIcon 
                name="i-heroicons-x-mark" 
                class="w-4 h-4 ml-1"
              />
            </UBadge>
          </template>
        </div>
        
        <!-- Posts Grid -->
        <div v-if="filteredPosts.length">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UCard
              v-for="post in filteredPosts"
              :key="post._path"
              class="flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden h-full border border-gray-200 dark:border-gray-800"
              :ui="{ 
                ring: '', 
                base: 'h-full',
                body: { padding: 'p-5' },
                footer: { padding: 'px-5 pb-5' }
              }"
            >
              <div class="flex flex-col h-full">
                <!-- Title Image (Clickable) with consistent padding -->
                <NuxtLink :to="post._path" v-if="post.titleImage" class="block w-full h-[220px] overflow-hidden relative group mb-4 cursor-pointer">
                  <div class="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <NuxtImg 
                      :src="post.titleImage" 
                      :alt="post.title" 
                      class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 p-2"
                      loading="lazy"
                      format="webp"
                      placeholder
                    />
                  </div>
                  <!-- Optional hover overlay -->
                  <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </NuxtLink>
                
                <!-- Meta section -->
                <div class="grow flex flex-col">
                  <div class="mb-3">
                    <!-- Category Badge -->
                    <UBadge 
                      v-if="post.category" 
                      color="primary" 
                      variant="subtle" 
                      size="sm"
                      class="mb-2"
                    >
                      {{ post.category }}
                    </UBadge>
                    
                    <!-- Tags -->
                    <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-1 mb-2">
                      <UBadge 
                        v-for="tag in post.tags" 
                        :key="tag" 
                        color="primary" 
                        variant="subtle" 
                        size="xs"
                        class="cursor-pointer hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                        @click.stop="toggleTag(tag)"
                      >
                        {{ tag }}
                      </UBadge>
                    </div>
                  
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {{ post.title || 'Untitled' }}
                    </h2>
                    
                    <div class="flex items-center gap-3 mb-3 text-sm text-gray-500 dark:text-gray-400">
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
                  </div>
                
                  <p class="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                    {{ post.description || 'No description available.' }}
                  </p>
                  
                  <!-- Continue reading link at bottom -->
                  <div class="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    <NuxtLink
                      :to="post._path"
                      class="text-primary hover:text-primary-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      Continue reading
                      <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <!-- No Results Message -->
        <div v-else class="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-12 text-center card-transition">
          <UIcon name="i-heroicons-inbox" class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 class="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">No posts found</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {{ searchQuery || selectedTags.length ? 'Try adjusting your search or filter criteria.' : 'Check back soon for new content.' }}
          </p>
          
          <UButton v-if="searchQuery || selectedTags.length" color="gray" @click="resetFilters">
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
  tags?: string[];
  readingTime?: number;
  titleImage?: string;
}

const searchQuery = ref('');
const selectedTags = ref<string[]>([]);

// Fetch posts
const posts = await queryContent<BlogPost>('blog')
  .where({ _partial: false })
  .sort({ date: -1 })
  .find();

// Get unique tags from posts
const tags = computed(() => {
  const allTags = posts.flatMap(post => post.tags || []);
  const uniqueTags = new Set(['All', ...allTags.filter(Boolean)]);
  return Array.from(uniqueTags);
});

// Featured post (most recent)
const featuredPost = computed(() => posts[0]);

// Filtered posts
const filteredPosts = computed(() => {
  let filtered = [...posts];
  
  // Remove featured post from regular list when showing featured section
  if (!searchQuery.value && !selectedTags.value.length) {
    filtered = filtered.slice(1);
  }
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(post => 
      (post.title || '').toLowerCase().includes(query) ||
      (post.description || '').toLowerCase().includes(query) ||
      // Search in tags
      (post.tags || []).some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  // Apply tag filters (OR logic - post must contain at least one selected tag)
  if (selectedTags.value.length) {
    filtered = filtered.filter(post => 
      post.tags?.some(tag => selectedTags.value.includes(tag))
    );
  }
  
  return filtered;
});

// Methods
function toggleTag(tag: string) {
  // If "All" is clicked, clear all selected tags
  if (tag === 'All') {
    selectedTags.value = [];
    return;
  }

  // Toggle the tag - add if not present, remove if already selected
  if (selectedTags.value.includes(tag)) {
    removeTag(tag);
  } else {
    selectedTags.value.push(tag);
  }
}

function removeTag(tag: string) {
  selectedTags.value = selectedTags.value.filter(t => t !== tag);
}

function resetFilters() {
  searchQuery.value = '';
  selectedTags.value = [];
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
