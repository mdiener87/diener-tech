<template>
  <main class="flex-grow">
    <!-- Career Header Section -->
    <section class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 card-transition">
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Career Journey</h1>
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Explore my professional journey, skills, and achievements through
            interactive visualizations
          </p>
          
          <!-- Visualization Selector -->
          <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 flex flex-wrap justify-center gap-4 card-transition">
            <UButtonGroup>
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
        </div>
      </UContainer>
    </section>

    <!-- Visualization Description -->
    <section class="py-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <p class="text-gray-600 dark:text-gray-300" v-if="activeVisualization">
            {{ activeVisualization.description }}
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Visualization Container -->
    <section class="py-8 bg-white dark:bg-gray-900">
      <UContainer>
        <UCard class="overflow-hidden min-h-[800px] border border-gray-200 dark:border-gray-800">
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
        </UCard>
      </UContainer>
    </section>
    
    <!-- Additional Career Information -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <div class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">Career Insights</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My expertise, approach, and professional philosophy that have shaped my journey
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UCard class="h-full hover:shadow-lg card-transition">
            <template #header>
              <h2 class="text-2xl font-semibold">Core Competencies</h2>
            </template>
            <ul class="space-y-4 mt-2">
              <li v-for="(skill, index) in coreSkills" :key="index" class="flex items-start">
                <UIcon :name="skill.icon" class="mr-3 mt-1 text-primary" />
                <div>
                  <h3 class="font-medium">{{ skill.name }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ skill.description }}</p>
                </div>
              </li>
            </ul>
          </UCard>
          
          <UCard class="h-full hover:shadow-lg card-transition">
            <template #header>
              <h2 class="text-2xl font-semibold">Career Philosophy</h2>
            </template>
            <div class="space-y-4 text-gray-700 dark:text-gray-300 mt-2">
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
          </UCard>
        </div>
      </UContainer>
    </section>
  </main>
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

<style scoped>
.card-transition {
  transition: all 0.3s ease;
}

/* Hover animations for cards */
.card-transition:hover {
  transform: translateY(-2px);
}

/* Fade animation for loading content */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .card-transition {
    transition: none;
  }
  .card-transition:hover {
    transform: none;
  }
}
</style>