<template>
  <main class="flex-grow">
    <!-- Project Header Section -->
    <section
      class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 card-transition"
    >
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">My Projects</h1>
          <p class="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my work spanning from full-stack web applications to
            experimental side projects. Each project represents a unique
            challenge and learning opportunity.
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-2">
            <UButton
              v-for="category in categories"
              :key="category"
              :variant="selectedCategory === category ? 'solid' : 'soft'"
              :color="selectedCategory === category ? 'primary' : 'gray'"
              size="sm"
              @click="filterProjects(category)"
            >
              {{ category }}
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Projects Section -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="mb-10">
          <h2 class="text-3xl font-bold mb-4">Projects</h2>
          <p class="text-gray-600 dark:text-gray-400">
            A snapshot of the things I'm building and experimenting with.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
            variant="stacked"
          />
        </div>

        <!-- Project availability notice -->
        <div
          v-if="
            selectedCategory !== 'All' &&
            filteredProjects.length === 0
          "
          class="text-center py-16"
        >
          <UIcon
            name="i-heroicons-folder-open"
            class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
          />
          <h3
            class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            No {{ selectedCategory }} projects yet
          </h3>
          <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            I don't have any {{ selectedCategory.toLowerCase() }} projects to
            show at the moment. Check back later or explore other categories!
          </p>
          <UButton
            color="primary"
            variant="soft"
            class="mt-6"
            @click="filterProjects('All')"
          >
            View All Projects
          </UButton>
        </div>
      </UContainer>
    </section>

    <!-- Collaboration CTA Section -->
    <section
      class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 card-transition"
    >
      <UContainer>
        <div class="max-w-3xl mx-auto text-center">
          <UIcon
            name="i-heroicons-sparkles"
            class="w-16 h-16 text-primary mx-auto mb-6"
          />
          <h2 class="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
          <p
            class="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <UButton
            to="/contact"
            color="primary"
            size="lg"
            icon="i-heroicons-envelope"
          >
            Let's Collaborate
          </UButton>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { ProjectWithPosts } from "~/composables/useProjects";

const selectedCategory = ref("All");

const { projects } = await useProjects();

const categories = computed(() => [
  "All",
  ...new Set(projects.flatMap((project) => project.types || [])),
]);

function filterProjects(category: string) {
  selectedCategory.value = category;
}

const filteredProjects = computed<ProjectWithPosts[]>(() => {
  if (selectedCategory.value === "All") {
    return projects;
  }

  return projects.filter((project) =>
    (project.types || []).includes(selectedCategory.value)
  );
});

// Add SEO metadata
const { setPageMeta } = useSeo();

setPageMeta({
  title: "Projects",
  description:
    "Explore my portfolio of web development projects featuring Vue.js, Nuxt, TypeScript, and Python applications.",
  type: "website",
});
</script>

<style scoped>
.card-transition {
  transition: all 0.3s ease;
}

:deep(.project-card) {
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

:deep(.project-card:hover) {
  transform: translateY(-6px);
  box-shadow: 0 15px 35px -15px rgba(0, 0, 0, 0.25);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
