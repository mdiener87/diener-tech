<template>
  <div class="career-timeline">
    <!-- Timeline Controls -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Professional Journey</h2>
      <div class="flex items-center gap-2">
        <UButton
          icon="i-heroicons-zoom-out"
          color="gray"
          variant="ghost"
          @click="zoomOut"
          title="Zoom Out"
        />
        <UButton
          icon="i-heroicons-zoom-in"
          color="gray"
          variant="ghost"
          @click="zoomIn"
          title="Zoom In"
        />
        <UButton
          icon="i-heroicons-arrows-pointing-out"
          color="gray"
          variant="ghost"
          @click="resetZoom"
          title="Reset Zoom"
        />
      </div>
    </div>

    <!-- Timeline Container -->
    <div ref="timelineContainer" class="w-full h-[800px] mb-4 border border-gray-200 dark:border-gray-700 rounded-lg"></div>

    <!-- Details Panel -->
    <UCard v-if="selectedItem" class="details-panel mb-4 border border-gray-200 dark:border-gray-700">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center"
              :class="getItemIconClass(selectedItem).bgClass"
            >
              <UIcon 
                :name="getItemIconClass(selectedItem).icon" 
                class="w-6 h-6"
                :class="getItemIconClass(selectedItem).textClass"
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

        <!-- Project -->
        <template v-else-if="selectedItem.details.type === 'Project'">
          <h4 class="font-medium">{{ selectedItem.details.projectName }}</h4>
          <p v-if="selectedItem.details.client" class="text-sm text-gray-600 dark:text-gray-400">
            Client: {{ selectedItem.details.client }}
          </p>
          <p class="mt-2">{{ selectedItem.details.description }}</p>
          <p v-if="selectedItem.details.impact" class="mt-2 font-medium">Impact: {{ selectedItem.details.impact }}</p>
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
          Click on a timeline item to view detailed information about that position, project, or achievement.
          Use the zoom controls or mouse wheel to zoom in/out, and drag to pan horizontally.
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

// Timeline groups for different rows
const timelineGroups: GroupItem[] = [
  {
    id: 'positions',
    content: 'Positions',
    order: 1
  },
  {
    id: 'projects',
    content: 'Projects',
    order: 2
  },
  {
    id: 'awards',
    content: 'Awards',
    order: 3
  }
];
// Career timeline data
const timelineData: TimelineItem[] = [
  // Job Positions (Row 1)
  {
    id: 1,
    content: "HeadSpin",
    title: "Software Engineer",
    start: "2022-11-01",
    end: new Date(),
    type: "range",
    className: "headspin-item",
    group: "positions",
    details: {
      type: "Position",
      position: "Software Engineer",
      achievements: [
        "Architected and implemented scalable frontend solutions (e.g., AVBox, Metadata Management)",
        "Developed a Vue component library; led migration from Vue2 to Vue3",
        "Refactored legacy Angular components to Vue, improving performance and UX",
        "Achieved near-complete test coverage with Jest and Testing Library"
      ],
      technologies: ["Vue.js", "TypeScript", "JavaScript", "Angular", "Jest", "Testing Library"]
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
    group: "positions",
    details: {
      type: "Position",
      position: "Software Engineer",
      achievements: [
        "Enhanced GDPR compliance and UX in multi-tenant cloud applications",
        "Created REST API integrations with Accolade, Sopheon's core platform",
        "Optimized front-end and back-end performance and architecture"
      ],
      technologies: ["JavaScript", "C#", "REST API", "SQL", "ASP.NET MVC"]
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
    group: "positions",
    details: {
      type: "Position",
      position: "Senior Technical Consultant",
      achievements: [
        "Led technical implementations for enterprise clients (Lockheed Martin, P&G, Honeywell, etc.)",
        "Developed reusable JavaScript component libraries",
        "Created C# plugins and SQL scripts to extend product functionality",
        "Provided on-site technical training and stakeholder coordination"
      ],
      technologies: ["JavaScript", "C#", "SQL", "ASP.NET MVC", "jQuery"]
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
    group: "positions",
    details: {
      type: "Position",
      position: "Software Developer",
      achievements: [
        "Designed .NET-based billing automation integrated with Microsoft Great Plains ERP",
        "Reduced manual monthly billing to a one-click process"
      ],
      technologies: [".NET", "C#", "Microsoft Great Plains ERP", "SQL Server"]
    }
  },
  
  // Projects (Row 2)
  {
    id: 5,
    content: "Vue Component Library",
    start: "2023-01-01",
    end: "2023-08-01",
    type: "range",
    className: "project-item headspin-project",
    group: "projects",
    details: {
      type: "Project",
      projectName: "Vue Component Library",
      description: "Developed a comprehensive component library for HeadSpin's internal applications, including UI components, data visualization tools, and form elements.",
      impact: "Increased development velocity by 40% and ensured consistent UX across products",
      technologies: ["Vue 3", "TypeScript", "Vite", "Jest", "Storybook"]
    }
  },
  {
    id: 6,
    content: "Vue2 to Vue3 Migration",
    start: "2023-06-01",
    end: "2023-12-01",
    type: "range",
    className: "project-item headspin-project",
    group: "projects",
    details: {
      type: "Project",
      projectName: "Vue2 to Vue3 Migration",
      description: "Led the initiative to migrate HeadSpin's frontend applications from Vue2 to Vue3, implementing the Composition API and modern best practices.",
      impact: "Improved application performance by 30% and reduced bundle size by 25%",
      technologies: ["Vue 3", "Composition API", "TypeScript", "Vite"]
    }
  },
  {
    id: 7,
    content: "Lockheed Martin Implementation",
    start: "2019-03-01",
    end: "2019-09-01",
    type: "range",
    className: "project-item sopheon-project",
    group: "projects",
    details: {
      type: "Project",
      projectName: "Enterprise Product Implementation",
      client: "Lockheed Martin",
      description: "Led the technical implementation of Sopheon's Accolade platform for Lockheed Martin's innovation management needs.",
      impact: "Successfully delivered on time and under budget, receiving recognition from client leadership",
      technologies: ["JavaScript", "C#", "SQL", "Accolade API"]
    }
  },
  {
    id: 8,
    content: "3M Implementation",
    start: "2020-01-01",
    end: "2020-06-01",
    type: "range",
    className: "project-item sopheon-project",
    group: "projects",
    details: {
      type: "Project",
      projectName: "Enterprise Product Implementation",
      client: "3M",
      description: "Managed technical aspects of implementing Sopheon's platform for 3M's global innovation processes.",
      impact: "Created custom integrations with SAP that reduced manual data entry by 70%",
      technologies: ["JavaScript", "C#", "SQL", "SAP Integration", "Accolade API"]
    }
  },
  {
    id: 9,
    content: "Billing Automation",
    start: "2016-01-01",
    end: "2016-10-01",
    type: "range",
    className: "project-item lenderlive-project",
    group: "projects",
    details: {
      type: "Project",
      projectName: "Automated Billing System",
      description: "Designed and implemented a .NET application to automate the monthly billing process, integrating with Microsoft Great Plains ERP.",
      impact: "Reduced monthly billing process from 40 hours to 2 hours",
      technologies: [".NET", "C#", "SQL Server", "Microsoft Great Plains ERP"]
    }
  },
  
  // Awards (Row 3)
  {
    id: 10,
    content: "Award",
    title: "Outstanding Implementations - Merck Project",
    start: "2019-06-01",
    type: "point",
    className: "award-item",
    group: "awards",
    details: {
      type: "Award",
      title: "Outstanding Implementations",
      description: "Received for exceptional work on the Merck Project implementation"
    }
  },
  {
    id: 11,
    content: "Award",
    title: "Outstanding Implementations - 3M Project",
    start: "2020-06-01",
    type: "point",
    className: "award-item",
    group: "awards",
    details: {
      type: "Award",
      title: "Outstanding Implementations",
      description: "Received for exceptional work on the 3M Project implementation"
    }
  },
  {
    id: 12,
    content: "Award",
    title: "Outstanding Contribution - JavaScript Component Library",
    start: "2020-03-01",
    type: "point",
    className: "award-item",
    group: "awards",
    details: {
      type: "Award",
      title: "Outstanding Contribution",
      description: "Recognized for developing an organization-wide JavaScript component library that increased developer productivity"
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
  
  // Create DataSet with the timeline items and groups
  const items = new DataSet(timelineData);
  const groups = new DataSet(timelineGroups);
  
  // Timeline options
  const options = {
    height: '100%',
    min: new Date(2015, 0, 1),
    max: new Date(2025, 0, 1),
    zoomMin: 1000 * 60 * 60 * 24 * 30, // One month in milliseconds
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 10, // Ten years in milliseconds
    stack: false, // Don't stack items in the same group (we'll control that through templates)
    showCurrentTime: false,
    verticalScroll: true,
    horizontalScroll: true,
    zoomKey: 'ctrlKey',
    orientation: {
      axis: 'top',
      item: 'top'
    },
    groupOrder: 'order',
    margin: {
      item: {
        horizontal: 10,
        vertical: 8
      },
      axis: 20
    },
    groupTemplate: function(group: any) {
      return `
        <div class="group-template">
          <div class="group-label">${group.content}</div>
        </div>
      `;
    },
    template: function(item: any, element: any, data: any) {
      // Customize item template based on its class
      if (item.className.includes('award')) {
        return `
          <div class="award-template">
            <div class="award-icon">
              <i class="i-heroicons-trophy text-amber-500"></i>
            </div>
            <div class="award-title">${item.title}</div>
          </div>
        `;
      } else if (item.className.includes('project')) {
        return `
          <div class="project-template">
            <div class="project-icon">
              <i class="i-heroicons-puzzle-piece text-indigo-500"></i>
            </div>
            <div class="project-title">${item.content}</div>
          </div>
        `;
      } else {
        // Company icon placeholder based on company name
        const iconClass = getCompanyIconClass(item.content);
        return `
          <div class="position-template">
            <div class="company-icon">
              <i class="${iconClass}"></i>
            </div>
            <div class="position-content">
              <div class="company-name">${item.content}</div>
              <div class="position-title">${item.title}</div>
            </div>
          </div>
        `;
      }
    }
  };
  
  // Create the timeline
  timeline = new Timeline(
    timelineContainer.value, 
    items,
    groups,
    options
  );
  
  // Apply styling based on current theme
  updateTimelineStyling();
  
  // Handle item selection
  timeline.on('select', function(properties) {
    if (properties.items.length > 0) {
      const selectedId = properties.items[0];
      const item = timelineData.find(item => item.id === selectedId);
      if (item) {
        selectedItem.value = item;
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

// Function to get company icon placeholder class
function getCompanyIconClass(company: string): string {
  switch(company) {
    case 'HeadSpin':
      return 'i-heroicons-globe-alt text-blue-500';
    case 'Sopheon':
      return 'i-heroicons-light-bulb text-green-500';
    case 'LenderLive Network':
      return 'i-heroicons-home-modern text-purple-500';
    default:
      return 'i-heroicons-building-office text-gray-500';
  }
}

// Get icon and class for detail panel based on item type
function getItemIconClass(item: TimelineItem): { icon: string, bgClass: string, textClass: string } {
  if (item.details.type === 'Award') {
    return {
      icon: 'i-heroicons-trophy',
      bgClass: 'bg-amber-100 dark:bg-amber-900',
      textClass: 'text-amber-600 dark:text-amber-400'
    };
  } else if (item.details.type === 'Project') {
    return {
      icon: 'i-heroicons-puzzle-piece',
      bgClass: 'bg-indigo-100 dark:bg-indigo-900',
      textClass: 'text-indigo-600 dark:text-indigo-400'
    };
  } else {
    return {
      icon: 'i-heroicons-briefcase',
      bgClass: 'bg-blue-100 dark:bg-blue-900',
      textClass: 'text-blue-600 dark:text-blue-400'
    };
  }
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
    container.style.setProperty('--timeline-project-background', '#4f46e5');
    container.style.setProperty('--timeline-group-background', '#111827');
    container.style.setProperty('--timeline-tooltip-background', '#1f2937');
  } else {
    container.style.setProperty('--timeline-background', '#ffffff');
    container.style.setProperty('--timeline-foreground', '#1f2937');
    container.style.setProperty('--timeline-border', '#e5e7eb');
    container.style.setProperty('--timeline-item-background', '#93c5fd');
    container.style.setProperty('--timeline-award-background', '#fcd34d');
    container.style.setProperty('--timeline-project-background', '#a5b4fc');
    container.style.setProperty('--timeline-group-background', '#f3f4f6');
    container.style.setProperty('--timeline-tooltip-background', '#ffffff');
  }
  
  // Force redraw to apply new styles
  timeline.redraw();
}

// Zoom control functions
function zoomIn() {
  if (timeline) {
    const currentRange = timeline.getWindow();
    const start = new Date(currentRange.start.valueOf());
    const end = new Date(currentRange.end.valueOf());
    
    const interval = end.valueOf() - start.valueOf();
    const newInterval = interval * 0.7; // Zoom in by 30%
    
    const center = (start.valueOf() + end.valueOf()) / 2;
    const newStart = new Date(center - newInterval / 2);
    const newEnd = new Date(center + newInterval / 2);
    
    timeline.setWindow(newStart, newEnd);
  }
}

function zoomOut() {
  if (timeline) {
    const currentRange = timeline.getWindow();
    const start = new Date(currentRange.start.valueOf());
    const end = new Date(currentRange.end.valueOf());
    
    const interval = end.valueOf() - start.valueOf();
    const newInterval = interval * 1.3; // Zoom out by 30%
    
    const center = (start.valueOf() + end.valueOf()) / 2;
    const newStart = new Date(center - newInterval / 2);
    const newEnd = new Date(center + newInterval / 2);
    
    timeline.setWindow(newStart, newEnd);
  }
}

function resetZoom() {
  if (timeline) {
    timeline.setWindow(new Date(2015, 0, 1), new Date(2025, 0, 1));
  }
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
  --timeline-project-background: v-bind(isDarkMode ? '#4f46e5' : '#a5b4fc');
  --timeline-group-background: v-bind(isDarkMode ? '#111827' : '#f3f4f6');
  --timeline-tooltip-background: v-bind(isDarkMode ? '#1f2937' : '#ffffff');
}

/* Override vis-timeline styles to match project theme */
:deep(.vis-timeline) {
  border-color: var(--timeline-border);
  background-color: var(--timeline-background);
  color: var(--timeline-foreground);
  font-family: inherit;
}

:deep(.vis-panel) {
  border-color: var(--timeline-border);
}

:deep(.vis-time-axis .vis-text),
:deep(.vis-time-axis .vis-grid) {
  color: var(--timeline-foreground);
}

:deep(.vis-group) {
  background-color: var(--timeline-group-background);
  border-color: var(--timeline-border);
}

:deep(.group-template) {
  padding: 6px 10px;
  font-weight: 600;
  border-right: 1px solid var(--timeline-border);
}

:deep(.vis-item) {
  border-radius: 0.375rem;
  border-width: 1px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

:deep(.vis-item.vis-selected) {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
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
  border-color: rgba(0, 0, 0, 0.2);
}

/* Position items (jobs) */
:deep(.vis-item.headspin-item) {
  border-left: 4px solid #3b82f6;
  background-color: rgba(59, 130, 246, 0.2);
}

:deep(.vis-item.sopheon-engineer-item),
:deep(.vis-item.sopheon-consultant-item) {
  border-left: 4px solid #10b981;
  background-color: rgba(16, 185, 129, 0.2);
}

:deep(.vis-item.lenderlive-item) {
  border-left: 4px solid #8b5cf6;
  background-color: rgba(139, 92, 246, 0.2);
}

/* Project items */
:deep(.vis-item.project-item) {
  background-color: var(--timeline-project-background);
  opacity: 0.85;
  padding: 5px 10px;
}

:deep(.vis-item.headspin-project) {
  border-left: 4px solid #3b82f6;
}

:deep(.vis-item.sopheon-project) {
  border-left: 4px solid #10b981;
}

:deep(.vis-item.lenderlive-project) {
  border-left: 4px solid #8b5cf6;
}

/* Award items */
:deep(.vis-item.award-item) {
  cursor: pointer;
  color: #000;
  font-weight: 500;
}

/* Custom templates */
:deep(.position-template) {
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.company-icon) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

:deep(.position-content) {
  display: flex;
  flex-direction: column;
}

:deep(.company-name) {
  font-weight: 600;
  margin-bottom: 2px;
}

:deep(.position-title) {
  font-size: 0.75rem;
  opacity: 0.8;
}

:deep(.project-template) {
  display: flex;
  align-items: center;
  gap: 6px;
}

:deep(.project-icon) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

:deep(.project-title) {
  font-weight: 500;
  font-size: 0.875rem;
}

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

:deep(.award-title) {
  font-size: 0.7rem;
  text-align: center;
  max-width: 120px;
  white-space: normal;
  word-break: break-word;
}

:deep(.vis-tooltip) {
  background-color: var(--timeline-tooltip-background);
  border-color: var(--timeline-border);
  color: var(--timeline-foreground);
  border-radius: 0.375rem;
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
