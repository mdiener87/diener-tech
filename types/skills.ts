import type * as d3 from "d3";

export interface SkillNode {
  name: string;
  children?: SkillNode[];
  experience?: string;
  years?: number;
  position?: string;
  duration?: string;
  achievements?: string[];
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
        "I have a deep love for clean and maintainable code.",
        "JavaScript and TypeScript have been my primary languages for front-end development.",
        "My experience with C# and Python primarily relates to backend integrations and tooling."
      ],
      children: [
        { name: "JavaScript", experience: "Expert", description: ["Over a decade of experience building interactive web applications."] },
        { name: "TypeScript", experience: "Advanced", description: ["I appreciate the type safety and structure TypeScript brings to JavaScript."] },
        { name: "Python", experience: "Intermediate", description: ["Primarily used for backend scripting, data processing, and automation."] },
        { name: "C#", experience: "Intermediate", description: ["Developed multiple .NET integrations and plugins."] },
        { name: "SQL", experience: "Intermediate", description: ["Extensive experience writing queries, optimizing performance, and creating schemas."] }
      ],
    },
    {
      name: "Frameworks & Libraries",
      description: [
        "I've built large-scale applications using modern JavaScript frameworks.",
        "Vue 3 is currently my preferred framework due to its intuitive API and robust tooling."
      ],
      children: [
        {
          name: "Vue 3",
          experience: "Advanced",
          notes: "Custom Component Library",
          description: ["Created a reusable Vue component library used across multiple applications."]
        },
        { name: "AngularJS", experience: "Advanced", description: ["Refactored legacy AngularJS applications to modern standards."] },
        { name: "Nuxt.js", experience: "Advanced", description: ["Building my personal portfolio site using Nuxt for enhanced SEO and performance."] },
        { name: "NodeJS", experience: "Advanced", description: ["Extensive experience with backend development and REST APIs."] },
        { name: "TypeScript", experience: "Advanced", description: ["Leverage TypeScript in both frontend and backend projects for better maintainability."] }
      ],
    },
    {
      name: "Tools & Platforms",
      description: [
        "Proficient with modern development environments and DevOps tools.",
        "Always eager to explore new technologies and platforms to streamline development."
      ],
      children: [
        { name: "Docker", experience: "Advanced", description: ["Frequently containerize applications for consistency and deployment simplicity."] },
        { name: "Visual Studio & VS Code", experience: "Expert", description: ["My daily drivers for development, debugging, and productivity."] },
        { name: "SQL Server", experience: "Intermediate", description: ["Used extensively for data storage, analysis, and integration."] },
        { name: "Git & GitHub", experience: "Advanced", description: ["Skilled with version control, branching strategies, and CI/CD."] },
        { name: "AWS/Vercel Hosting", experience: "Advanced", description: ["Regularly deploy and manage web applications on these platforms."] },
        { name: "Firebase", experience: "Intermediate", description: ["Used Firebase for quick prototyping and realtime database solutions."] },
        { name: "Unity", experience: "Intermediate", description: ["Developed a small game to kickstart my software development career."] }
      ],
    },
    {
      name: "Professional Experience",
      description: [
        "A proven track record of leadership, technical excellence, and delivering impactful projects.",
        "I've progressively grown from a junior developer to a senior technical lead."
      ],
      children: [
        {
          name: "HeadSpin",
          position: "Software Engineer",
          duration: "Nov 2022 - Present",
          achievements: [
            "Developed Vue Component Library",
            "Optimized front-end performance",
            "Migrated from Vue 2 to Vue 3"
          ],
          description: [
            "Led a significant frontend overhaul, greatly improving application responsiveness.",
            "Standardized our component design, improving consistency across products."
          ]
        },
        {
          name: "Sopheon",
          position: "Senior Technical Consultant",
          duration: "Nov 2021 - Nov 2022",
          achievements: [
            "Built JavaScript Component Library",
            "Led technical implementations",
            "Created C# plugins and SQL scripts"
          ],
          description: [
            "Acted as technical lead, directly interfacing with enterprise-level clients.",
            "Built reusable tools that directly led to increased client satisfaction and additional contracts."
          ]
        }
      ],
    },
    {
      name: "Achievements & Awards",
      description: ["Recognition for innovation, quality implementation, and outstanding contribution to major projects."],
      children: [
        {
          name: "Outstanding Contribution",
          description: ["Recognized internally at Sopheon for developing a high-value JavaScript library."],
          children: [{ name: "JavaScript Component Library (Sopheon)", description: ["This library significantly boosted frontend productivity."] }]
        },
        {
          name: "Outstanding Implementation",
          description: ["Acknowledged for successful implementation of high-profile client projects."],
          children: [
            { name: "Merck Project (Sopheon)", description: ["Delivered ahead of schedule, exceeding client expectations."] },
            { name: "3M Project (Sopheon)", description: ["Key role in delivering critical functionality with high quality."] }
          ]
        }
      ],
    }
  ]
};
