export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  huggingfaceUrl?: string;
  types?: string[];
  type?: string;
  highlights?: string[];
  featured?: boolean;
  relatedPosts?: string[];
}

export const projectsData: Project[] = [
  {
    id: "sparknet",
    title: "SparkNet",
    description:
      "A custom training pipeline for a GPT-2 style 70m parameter language model.",
    image: "/projects/sparknet-logo.webp",
    technologies: ["Python", "PyTorch", "Transformers", "NLP"],
    githubUrl: "https://github.com/mdiener87/sparknet",
    huggingfaceUrl: "https://huggingface.co/DienerTech/sparknet-70m",
    types: ["AI/ML"],
    highlights: [
      "Built for the One Billion Token training challenge",
      "Custom training pipeline focused on efficient GPU utilization",
      "Rich evaluation suite for validating checkpoints and dataset health",
    ],
    featured: true,
    relatedPosts: ["one-billion-token-challenge", "sparking-the-future"],
  },
  {
    id: "frame-finder",
    title: "Frame Finder",
    description:
      "Locate exact frames inside videos that match an uploaded reference image using OpenCV and FFmpeg.",
    image: "/projects/frame-finder-logo.webp",
    technologies: ["Flask", "Python", "OpenCV", "FFmpeg"],
    githubUrl: "https://github.com/mdiener87/frame-finder",
    types: ["Computer Vision", "Web"],
    highlights: [
      "Accurate frame matching with perceptual hashing and template matching",
      "Async processing pipeline tuned for long-form video workloads",
      "Shareable results with timestamps and extracted still frames",
    ],
    featured: true,
    relatedPosts: ["the-artificial-intelligence-conspiracy"],
  },
  {
    id: "diener-tech",
    title: "DienerTech Personal Website",
    description:
      "My personal portfolio and blog built with Vue 3 + Nuxt, featuring a modern UI, dark mode support, and interactive components.",
    image: "/images/projects/diener-tech.webp",
    technologies: ["Vue", "Nuxt", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://diener.tech",
    githubUrl: "https://github.com/mdiener87/diener-tech",
    types: ["Web"],
    highlights: [
      "Responsive, accessibility-first design with Nuxt UI components",
      "Content-driven blog powered by Nuxt Content and custom MDX features",
      "Custom visual flourishes including animated skill trees and gradients",
    ],
    featured: true,
    relatedPosts: ["ship-of-theseus"],
  },
  {
    id: "gkeep-to-notion",
    title: "Gkeep to Notion",
    description:
      "Convert Google Keep exports into polished Markdown/HTML while running OCR and optional AI formatting for clean Notion imports.",
    technologies: ["Python", "pytesseract", "asyncio", "chatgpt"],
    image: "/images/projects/gkeep-to-notion.webp",
    githubUrl: "https://github.com/mdiener87/gkeep-to-notion",
    types: ["Automation"],
    highlights: [
      "Batch OCR with caching to avoid reprocessing large note sets",
      "Parallelized processing pipeline with asyncio for quick runs",
      "Optional ChatGPT formatting for refined Markdown exports",
    ],
    relatedPosts: ["return-of-the-notes", "dungeons-and-records"],
  },
];
