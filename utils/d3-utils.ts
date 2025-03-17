import * as d3 from "d3";
import type { SkillNode, TreeNode } from "~/types/skills";

// Helper function to project x,y coordinates from radial to cartesian
export function project(x: number, y: number): [number, number] {
  const angle = x - Math.PI / 2;
  return [Math.cos(angle) * y, Math.sin(angle) * y];
}

// Helper function to get link color based on color mode
export function getLinkColor(isDarkMode: boolean): string {
  return isDarkMode ? "#9CA3AF" : "#6B7280"; // Gray-400 in dark mode, Gray-500 in light mode
}

// Helper function to get text color based on color mode
export function getTextColor(isDarkMode: boolean): string {
  return isDarkMode ? "#D1D5DB" : "#4B5563"; // Gray-300 in dark mode (lighter), Gray-600 in light mode
}

// Helper function to get node color based on category and depth
export function getNodeColor(data: SkillNode, node: d3.HierarchyNode<SkillNode>): string {
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

// Helper functions for type-safe tree operations
export function applyNodeChildren(node: TreeNode, children: TreeNode[] | null) {
  (node as any).children = children;
  return node;
}

export function storeNodeChildren(node: TreeNode): void {
  (node as any)._children = (node as any).children;
}

export function hideNodeChildren(node: TreeNode): void {
  if (node.depth > 0) {
    (node as any).children = null;
  }
}

export function toggleNodeChildren(node: TreeNode): void {
  (node as any).children = (node as any).children ? null : (node as any)._children || null;
}

export function restoreNodeChildren(node: TreeNode): void {
  (node as any).children = (node as any)._children;
} 