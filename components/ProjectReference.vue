<template>
  <div v-if="project" class="my-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
    <h3 class="text-lg font-semibold mb-2 flex items-center">
      <UIcon name="i-heroicons-code-bracket-square" class="mr-2" />
      Featured Project
    </h3>
    <div class="flex flex-col md:flex-row gap-4">
      <div class="md:w-1/3">
        <UImage
          :src="project.image"
          :alt="project.title"
          class="rounded-lg w-full h-auto object-cover"
          width="300"
          height="200"
        />
      </div>
      <div class="md:w-2/3">
        <h4 class="font-medium text-xl mb-2">{{ project.title }}</h4>
        <p class="text-sm mb-3">{{ project.description }}</p>
        <div class="flex flex-wrap gap-2 mb-3">
          <UBadge 
            v-for="tech in project.technologies" 
            :key="tech" 
            color="primary" 
            variant="soft"
            class="text-xs"
          >
            {{ tech }}
          </UBadge>
        </div>
        <div class="flex gap-2">
          <UButton 
            :to="`/projects/${project.id}`" 
            color="primary" 
            size="sm" 
            icon="i-heroicons-document-magnifying-glass"
          >
            View Details
          </UButton>
          <UButton 
            v-if="project.demoUrl" 
            :to="project.demoUrl" 
            target="_blank" 
            color="gray" 
            size="sm" 
            icon="i-heroicons-arrow-top-right-on-square"
          >
            Live Demo
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

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

const props = defineProps<{
  projectId: number
}>();

const project = ref<Project | null>(null);

// Load the project data
onMounted(async () => {
  if (props.projectId) {
    // Import project data
    const { featuredProjects } = await import('~/data/projects');
    
    // Find project by ID
    project.value = featuredProjects.find(p => p.id === props.projectId) || null;
  }
});
</script> 