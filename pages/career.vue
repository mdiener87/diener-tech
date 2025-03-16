<template>
  <div class="container mx-auto py-10 px-6">
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">Career Journey</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Explore my professional journey, skills, and achievements through
        interactive visualizations
      </p>
    </div>

    <!-- Skills Tree Visualization -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
      <h2 class="text-2xl font-semibold mb-6">Skills & Experience</h2>
      <div class="relative">
        <div ref="skillsTreeRef" class="w-full h-[800px] overflow-hidden">
          <!-- D3 visualization will be rendered here -->
        </div>
        <!-- Info Panel -->
        <div
          ref="infoPanel"
          class="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        >
          <button
            class="w-full p-4 flex items-center justify-between font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-t-lg"
            @click="isInfoPanelExpanded = !isInfoPanelExpanded"
          >
            <span>Node Details</span>
            <span
              class="transform transition-transform duration-200"
              :class="{ 'rotate-180': !isInfoPanelExpanded }"
            >
              ▼
            </span>
          </button>
          <div
            class="overflow-hidden transition-[max-height,padding] duration-200 ease-in-out"
            :class="[
              isInfoPanelExpanded ? 'max-h-[300px] p-4' : 'max-h-0 p-0'
            ]"
          >
            <div
              ref="infoPanelContent"
              class="w-64 min-h-[100px]"
            >
              <h3 class="text-sm font-semibold mb-2">Hover over nodes to see details</h3>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Click nodes to expand/collapse branches
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from "vue";
import * as d3 from "d3";

// References for D3 visualizations
const skillsTreeRef = ref<HTMLElement>();
const infoPanel = ref<HTMLElement>();
const isInfoPanelExpanded = ref(true);
const infoPanelContent = ref<HTMLElement>();

// Skills data structure
interface SkillNode {
  name: string;
  children?: SkillNode[];
  experience?: string;
  years?: number;
  position?: string;
  duration?: string;
  achievements?: string[];
  notes?: string;
}

interface ExtendedNode {
  x0?: number;
  y0?: number;
  x?: number;
  y?: number;
  id?: string;
  _children?: d3.HierarchyNode<SkillNode>[] | null;
}

type TreeNode = d3.HierarchyNode<SkillNode> & ExtendedNode;

const skillsData: SkillNode = {
  name: "Michael Diener - Software Engineer",
  children: [
    {
      name: "Programming Languages",
      children: [
        { name: "JavaScript", experience: "Expert", years: 10 },
        { name: "TypeScript", experience: "Advanced", years: 5 },
        { name: "Python", experience: "Intermediate" },
        { name: "C#", experience: "Intermediate" },
        { name: "SQL", experience: "Intermediate" },
      ],
    },
    {
      name: "Frameworks & Libraries",
      children: [
        {
          name: "Vue 3",
          experience: "Advanced",
          notes: "Custom Component Library",
        },
        { name: "AngularJS", experience: "Advanced" },
        { name: "Nuxt.js", experience: "Advanced" },
        { name: "NodeJS", experience: "Advanced" },
        { name: "TypeScript", experience: "Advanced" },
      ],
    },
    {
      name: "Tools & Platforms",
      children: [
        { name: "Docker", experience: "Advanced" },
        { name: "Visual Studio & VS Code", experience: "Expert" },
        { name: "SQL Server", experience: "Intermediate" },
        { name: "Git & GitHub", experience: "Advanced" },
        { name: "AWS/Vercel Hosting", experience: "Advanced" },
        { name: "Firebase", experience: "Intermediate" },
        { name: "Unity", experience: "Intermediate" },
      ],
    },
    {
      name: "Professional Experience",
      children: [
        {
          name: "HeadSpin",
          position: "Software Engineer",
          duration: "Nov 2022 - Present",
          achievements: [
            "Developed Vue Component Library",
            "Optimized front-end performance",
            "Migrated from Vue 2 to Vue 3",
          ],
        },
        {
          name: "Sopheon",
          position: "Senior Technical Consultant",
          duration: "Nov 2021 - Nov 2022",
          achievements: [
            "Built JavaScript Component Library",
            "Led technical implementations",
            "Created C# plugins and SQL scripts",
          ],
        },
      ],
    },
    {
      name: "Achievements & Awards",
      children: [
        {
          name: "Outstanding Contribution",
          children: [{ name: "JavaScript Component Library (Sopheon)" }],
        },
        {
          name: "Outstanding Implementation",
          children: [
            { name: "Merck Project (Sopheon)" },
            { name: "3M Project (Sopheon)" },
          ],
        },
      ],
    },
  ],
};

// Initialize D3 visualization
onMounted(() => {
  initializeSkillsTree();
});

// Watch for color mode changes to update visualization
const colorMode = useColorMode();
watch(
  () => colorMode.value,
  () => {
    initializeSkillsTree();
  }
);

function initializeSkillsTree() {
  if (!skillsTreeRef.value) return;

  // Clear previous visualization
  d3.select(skillsTreeRef.value as Element)
    .selectAll("*")
    .remove();

  const width = skillsTreeRef.value.clientWidth;
  const height = skillsTreeRef.value.clientHeight;
  const radius = Math.min(width, height) / 2 - 100;

  // Create the tree layout
  const tree = d3
    .tree<SkillNode>()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

  // Create the root hierarchy and collapse all nodes initially
  const root = d3.hierarchy(skillsData) as TreeNode;
  let i = 0; // Counter for generating unique IDs

  root.descendants().forEach((d) => {
    const node = d as TreeNode & { children: TreeNode[] | null };
    node._children = node.children;
    if (d.depth > 0) {
      node.children = null;
    }
    node.id = `node-${i++}`;
  });

  // Create SVG with overflow handling
  const container = d3
    .select(skillsTreeRef.value as Element)
    .style("position", "relative")
    .style("overflow-x", "hidden");

  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  // Create tooltip container
  const infoPanel = container.select(".absolute");

  // Function to update the visualization
  function update(source: TreeNode) {
    const duration = 750;
    const nodes = root.descendants();
    const links = root.links();

    // Compute the new tree layout
    tree(root);

    // Update links
    const link = svg
      .selectAll("path.link")
      .data(links, (d: any) => d.target.id);

    // Enter new links
    const linkEnter = link
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", colorMode.value === "dark" ? "#4B5563" : "#D1D5DB")
      .attr("stroke-width", 1.5)
      .attr("d", (d) => {
        const o = { x: source.x0 ?? Math.PI, y: source.y0 ?? 0 };
        return d3
          .linkRadial<any, any>()
          .angle((d: any) => d.x)
          .radius((d: any) => d.y)({ source: o, target: o });
      });

    // Update existing links
    link
      .merge(linkEnter as any)
      .transition()
      .duration(duration)
      .attr(
        "d",
        d3
          .linkRadial<any, any>()
          .angle((d: any) => d.x)
          .radius((d: any) => d.y)
      );

    // Remove old links
    link
      .exit()
      .transition()
      .duration(duration)
      .attr("d", (d) => {
        const o = { x: source.x ?? Math.PI, y: source.y ?? 0 };
        return d3
          .linkRadial<any, any>()
          .angle((d: any) => d.x)
          .radius((d: any) => d.y)({ source: o, target: o });
      })
      .remove();

    // Update nodes
    const node = svg.selectAll("g.node").data(nodes, (d: any) => d.id);

    // Enter new nodes
    const nodeEnter = node
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("cursor", "pointer")
      .attr(
        "transform",
        () =>
          `translate(${project(
            (source as any).x0 || 0,
            (source as any).y0 || 0
          )})`
      )
      .style("opacity", 0)
      .on("click", (event, d: TreeNode) => {
        const node = d as TreeNode & { children: TreeNode[] | null };
        node.children = node.children ? null : node._children || null;
        update(node);
      });

    // Add node circles
    nodeEnter
      .append("circle")
      .attr("r", 0)
      .attr("fill", (d) => getNodeColor(d.data, d))
      .attr("class", "transition-colors duration-200");

    // Add node labels
    nodeEnter
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d: any) => {
        const angle = d.x - Math.PI / 2;
        return angle > Math.PI / 2 || angle < -Math.PI / 2 ? -8 : 8;
      })
      .attr("text-anchor", (d: any) => {
        const angle = d.x - Math.PI / 2;
        return angle > Math.PI / 2 || angle < -Math.PI / 2 ? "end" : "start";
      })
      .attr("class", "text-sm fill-gray-900 dark:fill-gray-100")
      .text((d) => d.data.name);

    // Update existing nodes
    const nodeUpdate = node
      .merge(nodeEnter as any)
      .transition()
      .duration(duration)
      .attr("transform", (d: any) => `translate(${project(d.x, d.y)})`)
      .style("opacity", 1);

    nodeUpdate
      .select("circle")
      .attr("r", (d) => (d.data.experience ? 6 : 8))
      .attr("fill", (d) => getNodeColor(d.data, d));

    // Remove old nodes
    const nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr(
        "transform",
        () =>
          `translate(${project(
            (source as any).x || 0,
            (source as any).y || 0
          )})`
      )
      .style("opacity", 0)
      .remove();

    nodeExit.select("circle").attr("r", 0);

    // Store positions for next transition
    nodes.forEach((d: any) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Update hover handlers
    svg
      .selectAll("g.node")
      .on("mouseover", function (event, d: any) {
        showNodeInfo(d as d3.HierarchyNode<SkillNode>);
      })
      .on("mouseout", hideNodeInfo);
  }

  // Initialize positions and start animation
  (root as any).x0 = Math.PI;
  (root as any).y0 = 0;

  // Start with only the root node visible
  update(root);

  // Expand nodes one level at a time
  function expandLevel(depth: number) {
    if (depth > 3) return; // Max depth to expand

    const toExpand = root
      .descendants()
      .filter((d) => d.depth === depth - 1 && (d as TreeNode)._children);

    if (toExpand.length === 0) return;

    toExpand.forEach((d) => {
      const node = d as TreeNode & { children: TreeNode[] | null };
      node.children = node._children;
    });

    update(root);

    setTimeout(() => expandLevel(depth + 1), 1000);
  }

  // Start expansion animation after a short delay
  setTimeout(() => expandLevel(1), 500);

  // Helper function to project coordinates
  function project(x: number, y: number): [number, number] {
    const angle = x - Math.PI / 2;
    return [Math.cos(angle) * y, Math.sin(angle) * y];
  }

  // Helper function to get node color based on category and depth
  function getNodeColor(data: SkillNode, node: d3.HierarchyNode<SkillNode>): string {
    // Root node
    if (node.depth === 0) {
      return "rgb(107 114 128)"; // gray-500
    }

    // Get the top-level parent for category color
    let topParent = node;
    while (topParent.parent && topParent.parent.depth > 0) {
      topParent = topParent.parent;
    }

    // Get base color by category
    const categoryColors: { [key: string]: string[] } = {
      "Programming Languages": [
        "rgb(147 51 234)", // purple-600
        "rgb(168 85 247)", // purple-500
        "rgb(192 132 252)", // purple-400
        "rgb(216 180 254)", // purple-300
      ],
      "Frameworks & Libraries": [
        "rgb(37 99 235)", // blue-600
        "rgb(59 130 246)", // blue-500
        "rgb(96 165 250)", // blue-400
        "rgb(147 197 253)", // blue-300
      ],
      "Tools & Platforms": [
        "rgb(5 150 105)", // emerald-600
        "rgb(16 185 129)", // emerald-500
        "rgb(52 211 153)", // emerald-400
        "rgb(110 231 183)", // emerald-300
      ],
      "Professional Experience": [
        "rgb(217 70 239)", // fuchsia-600
        "rgb(232 121 249)", // fuchsia-500
        "rgb(240 171 252)", // fuchsia-400
        "rgb(245 208 254)", // fuchsia-300
      ],
      "Achievements & Awards": [
        "rgb(234 88 12)", // orange-600
        "rgb(249 115 22)", // orange-500
        "rgb(251 146 60)", // orange-400
        "rgb(253 186 116)", // orange-300
      ],
    };

    const colors = categoryColors[topParent.data.name] || [
      "rgb(107 114 128)", // gray-600
      "rgb(156 163 175)", // gray-500
      "rgb(209 213 219)", // gray-400
      "rgb(229 231 235)", // gray-300
    ];

    // Use different shades based on depth
    const depthIndex = Math.min(node.depth - 1, colors.length - 1);
    return colors[depthIndex];
  }

  // Replace tooltip functions with info panel functions
  function showNodeInfo(d: d3.HierarchyNode<SkillNode>) {
    if (!d.data.name || !infoPanelContent.value) return;
    
    if (!isInfoPanelExpanded.value) {
      return;
    }

    let content = `<h3 class="text-sm font-semibold mb-2">${d.data.name}</h3>`;

    if (d.data.experience) {
      content += `
        <p class="text-sm text-gray-600 dark:text-gray-400">Experience: ${d.data.experience}</p>
        ${d.data.years ? `<p class="text-sm text-gray-600 dark:text-gray-400">Years: ${d.data.years}</p>` : ''}
        ${d.data.notes ? `<p class="text-sm text-gray-600 dark:text-gray-400 mt-2">${d.data.notes}</p>` : ''}
      `;
    } else if (d.data.position) {
      content += `
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">${d.data.position} (${d.data.duration})</p>
        ${d.data.achievements ? `
          <div class="mt-2">
            ${d.data.achievements.map(a => `
              <p class="text-sm text-gray-600 dark:text-gray-400 ml-2 before:content-['•'] before:mr-2">${a}</p>
            `).join('')}
          </div>
        ` : ''}
      `;
    }

    infoPanelContent.value.innerHTML = content;
  }

  function hideNodeInfo() {
    if (!infoPanelContent.value) return;
    
    infoPanelContent.value.innerHTML = `
      <h3 class="text-sm font-semibold mb-2">Hover over nodes to see details</h3>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Click nodes to expand/collapse branches
      </div>
    `;
  }
}

// Add window resize handler
onMounted(() => {
  const handleResize = () => {
    if (skillsTreeRef.value) {
      initializeSkillsTree();
    }
  };

  window.addEventListener("resize", handleResize);
  initializeSkillsTree();

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
});
</script>

<style scoped>
.link {
  transition: stroke 0.2s ease;
}

.node circle {
  transition: fill 0.2s ease, r 0.2s ease;
}

.node:hover circle {
  r: 8;
}
</style>
