export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  owner: string;
  status: string;
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
    tagline: "Per-game OpenXR tuning for Windows VR.",
    description:
      "A free, open source Windows desktop app and OpenXR API layer for tuning stereo depth, convergence, enhanced head rotation, foveated-style rendering, application profiles, and installed OpenXR layers without hand-editing config files.",
    image: "/images/vectorxr/icon-vectorxr.png",
    owner: "DienerTech LLC",
    status: "Beta",
    platform: "Windows OpenXR",
    license: "MPL-2.0",
    technologies: ["Tauri", "Vue", "Rust", "C++", "OpenXR"],
    types: ["VR", "Desktop", "Open Source"],
    highlights: [
      "Tune stereo depth, convergence, head rotation, and foveated-style rendering per OpenXR application.",
      "Manage discovered applications and OpenXR implicit API layers from one desktop UI.",
      "Free and open source under MPL-2.0, with installers published through GitHub Releases.",
    ],
    productUrl: "/products/vectorxr",
    githubUrl: "https://github.com/DienerTech/vectorxr",
    releaseUrl: "https://github.com/DienerTech/vectorxr/releases/latest",
  },
];
