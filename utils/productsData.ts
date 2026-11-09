export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  owner: string;
  status: string;
  version: string;
  platform: string;
  license: string;
  technologies: string[];
  types: string[];
  highlights: string[];
  productUrl: string;
  githubUrl: string;
  releaseUrl: string;
}

export const productsData: Product[] = [
  {
    id: "vectorxr",
    title: "VectorXR",
    tagline: "Frame generation and per-game OpenXR tuning for Windows VR.",
    description:
      "A free, open source Windows desktop app and OpenXR API layer for VR sims. Add frame generation, foveated rendering, frame pacing, enhanced head rotation, and stereo depth tuning per game, with an in-headset performance display and no config files to edit.",
    image: "/images/vectorxr/icon-vectorxr.webp",
    owner: "DienerTech LLC",
    status: "Beta",
    version: "0.20.0",
    platform: "Windows OpenXR",
    license: "MPL-2.0",
    technologies: ["Tauri", "Vue", "Rust", "C++", "OpenXR"],
    types: ["VR", "Desktop", "Open Source"],
    highlights: [
      "Experimental Frame Generation for Direct3D 11, Direct3D 12, and Vulkan games, in stereo or with Quadviews.",
      "Tune foveated rendering, frame pacing, head rotation, depth, and convergence per OpenXR application.",
      "Free and open source under MPL-2.0, with signed installers published through GitHub Releases.",
    ],
    productUrl: "/products/vectorxr",
    githubUrl: "https://github.com/DienerTech/vectorxr",
    releaseUrl: "https://github.com/DienerTech/vectorxr/releases/latest",
  },
];
