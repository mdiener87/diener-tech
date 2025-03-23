import type * as d3 from "d3";

export interface SkillNode {
  name: string;
  children?: SkillNode[];
  experience?: string;
  years?: number;
  position?: string;
  duration?: string;
  notes?: string;
  description?: string[];
}

export interface ExtendedNode {
  x0?: number;
  y0?: number;
  x?: number;
  y?: number;
  id?: string;
  _children?: TreeNode[] | null;
}

export type TreeNode = d3.HierarchyNode<SkillNode> & ExtendedNode;

export const skillsData: SkillNode = {
  name: "Michael Diener - Software Engineer",
  children: [
    {
      name: "Programming Languages",
      description: [
        "I have a deep love for programming! I've been coding since I was 12 years old.",
        "Frontend, backend, and everything in between!",
      ],
      children: [
        {
          name: "JavaScript",
          experience: "Expert",
          description: [
            "Over a decade of experience building interactive web applications.",
            "I don't miss debugging Internet Explorer!",
          ],
        },
        {
          name: "TypeScript",
          experience: "Advanced",
          description: [
            "I appreciate the type safety and structure TypeScript brings to JavaScript.",
            "JsDocs blends JavaScript and TypeScript into a single language that compilers hate.",
          ],
        },
        {
          name: "Python",
          experience: "Intermediate",
          description: [
            "It's like JavaScript, but it actually makes sense.",
            "Cool scripts or an entire backend, I've done it.",
          ],
        },
        {
          name: "CSS",
          experience: "Advanced",
          description: [
            "Can anyone actually claim to be an Advanced CSS developer?",
            "I once centered a div on the first try",
          ],
        },
        {
          name: "C#",
          experience: "Intermediate",
          description: [
            "I've built desktop applications, websites, backend integrations, and everything in between.",
            "Shoutout to StarSiege modding community for teaching me how to build complex C# applications.",
          ],
        },
        {
          name: "SQL",
          experience: "Intermediate",
          description: [
            "Extensive experience writing queries, optimizing performance, and creating schemas.",
            "DBA is its own thing and you should hire one.",
          ],
        },
      ],
    },
    {
      name: "Frameworks & Libraries",
      description: [
        "I've built large-scale applications using modern JavaScript frameworks.",
        "Vue 3 is currently my preferred framework due to its intuitive API and robust tooling.",
      ],
      children: [
        {
          name: "Vue 3",
          experience: "Advanced",
          notes: "Custom Component Library",
          description: [
            "Created a reusable Vue component library used across multiple applications.",
          ],
        },
        {
          name: "AngularJS",
          experience: "Advanced",
          description: [
            "Refactored legacy AngularJS applications to modern standards.",
          ],
        },
        {
          name: "Nuxt.js",
          experience: "Advanced",
          description: [
            "Building my personal portfolio site using Nuxt for enhanced SEO and performance.",
          ],
        },
        {
          name: "NodeJS",
          experience: "Advanced",
          description: [
            "Extensive experience with backend development and REST APIs.",
          ],
        },
        {
          name: "TypeScript",
          experience: "Advanced",
          description: [
            "Leverage TypeScript in both frontend and backend projects for better maintainability.",
          ],
        },
      ],
    },
    {
      name: "Tools & Platforms",
      description: [
        "Proficient with modern development environments and DevOps tools.",
        "Always eager to explore new technologies and platforms to streamline development.",
      ],
      children: [
        {
          name: "Docker",
          experience: "Intermediate",
          description: [
            "Frequently containerize applications for consistency and deployment simplicity.",
            "By frequently, I mean sometimes.",
          ],
        },
        {
          name: "Visual Studio & VS Code",
          experience: "Expert",
          description: [
            "My daily drivers for development, debugging, and productivity.",
            "Please don't make me use Visual Studio again. That thing is heavy!",
          ],
        },
        {
          name: "SQL Server",
          experience: "Advanced",
          description: [
            "Used extensively for data storage, analysis, and integration.",
          ],
        },
        {
          name: "Git & GitHub",
          experience: "Advanced",
          description: [
            "Skilled with version control, branching strategies, and CI/CD.",
            "I will absolutely delete a branch and start over if the merge gets wonky.",
          ],
        },
        {
          name: "Unity",
          experience: "Intermediate",
          description: [
            "Developed a small game that kickstarted my software development career!",
          ],
        },
        {
          name: "Unreal Engine",
          experience: "Intermediate",
          description: [
            "UE5 is really cool to build prototypes in! Cutting edge graphics come free out of the box.",
          ],
        },
      ],
    },
    {
      name: "Professional Experience",
      description: [
        "Now a decade in the industry, I've progressively grown from a self-taught, junior developer, to a senior engineering lead.",
        "I have a proven track record of leadership, technical excellence, and delivering impactful projects.",
      ],
      children: [
        {
          name: "HeadSpin",
          position: "Software Engineer",
          duration: "Nov 2022 - Present",
          description: [
            "Led a significant frontend overhaul, greatly improving application responsiveness and decreasing memory usage.",
            "Implemented individual customer requests into our product as reusable features, resulting in increased customer satisfaction and retention.",
            "Standardized our component design, improving consistency across products.",
          ],
        },
        {
          name: "Sopheon (Engineering)",
          position: "Software Engineer",
          duration: "Nov 2021 - Nov 2022",
          description: [
            "Created an API that integrated a new application with Sopheon's core product, Accolade, amplifying the value of both platforms.",
            "Implemented GDPR compliance for the European market, ensuring our product met strict data protection regulations.",
            "Decreased page load times and increased responsiveness by optimizing front-end and backend architecture.",
          ],
        },
        {
          name: "Sopheon (Consulting)",
          position: "Senior Technical Consultant",
          duration: "Feb 2017 - Nov 2021",
          description: [
            "Spearheaded client success as the lead consultant, managing technical implementations for enterprise clients and interfacing with key stakeholders at the director and VP level.",
            "Built reusable tools that directly led to increased client satisfaction and additional contracts.",
          ],
        },
        {
          name: "LenderLive",
          position: "Software Developer",
          duration: "Jun 2015 - Feb 2017",
          description: [
            "Designed and built a .NET solution integrating production systems with Microsoft Great Plains ERP.",
            "Automated monthly billing into a one-click process, significantly boosting efficiency and accuracy.",
          ],
        },
      ],
    },
    {
      name: "Achievements & Awards",
      description: [
        "Professional Recognition for innovation, quality implementation, and outstanding contribution to major projects.",
        "I have little trophies for each of these, so you know it's legit.",
      ],
      children: [
        {
          name: "Outstanding Contribution - Component Library",
          description: [
            "Awarded by Sopheon, the Javascript Component Library dramatically improved the core product's UX capabilities.", "The first time I had cause to organically write a depth-first search algorithm!",
          ],
        },
        {
          name: "Outstanding Implementation - Merck",
          description: [
            "Awarded by Sopheon for successfully digitizing and streamlining Merck's complex financial processes",
            "Merck also celebrated this implementation, citing it a key project in 2020.",
          ],
        },
        {
          name: "Outstanding Implementation - 3M ",
          description: [
            "Awarded by Sopheon for my key role in delivering critical functionality with high quality.",
            "I was promoted to Senior Technical Consultant for this one.",
          ],
        },
      ],
    },
  ],
};
