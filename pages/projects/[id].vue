<template>
  <main>
    <section class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <!-- Back to Projects Link -->
          <NuxtLink to="/projects" class="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 mb-8 transition-colors">
            <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
            <span>Back to Projects</span>
          </NuxtLink>
          
          <div v-if="project" class="animate-fade-in">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {{ project.title }}
            </h1>
            
            <div class="flex flex-wrap gap-2 mb-8">
              <UBadge 
                v-for="tech in project.technologies" 
                :key="tech" 
                color="primary" 
                variant="subtle"
              >
                {{ tech }}
              </UBadge>
            </div>
            
            <div class="flex flex-wrap gap-4 mb-8">
              <UButton 
                v-if="project.demoUrl" 
                :to="project.demoUrl" 
                target="_blank" 
                color="primary" 
                icon="i-heroicons-arrow-top-right-on-square"
              >
                View Demo
              </UButton>
              <UButton 
                v-if="project.githubUrl" 
                :to="project.githubUrl" 
                target="_blank" 
                color="gray" 
                icon="i-heroicons-code-bracket"
              >
                View Code
              </UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </section>
    
    <!-- Project Content Section -->
    <section v-if="project" class="py-12 bg-white dark:bg-gray-900">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <img 
                :src="project.image" 
                :alt="project.title" 
                class="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 class="text-2xl font-bold mb-4">About this Project</h2>
              <p class="text-gray-700 dark:text-gray-300 mb-6">{{ project.description }}</p>
              
              <div v-if="project.highlights && project.highlights.length">
                <h3 class="text-xl font-semibold mb-3">Key Features</h3>
                <ul class="space-y-2">
                  <li 
                    v-for="highlight in project.highlights" 
                    :key="highlight"
                    class="flex items-start gap-2"
                  >
                    <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-primary mt-1" />
                    <span>{{ highlight }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>
    
    <!-- Related blog posts section -->
    <section v-if="project && relatedPosts.length > 0" class="py-8 bg-gray-50 dark:bg-gray-800/50">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold mb-6">Related Articles</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <UCard 
              v-for="post in relatedPosts" 
              :key="post._path" 
              :to="post._path"
              class="hover:shadow-lg transition-shadow duration-300"
            >
              <template #header>
                <h3 class="text-lg font-semibold">{{ post.title }}</h3>
              </template>
              <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{{ post.description }}</p>
              <template #footer>
                <div class="flex items-center gap-2 text-xs text-gray-500">
                  <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                  <span>{{ formatDate(post.date) }}</span>
                </div>
              </template>
            </UCard>
          </div>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Define project interface
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  type: string;
  highlights?: string[];
}

// Get project ID from route
const route = useRoute();
const projectId = parseInt(route.params.id as string);

// State variables
const project = ref<Project | null>(null);
const relatedPosts = ref([]);

// Format date function
function formatDate(date: string) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Fetch project data and related posts
onMounted(async () => {
  // Import project data
  const { featuredProjects } = await import('~/data/projects');
  
  // Find the project by ID
  project.value = featuredProjects.find(p => p.id === projectId) || null;
  
  if (project.value) {
    // Set page meta
    const { setPageMeta } = useSeo();
    setPageMeta({
      title: project.value.title,
      description: project.value.description,
      type: 'article',
      image: project.value.image
    });
    
    // Fetch related blog posts
    const posts = await queryContent('blog')
      .where({ _partial: false })
      .find();
    
    // Filter posts that mention this project in relatedProjects frontmatter
    relatedPosts.value = posts
      .filter(post => post.relatedProjects?.includes(projectId))
      .slice(0, 3);
  } else {
    // Handle case where project is not found
    navigateTo('/projects');
  }
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 