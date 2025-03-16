<template>
  <div class="container mx-auto py-10 px-6">
    <h1 class="text-4xl font-bold mb-6">Projects</h1>
    <p class="text-lg mb-8">Here are some of the key projects I've worked on:</p>

    <!-- Featured Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <UCard v-for="project in featuredProjects" :key="project.id" class="flex flex-col">
        <template #header>
          <div class="relative">
            <img 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-48 object-cover rounded-t-lg"
            />
            <div class="absolute top-2 right-2 space-x-2">
              <UBadge 
                v-for="tech in project.technologies" 
                :key="tech" 
                :color="getBadgeColor(tech)"
                variant="solid"
                size="sm"
              >
                {{ tech }}
              </UBadge>
            </div>
          </div>
          <h2 class="text-xl font-semibold mt-4">{{ project.title }}</h2>
        </template>
        
        <p class="mb-4">{{ project.description }}</p>
        
        <div class="mt-auto flex gap-4">
          <UButton
            v-if="project.demoUrl"
            :to="project.demoUrl"
            target="_blank"
            color="primary"
            variant="solid"
          >
            Live Demo
          </UButton>
          <UButton
            v-if="project.githubUrl"
            :to="project.githubUrl"
            target="_blank"
            color="gray"
            variant="ghost"
          >
            View Code
          </UButton>
        </div>
      </UCard>
    </div>

    <!-- Other Projects Section -->
    <h2 class="text-2xl font-semibold mb-6">Other Notable Projects</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard v-for="project in otherProjects" :key="project.id" class="flex flex-col">
        <template #header>
          <h3 class="text-lg font-semibold">{{ project.title }}</h3>
        </template>
        <p class="mb-4">{{ project.description }}</p>
        <div class="mt-auto">
          <UButton
            v-if="project.url"
            :to="project.url"
            target="_blank"
            color="gray"
            variant="ghost"
            size="sm"
          >
            Learn More
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  url?: string;
}

// Example featured projects
const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Personal Website",
    description: "My personal website and blog built with Nuxt 3, featuring a modern UI, dark mode, and content management system.",
    image: "/projects/website.jpg", // Add actual image
    technologies: ["Vue", "Nuxt", "TypeScript"],
    demoUrl: "https://diener.tech",
    githubUrl: "https://github.com/yourusername/website"
  },
  // Add more featured projects
];

// Example other projects
const otherProjects: Project[] = [
  {
    id: 1,
    title: "CLI Tool",
    description: "A command-line tool for automating development workflows.",
    technologies: ["Node.js", "TypeScript"],
    githubUrl: "https://github.com/yourusername/cli-tool"
  },
  // Add more projects
];

// Function to determine badge color based on technology
function getBadgeColor(tech: string): string {
  const colorMap: Record<string, string> = {
    Vue: "emerald",
    Nuxt: "green",
    TypeScript: "blue",
    "Node.js": "yellow",
    React: "cyan",
    Python: "indigo",
  };
  return colorMap[tech] || "gray";
}
</script> 