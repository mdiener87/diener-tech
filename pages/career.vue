<template>
  <div class="container mx-auto py-10 px-6">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold mb-4">Career Journey</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Explore my professional journey and technical expertise
        </p>
      </div>
      <UButton
        icon="i-heroicons-document-arrow-down"
        color="primary"
        variant="solid"
        :to="'/resume.pdf'"
        target="_blank"
      >
        Download Resume
      </UButton>
    </div>

    <!-- Interactive Timeline -->
    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">Experience Timeline</h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div ref="timelineRef" class="w-full h-[400px]"></div>
      </div>
    </div>

    <!-- Skills Distribution -->
    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">Technical Skills</h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div ref="skillsRef" class="w-full h-[500px]"></div>
      </div>
    </div>

    <!-- Key Achievements -->
    <div>
      <h2 class="text-2xl font-semibold mb-6">Key Achievements</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UCard v-for="achievement in achievements" :key="achievement.id">
          <template #header>
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-full bg-primary/10 text-primary">
                <Icon :name="achievement.icon" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-semibold">{{ achievement.title }}</h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-300">{{ achievement.description }}</p>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import * as d3 from 'd3';

// References for D3 visualizations
const timelineRef = ref<HTMLElement>();
const skillsRef = ref<HTMLElement>();

// Career timeline data
interface TimelineEvent {
  date: Date;
  company: string;
  role: string;
  description: string;
  technologies: string[];
}

interface Skill extends d3.SimulationNodeDatum {
  name: string;
  category: string;
  level: number; // 1-10
  experience: number; // Years
}

const timelineData: TimelineEvent[] = [
  {
    date: new Date('2024-01'),
    company: 'Current Company',
    role: 'Senior Software Engineer',
    description: 'Leading development of cloud-native applications and microservices architecture',
    technologies: ['Vue.js', 'Node.js', 'AWS', 'Docker', 'Kubernetes']
  },
  {
    date: new Date('2022-06'),
    company: 'Tech Solutions Inc.',
    role: 'Full Stack Developer',
    description: 'Developed and maintained enterprise web applications using modern technologies',
    technologies: ['React', 'TypeScript', 'Python', 'PostgreSQL', 'Redis']
  },
  {
    date: new Date('2020-03'),
    company: 'Digital Innovations',
    role: 'Frontend Developer',
    description: 'Built responsive web applications and improved user experience',
    technologies: ['Angular', 'JavaScript', 'SCSS', 'REST APIs']
  }
];

const skillsData: Skill[] = [
  {
    name: 'Vue.js',
    category: 'Frontend',
    level: 9,
    experience: 4
  },
  {
    name: 'React',
    category: 'Frontend',
    level: 8,
    experience: 3
  },
  {
    name: 'TypeScript',
    category: 'Languages',
    level: 9,
    experience: 4
  },
  {
    name: 'Node.js',
    category: 'Backend',
    level: 8,
    experience: 4
  },
  {
    name: 'Python',
    category: 'Languages',
    level: 7,
    experience: 3
  },
  {
    name: 'AWS',
    category: 'Cloud',
    level: 8,
    experience: 3
  },
  {
    name: 'Docker',
    category: 'DevOps',
    level: 7,
    experience: 3
  },
  {
    name: 'Kubernetes',
    category: 'DevOps',
    level: 6,
    experience: 2
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    level: 7,
    experience: 4
  },
  {
    name: 'MongoDB',
    category: 'Database',
    level: 6,
    experience: 2
  }
];

// Achievements data
const achievements = [
  {
    id: 1,
    icon: 'i-heroicons-rocket-launch',
    title: 'Cloud Migration',
    description: 'Successfully led a team of 5 engineers in migrating a monolithic application to a cloud-native microservices architecture, reducing deployment time by 70%.'
  },
  {
    id: 2,
    icon: 'i-heroicons-chart-bar',
    title: 'Performance Optimization',
    description: 'Improved application performance by 60% through implementing efficient caching strategies, code optimization, and database indexing.'
  },
  {
    id: 3,
    icon: 'i-heroicons-user-group',
    title: 'Team Leadership',
    description: 'Mentored junior developers, conducted code reviews, and established best practices that improved team productivity by 40%.'
  },
  {
    id: 4,
    icon: 'i-heroicons-light-bulb',
    title: 'Innovation Award',
    description: 'Received company innovation award for developing an automated testing framework that reduced QA time by 50%.'
  }
];

// Initialize D3 visualizations
onMounted(() => {
  initializeTimeline();
  initializeSkillsChart();
});

// Watch for color mode changes to update visualizations
const colorMode = useColorMode();
watch(() => colorMode.value, () => {
  initializeTimeline();
  initializeSkillsChart();
});

function initializeTimeline() {
  if (!timelineRef.value) return;

  // Clear previous visualization
  d3.select(timelineRef.value as Element).selectAll('*').remove();

  const width = timelineRef.value.clientWidth;
  const height = timelineRef.value.clientHeight;
  const margin = { top: 40, right: 40, bottom: 40, left: 40 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create time scale
  const timeExtent = d3.extent(timelineData, d => d.date) as [Date, Date];
  const xScale = d3.scaleTime()
    .domain(timeExtent)
    .range([0, innerWidth]);

  // Create SVG
  const svg = d3.select(timelineRef.value as Element)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Create main group and apply margins
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Add x-axis
  const xAxis = d3.axisBottom(xScale)
    .ticks(d3.timeMonth.every(6) ?? 6)
    .tickFormat((d: Date | d3.NumberValue) => {
      if (d instanceof Date) {
        return d3.timeFormat('%b %Y')(d);
      }
      return '';
    });

  g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${innerHeight})`)
    .call(xAxis as any)
    .selectAll('text')
    .attr('dy', '1em')
    .style('text-anchor', 'middle');

  // Add timeline events
  const events = g.selectAll('.timeline-event')
    .data(timelineData)
    .enter()
    .append('g')
    .attr('class', 'timeline-event')
    .attr('transform', d => `translate(${xScale(d.date)},0)`);

  // Add event circles
  events.append('circle')
    .attr('r', 8)
    .attr('cy', innerHeight)
    .attr('class', 'fill-primary');

  // Add event labels
  events.append('text')
    .attr('y', innerHeight - 20)
    .attr('text-anchor', 'middle')
    .attr('class', 'font-medium text-sm')
    .text(d => d.company);

  // Add role labels
  events.append('text')
    .attr('y', innerHeight - 40)
    .attr('text-anchor', 'middle')
    .attr('class', 'font-medium text-xs text-gray-600 dark:text-gray-400')
    .text(d => d.role);

  // Add connecting line
  g.append('line')
    .attr('x1', 0)
    .attr('x2', innerWidth)
    .attr('y1', innerHeight)
    .attr('y2', innerHeight)
    .attr('class', 'stroke-gray-300 dark:stroke-gray-700')
    .attr('stroke-width', 2);

  // Add hover interaction
  events
    .on('mouseover', function(event, d) {
      const tooltip = d3.select(timelineRef.value as Element)
        .append('div')
        .attr('class', 'absolute bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700')
        .style('left', `${event.pageX}px`)
        .style('top', `${event.pageY - 100}px`);

      tooltip.append('p')
        .attr('class', 'font-bold mb-2')
        .text(`${d.company} - ${d.role}`);

      tooltip.append('p')
        .attr('class', 'text-sm text-gray-600 dark:text-gray-400 mb-2')
        .text(d.description);

      tooltip.append('div')
        .attr('class', 'flex flex-wrap gap-2')
        .selectAll('.tech-tag')
        .data(d.technologies)
        .enter()
        .append('span')
        .attr('class', 'text-xs px-2 py-1 rounded-full bg-primary/10 text-primary')
        .text(d => d);
    })
    .on('mouseout', function() {
      d3.select(timelineRef.value as Element)
        .selectAll('.absolute')
        .remove();
    });
}

function initializeSkillsChart() {
  if (!skillsRef.value) return;

  // Clear previous visualization
  d3.select(skillsRef.value as Element).selectAll('*').remove();

  const width = skillsRef.value.clientWidth;
  const height = skillsRef.value.clientHeight;
  const margin = { top: 40, right: 40, bottom: 40, left: 40 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create SVG
  const svg = d3.select(skillsRef.value as Element)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Create force simulation
  const simulation = d3.forceSimulation<Skill>(skillsData)
    .force('x', d3.forceX<Skill>(innerWidth / 2).strength(0.1))
    .force('y', d3.forceY<Skill>(innerHeight / 2).strength(0.1))
    .force('collide', d3.forceCollide<Skill>().radius(d => Math.sqrt((d as Skill).level * 100) + 2))
    .force('charge', d3.forceManyBody<Skill>().strength(-50));

  // Create main group and apply margins
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Create color scale for categories
  const categories = Array.from(new Set(skillsData.map(d => d.category)));
  const colorScale = d3.scaleOrdinal<string>()
    .domain(categories)
    .range(d3.schemeSet3);

  // Add bubbles
  const bubbles = g.selectAll<SVGGElement, Skill>('.skill-bubble')
    .data(skillsData)
    .enter()
    .append('g')
    .attr('class', 'skill-bubble');

  bubbles.append('circle')
    .attr('r', d => Math.sqrt(d.level * 100))
    .attr('fill', d => colorScale(d.category))
    .attr('class', 'opacity-80 hover:opacity-100 transition-opacity');

  bubbles.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.3em')
    .attr('class', 'text-sm font-medium fill-gray-900 dark:fill-white')
    .text(d => d.name);

  // Add legend
  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width - margin.right - 150}, ${margin.top})`);

  categories.forEach((category, i) => {
    const legendItem = legend.append('g')
      .attr('transform', `translate(0, ${i * 25})`);

    legendItem.append('circle')
      .attr('r', 6)
      .attr('fill', colorScale(category));

    legendItem.append('text')
      .attr('x', 15)
      .attr('y', 5)
      .attr('class', 'text-sm fill-gray-900 dark:fill-white')
      .text(category);
  });

  // Update bubble positions on simulation tick
  simulation.on('tick', () => {
    bubbles.attr('transform', d => `translate(${d.x ?? 0},${d.y ?? 0})`);
  });

  // Add hover interaction
  bubbles
    .on('mouseover', function(event, d) {
      const tooltip = d3.select(skillsRef.value as Element)
        .append('div')
        .attr('class', 'absolute bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700')
        .style('left', `${event.pageX}px`)
        .style('top', `${event.pageY - 80}px`);

      tooltip.append('p')
        .attr('class', 'font-bold mb-1')
        .text(d.name);

      tooltip.append('p')
        .attr('class', 'text-sm text-gray-600 dark:text-gray-400')
        .text(`${d.experience} years experience`);

      tooltip.append('div')
        .attr('class', 'mt-2')
        .append('div')
        .attr('class', 'h-2 bg-gray-200 dark:bg-gray-700 rounded-full')
        .append('div')
        .attr('class', 'h-full bg-primary rounded-full')
        .style('width', `${d.level * 10}%`);
    })
    .on('mouseout', function() {
      d3.select(skillsRef.value as Element)
        .selectAll('.absolute')
        .remove();
    });
}
</script>

<style scoped>
/* Add any custom styles for visualizations */
:deep(svg) {
  max-width: 100%;
  height: auto;
}

:deep(.timeline-event:hover) {
  cursor: pointer;
  filter: brightness(1.1);
}

:deep(.skill-bubble:hover) {
  cursor: pointer;
  filter: brightness(1.1);
}
</style> 