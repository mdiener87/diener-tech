<template>
  <div v-if="posts.length > 0" class="mt-6">
    <h3 class="text-lg font-semibold mb-3 flex items-center">
      <UIcon name="i-heroicons-document-text" class="mr-2" />
      Related Articles
    </h3>
    
    <UAccordion :items="accordionItems" color="gray" variant="soft" class="mt-2">
      <template #default="{ item, index, open }">
        <div class="py-2">
          <div class="flex justify-between items-center">
            <div>
              <h4 class="font-medium">{{ item.title }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(item.date) }}</p>
            </div>
            <UButton 
              :to="item.path" 
              color="primary" 
              variant="ghost" 
              icon="i-heroicons-arrow-right" 
              size="sm"
            >
              Read
            </UButton>
          </div>
          <p v-if="open" class="mt-2 text-sm">{{ item.description }}</p>
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  projectId: number
}>();

const posts = ref([]);
const accordionItems = computed(() => 
  posts.value.map(post => ({
    title: post.title,
    description: post.description,
    date: post.date,
    path: post._path
  }))
);

// Format date function
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Fetch related blog posts when component mounts
onMounted(async () => {
  if (props.projectId) {
    const allPosts = await queryContent('blog')
      .where({ _partial: false })
      .find();
    
    posts.value = allPosts.filter(post => 
      post.relatedProjects?.includes(props.projectId)
    );
  }
});
</script> 