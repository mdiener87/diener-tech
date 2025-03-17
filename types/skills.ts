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