<template>
  <main class="flex-grow">
    <!-- Hero Section -->
    <section class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 card-transition">
      <UContainer>
        <div class="flex flex-col md:flex-row items-center gap-8">
          <!-- Hero Content -->
          <div class="md:w-3/5 space-y-6">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I'm <span class="text-primary">Michael Diener</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300">
              Software engineer and technology enthusiast. I build innovative solutions
              and share my journey through code, writing, and creative projects.
            </p>
            <div class="flex flex-wrap gap-4 pt-2">
              <UButton
                to="/projects"
                color="primary"
                size="lg"
                icon="i-heroicons-code-bracket"
              >
                View My Projects
              </UButton>
              <UButton
                to="/contact"
                variant="outline"
                size="lg"
                icon="i-heroicons-envelope"
              >
                Get In Touch
              </UButton>
            </div>
          </div>
          
          <!-- Placeholder for profile image or illustration -->
          <div class="md:w-2/5 flex justify-center">
            <div class="w-64 h-64 bg-primary/10 rounded-full flex items-center justify-center border-4 border-primary/20">
              <UIcon name="i-heroicons-user-circle" class="w-32 h-32 text-primary/50" />
              <!-- Replace with: <UImage src="/img/profile.jpg" alt="Michael Diener" width="256" height="256" class="rounded-full" /> -->
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Skills & Technologies Section -->
    <section class="py-12 bg-white dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-800 card-transition">
      <UContainer>
        <div class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">Technologies I Work With</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My tech stack is constantly evolving. Here are some of the technologies I'm currently using.
          </p>
        </div>
        
        <div class="tech-carousel relative overflow-hidden py-8 px-4">
          <!-- Visible technologies -->
          <TransitionGroup
            name="tech-shuffle"
            tag="div"
            class="flex flex-wrap justify-center gap-6 min-h-[260px]"
          >
            <div 
              v-for="tech in visibleTechs" 
              :key="tech.name"
              class="tech-card relative p-5 rounded-xl flex flex-col items-center transform transition-all duration-300 ease-in-out"
              :class="tech.colorClass"
              @mouseenter="onTechHover(tech)"
              @mouseleave="resetTechHover"
            >
              <div class="tech-icon-wrapper relative w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300">
                <UIcon 
                  :name="tech.icon" 
                  class="w-10 h-10 transition-transform duration-300" 
                  :class="hoveredTech === tech.name ? 'scale-125' : ''"
                />
              </div>
              <span class="font-medium text-white drop-shadow-md">{{ tech.name }}</span>
            </div>
          </TransitionGroup>
        </div>
      </UContainer>
    </section>

    <!-- Featured Project Section -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">Featured Project</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Check out my latest work — projects that showcase my skills and passion for technology.
          </p>
        </div>
        
        <UCard v-if="featuredProject" class="overflow-hidden border border-gray-200 dark:border-gray-800">
          <div class="flex flex-col lg:flex-row">
            <!-- Project Preview -->
            <div class="lg:w-1/2 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-6">
              <div class="aspect-video w-full bg-primary/10 rounded-lg flex items-center justify-center">
                <UIcon name="i-heroicons-code-bracket-square" class="w-16 h-16 text-primary/50" />
                <!-- Replace with: <UImage src="/img/projects/featured.jpg" alt="Featured Project" width="600" height="338" class="rounded-lg" /> -->
              </div>
            </div>
            
            <!-- Project Details -->
            <div class="lg:w-1/2 p-6 flex flex-col">
              <h3 class="text-xl font-bold mb-2">{{ featuredProject.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ featuredProject.description }}
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <UBadge v-for="tech in featuredProject.technologies" :key="tech" color="primary" variant="soft">
                  {{ tech }}
                </UBadge>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {{ featuredProject.additionalInfo }}
              </p>
              <div class="mt-auto flex gap-4">
                <UButton to="/projects" color="primary" variant="soft" icon="i-heroicons-arrow-right">
                  View Project
                </UButton>
                <UButton v-if="featuredProject.demoUrl" :to="featuredProject.demoUrl" target="_blank" color="gray" variant="ghost" icon="i-heroicons-globe-alt">
                  Live Demo
                </UButton>
                <UButton v-if="featuredProject.githubUrl" :to="featuredProject.githubUrl" target="_blank" color="gray" variant="ghost" icon="i-heroicons-code-bracket">
                  GitHub
                </UButton>
              </div>
            </div>
          </div>
        </UCard>
        
        <UAlert v-else title="Coming soon!" color="info" variant="soft" icon="i-heroicons-information-circle">
          Projects are currently being added to the portfolio. Check back soon for featured work!
        </UAlert>
      </UContainer>
    </section>

    <!-- Latest Blog Posts Section -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold mb-2">Latest from the Blog</h2>
            <p class="text-gray-600 dark:text-gray-400">
              Thoughts, tutorials, and insights from my development journey.
            </p>
          </div>
          <UButton to="/blog" color="primary" variant="ghost" icon="i-heroicons-arrow-right" icon-right>
            View All Posts
          </UButton>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard v-for="post in latestPosts" :key="post._path" class="flex flex-col hover:shadow-lg card-transition">
            <template #header>
              <h3 class="text-xl font-semibold">{{ post.title || 'Untitled' }}</h3>
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
          
          <UCard v-if="latestPosts.length === 0" class="flex flex-col items-center justify-center p-6">
            <UIcon name="i-heroicons-document-text" class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No posts yet</h3>
            <p class="text-gray-500 dark:text-gray-400 text-center">
              Blog posts will appear here once published.
            </p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Contact CTA Section -->
    <section class="py-12 bg-primary/5 dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">Let's Connect</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Interested in working together or have questions about my projects?
            I'd love to hear from you!
          </p>
          <UButton to="/contact" color="primary" size="lg" icon="i-heroicons-envelope">
            Get In Touch
          </UButton>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Fetch latest blog posts
const latestPosts = await queryContent('blog')
  .where({ _partial: false })
  .sort({ date: -1 })
  .limit(3)
  .find();

// Featured project data (placeholder until you build out a projects collection)
const featuredProject = {
  title: 'Personal Portfolio Website',
  description: 'A modern, responsive personal website built with Nuxt 3 and Tailwind CSS showcasing projects and blog content with dark mode support.',
  technologies: ['Vue.js', 'Nuxt 3', 'Tailwind CSS', 'Cloudflare'],
  additionalInfo: 'This project includes content management, responsive design, and SEO optimization.',
  demoUrl: 'https://diener.tech',
  githubUrl: 'https://github.com/username/portfolio'
};

// Technologies list with color classes
const technologies = [
  { name: 'Vue.js', icon: 'i-heroicons-code-bracket', colorClass: 'bg-emerald-500 hover:bg-emerald-600' },
  { name: 'Nuxt 3', icon: 'i-heroicons-code-bracket', colorClass: 'bg-green-500 hover:bg-green-600' },
  { name: 'Tailwind', icon: 'i-heroicons-swatch', colorClass: 'bg-sky-500 hover:bg-sky-600' },
  { name: 'JavaScript', icon: 'i-heroicons-code-bracket', colorClass: 'bg-yellow-500 hover:bg-yellow-600' },
  { name: 'TypeScript', icon: 'i-heroicons-code-bracket', colorClass: 'bg-blue-500 hover:bg-blue-600' },
  { name: 'Node.js', icon: 'i-heroicons-server', colorClass: 'bg-green-600 hover:bg-green-700' },
  { name: 'Git', icon: 'i-heroicons-arrow-path', colorClass: 'bg-orange-500 hover:bg-orange-600' },
  { name: 'Cloudflare', icon: 'i-heroicons-cloud', colorClass: 'bg-orange-400 hover:bg-orange-500' },
  { name: 'API Design', icon: 'i-heroicons-squares-2x2', colorClass: 'bg-indigo-500 hover:bg-indigo-600' },
  { name: 'UI/UX', icon: 'i-heroicons-rectangle-group', colorClass: 'bg-purple-500 hover:bg-purple-600' },
  { name: 'SQL', icon: 'i-heroicons-table-cells', colorClass: 'bg-blue-600 hover:bg-blue-700' },
  { name: 'NoSQL', icon: 'i-heroicons-circle-stack', colorClass: 'bg-amber-500 hover:bg-amber-600' }
];

// Tech display logic
const visibleTechs = ref([]);
const hoveredTech = ref(null);
const DISPLAY_COUNT = 6; // Number of techs to display at once

// Initialize with random technologies
onMounted(() => {
  shuffleTechs();
  // Set up interval to shuffle techs
  setInterval(shuffleTechs, 5000);
});

// Shuffle and select random technologies to display
function shuffleTechs() {
  const shuffled = [...technologies].sort(() => 0.5 - Math.random());
  visibleTechs.value = shuffled.slice(0, DISPLAY_COUNT);
}

// Handle tech hover
function onTechHover(tech) {
  hoveredTech.value = tech.name;
}

// Reset tech hover
function resetTechHover() {
  hoveredTech.value = null;
}

// Format date function
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// SEO metadata
const { setPageMeta } = useSeo();

setPageMeta({
  title: 'Michael Diener - Software Engineer & Tech Enthusiast',
  description: 'Personal portfolio and blog showcasing software development, creative projects, and more',
  type: 'website',
  canonicalUrl: 'https://diener.tech'
});
</script>

<style scoped>
.tech-card {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  min-width: 140px;
  height: 120px;
  width: 140px;
  transition: all 0.4s ease;
}

.tech-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
}

.tech-icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}

/* Transition animations for tech cards entering/leaving */
.tech-shuffle-enter-active,
.tech-shuffle-leave-active {
  transition: all 0.6s ease;
}

.tech-shuffle-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.8);
}

.tech-shuffle-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.8);
}
</style>