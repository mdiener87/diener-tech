<template>
  <div class="container mx-auto py-10 px-6">
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">Career Journey</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Explore my professional journey, skills, and achievements through
        interactive visualizations
      </p>
    </div>

    <!-- Visualization Selector -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold mb-2 sm:mb-0">Career Visualizations</h2>
        <UButtonGroup class="mt-2 sm:mt-0">
          <UButton
            v-for="(viz, index) in visualizations"
            :key="viz.id"
            :color="activeViz === viz.id ? 'primary' : 'gray'"
            :variant="activeViz === viz.id ? 'solid' : 'ghost'"
            @click="activeViz = viz.id"
            class="px-4 py-2"
          >
            {{ viz.label }}
          </UButton>
        </UButtonGroup>
      </div>
      
      <p class="text-gray-600 dark:text-gray-300 mb-6" v-if="activeVisualization">
        {{ activeVisualization.description }}
      </p>
    </div>

    <!-- Visualization Container -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12 min-h-[800px]">
      <div v-if="activeViz === 'skills'" class="h-full">
        <SkillsTree />
      </div>
      
      <div v-else-if="activeViz === 'timeline'" class="h-full flex items-center justify-center">
        <div class="text-center p-8">
          <UIcon name="i-heroicons-clock" class="text-5xl mb-4 text-gray-400" />
          <h3 class="text-xl font-semibold mb-2">Career Timeline</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Coming soon! A chronological visualization of my professional journey.
          </p>
        </div>
      </div>
      
      <div v-else-if="activeViz === 'projects'" class="h-full flex items-center justify-center">
        <div class="text-center p-8">
          <UIcon name="i-heroicons-rocket-launch" class="text-5xl mb-4 text-gray-400" />
          <h3 class="text-xl font-semibold mb-2">Project Showcase</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Coming soon! An interactive showcase of key projects I've worked on.
          </p>
        </div>
      </div>
    </div>
    
    <!-- Additional Career Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Core Competencies</h2>
        <ul class="space-y-3">
          <li v-for="(skill, index) in coreSkills" :key="index" class="flex items-start">
            <UIcon :name="skill.icon" class="mr-3 mt-1 text-primary-500" />
            <div>
              <h3 class="font-medium">{{ skill.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ skill.description }}</p>
            </div>
          </li>
        </ul>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Career Philosophy</h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            I believe that great software is built by developers who understand both 
            the technical aspects and the business needs they're serving.
          </p>
          <p>
            Throughout my career, I've focused on bridging the gap between complex 
            technical implementations and tangible business value. This approach has
            allowed me to deliver solutions that not only work well technically, but
            also drive meaningful results.
          </p>
          <p>
            I'm passionate about continuous learning and embracing new technologies
            while maintaining a pragmatic approach to solving real-world problems.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SkillsTree from '~/components/career/SkillsTree.vue';
import { ref, computed } from 'vue';

// Add SEO metadata
const { setPageMeta } = useSeo();

setPageMeta({
  title: 'Career Journey',
  description: 'Explore my professional journey, skills, and achievements through interactive visualizations showcasing my experience in software development.',
  type: 'profile'
});

// Visualization types
const visualizations = [
  {
    id: 'skills',
    label: 'Skills Tree',
    description: 'An interactive visualization of my technical skills and professional experience. Click nodes to expand branches and hover for details.'
  },
  {
    id: 'timeline',
    label: 'Career Timeline',
    description: 'A chronological visualization of my professional journey, highlighting key milestones and achievements.'
  },
  {
    id: 'projects',
    label: 'Project Showcase',
    description: 'An interactive showcase of key projects I\'ve worked on, highlighting technologies used and outcomes achieved.'
  }
];

// Default active visualization
const activeViz = ref('skills');

// Computed property to get the active visualization details
const activeVisualization = computed(() => 
  visualizations.find(viz => viz.id === activeViz.value)
);

// Core skills list with icons
const coreSkills = [
  {
    name: 'Frontend Development',
    description: 'Building responsive, accessible, and performant user interfaces with modern JavaScript frameworks.',
    icon: 'i-heroicons-code-bracket'
  },
  {
    name: 'User Experience Design',
    description: 'Creating intuitive user experiences that balance aesthetics with functionality.',
    icon: 'i-heroicons-paint-brush'
  },
  {
    name: 'Full-Stack Development',
    description: 'End-to-end implementation from database design to API development to frontend interfaces.',
    icon: 'i-heroicons-server-stack'
  },
  {
    name: 'Technical Leadership',
    description: 'Leading development teams, mentoring junior developers, and driving technical decisions.',
    icon: 'i-heroicons-user-group'
  },
  {
    name: 'Problem Solving',
    description: 'Breaking down complex problems into manageable solutions with elegant implementations.',
    icon: 'i-heroicons-puzzle-piece'
  }
];
</script>