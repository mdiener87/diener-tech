<template>
  <main class="flex-grow">
    <!-- Hero Section -->
    <section
      class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 card-transition"
    >
      <UContainer>
        <div class="flex flex-col md:flex-row items-center gap-8">
          <!-- Hero Content -->
          <div class="md:w-3/5 space-y-6">
            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Hi, I'm <span class="text-primary">Michael Diener</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300">
              Software engineer and technology enthusiast. I build innovative
              solutions and share my journey through code, writing, and creative
              projects.
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

          <!-- Profile image -->
          <div class="md:w-2/5 flex justify-center">
            <div
              class="w-64 h-64 bg-primary/10 rounded-full flex items-center justify-center border-4 border-primary/20"
            >
              <NuxtImg
                src="/images/pics/diener_headshot.jpg"
                alt="Michael Diener"
                width="256"
                height="256"
                class="rounded-full"
              />
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Skills & Technologies Section -->
    <section
      class="py-12 bg-white dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-800"
    >
      <UContainer>
        <div class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">
            Technologies I Work With
          </h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My tech stack is constantly evolving. Here are some of the
            technologies I'm currently using.
          </p>
        </div>

        <!-- Categories Filter -->
        <div class="flex flex-wrap justify-center gap-3 mb-6">
          <UBadge
            v-for="category in categories"
            :key="category"
            color="primary"
            variant="soft"
            size="lg"
            class="cursor-pointer transition-all"
            :class="selectedCategory === category ? 'ring-2 ring-primary' : ''"
            @click="filterByCategory(category)"
            @mouseenter="filterByCategory(category)"
            @mouseleave="clearCategoryFilter"
          >
            {{ category.charAt(0).toUpperCase() + category.slice(1) }}
          </UBadge>
        </div>

        <div
          ref="techCarouselRef"
          class="tech-carousel relative overflow-hidden py-8"
        >
          <!-- Fixed-height, single-row container -->
          <div class="relative h-[140px]">
            <TransitionGroup
              name="tech-shuffle"
              tag="div"
              class="absolute inset-0 flex justify-center"
            >
              <div
                v-for="tech in visibleTechs"
                :key="tech.name"
                class="tech-card absolute p-5 rounded-xl flex flex-col items-center transform transition-all duration-300 ease-in-out"
                :class="tech.colorClass"
                :style="{ left: `${tech.position}px` }"
                @mouseenter="onTechHover(tech)"
                @mouseleave="resetTechHover"
              >
                <div
                  class="tech-icon-wrapper relative w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300"
                >
                  <UIcon
                    :name="tech.icon"
                    class="w-10 h-10 transition-transform duration-300"
                    :class="hoveredTech === tech.name ? 'scale-125' : ''"
                  />
                </div>
                <span class="font-medium text-white drop-shadow-md">{{
                  tech.name
                }}</span>
              </div>
            </TransitionGroup>
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
            Check out my latest work — projects that showcase my skills and
            passion for technology.
          </p>
        </div>

        <UCard
          v-if="featuredProject"
          class="overflow-hidden border border-gray-200 dark:border-gray-800"
        >
          <div class="flex flex-col lg:flex-row">
            <!-- Project Preview -->
            <div
              class="lg:w-1/2 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-6"
            >
              <div
                class="aspect-video w-full bg-primary/10 rounded-lg flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-code-bracket-square"
                  class="w-16 h-16 text-primary/50"
                />
                <!-- Replace with: <UImage src="/img/projects/featured.jpg" alt="Featured Project" width="600" height="338" class="rounded-lg" /> -->
              </div>
            </div>

            <!-- Project Details -->
            <div class="lg:w-1/2 p-6 flex flex-col">
              <h3 class="text-xl font-bold mb-2">
                {{ featuredProject.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ featuredProject.description }}
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <UBadge
                  v-for="tech in featuredProject.technologies"
                  :key="tech"
                  color="primary"
                  variant="soft"
                >
                  {{ tech }}
                </UBadge>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {{ featuredProject.additionalInfo }}
              </p>
              <div class="mt-auto flex gap-4">
                <UButton
                  to="/projects"
                  color="primary"
                  variant="soft"
                  icon="i-heroicons-arrow-right"
                >
                  View Project
                </UButton>
                <UButton
                  v-if="featuredProject.demoUrl"
                  :to="featuredProject.demoUrl"
                  target="_blank"
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-globe-alt"
                >
                  Live Demo
                </UButton>
                <UButton
                  v-if="featuredProject.githubUrl"
                  :to="featuredProject.githubUrl"
                  target="_blank"
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-code-bracket"
                >
                  GitHub
                </UButton>
              </div>
            </div>
          </div>
        </UCard>

        <UAlert
          v-else
          title="Coming soon!"
          color="info"
          variant="soft"
          icon="i-heroicons-information-circle"
        >
          Projects are currently being added to the portfolio. Check back soon
          for featured work!
        </UAlert>
      </UContainer>
    </section>

    <!-- Latest Blog Posts Section -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold mb-2">
              Latest from the Blog
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              Thoughts, tutorials, and insights from my development journey.
            </p>
          </div>
          <UButton
            to="/blog"
            color="primary"
            variant="ghost"
            icon="i-heroicons-arrow-right"
            icon-right
          >
            View All Posts
          </UButton>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard
            v-for="post in latestPosts"
            :key="post._path"
            class="flex flex-col hover:shadow-lg card-transition"
          >
            <template #header>
              <h3 class="text-xl font-semibold">
                {{ post.title || "Untitled" }}
              </h3>
              <div class="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <span>{{ formatDate(post.date) }}</span>
                <span>•</span>
                <span>{{ post.readingTime || "5" }} min read</span>
              </div>
            </template>
            <p class="mb-4">
              {{ post.description || "No description available." }}
            </p>
            <div class="mt-auto">
              <NuxtLink
                :to="post._path"
                class="inline-block hover:underline font-semibold text-primary"
              >
                Read More
              </NuxtLink>
            </div>
          </UCard>

          <UCard
            v-if="latestPosts.length === 0"
            class="flex flex-col items-center justify-center p-6"
          >
            <UIcon
              name="i-heroicons-document-text"
              class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3
              class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              No posts yet
            </h3>
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
          <UButton
            to="/contact"
            color="primary"
            size="lg"
            icon="i-heroicons-envelope"
          >
            Get In Touch
          </UButton>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

// Fetch latest blog posts
const latestPosts = await queryContent("blog")
  .where({ _partial: false })
  .sort({ date: -1 })
  .limit(3)
  .find();

// Featured project data (placeholder until you build out a projects collection)
const featuredProject = {
  title: "Personal Portfolio Website",
  description:
    "A modern, responsive personal website built with Nuxt 3 and Tailwind CSS showcasing projects and blog content with dark mode support.",
  technologies: ["Vue.js", "Nuxt 3", "Tailwind CSS", "Cloudflare"],
  additionalInfo:
    "This project includes content management, responsive design, and SEO optimization.",
  demoUrl: "https://diener.tech",
  githubUrl: "https://github.com/username/portfolio",
};

// Technologies list with color classes - organized by category
const technologies = [
  // Frontend Frameworks & Libraries
  {
    name: "Vue.js",
    icon: "i-heroicons-code-bracket",
    colorClass: "bg-emerald-500 hover:bg-emerald-600",
    category: "frontend",
  },
  {
    name: "Nuxt 3",
    icon: "i-heroicons-code-bracket",
    colorClass: "bg-green-500 hover:bg-green-600",
    category: "frontend",
  },
  {
    name: "React",
    icon: "i-heroicons-cube-transparent",
    colorClass: "bg-blue-400 hover:bg-blue-500",
    category: "frontend",
  },
  {
    name: "Angular",
    icon: "i-heroicons-variable",
    colorClass: "bg-red-500 hover:bg-red-600",
    category: "frontend",
  },
  {
    name: "d3.js",
    icon: "i-heroicons-chart-bar",
    colorClass: "bg-orange-600 hover:bg-orange-700",
    category: "frontend",
  },
  {
    name: "JQuery",
    icon: "i-heroicons-bolt",
    colorClass: "bg-blue-300 hover:bg-blue-400",
    category: "frontend",
  },
  {
    name: "Knockout",
    icon: "i-heroicons-puzzle-piece",
    colorClass: "bg-purple-400 hover:bg-purple-500",
    category: "frontend",
  },

  // Styling & UI
  {
    name: "Tailwind",
    icon: "i-heroicons-swatch",
    colorClass: "bg-sky-500 hover:bg-sky-600",
    category: "styling",
  },
  {
    name: "Bootstrap",
    icon: "i-heroicons-rectangle-stack",
    colorClass: "bg-purple-600 hover:bg-purple-700",
    category: "styling",
  },
  {
    name: "UI/UX",
    icon: "i-heroicons-rectangle-group",
    colorClass: "bg-pink-500 hover:bg-pink-600",
    category: "styling",
  },

  // Programming Languages
  {
    name: "JavaScript",
    icon: "i-heroicons-code-bracket",
    colorClass: "bg-yellow-500 hover:bg-yellow-600",
    category: "languages",
  },
  {
    name: "TypeScript",
    icon: "i-heroicons-document-text",
    colorClass: "bg-blue-500 hover:bg-blue-600",
    category: "languages",
  },
  {
    name: "Python",
    icon: "i-heroicons-command-line",
    colorClass: "bg-blue-700 hover:bg-blue-800",
    category: "languages",
  },
  {
    name: "C#",
    icon: "i-heroicons-hashtag",
    colorClass: "bg-violet-600 hover:bg-violet-700",
    category: "languages",
  },
  {
    name: "Bash",
    icon: "i-heroicons-command-line",
    colorClass: "bg-gray-700 hover:bg-gray-800",
    category: "languages",
  },

  // Backend & Servers
  {
    name: "Node.js",
    icon: "i-heroicons-server",
    colorClass: "bg-green-600 hover:bg-green-700",
    category: "backend",
  },
  {
    name: "SQL",
    icon: "i-heroicons-table-cells",
    colorClass: "bg-blue-600 hover:bg-blue-700",
    category: "backend",
  },
  {
    name: "NoSQL",
    icon: "i-heroicons-circle-stack",
    colorClass: "bg-amber-500 hover:bg-amber-600",
    category: "backend",
  },
  {
    name: "AWS",
    icon: "i-heroicons-cloud",
    colorClass: "bg-yellow-600 hover:bg-yellow-700",
    category: "backend",
  },
  {
    name: "ASP.NET MVC",
    icon: "i-heroicons-window",
    colorClass: "bg-indigo-600 hover:bg-indigo-700",
    category: "backend",
  },
  {
    name: ".NET Core",
    icon: "i-heroicons-globe-alt",
    colorClass: "bg-purple-500 hover:bg-purple-600",
    category: "backend",
  },
  {
    name: "Flask",
    icon: "i-heroicons-beaker",
    colorClass: "bg-slate-600 hover:bg-slate-700",
    category: "backend",
  },
  {
    name: "Tornado",
    icon: "i-heroicons-arrow-path-rounded-square",
    colorClass: "bg-cyan-600 hover:bg-cyan-700",
    category: "backend",
  },
  {
    name: "Entity Framework",
    icon: "i-heroicons-link",
    colorClass: "bg-blue-800 hover:bg-blue-900",
    category: "backend",
  },
  {
    name: "SQL Server",
    icon: "i-heroicons-server-stack",
    colorClass: "bg-red-700 hover:bg-red-800",
    category: "backend",
  },
  {
    name: "SQL Workbench",
    icon: "i-heroicons-wrench-screwdriver",
    colorClass: "bg-orange-700 hover:bg-orange-800",
    category: "backend",
  },

  // Development Tools
  {
    name: "Git",
    icon: "i-heroicons-arrow-path",
    colorClass: "bg-orange-500 hover:bg-orange-600",
    category: "devtools",
  },
  {
    name: "VS Code",
    icon: "i-heroicons-code-bracket-square",
    colorClass: "bg-blue-500 hover:bg-blue-600",
    category: "devtools",
  },
  {
    name: "Cursor",
    icon: "i-heroicons-cursor-arrow-rays",
    colorClass: "bg-indigo-400 hover:bg-indigo-500",
    category: "devtools",
  },
  {
    name: "n8n",
    icon: "i-heroicons-arrow-path-rounded-square",
    colorClass: "bg-emerald-600 hover:bg-emerald-700",
    category: "devtools",
  },
  {
    name: "Visual Studio",
    icon: "i-heroicons-computer-desktop",
    colorClass: "bg-violet-500 hover:bg-violet-600",
    category: "devtools",
  },
  {
    name: "Docker",
    icon: "i-heroicons-cube",
    colorClass: "bg-sky-600 hover:bg-sky-700",
    category: "devtools",
  },
  {
    name: "GitHub",
    icon: "i-heroicons-code-bracket",
    colorClass: "bg-slate-800 hover:bg-slate-900",
    category: "devtools",
  },
  {
    name: "TFS",
    icon: "i-heroicons-archive-box",
    colorClass: "bg-blue-600 hover:bg-blue-700",
    category: "devtools",
  },

  // Testing & Quality Assurance
  {
    name: "Jest",
    icon: "i-heroicons-check-badge",
    colorClass: "bg-red-400 hover:bg-red-500",
    category: "testing",
  },
  {
    name: "Testing Library",
    icon: "i-heroicons-clipboard-document-check",
    colorClass: "bg-rose-600 hover:bg-rose-700",
    category: "testing",
  },
  {
    name: "Cypress",
    icon: "i-heroicons-bug-ant",
    colorClass: "bg-green-800 hover:bg-green-900",
    category: "testing",
  },

  // DevOps & CI/CD
  {
    name: "GitHub Actions",
    icon: "i-heroicons-play",
    colorClass: "bg-gray-700 hover:bg-gray-800",
    category: "devops",
  },
  {
    name: "CI/CD",
    icon: "i-heroicons-arrow-path",
    colorClass: "bg-blue-700 hover:bg-blue-800",
    category: "devops",
  },

  // Project Management
  {
    name: "Jira",
    icon: "i-heroicons-clipboard-document-list",
    colorClass: "bg-blue-500 hover:bg-blue-600",
    category: "management",
  },

  // AI & Services
  {
    name: "API Design",
    icon: "i-heroicons-squares-2x2",
    colorClass: "bg-indigo-500 hover:bg-indigo-600",
    category: "services",
  },
  {
    name: "Cloudflare",
    icon: "i-heroicons-cloud-arrow-up",
    colorClass: "bg-orange-400 hover:bg-orange-500",
    category: "services",
  },
  {
    name: "REST API",
    icon: "i-heroicons-arrows-right-left",
    colorClass: "bg-teal-600 hover:bg-teal-700",
    category: "services",
  },
  {
    name: "Microservices",
    icon: "i-heroicons-puzzle-piece",
    colorClass: "bg-emerald-500 hover:bg-emerald-600",
    category: "services",
  },
  {
    name: "ChatGPT",
    icon: "i-heroicons-chat-bubble-left-right",
    colorClass: "bg-green-400 hover:bg-green-500",
    category: "ai",
  },
  {
    name: "Claude",
    icon: "i-heroicons-sparkles",
    colorClass: "bg-violet-500 hover:bg-violet-600",
    category: "ai",
  },

  // 3D & Media
  {
    name: "3D Printing",
    icon: "i-heroicons-cube",
    colorClass: "bg-teal-500 hover:bg-teal-600",
    category: "3d",
  },
  {
    name: "Cura",
    icon: "i-heroicons-computer-desktop",
    colorClass: "bg-blue-300 hover:bg-blue-400",
    category: "3d",
  },
  {
    name: "Unity",
    icon: "i-heroicons-cube-transparent",
    colorClass: "bg-gray-600 hover:bg-gray-700",
    category: "3d",
  },
  {
    name: "Unreal",
    icon: "i-heroicons-fire",
    colorClass: "bg-red-600 hover:bg-red-700",
    category: "3d",
  },
  {
    name: "OBS",
    icon: "i-heroicons-video-camera",
    colorClass: "bg-purple-700 hover:bg-purple-800",
    category: "media",
  },
];

// Tech display logic
const visibleTechs = ref([]);
const hoveredTech = ref(null);
const techCarouselRef = ref(null);
const containerWidth = ref(0);
const hoveredTechCategory = ref(null);
const CARD_WIDTH = 140; // Width of each card
const CARD_MARGIN = 24; // Space between cards
const preventBackToBackTechs = ref(true); // Toggle to prevent back-to-back tech display
const lastDisplayedTechs = ref([]); // Keep track of last displayed techs
const categories = computed(() => [
  ...new Set(technologies.map((tech) => tech.category)),
]); // Get unique categories
const selectedCategory = ref(null); // Currently selected category

// Calculate how many cards can fit based on container width
function calculateDisplayCount() {
  // Get actual container width
  const width = containerWidth.value;
  const count = Math.max(
    1,
    Math.floor((width - CARD_MARGIN) / (CARD_WIDTH + CARD_MARGIN))
  );
  0;
  return count;
}

// Initialize with random technologies
onMounted(() => {
  // Get container width
  nextTick(() => {
    if (techCarouselRef.value) {
      containerWidth.value = techCarouselRef.value.clientWidth;

      // Add resize listener
      window.addEventListener(
        "resize",
        debounce(() => {
          if (techCarouselRef.value) {
            containerWidth.value = techCarouselRef.value.clientWidth;
            shuffleTechs();
          }
        }, 250)
      );
    }

    shuffleTechs();
    // Set up interval to shuffle techs
    setInterval(shuffleTechs, 5000);
  });
});

// Debounce function to avoid excessive resize calculations
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}

// Shuffle and select random technologies to display
function shuffleTechs() {
  if (!containerWidth.value) {
    // If container width isn't available yet, use a default
    containerWidth.value =
      techCarouselRef.value?.clientWidth || window.innerWidth * 0.8;
  }

  const displayCount = Math.min(calculateDisplayCount(), technologies.length);

  // Filter technologies by category if one is selected
  const techPool = selectedCategory.value
    ? technologies.filter((tech) => tech.category === selectedCategory.value)
    : technologies;

  // If selected category doesn't have enough techs, fall back to all
  // if (techPool.length < displayCount) {
  //   selectedCategory.value = null;
  //   return shuffleTechs();
  // }

  let shuffled = [...techPool].sort(() => 0.5 - Math.random());

  // If preventing back-to-back techs, filter out the last displayed techs
  if (
    preventBackToBackTechs.value &&
    lastDisplayedTechs.value.length > 0 &&
    !selectedCategory.value
  ) {
    // Get names of last displayed techs
    const lastNames = lastDisplayedTechs.value.map((t) => t.name);
    // Filter out techs that were last displayed
    const filtered = shuffled.filter((tech) => !lastNames.includes(tech.name));

    // If we have enough techs after filtering, use the filtered list
    if (filtered.length >= displayCount) {
      shuffled = filtered;
    }
    // Otherwise, use the original shuffled list (fallback if too few techs remain)
  }

  const selectedTechs = shuffled.slice(0, displayCount);

  // Save current selection for next shuffle
  lastDisplayedTechs.value = [...selectedTechs];

  // Calculate positions for each card
  const totalWidth =
    displayCount * CARD_WIDTH + (displayCount - 1) * CARD_MARGIN;
  const startX = (containerWidth.value - totalWidth) / 2;

  visibleTechs.value = selectedTechs.map((tech, index) => {
    const position = startX + index * (CARD_WIDTH + CARD_MARGIN);
    return {
      ...tech,
      position: position,
    };
  });
}

// Handle tech hover
function onTechHover(tech) {
  hoveredTech.value = tech.name;
}

// Reset tech hover
function resetTechHover() {
  hoveredTech.value = null;
}

// Filter by category
function filterByCategory(category) {
  selectedCategory.value = category;
  shuffleTechs();
}

// Clear category filter
function clearCategoryFilter() {
  selectedCategory.value = null;
  shuffleTechs();
}

// Format date function
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// SEO metadata
const { setPageMeta } = useSeo();

setPageMeta({
  title: "Michael Diener - Software Engineer & Tech Enthusiast",
  description:
    "Personal portfolio and blog showcasing software development, creative projects, and more",
  type: "website",
  canonicalUrl: "https://diener.tech",
});
</script>

<style scoped>
.tech-card {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  min-width: 140px;
  height: 120px;
  width: 140px;
  position: absolute;
  transition: all 0.6s ease;
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
