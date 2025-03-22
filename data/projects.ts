export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  type: string;
  highlights: string[];
  relatedBlogSlugs?: string[];
}

export const featuredProjects: Project[] = [
  {
    id: 1,
    title: "DienerTech Personal Website",
    description: "My personal portfolio and blog built with Vue 3 + Nuxt, featuring a modern UI, dark mode support, and interactive components.",
    image: "/projects/dienertech.webp",
    technologies: ["Vue", "Nuxt", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://diener.tech",
    githubUrl: "https://github.com/mdiener87/diener-tech",
    type: "Web",
    highlights: [
      "Responsive design optimized for all devices",
      "Dark mode support with smooth transitions",
      "Interactive components with animations",
      "Content management system for blog posts"
    ]
  },
  {
    id: 2,
    title: "Task Management Dashboard",
    description: "A comprehensive task management application with team collaboration features, real-time updates, and customizable workflows.",
    image: "/images/default-social.svg",
    technologies: ["Vue", "Node.js", "MongoDB", "WebSockets"],
    type: "Web",
    highlights: [
      "Real-time collaboration with WebSockets",
      "Drag-and-drop task organization",
      "Role-based user permissions",
      "Custom workflow creation"
    ]
  },
  // Add more projects as needed
];

export const otherProjects: Project[] = [
  // Add more projects here
]; 