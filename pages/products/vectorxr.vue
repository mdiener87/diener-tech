<template>
  <main class="flex-grow">
    <section
      class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 card-transition"
    >
      <UContainer>
        <div class="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div class="space-y-6">
            <div class="flex flex-wrap gap-2">
              <UBadge color="primary" variant="soft">DienerTech LLC</UBadge>
              <UBadge color="emerald" variant="soft">{{ product.status }}</UBadge>
              <UBadge color="gray" variant="soft">{{ product.license }}</UBadge>
            </div>

            <div>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                VectorXR
              </h1>
              <p class="text-xl text-gray-800 dark:text-gray-200 font-medium mb-4">
                {{ product.tagline }}
              </p>
              <p class="text-lg text-gray-700 dark:text-gray-300">
                VectorXR is a Windows desktop app and OpenXR API layer for
                tuning VR experiences on a per-game basis. It gives practical
                controls for stereo depth, convergence, enhanced head rotation,
                and OpenXR layer management without hand-editing config files or
                digging through the Windows registry.
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <UButton
                :to="product.releaseUrl"
                target="_blank"
                color="primary"
                size="lg"
                icon="i-heroicons-arrow-down-tray"
              >
                Download Installer
              </UButton>
              <UButton
                :to="product.githubUrl"
                target="_blank"
                color="gray"
                variant="soft"
                size="lg"
                icon="i-simple-icons-github"
              >
                GitHub
              </UButton>
            </div>
          </div>

          <div
            class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 shadow-xl overflow-hidden"
          >
            <NuxtImg
              src="/images/vectorxr/screenshots/screenshot-home.png"
              alt="VectorXR home screen showing suite settings and layer status"
              class="w-full h-full object-contain"
              sizes="sm:100vw lg:50vw"
            />
          </div>
        </div>
      </UContainer>
    </section>

    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="metric in productFacts"
            :key="metric.label"
            class="border-l-4 border-primary pl-4"
          >
            <p class="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
              {{ metric.label }}
            </p>
            <p class="text-lg font-bold text-gray-900 dark:text-white">
              {{ metric.value }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <div class="grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
          <div>
            <h2 class="text-3xl font-bold mb-4">Built For OpenXR Tinkering</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-6">
              VectorXR is aimed at VR players and simulation users who want
              repeatable per-application tuning. The app keeps profiles,
              feature toggles, device bindings, update checks, runtime logs,
              and OpenXR layer controls in one place.
            </p>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="tech in product.technologies"
                :key="tech"
                color="blue"
                variant="subtle"
              >
                {{ tech }}
              </UBadge>
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5"
            >
              <UIcon :name="feature.icon" class="h-7 w-7 text-primary mb-3" />
              <h3 class="font-bold text-lg mb-2">{{ feature.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-4">App Screens</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-3xl">
            The app is organized around dedicated modules for suite settings,
            depth tuning, pivot tuning, application profiles, OpenXR layer
            management, and release information.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <figure
            v-for="screen in screenshots"
            :key="screen.src"
            class="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
          >
            <NuxtImg
              :src="screen.src"
              :alt="screen.alt"
              class="w-full aspect-[1.3] object-contain bg-gray-100 dark:bg-gray-950"
              sizes="sm:100vw md:50vw"
            />
            <figcaption class="p-4">
              <h3 class="font-bold mb-1">{{ screen.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ screen.description }}
              </p>
            </figcaption>
          </figure>
        </div>
      </UContainer>
    </section>

    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <div class="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 class="text-3xl font-bold mb-4">How It Works</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              VectorXR has two main pieces: a Tauri desktop app for settings,
              profiles, update checks, logs, and OpenXR layer management, and a
              Windows OpenXR API layer that reads those settings while OpenXR
              apps are running.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              The installer registers the VectorXR API layer with Windows so
              OpenXR runtimes can load it automatically. Settings are stored
              locally under <code>%LOCALAPPDATA%\VectorXR</code>.
            </p>
          </div>

          <div
            class="rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 class="text-xl font-bold mb-4">Installation</h3>
            <ol class="space-y-3 text-gray-700 dark:text-gray-300">
              <li class="flex gap-3">
                <span class="font-bold text-primary">1.</span>
                Download the latest Windows installer from GitHub Releases.
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-primary">2.</span>
                Run the installer and approve administrator permission if
                Windows requests it.
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-primary">3.</span>
                Launch VectorXR from the Start menu or desktop shortcut.
              </li>
            </ol>
            <UButton
              :to="product.releaseUrl"
              target="_blank"
              color="primary"
              icon="i-heroicons-arrow-down-tray"
              class="mt-6"
            >
              Latest Release
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
const { getProductById } = useProducts();
const product = getProductById("vectorxr");

if (!product) {
  throw createError({
    statusCode: 404,
    statusMessage: "Product not found",
  });
}

const productFacts = [
  { label: "Platform", value: product.platform },
  { label: "Owner", value: product.owner },
  { label: "Source", value: product.license },
];

const features = [
  {
    title: "Depth Profiles",
    description:
      "Tune stereo boost and convergence globally or per OpenXR application.",
    icon: "i-heroicons-cube-transparent",
  },
  {
    title: "Pivot Controls",
    description:
      "Configure enhanced yaw and pitch rotation with smoothing, deadzones, and activation behavior.",
    icon: "i-heroicons-arrow-path-rounded-square",
  },
  {
    title: "Application Registry",
    description:
      "Track discovered OpenXR apps and convert them into reusable profile targets.",
    icon: "i-heroicons-rectangle-stack",
  },
  {
    title: "OpenXR Layer Manager",
    description:
      "Inspect, enable, disable, and reorder installed OpenXR implicit API layers.",
    icon: "i-heroicons-adjustments-horizontal",
  },
];

const screenshots = [
  {
    title: "Home",
    src: "/images/vectorxr/screenshots/screenshot-home.png",
    alt: "VectorXR home tab",
    description:
      "Suite settings, app status, log access, theme controls, import and export actions, and layer status.",
  },
  {
    title: "Depth",
    src: "/images/vectorxr/screenshots/screenshot-depth.png",
    alt: "VectorXR depth tab",
    description:
      "Stereo boost and convergence controls for global and per-application profiles.",
  },
  {
    title: "Pivot",
    src: "/images/vectorxr/screenshots/screenshot-pivot.png",
    alt: "VectorXR pivot tab",
    description:
      "Enhanced yaw and pitch rotation controls with activation behavior and device bindings.",
  },
  {
    title: "Application Registry",
    src: "/images/vectorxr/screenshots/screenshot-application-registry.png",
    alt: "VectorXR application registry tab",
    description:
      "Discovered OpenXR applications can be organized into reusable profile targets.",
  },
  {
    title: "OpenXR Layers",
    src: "/images/vectorxr/screenshots/screenshot-openxr-layers.png",
    alt: "VectorXR OpenXR layers tab",
    description:
      "Layer inspection and ordering for installed OpenXR implicit API layers.",
  },
  {
    title: "About And Updates",
    src: "/images/vectorxr/screenshots/screenshot-about.png",
    alt: "VectorXR about tab",
    description:
      "Release status, GitHub update checks, project links, patch notes, and support information.",
  },
];

const { setPageMeta } = useSeo();

setPageMeta({
  title: "VectorXR",
  description:
    "VectorXR is a DienerTech LLC open source Windows desktop app and OpenXR API layer for per-game VR depth, convergence, pivot, and layer tuning.",
  image: "/images/vectorxr/screenshots/screenshot-home.png",
  type: "website",
  canonicalUrl: "https://diener.tech/products/vectorxr",
});

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "VectorXR",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Windows",
        description:
          "Windows desktop app and OpenXR API layer for tuning VR experiences on a per-game basis.",
        softwareVersion: product.status,
        license: "https://github.com/DienerTech/vectorxr/blob/main/LICENSE",
        url: "https://diener.tech/products/vectorxr",
        downloadUrl: product.releaseUrl,
        codeRepository: product.githubUrl,
        publisher: {
          "@type": "Organization",
          name: "DienerTech LLC",
          url: "https://diener.tech",
        },
      }),
    },
  ],
});
</script>

<style scoped>
.card-transition {
  transition: all 0.3s ease;
}

code {
  border-radius: 0.25rem;
  padding: 0.125rem 0.25rem;
  background: rgb(243 244 246);
}

.dark code {
  background: rgb(31 41 55);
}
</style>
