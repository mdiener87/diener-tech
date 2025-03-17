<template>
  <div class="container flex flex-col flex-grow mx-auto py-6 px-6">
    <h1 class="text-3xl font-bold mb-4">Blog</h1>
    
    <!-- Search and Filter Section -->
    <div class="mb-8 space-y-4">
      <div class="flex justify-between items-center">
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search posts..."
          class="max-w-md"
        />
        <NuxtLink
          to="/feed.xml"
          class="flex items-center gap-2 text-primary hover:underline"
          target="_blank"
        >
          <UIcon name="i-heroicons-rss" class="w-5 h-5" />
          RSS Feed
        </NuxtLink>
      </div>
      
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="category in categories"
          :key="category"
          :variant="selectedCategory === category ? 'solid' : 'ghost'"
          :color="selectedCategory === category ? 'primary' : 'gray'"
          size="sm"
          @click="selectCategory(category)"
        >
          {{ category }}
        </UButton>
      </div>
    </div>

    <!-- Featured Post (if exists and no search/filter active) -->
    <UCard
      v-if="featuredPost && !searchQuery && !selectedCategory"
      class="mb-8 hover:shadow-lg"
    >
      <template #header>
        <span class="text-sm text-primary">Featured Post</span>
        <h2 class="text-2xl font-semibold mt-2">{{ featuredPost.title }}</h2>
        <div class="flex items-center gap-2 mt-2 text-sm text-gray-500">
          <span>{{ formatDate(featuredPost.date) }}</span>
          <span>•</span>
          <span>{{ featuredPost.readingTime || '5' }} min read</span>
        </div>
      </template>
      <p class="mb-4">{{ featuredPost.description }}</p>
      <NuxtLink
        :to="featuredPost._path"
        class="inline-block hover:underline font-semibold text-primary"
      >
        Read More
      </NuxtLink>
    </UCard>

    <!-- Blog Posts Grid -->
    <div v-if="filteredPosts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="post in filteredPosts"
        :key="post._path"
        class="hover:shadow-lg flex flex-col"
      >
        <template #header>
          <h2 class="text-xl font-semibold">{{ post.title || 'Untitled' }}</h2>
          <div class="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <span>{{ formatDate(post.date) }}</span>
            <span>•</span>
            <span>{{ post.readingTime || '5' }} min read</span>
          </div>
        </template>
        <p class="mb-4">{{ post.description || 'No description available.' }}</p>
        <div class="mt-auto">
          <NuxtLink
            :to="post._path"
            class="inline-block hover:underline font-semibold text-primary"
          >
            Read More
          </NuxtLink>
        </div>
      </UCard>
    </div>

    <!-- No Results Message -->
    <div v-else class="text-center py-12">
      <p class="text-lg text-gray-600">
        {{ searchQuery || selectedCategory ? 'No posts found matching your criteria.' : 'No posts available yet.' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface BlogPost {
  _path: string;
  title?: string;
  description?: string;
  date: string;
  category?: string;
  readingTime?: number;
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
