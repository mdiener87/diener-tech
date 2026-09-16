export interface Technology {
  name: string;
  icon?: string | null;
  asset?: string;
  category: string;
}

export const technologies: Technology[] = [
  // Frontend Frameworks & Libraries
  {
    name: "Vue.js",
    icon: "i-simple-icons-vuedotjs",
    category: "Frontend & UI",
  },
  {
    name: "Nuxt 3",
    icon: "i-simple-icons-nuxtdotjs",
    category: "Frontend & UI",
  },
  {
    name: "React",
    icon: "i-simple-icons-react",
    category: "Frontend & UI",
  },
  {
    name: "Angular",
    icon: "i-simple-icons-angular",
    category: "Frontend & UI",
  },
  {
    name: "d3.js",
    icon: "i-simple-icons-d3dotjs",
    category: "Frontend & UI",
  },
  {
    name: "JQuery",
    icon: "i-simple-icons-jquery",
    category: "Frontend & UI",
  },
  {
    name: "Tailwind",
    icon: "i-simple-icons-tailwindcss",
    category: "Frontend & UI",
  },
  {
    name: "Bootstrap",
    icon: "i-simple-icons-bootstrap",
    category: "Frontend & UI",
  },
  {
    name: "UI/UX",
    icon: "i-heroicons-rectangle-group",
    category: "Frontend & UI",
  },
  // Programming Languages
  {
    name: "JavaScript",
    icon: "i-simple-icons-javascript",
    category: "Languages",
  },
  {
    name: "TypeScript",
    icon: "i-simple-icons-typescript",
    category: "Languages",
  },
  {
    name: "Python",
    icon: "i-simple-icons-python",
    category: "Languages",
  },
  {
    name: "Go",
    icon: "i-simple-icons-go",
    category: "Languages",
  },
  {
    name: "C#",
    icon: "i-simple-icons-csharp",
    category: "Languages",
  },
  {
    name: "Bash",
    icon: "i-simple-icons-gnubash",
    category: "Languages",
  },

  // Backend & Infrastructure
  {
    name: "Node.js",
    icon: "i-simple-icons-nodedotjs",
    category: "Backend & Infrastructure",
  },
  {
    name: "Express.js",
    icon: "i-simple-icons-express",
    category: "Backend & Infrastructure",
  },
  {
    name: "SQL",
    icon: "i-heroicons-circle-stack",
    category: "Backend & Infrastructure",
  },
  {
    name: "NoSQL",
    icon: "i-heroicons-server-stack",
    category: "Backend & Infrastructure",
  },
  {
    name: "AWS",
    icon: "i-simple-icons-amazonwebservices",
    category: "Backend & Infrastructure",
  },
  {
    name: "Azure",
    icon: "i-simple-icons-microsoftazure",
    category: "Backend & Infrastructure",
  },
  {
    name: "ASP.NET MVC",
    icon: "i-heroicons-view-columns",
    category: "Backend & Infrastructure",
  },
  {
    name: ".NET Core",
    icon: "i-simple-icons-dotnet",
    category: "Backend & Infrastructure",
  },
  {
    name: "Flask",
    icon: "i-simple-icons-flask",
    category: "Backend & Infrastructure",
  },
  {
    name: "Tornado",
    icon: "i-heroicons-arrow-path-rounded-square",
    category: "Backend & Infrastructure",
  },
  {
    name: "Entity Framework",
    icon: "i-heroicons-link",
    category: "Backend & Infrastructure",
  },
  {
    name: "SQL Server",
    icon: "i-simple-icons-microsoftsqlserver",
    category: "Backend & Infrastructure",
  },
  {
    name: "Databricks",
    icon: "i-simple-icons-databricks",
    category: "Backend & Infrastructure",
  },
  {
    name: "Apache Spark",
    icon: "i-simple-icons-apachespark",
    category: "Backend & Infrastructure",
  },
  {
    name: "ETL",
    icon: "i-heroicons-arrow-path",
    category: "Backend & Infrastructure",
  },
  {
    name: "SQL Workbench",
    icon: "i-simple-icons-mysql",
    category: "Backend & Infrastructure",
  },

  // Dev Tools & Ops
  {
    name: "Git",
    icon: "i-simple-icons-git",
    category: "Dev Tools & Ops",
  },
  {
    name: "VS Code",
    icon: "i-simple-icons-visualstudiocode",
    category: "Dev Tools & Ops",
  },
  {
    name: "Cursor",
    icon: null,
    asset: "/tech-icons/cursor.svg",
    category: "Dev Tools & Ops",
  },
  {
    name: "n8n",
    icon: "i-simple-icons-n8n",
    category: "Dev Tools & Ops",
  },
  {
    name: "Visual Studio",
    icon: "i-simple-icons-visualstudio",
    category: "Dev Tools & Ops",
  },
  {
    name: "Docker",
    icon: "i-simple-icons-docker",
    category: "Dev Tools & Ops",
  },
  {
    name: "Terraform",
    icon: "i-simple-icons-terraform",
    category: "Dev Tools & Ops",
  },
  {
    name: "DataDog",
    icon: "i-simple-icons-datadog",
    category: "Dev Tools & Ops",
  },
  {
    name: "GitHub",
    icon: "i-simple-icons-github",
    category: "Dev Tools & Ops",
  },
  {
    name: "TFS",
    icon: "i-heroicons-clipboard-document-check",
    category: "Dev Tools & Ops",
  },
  {
    name: "Jest",
    icon: "i-simple-icons-jest",
    category: "Dev Tools & Ops",
  },
  {
    name: "Testing Library",
    icon: "i-simple-icons-testinglibrary",
    category: "Dev Tools & Ops",
  },
  {
    name: "Selenium",
    icon: "i-simple-icons-selenium",
    category: "Dev Tools & Ops",
  },
  {
    name: "GitHub Actions",
    icon: "i-simple-icons-githubactions",
    category: "Dev Tools & Ops",
  },
  {
    name: "CI/CD",
    icon: "i-heroicons-arrow-path",
    category: "Dev Tools & Ops",
  },
  {
    name: "Jira",
    icon: "i-simple-icons-jira",
    category: "Dev Tools & Ops",
  },
  {
    name: "Tauri",
    icon: null,
    asset: "/tech-icons/tauri.svg",
    category: "Dev Tools & Ops",
  },
  {
    name: "API Design",
    icon: "i-heroicons-squares-2x2",
    category: "Backend & Infrastructure",
  },
  {
    name: "Cloudflare",
    icon: "i-simple-icons-cloudflare",
    category: "Backend & Infrastructure",
  },
  {
    name: "REST API",
    icon: "i-heroicons-code-bracket-square",
    category: "Backend & Infrastructure",
  },
  {
    name: "Microservices",
    icon: "i-heroicons-command-line",
    category: "Backend & Infrastructure",
  },

  // AI & Emerging Technologies
  {
    name: "ChatGPT",
    icon: "i-simple-icons-openai",
    category: "AI & Emerging Tech",
  },
  {
    name: "Claude",
    icon: "i-simple-icons-claude",
    category: "AI & Emerging Tech",
  },
  {
    name: "Model Context Protocol",
    icon: "i-heroicons-document-text",
    category: "AI & Emerging Tech",
  },
  {
    name: "Stable Diffusion",
    icon: null,
    asset: "/tech-icons/stable-diffusion.svg",
    category: "AI & Emerging Tech",
  },
  {
    name: "Ollama",
    icon: "i-simple-icons-ollama",
    category: "AI & Emerging Tech",
  },
  {
    name: "llama.cpp",
    icon: "i-heroicons-cpu-chip",
    category: "AI & Emerging Tech",
  },
  {
    name: "HuggingFace",
    icon: "i-simple-icons-huggingface",
    category: "AI & Emerging Tech",
  },
  {
    name: "DeepSeek",
    icon: null,
    asset: "/tech-icons/deepseek.svg",
    category: "AI & Emerging Tech",
  },
  {
    name: "Qwen",
    icon: null,
    asset: "/tech-icons/qwen.svg",
    category: "AI & Emerging Tech",
  },
  {
    name: "Comfy UI",
    icon: null,
    asset: "/tech-icons/comfyuibw.svg",
    category: "AI & Emerging Tech",
  },
  {
    name: "Retrieval Augmented Generation",
    icon: "i-heroicons-magnifying-glass-circle",
    category: "AI & Emerging Tech",
  },

  // Media & 3D Technologies
  {
    name: "3D Printing",
    icon: "i-heroicons-cube",
    category: "2D & 3D Media",
  },
  {
    name: "Cura",
    icon: null,
    asset: "/tech-icons/cura.svg",
    category: "2D & 3D Media",
  },
  {
    name: "Fusion 360",
    icon: "i-simple-icons-autodesk",
    category: "2D & 3D Media",
  },
  {
    name: "Creality",
    icon: null,
    asset: "/tech-icons/creality.svg",
    category: "2D & 3D Media",
  },
  {
    name: "Unity",
    icon: "i-simple-icons-unity",
    category: "2D & 3D Media",
  },
  {
    name: "Unreal",
    icon: "i-simple-icons-unrealengine",
    category: "2D & 3D Media",
  },
  {
    name: "OBS",
    icon: "i-simple-icons-obsstudio",
    category: "2D & 3D Media",
  },
  {
    name: "OpenXR",
    icon: null,
    asset: "/tech-icons/openxr.svg",
    category: "2D & 3D Media",
  },
  {
    name: "Khronos",
    icon: null,
    asset: "/tech-icons/khronos.svg",
    category: "2D & 3D Media",
  },
];
