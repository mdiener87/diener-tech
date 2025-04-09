<template>
  <main class="flex-grow">
    <!-- Career Header Section -->
    <section
      class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 card-transition"
    >
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Career Journey</h1>
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Explore my professional journey, skills, and achievements
          </p>

          <!-- Content Type Selector -->
          <div
            class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 card-transition mb-6 overflow-x-auto"
          >
            <UButtonGroup class="flex-wrap sm:flex-nowrap justify-center">
              <UButton
                v-for="(type, index) in contentTypes"
                :key="type.id"
                :color="activeContentType === type.id ? 'primary' : 'gray'"
                :variant="activeContentType === type.id ? 'solid' : 'ghost'"
                @click="activeContentType = type.id"
                class="px-2 sm:px-4 py-2 min-w-max"
              >
                {{ type.label }}
              </UButton>
            </UButtonGroup>
          </div>

          <!-- Hide visualization options until more are implemented -->
        </div>
      </UContainer>
    </section>

    <!-- Description Section (only for visualizations) -->
    <section
      v-if="activeContentType === 'visualizations'"
      class="py-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
    >
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <p class="text-gray-600 dark:text-gray-300">
            An interactive visualization of my technical skills and professional experience. Click nodes to expand branches and hover for details.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Visualization Content (when visualizations is selected) -->
    <section
      v-if="activeContentType === 'visualizations'"
      class="py-8 bg-white dark:bg-gray-900"
    >
      <UContainer>
        <UCard
          class="overflow-hidden min-h-[800px] border border-gray-200 dark:border-gray-800"
        >
          <div class="h-full">
            <SkillsTree />
          </div>
        </UCard>
      </UContainer>
    </section>

    <!-- Text Content (when experience or philosophy is selected) -->
    <section
      v-if="activeContentType === 'experience'"
      class="py-12 bg-white dark:bg-gray-900"
    >
      <UContainer>
        <h2 class="text-3xl font-bold mb-10 text-center">
          Skills & Experience
        </h2>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Professional Experience -->
          <UCard class="h-full transition-all hover:shadow-lg">
            <template #header>
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center"
                >
                  <UIcon
                    name="i-heroicons-briefcase"
                    class="w-6 h-6 text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h3 class="text-xl font-bold">Professional Experience</h3>
              </div>
            </template>

            <div class="space-y-6">
              <!-- Experience Item -->
              <div class="experience-item">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-bold text-gray-900 dark:text-white">
                    Software Engineer
                  </h4>
                  <UBadge color="blue" variant="subtle">2022 - Present</UBadge>
                </div>
                <h5 class="text-primary font-medium mb-2">HeadSpin</h5>
                <p class="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Architected scalable frontend solutions, transforming features
                  into flexible components. Developed a custom Vue component
                  library standardizing design and enabling faster development
                  cycles. Led feature enhancements across all SDLC stages with
                  rigorous test coverage.
                </p>
                <div class="flex flex-wrap gap-2">
                  <UBadge color="gray" variant="subtle" size="xs"
                    >Vue.js</UBadge
                  >
                  <UBadge color="gray" variant="subtle" size="xs"
                    >JavaScript</UBadge
                  >
                  <UBadge color="gray" variant="subtle" size="xs"
                    >TypeScript</UBadge
                  >
                  <UBadge color="gray" variant="subtle" size="xs">Jest</UBadge>
                </div>
              </div>

              <UDivider />

              <!-- Experience Item -->
              <div class="experience-item">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-bold text-gray-900 dark:text-white">
                    Software Engineer
                  </h4>
                  <UBadge color="blue" variant="subtle">2021 - 2022</UBadge>
                </div>
                <h5 class="text-primary font-medium mb-2">Sopheon</h5>
                <p class="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Enhanced UX and GDPR compliance of a multi-tenant cloud
                  application through full-stack web feature development.
                  Created a REST API integrating a new web application with
                  Sopheon's core product. Optimized front-end and back-end
                  architecture.
                </p>
                <div class="flex flex-wrap gap-2">
                  <UBadge color="gray" variant="subtle" size="xs"
                    >JavaScript</UBadge
                  >
                  <UBadge color="gray" variant="subtle" size="xs"
                    >REST API</UBadge
                  >
                  <UBadge color="gray" variant="subtle" size="xs">C#</UBadge>
                </div>
              </div>

              <UDivider />

              <!-- Experience Item -->
              <div class="experience-item">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-bold text-gray-900 dark:text-white">
                    Senior Technical Consultant
                  </h4>
                  <UBadge color="blue" variant="subtle">2017 - 2021</UBadge>
                </div>
                <h5 class="text-primary font-medium mb-2">Sopheon</h5>
                <p class="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Spearheaded client success as lead engineer for enterprise
                  clients including Lockheed Martin and P&G. Innovated a
                  reusable JavaScript component library enhancing the product's
                  front-end capabilities. Developed custom C# plugins and SQL
                  scripts to augment core product functionalities.
                </p>
                <div class="flex flex-wrap gap-2">
                  <UBadge color="gray" variant="subtle" size="xs"
                    >JavaScript</UBadge
                  >
                  <UBadge color="gray" variant="subtle" size="xs">C#</UBadge>
                  <UBadge color="gray" variant="subtle" size="xs">SQL</UBadge>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Technical Skills -->
          <div class="grid gap-6">
            <!-- Expertise Card -->
            <UCard class="transition-all hover:shadow-lg">
              <template #header>
                <div class="flex items-center gap-3 mb-2">
                  <div
                    class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center"
                  >
                    <UIcon
                      name="i-heroicons-code-bracket"
                      class="w-6 h-6 text-green-600 dark:text-green-400"
                    />
                  </div>
                  <h3 class="text-xl font-bold">Technical Expertise</h3>
                </div>
              </template>

              <div class="grid grid-cols-2 gap-4">
                <!-- Skill Category -->
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-3">
                    Frontend
                  </h4>
                  <ul class="space-y-2">
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-heroicons-check-circle"
                        class="w-5 h-5 text-green-500"
                      />
                      <span>Vue.js / React / Angular</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-heroicons-check-circle"
                        class="w-5 h-5 text-green-500"
                      />
                      <span>JavaScript / TypeScript</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-heroicons-check-circle"
                        class="w-5 h-5 text-green-500"
                      />
                      <span>Jest / Testing Library</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-heroicons-check-circle"
                        class="w-5 h-5 text-green-500"
                      />
                      <span>D3 / JQuery / Knockout</span>
                    </li>
                  </ul>
                </div>

                <!-- Skill Category -->
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-3">
                    Backend
                  </h4>
                  <ul class="space-y-2">
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-heroicons-check-circle"
                        class="w-5 h-5 text-green-500"
                      />
                      <span>Node.js</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-heroicons-check-circle"
                        class="w-5 h-5 text-green-500"
                      />
                      <span>Python / Flask / Tornado</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-heroicons-check-circle"
                        class="w-5 h-5 text-green-500"
                      />
                      <span>C# / .NET Core / MVC</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-heroicons-check-circle"
                        class="w-5 h-5 text-green-500"
                      />
                      <span>SQL / Entity Framework</span>
                    </li>
                  </ul>
                </div>
              </div>

            </UCard>

            <!-- Awards & Education Card -->
            <UCard class="transition-all hover:shadow-lg">
              <template #header>
                <div class="flex items-center gap-3 mb-2">
                  <div
                    class="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center"
                  >
                    <UIcon
                      name="i-heroicons-academic-cap"
                      class="w-6 h-6 text-purple-600 dark:text-purple-400"
                    />
                  </div>
                  <h3 class="text-xl font-bold">Awards & Education</h3>
                </div>
              </template>

              <div class="space-y-4">
                <!-- Awards -->
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-3">
                    Recognition
                  </h4>
                  <ul class="space-y-2">
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-heroicons-trophy"
                        class="w-5 h-5 text-amber-500"
                      />
                      <span
                        >Sopheon Outstanding Implementations - Merck & 3M
                        Projects</span
                      >
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-heroicons-trophy"
                        class="w-5 h-5 text-amber-500"
                      />
                      <span
                        >Sopheon Outstanding Contribution - JavaScript Component
                        Library</span
                      >
                    </li>
                  </ul>
                </div>

                <UDivider />

                <!-- Education -->
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-3">
                    Education
                  </h4>
                  <div class="flex items-center gap-2 mb-1">
                    <UIcon
                      name="i-heroicons-building-library"
                      class="w-5 h-5 text-blue-500"
                    />
                    <span class="font-medium">Colorado State University</span>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300 text-sm pl-7">
                    BA in Political Science
                  </p>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Philosophy Content -->
    <section
      v-if="activeContentType === 'philosophy'"
      class="py-12 bg-white dark:bg-gray-900"
    >
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">Career Philosophy</h2>

          <UCard class="mb-8">
            <div class="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                I believe exceptional software development blends technical
                skill with empathy, creativity, and a deep understanding of the
                end user's needs. Great products emerge not just from mastering
                technologies, but from genuinely caring about the problems they
                solve and the people they serve.
              </p>
              <p>
                Throughout my career, I've found fulfillment in bridging
                technical complexity and practical usability. I prioritize
                elegant, maintainable solutions that deliver measurable business
                value, always keeping the human element at the core of my work.
              </p>
              <p>
                I deeply value continuous learning, exploration, and
                growth—embracing new technologies not only to stay ahead
                professionally but also to satisfy my natural curiosity and
                passion for innovation. My goal isn't just to write code but to
                create impactful, meaningful software that genuinely makes
                people's lives better.
              </p>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">Core Competencies</h2>
            </template>
            <ul class="space-y-4 mt-2">
              <li
                v-for="(skill, index) in coreSkills"
                :key="index"
                class="flex items-start"
              >
                <UIcon
                  :name="skill.icon"
                  class="mr-3 mt-1 text-primary w-6 h-6 flex-shrink-0"
                  size="24"
                />
                <div>
                  <h3 class="font-medium">{{ skill.name }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ skill.description }}
                  </p>
                </div>
              </li>
            </ul>
          </UCard>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
import SkillsTree from "~/components/career/SkillsTree.vue";
import { ref, computed } from "vue";

// Add SEO metadata
const { setPageMeta } = useSeo();

setPageMeta({
  title: "Career Journey",
  description:
    "Explore my professional journey, skills, and achievements through interactive visualizations showcasing my experience in software development.",
  type: "profile",
});

// Content type selection
const contentTypes = [
  {
    id: "visualizations",
    label: "Interactive Visualizations",
  },
  {
    id: "experience",
    label: "Skills & Experience",
  },
  {
    id: "philosophy",
    label: "Career Philosophy",
  },
];

// Default active content type
const activeContentType = ref("visualizations");

// Note: Removed the visualization type selection as we're only showing Skills Tree for now
// This will be expanded when more visualizations are implemented

// Core skills list with icons
const coreSkills = [
  {
    name: "Frontend Engineering & Design",
    description:
      "Crafting intuitive, responsive, and performant interfaces using modern frameworks like Vue, Nuxt, and AngularJS, emphasizing usability and user-centric design principles.",
    icon: "i-heroicons-code-bracket",
  },
  {
    name: "User Experience Design",
    description:
      "Creating intuitive user experiences that balance aesthetics with functionality.",
    icon: "i-heroicons-paint-brush",
  },
  {
    name: "Full-Stack Development",
    description:
      "Leveraging a versatile skill set that bridges the gap between frontend expertise and backend logic, particularly with Node.js and Python backends, and experience with SQL database design.",
    icon: "i-heroicons-server-stack",
  },
  {
    name: "Technical Leadership & Mentorship",
    description:
      "Guiding engineering teams by fostering collaboration, facilitating knowledge sharing, and mentoring junior developers to grow their technical abilities and professional confidence.",
    icon: "i-heroicons-user-group",
  },
  {
    name: "Creative Problem Solving",
    description:
      "Tackling complex, ambiguous technical challenges with a pragmatic and structured approach—breaking them down systematically into clear, implementable solutions.",
    icon: "i-heroicons-puzzle-piece",
  },
  {
    name: "AI Integration & Exploration",
    description:
      "Passionate about integrating cutting-edge AI and machine learning capabilities into practical applications, including experience prototyping and implementing AI-driven features.",
    icon: "i-heroicons-cpu-chip",
  },
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

/* Experience items hover effect */
.experience-item {
  transition: transform 0.3s ease;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.experience-item:hover {
  background-color: rgba(var(--color-primary-50), 0.5);
  transform: translateX(4px);
}

.dark .experience-item:hover {
  background-color: rgba(var(--color-primary-900), 0.2);
}

/* Fade animation for loading content */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .card-transition {
    transition: none;
  }
  .card-transition:hover {
    transform: none;
  }
  .experience-item:hover {
    transform: none;
  }
}
</style>
