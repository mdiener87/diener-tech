<template>
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
          :color="categoryColors[category]?.buttonColor || 'primary'"
          variant="soft"
          size="lg"
          class="cursor-pointer transition-all"
          :class="selectedCategory === category ? `ring-2 ring-${categoryColors[category]?.buttonColor || 'primary'}` : ''"
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
                class="tech-icon-wrapper relative w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all duration-300"
              >
                <UIcon
                  :name="tech.icon"
                  class="w-10 h-10 transition-transform duration-300"
                  :class="hoveredTech === tech.name ? 'scale-125' : ''"
                />
              </div>
              <span class="font-medium text-white drop-shadow-md text-center w-full px-1 leading-tight text-sm">{{
                tech.name
              }}</span>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";

// Technologies list with color classes - organized by category
const technologies = [
  // Frontend Frameworks & Libraries
  {
    name: "Vue.js",
    icon: "i-heroicons-code-bracket",
    colorClass: "bg-emerald-500 hover:bg-emerald-600",
    category: "Frontend & UI",
  },
  {
    name: "Nuxt 3",
    icon: "i-heroicons-code-bracket",
    colorClass: "bg-green-500 hover:bg-green-600",
    category: "Frontend & UI",
  },
  {
    name: "React",
    icon: "i-heroicons-cube-transparent",
    colorClass: "bg-blue-400 hover:bg-blue-500",
    category: "Frontend & UI",
  },
  {
    name: "Angular",
    icon: "i-heroicons-variable",
    colorClass: "bg-red-500 hover:bg-red-600",
    category: "Frontend & UI",
  },
  {
    name: "d3.js",
    icon: "i-heroicons-chart-bar",
    colorClass: "bg-orange-600 hover:bg-orange-700",
    category: "Frontend & UI",
  },
  {
    name: "JQuery",
    icon: "i-heroicons-bolt",
    colorClass: "bg-blue-300 hover:bg-blue-400",
    category: "Frontend & UI",
  },
  {
    name: "Knockout",
    icon: "i-heroicons-puzzle-piece",
    colorClass: "bg-purple-400 hover:bg-purple-500",
    category: "Frontend & UI",
  },
  {
    name: "Tailwind",
    icon: "i-heroicons-swatch",
    colorClass: "bg-sky-500 hover:bg-sky-600",
    category: "Frontend & UI",
  },
  {
    name: "Bootstrap",
    icon: "i-heroicons-rectangle-stack",
    colorClass: "bg-purple-600 hover:bg-purple-700",
    category: "Frontend & UI",
  },
  {
    name: "UI/UX",
    icon: "i-heroicons-rectangle-group",
    colorClass: "bg-pink-500 hover:bg-pink-600",
    category: "Frontend & UI",
  },
  // Programming Languages
  {
    name: "JavaScript",
    icon: "i-heroicons-code-bracket",
    colorClass: "bg-yellow-500 hover:bg-yellow-600",
    category: "Languages",
  },
  {
    name: "TypeScript",
    icon: "i-heroicons-document-text",
    colorClass: "bg-blue-500 hover:bg-blue-600",
    category: "Languages",
  },
  {
    name: "Python",
    icon: "i-heroicons-command-line",
    colorClass: "bg-blue-700 hover:bg-blue-800",
    category: "Languages",
  },
  {
    name: "C#",
    icon: "i-heroicons-hashtag",
    colorClass: "bg-violet-600 hover:bg-violet-700",
    category: "Languages",
  },
  {
    name: "Bash",
    icon: "i-heroicons-command-line",
    colorClass: "bg-gray-700 hover:bg-gray-800",
    category: "Languages",
  },

  // Backend & Servers (now Backend & Infrastructure)
  {
    name: "Node.js",
    icon: "i-heroicons-server",
    colorClass: "bg-green-600 hover:bg-green-700",
    category: "Backend & Infrastructure",
  },
  {
    name: "SQL",
    icon: "i-heroicons-table-cells",
    colorClass: "bg-blue-600 hover:bg-blue-700",
    category: "Backend & Infrastructure",
  },
  {
    name: "NoSQL",
    icon: "i-heroicons-circle-stack",
    colorClass: "bg-amber-500 hover:bg-amber-600",
    category: "Backend & Infrastructure",
  },
  {
    name: "AWS",
    icon: "i-heroicons-cloud",
    colorClass: "bg-yellow-600 hover:bg-yellow-700",
    category: "Backend & Infrastructure",
  },
  {
    name: "ASP.NET MVC",
    icon: "i-heroicons-window",
    colorClass: "bg-indigo-600 hover:bg-indigo-700",
    category: "Backend & Infrastructure",
  },
  {
    name: ".NET Core",
    icon: "i-heroicons-globe-alt",
    colorClass: "bg-purple-500 hover:bg-purple-600",
    category: "Backend & Infrastructure",
  },
  {
    name: "Flask",
    icon: "i-heroicons-beaker",
    colorClass: "bg-slate-600 hover:bg-slate-700",
    category: "Backend & Infrastructure",
  },
  {
    name: "Tornado",
    icon: "i-heroicons-arrow-path-rounded-square",
    colorClass: "bg-cyan-600 hover:bg-cyan-700",
    category: "Backend & Infrastructure",
  },
  {
    name: "Entity Framework",
    icon: "i-heroicons-link",
    colorClass: "bg-blue-800 hover:bg-blue-900",
    category: "Backend & Infrastructure",
  },
  {
    name: "SQL Server",
    icon: "i-heroicons-server-stack",
    colorClass: "bg-red-700 hover:bg-red-800",
    category: "Backend & Infrastructure",
  },
  {
    name: "SQL Workbench",
    icon: "i-heroicons-wrench-screwdriver",
    colorClass: "bg-orange-700 hover:bg-orange-800",
    category: "Backend & Infrastructure",
  },

  {
    name: "Git",
    icon: "i-heroicons-arrow-path",
    colorClass: "bg-orange-500 hover:bg-orange-600",
    category: "Dev Tools & Ops",
  },
  {
    name: "VS Code",
    icon: "i-heroicons-code-bracket-square",
    colorClass: "bg-blue-500 hover:bg-blue-600",
    category: "Dev Tools & Ops",
  },
  {
    name: "Cursor",
    icon: "i-heroicons-cursor-arrow-rays",
    colorClass: "bg-indigo-400 hover:bg-indigo-500",
    category: "Dev Tools & Ops",
  },
  {
    name: "n8n",
    icon: "i-heroicons-arrow-path-rounded-square",
    colorClass: "bg-emerald-600 hover:bg-emerald-700",
    category: "Dev Tools & Ops",
  },
  {
    name: "Visual Studio",
    icon: "i-heroicons-computer-desktop",
    colorClass: "bg-violet-500 hover:bg-violet-600",
    category: "Dev Tools & Ops",
  },
  {
    name: "Docker",
    icon: "i-heroicons-cube",
    colorClass: "bg-sky-600 hover:bg-sky-700",
    category: "Dev Tools & Ops",
  },
  {
    name: "GitHub",
    icon: "i-heroicons-code-bracket",
    colorClass: "bg-slate-800 hover:bg-slate-900",
    category: "Dev Tools & Ops",
  },
  {
    name: "TFS",
    icon: "i-heroicons-archive-box",
    colorClass: "bg-blue-600 hover:bg-blue-700",
    category: "Dev Tools & Ops",
  },
  {
    name: "Jest",
    icon: "i-heroicons-check-badge",
    colorClass: "bg-red-400 hover:bg-red-500",
    category: "Dev Tools & Ops",
  },
  {
    name: "Testing Library",
    icon: "i-heroicons-clipboard-document-check",
    colorClass: "bg-rose-600 hover:bg-rose-700",
    category: "Dev Tools & Ops",
  },
  {
    name: "Selenium",
    icon: "i-heroicons-bug-ant",
    colorClass: "bg-green-800 hover:bg-green-900",
    category: "Dev Tools & Ops",
  },
  {
    name: "GitHub Actions",
    icon: "i-heroicons-play",
    colorClass: "bg-gray-700 hover:bg-gray-800",
    category: "Dev Tools & Ops",
  },
  {
    name: "CI/CD",
    icon: "i-heroicons-arrow-path",
    colorClass: "bg-blue-700 hover:bg-blue-800",
    category: "Dev Tools & Ops",
  },
  {
    name: "Jira",
    icon: "i-heroicons-clipboard-document-list",
    colorClass: "bg-blue-500 hover:bg-blue-600",
    category: "Dev Tools & Ops",
  },
  {
    name: "API Design",
    icon: "i-heroicons-squares-2x2",
    colorClass: "bg-indigo-500 hover:bg-indigo-600",
    category: "Backend & Infrastructure",
  },
  {
    name: "Cloudflare",
    icon: "i-heroicons-cloud-arrow-up",
    colorClass: "bg-orange-400 hover:bg-orange-500",
    category: "Backend & Infrastructure",
  },
  {
    name: "REST API",
    icon: "i-heroicons-arrows-right-left",
    colorClass: "bg-teal-600 hover:bg-teal-700",
    category: "Backend & Infrastructure",
  },
  {
    name: "Microservices",
    icon: "i-heroicons-puzzle-piece",
    colorClass: "bg-emerald-500 hover:bg-emerald-600",
    category: "Backend & Infrastructure",
  },

  // AI & Emerging Technologies
  {
    name: "ChatGPT",
    icon: "i-heroicons-chat-bubble-left-right",
    colorClass: "bg-green-400 hover:bg-green-500",
    category: "AI & Emerging Tech",
  },
  {
    name: "Claude",
    icon: "i-heroicons-sparkles",
    colorClass: "bg-violet-500 hover:bg-violet-600",
    category: "AI & Emerging Tech",
  },

  // Media & 3D Technologies
  {
    name: "3D Printing",
    icon: "i-heroicons-cube",
    colorClass: "bg-teal-500 hover:bg-teal-600",
    category: "2D & 3D Media",
  },
  {
    name: "Cura",
    icon: "i-heroicons-computer-desktop",
    colorClass: "bg-blue-300 hover:bg-blue-400",
    category: "2D & 3D Media",
  },
  {
    name: "Fusion 360",
    icon: "i-heroicons-computer-desktop",
    colorClass: "bg-blue-300 hover:bg-blue-400",
    category: "2D & 3D Media",
  },
  {
    name: "Creality",
    icon: "i-heroicons-cube",
    colorClass: "bg-blue-300 hover:bg-blue-400",
    category: "2D & 3D Media",
  },
  {
    name: "Unity",
    icon: "i-heroicons-cube-transparent",
    colorClass: "bg-gray-600 hover:bg-gray-700",
    category: "2D & 3D Media",
  },
  {
    name: "Unreal",
    icon: "i-heroicons-fire",
    colorClass: "bg-red-600 hover:bg-red-700",
    category: "2D & 3D Media",
  },
  {
    name: "OBS",
    icon: "i-heroicons-video-camera",
    colorClass: "bg-purple-700 hover:bg-purple-800",
    category: "2D & 3D Media",
  },
];

const categorySortOrder = [
  "Frontend & UI",
  "Backend & Infrastructure",
  "Languages",
  "Dev Tools & Ops",
  "2D & 3D Media",
  "AI & Emerging Tech",
];



// const technologies = [
//   // Frontend Frameworks & Libraries
//   {
//     name: "Vue.js",
//     icon: "i-heroicons-code-bracket",
//     colorClass: "bg-emerald-500 hover:bg-emerald-600",
//     category: "frontend",
//   },
//   {
//     name: "Nuxt 3",
//     icon: "i-heroicons-code-bracket",
//     colorClass: "bg-green-500 hover:bg-green-600",
//     category: "frontend",
//   },
//   {
//     name: "React",
//     icon: "i-heroicons-cube-transparent",
//     colorClass: "bg-blue-400 hover:bg-blue-500",
//     category: "frontend",
//   },
//   {
//     name: "Angular",
//     icon: "i-heroicons-variable",
//     colorClass: "bg-red-500 hover:bg-red-600",
//     category: "frontend",
//   },
//   {
//     name: "d3.js",
//     icon: "i-heroicons-chart-bar",
//     colorClass: "bg-orange-600 hover:bg-orange-700",
//     category: "frontend",
//   },
//   {
//     name: "JQuery",
//     icon: "i-heroicons-bolt",
//     colorClass: "bg-blue-300 hover:bg-blue-400",
//     category: "frontend",
//   },
//   {
//     name: "Knockout",
//     icon: "i-heroicons-puzzle-piece",
//     colorClass: "bg-purple-400 hover:bg-purple-500",
//     category: "frontend",
//   },

//   // Styling & UI
//   {
//     name: "Tailwind",
//     icon: "i-heroicons-swatch",
//     colorClass: "bg-sky-500 hover:bg-sky-600",
//     category: "styling",
//   },
//   {
//     name: "Bootstrap",
//     icon: "i-heroicons-rectangle-stack",
//     colorClass: "bg-purple-600 hover:bg-purple-700",
//     category: "styling",
//   },
//   {
//     name: "UI/UX",
//     icon: "i-heroicons-rectangle-group",
//     colorClass: "bg-pink-500 hover:bg-pink-600",
//     category: "styling",
//   },

//   // Programming Languages
//   {
//     name: "JavaScript",
//     icon: "i-heroicons-code-bracket",
//     colorClass: "bg-yellow-500 hover:bg-yellow-600",
//     category: "Languages",
//   },
//   {
//     name: "TypeScript",
//     icon: "i-heroicons-document-text",
//     colorClass: "bg-blue-500 hover:bg-blue-600",
//     category: "Languages",
//   },
//   {
//     name: "Python",
//     icon: "i-heroicons-command-line",
//     colorClass: "bg-blue-700 hover:bg-blue-800",
//     category: "Languages",
//   },
//   {
//     name: "C#",
//     icon: "i-heroicons-hashtag",
//     colorClass: "bg-violet-600 hover:bg-violet-700",
//     category: "Languages",
//   },
//   {
//     name: "Bash",
//     icon: "i-heroicons-command-line",
//     colorClass: "bg-gray-700 hover:bg-gray-800",
//     category: "Languages",
//   },

//   // Backend & Servers
//   {
//     name: "Node.js",
//     icon: "i-heroicons-server",
//     colorClass: "bg-green-600 hover:bg-green-700",
//     category: "backend",
//   },
//   {
//     name: "SQL",
//     icon: "i-heroicons-table-cells",
//     colorClass: "bg-blue-600 hover:bg-blue-700",
//     category: "backend",
//   },
//   {
//     name: "NoSQL",
//     icon: "i-heroicons-circle-stack",
//     colorClass: "bg-amber-500 hover:bg-amber-600",
//     category: "backend",
//   },
//   {
//     name: "AWS",
//     icon: "i-heroicons-cloud",
//     colorClass: "bg-yellow-600 hover:bg-yellow-700",
//     category: "backend",
//   },
//   {
//     name: "ASP.NET MVC",
//     icon: "i-heroicons-window",
//     colorClass: "bg-indigo-600 hover:bg-indigo-700",
//     category: "backend",
//   },
//   {
//     name: ".NET Core",
//     icon: "i-heroicons-globe-alt",
//     colorClass: "bg-purple-500 hover:bg-purple-600",
//     category: "backend",
//   },
//   {
//     name: "Flask",
//     icon: "i-heroicons-beaker",
//     colorClass: "bg-slate-600 hover:bg-slate-700",
//     category: "backend",
//   },
//   {
//     name: "Tornado",
//     icon: "i-heroicons-arrow-path-rounded-square",
//     colorClass: "bg-cyan-600 hover:bg-cyan-700",
//     category: "backend",
//   },
//   {
//     name: "Entity Framework",
//     icon: "i-heroicons-link",
//     colorClass: "bg-blue-800 hover:bg-blue-900",
//     category: "backend",
//   },
//   {
//     name: "SQL Server",
//     icon: "i-heroicons-server-stack",
//     colorClass: "bg-red-700 hover:bg-red-800",
//     category: "backend",
//   },
//   {
//     name: "SQL Workbench",
//     icon: "i-heroicons-wrench-screwdriver",
//     colorClass: "bg-orange-700 hover:bg-orange-800",
//     category: "backend",
//   },

//   // Development Tools
//   {
//     name: "Git",
//     icon: "i-heroicons-arrow-path",
//     colorClass: "bg-orange-500 hover:bg-orange-600",
//     category: "devtools",
//   },
//   {
//     name: "VS Code",
//     icon: "i-heroicons-code-bracket-square",
//     colorClass: "bg-blue-500 hover:bg-blue-600",
//     category: "devtools",
//   },
//   {
//     name: "Cursor",
//     icon: "i-heroicons-cursor-arrow-rays",
//     colorClass: "bg-indigo-400 hover:bg-indigo-500",
//     category: "devtools",
//   },
//   {
//     name: "n8n",
//     icon: "i-heroicons-arrow-path-rounded-square",
//     colorClass: "bg-emerald-600 hover:bg-emerald-700",
//     category: "devtools",
//   },
//   {
//     name: "Visual Studio",
//     icon: "i-heroicons-computer-desktop",
//     colorClass: "bg-violet-500 hover:bg-violet-600",
//     category: "devtools",
//   },
//   {
//     name: "Docker",
//     icon: "i-heroicons-cube",
//     colorClass: "bg-sky-600 hover:bg-sky-700",
//     category: "devtools",
//   },
//   {
//     name: "GitHub",
//     icon: "i-heroicons-code-bracket",
//     colorClass: "bg-slate-800 hover:bg-slate-900",
//     category: "devtools",
//   },
//   {
//     name: "TFS",
//     icon: "i-heroicons-archive-box",
//     colorClass: "bg-blue-600 hover:bg-blue-700",
//     category: "devtools",
//   },

//   // Testing & Quality Assurance
//   {
//     name: "Jest",
//     icon: "i-heroicons-check-badge",
//     colorClass: "bg-red-400 hover:bg-red-500",
//     category: "testing",
//   },
//   {
//     name: "Testing Library",
//     icon: "i-heroicons-clipboard-document-check",
//     colorClass: "bg-rose-600 hover:bg-rose-700",
//     category: "testing",
//   },
//   {
//     name: "Cypress",
//     icon: "i-heroicons-bug-ant",
//     colorClass: "bg-green-800 hover:bg-green-900",
//     category: "testing",
//   },

//   // DevOps & CI/CD
//   {
//     name: "GitHub Actions",
//     icon: "i-heroicons-play",
//     colorClass: "bg-gray-700 hover:bg-gray-800",
//     category: "devops",
//   },
//   {
//     name: "CI/CD",
//     icon: "i-heroicons-arrow-path",
//     colorClass: "bg-blue-700 hover:bg-blue-800",
//     category: "devops",
//   },

//   // Project Management
//   {
//     name: "Jira",
//     icon: "i-heroicons-clipboard-document-list",
//     colorClass: "bg-blue-500 hover:bg-blue-600",
//     category: "management",
//   },

//   // AI & Services
//   {
//     name: "API Design",
//     icon: "i-heroicons-squares-2x2",
//     colorClass: "bg-indigo-500 hover:bg-indigo-600",
//     category: "services",
//   },
//   {
//     name: "Cloudflare",
//     icon: "i-heroicons-cloud-arrow-up",
//     colorClass: "bg-orange-400 hover:bg-orange-500",
//     category: "services",
//   },
//   {
//     name: "REST API",
//     icon: "i-heroicons-arrows-right-left",
//     colorClass: "bg-teal-600 hover:bg-teal-700",
//     category: "services",
//   },
//   {
//     name: "Microservices",
//     icon: "i-heroicons-puzzle-piece",
//     colorClass: "bg-emerald-500 hover:bg-emerald-600",
//     category: "services",
//   },
//   {
//     name: "ChatGPT",
//     icon: "i-heroicons-chat-bubble-left-right",
//     colorClass: "bg-green-400 hover:bg-green-500",
//     category: "ai",
//   },
//   {
//     name: "Claude",
//     icon: "i-heroicons-sparkles",
//     colorClass: "bg-violet-500 hover:bg-violet-600",
//     category: "ai",
//   },

//   // 3D & Media
//   {
//     name: "3D Printing",
//     icon: "i-heroicons-cube",
//     colorClass: "bg-teal-500 hover:bg-teal-600",
//     category: "3d",
//   },
//   {
//     name: "Cura",
//     icon: "i-heroicons-computer-desktop",
//     colorClass: "bg-blue-300 hover:bg-blue-400",
//     category: "3d",
//   },
//   {
//     name: "Unity",
//     icon: "i-heroicons-cube-transparent",
//     colorClass: "bg-gray-600 hover:bg-gray-700",
//     category: "3d",
//   },
//   {
//     name: "Unreal",
//     icon: "i-heroicons-fire",
//     colorClass: "bg-red-600 hover:bg-red-700",
//     category: "3d",
//   },
//   {
//     name: "OBS",
//     icon: "i-heroicons-video-camera",
//     colorClass: "bg-purple-700 hover:bg-purple-800",
//     category: "media",
//   },
// ];

// Category color mapping
const categoryColors = {
  "Frontend & UI": {
    base: "bg-sky-500 hover:bg-sky-600",
    lighter: "bg-sky-400 hover:bg-sky-500",
    darker: "bg-sky-600 hover:bg-sky-700",
    accent: "bg-indigo-500 hover:bg-indigo-600",
    buttonColor: "primary" // Using the existing primary color for buttons
  },
  "Languages": {
    base: "bg-amber-500 hover:bg-amber-600",
    lighter: "bg-amber-400 hover:bg-amber-500",
    darker: "bg-amber-600 hover:bg-amber-700",
    accent: "bg-yellow-500 hover:bg-yellow-600",
    buttonColor: "amber"
  },
  "Backend & Infrastructure": {
    base: "bg-emerald-500 hover:bg-emerald-600",
    lighter: "bg-emerald-400 hover:bg-emerald-500",
    darker: "bg-emerald-600 hover:bg-emerald-700",
    accent: "bg-green-500 hover:bg-green-600",
    buttonColor: "emerald"
  },
  "Dev Tools & Ops": {
    base: "bg-violet-500 hover:bg-violet-600",
    lighter: "bg-violet-400 hover:bg-violet-500",
    darker: "bg-violet-600 hover:bg-violet-700",
    accent: "bg-purple-500 hover:bg-purple-600",
    buttonColor: "violet"
  },
  "2D & 3D Media": {
    base: "bg-cyan-500 hover:bg-cyan-600",
    lighter: "bg-cyan-400 hover:bg-cyan-500",
    darker: "bg-cyan-600 hover:bg-cyan-700",
    accent: "bg-teal-500 hover:bg-teal-600",
    buttonColor: "cyan"
  },
  "AI & Emerging Tech": {
    base: "bg-rose-500 hover:bg-rose-600",
    lighter: "bg-rose-400 hover:bg-rose-500",
    darker: "bg-rose-600 hover:bg-rose-700",
    accent: "bg-pink-500 hover:bg-pink-600",
    buttonColor: "rose"
  }
};

// Tech display logic
const visibleTechs = ref([]);
const hoveredTech = ref(null);
const techCarouselRef = ref(null);
const containerWidth = ref(0);
const CARD_WIDTH = 140; // Width of each card
const CARD_MARGIN = 24; // Space between cards
const preventBackToBackTechs = ref(true); // Toggle to prevent back-to-back tech display
const lastDisplayedTechs = ref([]); // Keep track of last displayed techs
const categories = computed(() => {
  const uniqueCategories = [...new Set(technologies.map((tech) => tech.category))];
  return uniqueCategories.sort((a, b) => {
    const indexA = categorySortOrder.indexOf(a);
    const indexB = categorySortOrder.indexOf(b);
    return indexA - indexB;
  });
});
const selectedCategory = ref(null); // Currently selected category

// Calculate how many cards can fit based on container width
function calculateDisplayCount() {
  // Get actual container width
  const width = containerWidth.value;
  const count = Math.max(
    1,
    Math.floor((width - CARD_MARGIN) / (CARD_WIDTH + CARD_MARGIN))
  );
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
    
    // Apply color based on category
    const category = tech.category;
    const colorSet = categoryColors[category];
    
    // Distribute technologies across different shades within the same category
    // Using the index to make technologies within the same category have different shades
    let colorClass;
    if (index % 3 === 0) {
      colorClass = colorSet?.base || tech.colorClass;
    } else if (index % 3 === 1) {
      colorClass = colorSet?.lighter || tech.colorClass;
    } else {
      colorClass = colorSet?.darker || tech.colorClass;
    }
    
    return {
      ...tech,
      position: position,
      colorClass: colorClass // Override the original colorClass with the category-based one
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
</script>

<style scoped>
.tech-card {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  min-width: 140px;
  height: 120px;
  width: 140px;
  position: absolute;
  transition: all 0.6s ease;
  display: flex;
  flex-direction: column;
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
