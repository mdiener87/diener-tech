interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  type: string;
  highlights: string[];
  relatedBlogSlugs?: string[]; // Optional array of blog post slugs related to this project
} 