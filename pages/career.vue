<template>
  <div class="container mx-auto py-10 px-6">
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">Career Journey</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Explore my professional journey, skills, and achievements through
        interactive visualizations
      </p>
    </div>

    <!-- Skills Tree Visualization -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
      <h2 class="text-2xl font-semibold mb-6">Skills & Experience</h2>
      <SkillsTree />
    </div>
  </div>
</template>

<script setup lang="ts">
import SkillsTree from '~/components/career/SkillsTree.vue';

// Add SEO metadata
const { setPageMeta } = useSeo();

setPageMeta({
  title: 'Career Journey',
  description: 'Explore my professional journey, skills, and achievements through interactive visualizations showcasing my experience in software development.',
  type: 'profile'
});
</script>
