<template>
  <div class="relative">
    <div ref="skillsTreeRef" class="skillsTreeRef w-full h-[800px] overflow-hidden">
      <!-- D3 visualization will be rendered here -->
      <div class="hidden sm:block absolute top-2 left-0 right-0 text-center text-sm text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 py-1 mx-auto w-max px-3 rounded-full z-10 pointer-events-none">
        Use scroll wheel to zoom, drag to pan
      </div>
    </div>
    <!-- Info Panel -->
    <div
      ref="infoPanel"
      class="absolute top-2 right-2 sm:top-0 sm:right-0 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 max-w-[250px] sm:max-w-none z-20"
    >
      <button
        class="w-full p-3 sm:p-4 flex items-center justify-between font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-t-lg"
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
        <div ref="infoPanelContent" class="sm:w-64 min-h-[100px]">
          <h3 class="text-sm font-semibold mb-2">
            Hover over nodes to see details
          </h3>
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
  getTextColor,
} from "~/utils/d3-utils";

// References for D3 visualizations
const skillsTreeRef = ref<HTMLElement>();
const infoPanel = ref<HTMLElement>();
const isInfoPanelExpanded = ref(true);
const infoPanelContent = ref<HTMLElement>();

// Get color mode from Nuxt
const colorMode = useColorMode();
const isDarkMode = computed(() => colorMode.value === "dark");

// Initialize D3 visualization on mount
onMounted(() => {
  const handleResize = () => {
    if (skillsTreeRef.value) {
      initializeSkillsTree();
    }
  };

  // Debounce resize handler to prevent excessive updates
  const debouncedResize = debounce(handleResize, 250);
  window.addEventListener("resize", debouncedResize);
  
  // Initial setup
  initializeSkillsTree();

  // Watch for color mode changes to update colors only
  watch(
    () => colorMode.value,
    () => {
      updateVisualizationColors();
    }
  );

  onUnmounted(() => {
    window.removeEventListener("resize", debouncedResize);
    // Clean up D3 elements
    if (skillsTreeRef.value) {
      d3.select(skillsTreeRef.value).selectAll("*").remove();
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

// Update only colors without reinitializing the entire visualization
function updateVisualizationColors() {
  if (!skillsTreeRef.value) return;

  const svg = d3.select(skillsTreeRef.value).select("svg");
  
  // Update link colors
  svg.selectAll("path.link")
    .transition()
    .duration(250)
    .attr("stroke", getLinkColor(isDarkMode.value));

  // Update node colors
  svg.selectAll("circle")
    .transition()
    .duration(250)
    .attr("fill", (d: any) => getNodeColor(d.data, d));

  // Update text colors
  svg.selectAll(".node-text")
    .transition()
    .duration(250)
    .attr("fill", getTextColor(isDarkMode.value));
}

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

  // Create the tree layout with a larger radius to allow meaningful zoom
  const baseRadius = Math.min(width, height) / 2 - 100;
  const enhancedRadius = baseRadius * 1.5; // Increase the layout radius to spread nodes more
  
  const tree = d3
    .tree<SkillNode>()
    .size([2 * Math.PI, enhancedRadius])
    .separation((a, b) => (a.parent === b.parent ? 1.2 : 2.4) / a.depth);

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
    .style("overflow", "hidden");

  // Create SVG element
  const svgElement = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");
    
  // Create a group for the entire visualization that will be transformed by zoom
  // Create a group that will handle all the visualization
  // Don't apply any initial transform since the zoom will handle this
  const svg = svgElement
    .append("g");
    
  // Define a larger radius for zooming
  const zoomableRadius = Math.min(width, height) * 0.7;
  
  // Add zoom behavior
  const zoom = d3.zoom()
    .scaleExtent([0.3, 3]) // Min and max zoom scale - expanded range for mobile
    .on("zoom", (event) => {
      // Use transform to adjust the view according to zoom and pan
      svg.attr("transform", event.transform);
    });
    
  // Apply zoom behavior to the SVG element
  svgElement
    .call(zoom as any)
    .on("dblclick.zoom", null) // Disable double-click zoom to prevent conflict with node clicking
    .call(zoom.transform as any, d3.zoomIdentity.translate(width / 2, height / 2));
  
  // Add zoom controls
  const zoomControls = container
    .append("div")
    .attr("class", "zoom-controls absolute bottom-4 right-4 flex gap-2 z-20");
    
  zoomControls
    .append("button")
    .attr("class", "zoom-in bg-white dark:bg-gray-800 p-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700")
    .attr("aria-label", "Zoom in")
    .html('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>')
    .on("click", () => {
      // Calculate the center point of the viewport
      const centerX = width / 2;
      const centerY = height / 2;
      // Zoom in at the center point
      svgElement.transition().duration(300).call(
        zoom.scaleBy as any, 
        1.4, 
        [centerX, centerY]
      );
    });
    
  zoomControls
    .append("button")
    .attr("class", "zoom-out bg-white dark:bg-gray-800 p-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700")
    .attr("aria-label", "Zoom out")
    .html('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>')
    .on("click", () => {
      // Calculate the center point of the viewport
      const centerX = width / 2;
      const centerY = height / 2;
      // Zoom out from the center point
      svgElement.transition().duration(300).call(
        zoom.scaleBy as any, 
        0.7, 
        [centerX, centerY]
      );
    });
    
  zoomControls
    .append("button")
    .attr("class", "zoom-reset bg-white dark:bg-gray-800 p-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700")
    .attr("aria-label", "Reset zoom")
    .html('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path></svg>')
    .on("click", () => {
      // Reset to the initial transform with the proper scale for this device
      let scale = 0.9; // Default desktop
      if (width < 640) scale = 0.5; // Mobile
      else if (width < 768) scale = 0.7; // Tablet
      
      svgElement.transition().duration(300).call(
        zoom.transform as any, 
        d3.zoomIdentity.translate(width / 2, height / 2).scale(scale)
      );
    });
    
  // Set initial zoom level based on screen size
  const initialTransform = d3.zoomIdentity.translate(width / 2, height / 2);
  
  if (width < 640) { // Mobile devices
    setTimeout(() => {
      svgElement.call(zoom.transform as any, initialTransform.scale(0.5));
    }, 500);
  } else if (width < 768) { // Tablet devices
    setTimeout(() => {
      svgElement.call(zoom.transform as any, initialTransform.scale(0.7));
    }, 500);
  } else { // Desktop
    setTimeout(() => {
      svgElement.call(zoom.transform as any, initialTransform.scale(0.9));
    }, 500);
  }
  
  // Helper function to handle touch events for mobile
  function enableTouchZoomPan() {
    let touchCount = 0;
    let touchDistance = 0;
    let initialScale = 1;
    let touchCenter = [0, 0];
    
    svgElement
      .on("touchstart", (event) => {
        touchCount = event.touches.length;
        if (touchCount === 2) {
          // Calculate initial distance between two touch points
          const touch1 = event.touches[0];
          const touch2 = event.touches[1];
          
          // Calculate the center point of the two touches
          touchCenter = [
            (touch1.clientX + touch2.clientX) / 2,
            (touch1.clientY + touch2.clientY) / 2
          ];
          
          touchDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
          initialScale = d3.zoomTransform(svgElement.node() as any).k;
          
          // Prevent default to disable page scrolling during pinch-zoom
          event.preventDefault();
        }
      })
      .on("touchmove", (event) => {
        if (touchCount === 2) {
          // Prevent default to disable page scrolling
          event.preventDefault();
          
          // Calculate new distance and scale
          const touch1 = event.touches[0];
          const touch2 = event.touches[1];
          
          // Update the center point
          const newTouchCenter = [
            (touch1.clientX + touch2.clientX) / 2,
            (touch1.clientY + touch2.clientY) / 2
          ];
          
          const newDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
          const scaleFactor = newDistance / touchDistance;
          
          // Apply new scale centered at the touch point
          const newScale = initialScale * scaleFactor;
          if (newScale >= 0.3 && newScale <= 3) {
            svgElement.call(zoom.scaleTo as any, newScale, newTouchCenter);
          }
        }
      });
  }
  
  // Enable enhanced touch handling
  enableTouchZoomPan();

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
      .attr("stroke-width", 2) // Thicker links for better visibility
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
        return angle > Math.PI / 2 || angle < -Math.PI / 2 ? -12 : 12; // Increase text offset from node
      })
      .attr("text-anchor", (d: any) => {
        const angle = d.x - Math.PI / 2;
        return angle > Math.PI / 2 || angle < -Math.PI / 2 ? "end" : "start";
      })
      .attr("class", "node-text font-medium") // Add font-medium for better readability
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
      .attr("r", (d) => (d.data.experience ? 8 : 10)) // Larger circles for better visibility
      .attr("fill", (d) => getNodeColor(d.data, d));

    nodeUpdate.select("text").attr("fill", getTextColor(isDarkMode.value));

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
        <p class="text-sm text-gray-600 dark:text-gray-400">Experience: ${
          d.data.experience
        }</p>
        ${
          d.data.years
            ? `<p class="text-sm text-gray-600 dark:text-gray-400">Years: ${d.data.years}</p>`
            : ""
        }
        ${
          d.data.notes
            ? `<p class="text-sm text-gray-600 dark:text-gray-400 mt-2">${d.data.notes}</p>`
            : ""
        }
      `;
    }

    if (d.data.position) {
      content += `
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1"><i>${d.data.position}</i></p>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">${d.data.duration}</p>`;
    }

    if (d.data.description) {
      content += `
        <ul class="mt-2 list-disc pl-4">
          ${d.data.description
            .map(
              (desc) =>
                `<li class="text-sm text-gray-600 dark:text-gray-400">${desc}</li>`
            )
            .join("")}
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
      content.style.opacity = "0";
      content.style.transition = "opacity 0.3s ease";

      // After fade, update content and fade back in
      setTimeout(() => {
        content.innerHTML = `
          <h3 class="text-sm font-semibold mb-2">Hover over nodes to see details</h3>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Click nodes to expand/collapse branches
          </div>
        `;
        content.style.opacity = "1";
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
  font-size: 0.9rem;
  text-shadow: 0 0 3px rgba(255, 255, 255, 0.7), 0 0 3px rgba(255, 255, 255, 0.7); /* Add text shadow for better readability */
}

.dark .node-text {
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.7), 0 0 3px rgba(0, 0, 0, 0.7); /* Darker shadow for dark mode */
}

/* Zoom controls styling */
.zoom-controls button {
  @apply text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;
}

.zoom-controls button:focus {
  @apply outline-none ring-2 ring-primary ring-opacity-50;
}

/* Add helper text for mobile */
@media (max-width: 640px) {
  .skillsTreeRef::before {
    content: "Pinch to zoom and drag to pan";
    @apply absolute top-2 left-0 right-0 text-center text-sm text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 py-1 mx-auto w-max px-3 rounded-full z-10;
  }
}
</style>
