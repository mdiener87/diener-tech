<template>
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
        :class="[isInfoPanelExpanded ? 'max-h-[300px] p-4' : 'max-h-0 p-0']"
      >
        <div ref="infoPanelContent" class="w-64 min-h-[100px]">
          <h3 class="text-sm font-semibold mb-2">Hover over nodes to see details</h3>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Click nodes to expand/collapse branches
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import * as d3 from "d3";
import { skillsData } from "~/types/skills";
import type { SkillNode, TreeNode } from "~/types/skills";
import { 
  getNodeColor, 
  project, 
  storeNodeChildren, 
  hideNodeChildren, 
  toggleNodeChildren, 
  restoreNodeChildren,
  getLinkColor,
  getTextColor
} from "~/utils/d3-utils";

// References for D3 visualizations
const skillsTreeRef = ref<HTMLElement>();
const infoPanel = ref<HTMLElement>();
const isInfoPanelExpanded = ref(true);
const infoPanelContent = ref<HTMLElement>();

// Get color mode from Nuxt
const colorMode = useColorMode();
const isDarkMode = computed(() => colorMode.value === 'dark');

// Initialize D3 visualization on mount
onMounted(() => {
  const handleResize = () => {
    if (skillsTreeRef.value) {
      initializeSkillsTree();
    }
  };

  window.addEventListener("resize", handleResize);
  initializeSkillsTree();

  // Watch for color mode changes to update the visualization
  watch(() => colorMode.value, () => {
    initializeSkillsTree();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
});

// Initialize D3 visualization
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
    const node = d as TreeNode;
    storeNodeChildren(node);
    hideNodeChildren(node);
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
      .attr("stroke", getLinkColor(isDarkMode.value))
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
      .attr("stroke", getLinkColor(isDarkMode.value))
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
        toggleNodeChildren(d);
        update(d);
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
      .attr("class", "node-text")
      .attr("fill", getTextColor(isDarkMode.value))
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
      
    nodeUpdate
      .select("text")
      .attr("fill", getTextColor(isDarkMode.value));

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
      const node = d as TreeNode;
      restoreNodeChildren(node);
    });

    update(root);

    setTimeout(() => expandLevel(depth + 1), 1000);
  }

  // Start expansion animation after a short delay
  setTimeout(() => expandLevel(1), 500);

  // Information panel functions
  let hideTimeout: NodeJS.Timeout | null = null;

  function showNodeInfo(d: d3.HierarchyNode<SkillNode>) {
    if (!d.data.name || !infoPanelContent.value) return;
    
    if (!isInfoPanelExpanded.value) {
      return;
    }
    
    if (hideTimeout) {
      clearTimeout(hideTimeout);
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

    if (d.data.description) {
      content += `
        <ul class="mt-2 list-disc pl-4">
          ${d.data.description.map(desc => `<li class="text-sm text-gray-600 dark:text-gray-400">${desc}</li>`).join('')}
        </ul>
      `;
    }

    infoPanelContent.value.innerHTML = content;
  }


  function hideNodeInfo() {
    if (!infoPanelContent.value) return;

    // Clear any existing timeout
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }

    // Set new timeout to hide info after 7 seconds
    hideTimeout = setTimeout(() => {
      if (!infoPanelContent.value) return;

      // Add fade out class
      const content = infoPanelContent.value;
      content.style.opacity = '0';
      content.style.transition = 'opacity 0.3s ease';

      // After fade, update content and fade back in
      setTimeout(() => {
        content.innerHTML = `
          <h3 class="text-sm font-semibold mb-2">Hover over nodes to see details</h3>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Click nodes to expand/collapse branches
          </div>
        `;
        content.style.opacity = '1';
      }, 300);

    }, 1500);
  }
}
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

.node-text {
  font-size: 0.875rem;
}
</style> 