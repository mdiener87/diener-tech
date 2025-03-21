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
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
          <div v-for="tech in technologies" :key="tech.name" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-md flex flex-col items-center card-transition">
            <UIcon :name="tech.icon" class="w-8 h-8 mb-2 text-primary" />
            <span class="font-medium">{{ tech.name }}</span>
          </div>
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

// Technologies list
const technologies = [
  { name: 'Vue.js', icon: 'i-heroicons-code-bracket' },
  { name: 'Nuxt 3', icon: 'i-heroicons-code-bracket' },
  { name: 'Tailwind', icon: 'i-heroicons-swatch' },
  { name: 'JavaScript', icon: 'i-heroicons-code-bracket' },
  { name: 'TypeScript', icon: 'i-heroicons-code-bracket' },
  { name: 'Node.js', icon: 'i-heroicons-server' },
  { name: 'Git', icon: 'i-heroicons-arrow-path' },
  { name: 'Cloudflare', icon: 'i-heroicons-cloud' },
  { name: 'API Design', icon: 'i-heroicons-squares-2x2' },
  { name: 'UI/UX', icon: 'i-heroicons-rectangle-group' },
  { name: 'SQL', icon: 'i-heroicons-table-cells' },
  { name: 'NoSQL', icon: 'i-heroicons-circle-stack' }
];

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