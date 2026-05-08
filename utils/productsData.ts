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
      "A Windows desktop app and OpenXR API layer for tuning stereo depth, convergence, enhanced head rotation, application profiles, and installed OpenXR layers without hand-editing config files.",
    image: "/images/vectorxr/screenshots/screenshot-home.png",
    owner: "DienerTech LLC",
    status: "Alpha release",
    platform: "Windows OpenXR",
    license: "MIT source license",
    technologies: ["Tauri", "Vue", "Rust", "C++", "OpenXR"],
    types: ["VR", "Desktop", "Open Source"],
    highlights: [
      "Tune stereo depth, convergence, yaw, and pitch rotation per OpenXR application.",
      "Manage discovered applications and OpenXR implicit API layers from one desktop UI.",
      "Installers are built through GitHub Releases for straightforward Windows installation.",
    ],
    productUrl: "/products/vectorxr",
    githubUrl: "https://github.com/DienerTech/vectorxr",
    releaseUrl: "https://github.com/DienerTech/vectorxr/releases/latest",
  },
];
