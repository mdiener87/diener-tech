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

          <!-- Projects Filter -->
          <div class="mt-8 flex flex-wrap justify-center gap-2">
            <UButton
              v-for="category in [
                'All',
                'Web',
                'Mobile',
                'Backend',
                'Experiment',
              ]"
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

    <!-- Featured Projects Section -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="mb-10">
          <h2 class="text-3xl font-bold mb-4">Featured Projects</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Key projects that showcase my technical skills and creative approach
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <UCard
            v-for="project in filteredFeaturedProjects"
            :key="project.id"
            class="project-card flex flex-col overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300"
            :ui="{ body: { padding: 'p-0' } }"
          >
            <!-- Project Image -->
            <div class="relative overflow-hidden project-image-container">
              <img
                :src="project.image || '/images/default-social.svg'"
                :alt="project.title"
                class="w-full h-64 object-cover project-image transition-all duration-500"
              />

              <!-- Overlay with tech stack -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <div class="flex flex-wrap gap-2 mb-3">
                  <UBadge
                    v-for="tech in project.technologies"
                    :key="tech"
                    :color="getBadgeColor(tech)"
                    variant="outline"
                    class="backdrop-blur-sm"
                  >
                    {{ tech }}
                  </UBadge>
                </div>
                <h3 class="text-xl font-bold">{{ project.title }}</h3>
                <p class="text-sm text-gray-200 mt-1 line-clamp-2">
                  {{ project.description }}
                </p>
              </div>
            </div>

            <!-- Project Details -->
            <div class="p-6 flex flex-col flex-grow">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold">{{ project.title }}</h3>
                <UBadge
                  :color="getProjectTypeColor(project.type || 'Web')"
                  variant="soft"
                >
                  {{ project.type || "Web" }}
                </UBadge>
              </div>

              <p class="text-gray-600 dark:text-gray-400 mb-6">
                {{ project.description }}
              </p>

              <!-- Feature highlights (if any) -->
              <div
                v-if="project.highlights && project.highlights.length"
                class="mb-6"
              >
                <h4
                  class="text-sm font-medium uppercase text-gray-500 dark:text-gray-400 mb-2"
                >
                  Key Features
                </h4>
                <ul class="space-y-1">
                  <li
                    v-for="(highlight, idx) in project.highlights"
                    :key="idx"
                    class="flex items-start gap-2"
                  >
                    <UIcon
                      name="i-heroicons-check-circle"
                      class="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                    />
                    <span class="text-sm text-gray-600 dark:text-gray-300">{{
                      highlight
                    }}</span>
                  </li>
                </ul>
              </div>

              <!-- Tech stack pills -->
              <div class="flex flex-wrap gap-2 mb-6">
                <UBadge
                  v-for="tech in project.technologies"
                  :key="tech"
                  :color="getBadgeColor(tech)"
                  variant="subtle"
                  size="sm"
                >
                  {{ tech }}
                </UBadge>
              </div>

              <!-- Project links -->
              <div class="mt-auto flex gap-3">
                <UButton
                  v-if="project.demoUrl"
                  :to="project.demoUrl"
                  target="_blank"
                  color="primary"
                  icon="i-heroicons-globe-alt"
                >
                  Live Demo
                </UButton>
                <UButton
                  v-if="project.githubUrl"
                  :to="project.githubUrl"
                  target="_blank"
                  color="gray"
                  variant="soft"
                  icon="i-simple-icons-github"
                >
                  View Code
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Other Projects Section -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <div class="mb-10">
          <h2 class="text-3xl font-bold mb-4">More Projects</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Additional projects showcasing my range and versatility across
            different platforms
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <UCard
            v-for="project in filteredOtherProjects"
            :key="project.id"
            class="other-project-card flex flex-col h-full hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <template #header>
              <div class="flex justify-between items-center">
                <UBadge
                  :color="getProjectTypeColor(project.type || 'Experiment')"
                  variant="subtle"
                >
                  {{ project.type || "Experiment" }}
                </UBadge>
              </div>
              <h3 class="text-xl font-bold mt-3">{{ project.title }}</h3>
            </template>

            <p class="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-6">
              <UBadge
                v-for="tech in project.technologies"
                :key="tech"
                :color="getBadgeColor(tech)"
                variant="subtle"
                size="xs"
              >
                {{ tech }}
              </UBadge>
            </div>

            <div class="mt-auto flex gap-3">
              <UButton
                v-if="project.url || project.githubUrl"
                :to="project.url || project.githubUrl"
                target="_blank"
                color="gray"
                variant="soft"
                size="sm"
                icon="i-heroicons-arrow-top-right-on-square"
              >
                View Project
              </UButton>
            </div>
          </UCard>
        </div>

        <!-- Project availability notice -->
        <div
          v-if="
            selectedCategory !== 'All' &&
            filteredOtherProjects.length === 0 &&
            filteredFeaturedProjects.length === 0
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

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  url?: string;
  type?: "Web" | "Mobile" | "Backend" | "Experiment";
  highlights?: string[];
}

// Selected category for filtering
const selectedCategory = ref("All");

// Enhanced featured projects with more details
const featuredProjects: Project[] = [
  {
    id: 1,
    title: "DienerTech Personal Website",
    description:
      "My personal portfolio and blog built with Vue 3 + Nuxt, featuring a modern UI, dark mode support, and interactive components.",
    image: "/images/projects/diener-tech.png",
    technologies: ["Vue", "Nuxt", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://diener.tech",
    githubUrl: "https://github.com/mdiener87/diener-tech",
    type: "Web",
    highlights: [
      "Responsive design optimized for all devices",
      "Dark mode support with smooth transitions",
      "Interactive data visualization with D3.js",
      "Content management system for blog posts",
    ],
  }
];

// Enhanced other projects with more details and types
const otherProjects: Project[] = [
  {
    id: 1,
    title: "Python Automation Scripts",
    description:
      "A collection of Python scripts I've developed for automating specific tasks.",
    technologies: ["Python", "Tesseract", "asyncio"],
    githubUrl: "https://github.com/mdiener87/python-scripts",
    type: "Backend",
  },
];

// Function to determine badge color based on technology
function getBadgeColor(
  tech: string
):
  | "gray"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "primary" {
  const colorMap: Record<
    string,
    | "gray"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | "primary"
  > = {
    Vue: "emerald",
    Nuxt: "green",
    TypeScript: "blue",
    "Node.js": "yellow",
    JavaScript: "amber",
    React: "cyan",
    "React Native": "sky",
    Python: "indigo",
    MongoDB: "green",
    Express: "gray",
    D3: "orange",
    "D3.js": "orange",
    GraphQL: "pink",
    "Tailwind CSS": "sky",
    MQTT: "purple",
    "Chart.js": "blue",
    Pandas: "teal",
    BeautifulSoup: "indigo",
    "REST APIs": "violet",
    SVG: "rose",
    WebSockets: "indigo",
  };
  return colorMap[tech] || "gray";
}

// Function to determine color based on project type
function getProjectTypeColor(
  type: string
):
  | "gray"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "primary" {
  const typeColorMap: Record<
    string,
    | "gray"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | "primary"
  > = {
    Web: "blue",
    Mobile: "cyan",
    Backend: "indigo",
    Experiment: "purple",
  };
  return typeColorMap[type] || "gray";
}

// Filter projects based on selected category
function filterProjects(category: string) {
  selectedCategory.value = category;
}

// Computed properties for filtered projects
const filteredFeaturedProjects = computed(() => {
  if (selectedCategory.value === "All") {
    return featuredProjects;
  }
  return featuredProjects.filter(
    (project) => project.type === selectedCategory.value
  );
});

const filteredOtherProjects = computed(() => {
  if (selectedCategory.value === "All") {
    return otherProjects;
  }
  return otherProjects.filter(
    (project) => project.type === selectedCategory.value
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

/* Project card hover effects */
.project-card {
  transition: all 0.4s ease;
}

.project-card:hover {
  transform: translateY(-8px);
}

.project-image-container {
  height: 240px;
}

.project-image {
  transition: transform 1.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.other-project-card {
  transition: all 0.3s ease;
}

.other-project-card:hover {
  transform: translateY(-5px);
}

/* Badge animations */
:deep(.badge) {
  transition: all 0.2s ease;
}

:deep(.badge:hover) {
  transform: translateY(-2px);
}

/* Icon animations */
.text-green-500 {
  transition: transform 0.2s ease;
}

li:hover .text-green-500 {
  transform: scale(1.2);
}

/* Staggered loading animation for project cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-card,
.other-project-card {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.project-card:nth-child(1),
.other-project-card:nth-child(1) {
  animation-delay: 0.1s;
}

.project-card:nth-child(2),
.other-project-card:nth-child(2) {
  animation-delay: 0.2s;
}

.other-project-card:nth-child(3) {
  animation-delay: 0.3s;
}

.other-project-card:nth-child(4) {
  animation-delay: 0.4s;
}

.other-project-card:nth-child(5) {
  animation-delay: 0.5s;
}

.other-project-card:nth-child(6) {
  animation-delay: 0.6s;
}
</style>
