<template>
  <div class="career-timeline">
    <!-- Timeline Container -->
    <div ref="timelineContainer" class="w-full h-[600px] mb-4"></div>

    <!-- Details Panel -->
    <UCard v-if="selectedItem" class="details-panel mb-4 border border-gray-200 dark:border-gray-700">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center"
              :class="selectedItem.className.includes('award') ? 'bg-amber-100 dark:bg-amber-900' : 'bg-blue-100 dark:bg-blue-900'"
            >
              <UIcon 
                :name="selectedItem.className.includes('award') ? 'i-heroicons-trophy' : 'i-heroicons-briefcase'" 
                class="w-6 h-6"
                :class="selectedItem.className.includes('award') ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'"
              />
            </div>
            <div>
              <h3 class="text-lg font-semibold">{{ selectedItem.content }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ formatDate(selectedItem.start) }}
                <template v-if="selectedItem.end"> - {{ formatDate(selectedItem.end) }}</template>
              </p>
            </div>
          </div>
          <UButton
            icon="i-heroicons-x-mark"
            color="gray"
            variant="ghost"
            class="ml-2"
            @click="selectedItem = null"
          />
        </div>
      </template>

      <div class="space-y-4">
        <!-- Award -->
        <template v-if="selectedItem.details.type === 'Award'">
          <h4 class="font-medium">{{ selectedItem.details.title }}</h4>
          <p>{{ selectedItem.details.description }}</p>
        </template>

        <!-- Job Position -->
        <template v-else>
          <h4 class="font-medium">{{ selectedItem.details.position }}</h4>
          <div v-if="selectedItem.details.achievements" class="mt-3">
            <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Achievements</h5>
            <ul class="space-y-1 pl-5 list-disc">
              <li v-for="(achievement, i) in selectedItem.details.achievements" :key="i" class="text-sm">
                {{ achievement }}
              </li>
            </ul>
          </div>

          <div v-if="selectedItem.details.technologies" class="mt-3">
            <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies</h5>
            <div class="flex flex-wrap gap-2">
              <UBadge 
                v-for="(tech, i) in selectedItem.details.technologies" 
                :key="i" 
                color="gray" 
                variant="subtle" 
                size="xs"
              >
                {{ tech }}
              </UBadge>
            </div>
          </div>
        </template>
      </div>
    </UCard>

    <!-- Instructions Panel -->
    <UCard v-else class="details-panel mb-4 border border-gray-200 dark:border-gray-700">
      <div class="text-center p-6">
        <UIcon name="i-heroicons-information-circle" class="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <h3 class="text-lg font-medium mb-2">Interactive Timeline</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Click on a timeline item to view detailed information about that position or achievement.
          Drag to pan and use the mouse wheel to zoom in/out.
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { Timeline, DataSet } from 'vis-timeline/standalone';
import type { TimelineItem, GroupItem } from '~/types/timeline';

// Get color mode from Nuxt
const colorMode = useColorMode();
const isDarkMode = computed(() => colorMode.value === 'dark');

// Create refs for DOM elements and data
const timelineContainer = ref<HTMLElement>();
let timeline: Timeline | null = null;
const selectedItem = ref<TimelineItem | null>(null);

// Career timeline data
const timelineData = [
  {
    id: 1,
    content: "HeadSpin",
    title: "Software Engineer",
    start: "2022-11-01",
    end: new Date(),
    type: "range",
    className: "headspin-item",
    details: {
      position: "Software Engineer",
      achievements: [
        "Architected and implemented scalable frontend solutions",
        "Developed and integrated a custom Vue component library",
        "Modernized and optimized legacy Angular components",
        "Led feature enhancements across all SDLC stages"
      ],
      technologies: ["Vue", "JavaScript", "TypeScript", "Jest"]
    }
  },
  {
    id: 2,
    content: "Sopheon",
    title: "Software Engineer",
    start: "2021-11-01",
    end: "2022-11-01",
    type: "range",
    className: "sopheon-engineer-item",
    details: {
      position: "Software Engineer",
      achievements: [
        "Enhanced UX and GDPR compliance of a multi-tenant cloud-hosted application",
        "Created a REST API to integrate a new web application with Sopheon's core product",
        "Boosted page load times and responsiveness by optimizing architecture"
      ],
      technologies: ["JavaScript", "REST API", "C#"]
    }
  },
  {
    id: 3,
    content: "Sopheon",
    title: "Senior Technical Consultant",
    start: "2017-02-01",
    end: "2021-11-01",
    type: "range",
    className: "sopheon-consultant-item",
    details: {
      position: "Senior Technical Consultant",
      achievements: [
        "Spearheaded client success as the lead engineer",
        "Promoted from Technical Consultant to Senior Technical Consultant",
        "Innovated a reusable JavaScript component library",
        "Developed custom C# plugins and SQL scripts"
      ],
      technologies: ["JavaScript", "C#", "SQL"]
    }
  },
  {
    id: 4,
    content: "LenderLive Network",
    title: "Software Developer",
    start: "2015-06-01",
    end: "2017-02-01",
    type: "range",
    className: "lenderlive-item",
    details: {
      position: "Software Developer",
      achievements: [
        "Designed and implemented a custom .NET software solution",
        "Automated the manual monthly billing process"
      ],
      technologies: [".NET", "Microsoft Great Plains ERP"]
    }
  },
  // Add awards as milestone markers
  {
    id: 5,
    content: "Award",
    title: "Outstanding Implementations - Merck & 3M Projects",
    start: "2019-06-01", // Approximate date
    type: "point",
    className: "award-item",
    details: {
      type: "Award",
      title: "Outstanding Implementations",
      description: "Merck Project & 3M Project"
    }
  },
  {
    id: 6,
    content: "Award",
    title: "Outstanding Contribution - JavaScript Component Library",
    start: "2020-03-01", // Approximate date
    type: "point",
    className: "award-item",
    details: {
      type: "Award",
      title: "Outstanding Contribution",
      description: "JavaScript Component Library"
    }
  }
];

// Initialize timeline on mount
onMounted(() => {
  initializeTimeline();
  
  // Watch for color mode changes to update timeline styling
  watch(
    () => colorMode.value,
    () => {
      updateTimelineStyling();
    }
  );
  
  // Handle window resize
  const handleResize = () => {
    if (timeline) {
      timeline.redraw();
    }
  };
  
  // Debounce resize handler
  const debouncedResize = debounce(handleResize, 250);
  window.addEventListener('resize', debouncedResize);
  
  onUnmounted(() => {
    window.removeEventListener('resize', debouncedResize);
    if (timeline) {
      timeline.destroy();
      timeline = null;
    }
  });
});

// Debounce helper
function debounce(fn: Function, ms: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// Initialize the timeline
function initializeTimeline() {
  if (!timelineContainer.value) return;
  
  // Create a DataSet with the timeline items
  const items = new DataSet(timelineData);
  
  // Timeline options
  const options = {
    height: '100%',
    min: new Date(2015, 0, 1),
    max: new Date(2025, 0, 1),
    zoomMin: 1000 * 60 * 60 * 24 * 30, // One month in milliseconds
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 10, // Ten years in milliseconds
    stack: false,
    showCurrentTime: false,
    verticalScroll: true,
    horizontalScroll: true,
    zoomKey: 'ctrlKey',
    orientation: 'top',
    margin: {
      item: {
        horizontal: 10,
        vertical: 5
      }
    },
    tooltip: {
      followMouse: true,
      overflowMethod: 'cap'
    },
    template: function(item: any) {
      // Customize the display of items based on their class
      if (item.className.includes('award')) {
        return `
          <div class="award-template">
            <div class="award-icon">🏆</div>
            <div class="award-title">${item.title}</div>
          </div>
        `;
      } else {
        return `
          <div class="job-template">
            <div class="job-title">${item.content}</div>
            <div class="job-position">${item.title}</div>
          </div>
        `;
      }
    }
  };
  
  // Create the timeline
  timeline = new Timeline(timelineContainer.value, items, options);
  
  // Apply styling based on current theme
  updateTimelineStyling();
  
  // Handle item selection
  timeline.on('select', function(properties) {
    if (properties.items.length > 0) {
      const selectedId = properties.items[0];
      const item = timelineData.find(item => item.id === selectedId);
      if (item) {
        selectedItem.value = item as TimelineItem;
      }
    }
  });
  
  // Handle click on empty space to clear selection
  timeline.on('click', function(properties) {
    if (properties.item === null && properties.items.length === 0) {
      selectedItem.value = null;
    }
  });
}

// Update timeline styling based on current theme
function updateTimelineStyling() {
  if (!timeline) return;
  
  const container = timelineContainer.value;
  if (!container) return;
  
  // Update CSS variables based on theme
  if (isDarkMode.value) {
    container.style.setProperty('--timeline-background', '#1f2937');
    container.style.setProperty('--timeline-foreground', '#f3f4f6');
    container.style.setProperty('--timeline-border', '#374151');
    container.style.setProperty('--timeline-item-background', '#4b5563');
    container.style.setProperty('--timeline-award-background', '#78350f');
    container.style.setProperty('--timeline-tooltip-background', '#1f2937');
  } else {
    container.style.setProperty('--timeline-background', '#ffffff');
    container.style.setProperty('--timeline-foreground', '#1f2937');
    container.style.setProperty('--timeline-border', '#e5e7eb');
    container.style.setProperty('--timeline-item-background', '#93c5fd');
    container.style.setProperty('--timeline-award-background', '#fcd34d');
    container.style.setProperty('--timeline-tooltip-background', '#ffffff');
  }
  
  // Force redraw to apply new styles
  timeline.redraw();
}

// Format dates for display
function formatDate(date: Date | string): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short'
  }).format(d);
}
</script>

<style scoped>
.career-timeline {
  --timeline-background: v-bind(isDarkMode ? '#1f2937' : '#ffffff');
  --timeline-foreground: v-bind(isDarkMode ? '#f3f4f6' : '#1f2937');
  --timeline-border: v-bind(isDarkMode ? '#374151' : '#e5e7eb');
  --timeline-item-background: v-bind(isDarkMode ? '#4b5563' : '#93c5fd');
  --timeline-award-background: v-bind(isDarkMode ? '#78350f' : '#fcd34d');
  --timeline-tooltip-background: v-bind(isDarkMode ? '#1f2937' : '#ffffff');
}

/* Override vis-timeline styles to match project theme */
:deep(.vis-timeline) {
  border-color: var(--timeline-border);
  background-color: var(--timeline-background);
  color: var(--timeline-foreground);
}

:deep(.vis-panel) {
  border-color: var(--timeline-border);
}

:deep(.vis-time-axis .vis-text),
:deep(.vis-time-axis .vis-grid) {
  color: var(--timeline-foreground);
}

:deep(.vis-item) {
  border-radius: 0.25rem;
  border-width: 1px;
  transition: all 0.2s ease;
}

:deep(.vis-item.vis-selected) {
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  z-index: 100;
}

:deep(.vis-item.vis-range) {
  color: var(--timeline-foreground);
  background-color: var(--timeline-item-background);
  border-color: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
}

:deep(.vis-item.vis-point) {
  background-color: var(--timeline-award-background);
  border-color: rgba(0, 0, 0, 0.1);
}

:deep(.vis-item.award-item) {
  cursor: pointer;
  color: #000;
}

:deep(.vis-item.headspin-item) {
  border-left: 4px solid #3b82f6;
}

:deep(.vis-item.sopheon-engineer-item),
:deep(.vis-item.sopheon-consultant-item) {
  border-left: 4px solid #10b981;
}

:deep(.vis-item.lenderlive-item) {
  border-left: 4px solid #8b5cf6;
}

/* Custom templates */
:deep(.award-template) {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  padding: 5px;
}

:deep(.award-icon) {
  font-size: 1.2rem;
  margin-bottom: 2px;
}

:deep(.job-template) {
  display: flex;
  flex-direction: column;
}

:deep(.job-title) {
  font-weight: bold;
  margin-bottom: 2px;
}

:deep(.job-position) {
  font-size: 0.75rem;
  opacity: 0.8;
}

:deep(.vis-tooltip) {
  background-color: var(--timeline-tooltip-background);
  border-color: var(--timeline-border);
  color: var(--timeline-foreground);
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 8px 12px;
  font-size: 0.875rem;
}

/* Add animation for the details panel */
.details-panel {
  transition: all 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  :deep(.vis-item) {
    font-size: 0.75rem;
  }
  
  .career-timeline {
    margin: 0 -1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .details-panel,
  :deep(.vis-item) {
    transition: none;
  }
}
</style>
