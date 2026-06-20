<template>
  <main class="flex-grow">
    <!-- Hero -->
    <section
      class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 card-transition"
    >
      <UContainer>
        <div class="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div class="space-y-6">
            <div class="flex flex-wrap gap-2">
              <UBadge color="primary" variant="soft">DienerTech LLC</UBadge>
              <UBadge color="emerald" variant="soft">{{ product.status }}</UBadge>
              <UBadge color="blue" variant="soft">Open source</UBadge>
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
                VectorXR is a free, open source Windows desktop app and OpenXR
                API layer for tuning VR experiences on a per-game basis. It
                gives practical controls for stereo depth, convergence, enhanced
                head rotation, foveated-style rendering, and OpenXR layer
                management &mdash; without hand-editing config files or digging
                through the Windows registry.
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
                View Source
              </UButton>
            </div>

            <p class="text-sm text-gray-500 dark:text-gray-400">
              A community open source project, maintained under the DienerTech
              LLC umbrella. Free to download, use, and modify.
            </p>
          </div>

          <div class="flex justify-center lg:justify-end">
            <div
              class="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 shadow-xl p-8 max-w-sm"
            >
              <NuxtImg
                src="/images/vectorxr/icon-vectorxr.png"
                alt="VectorXR application icon"
                class="w-full h-full object-contain"
                sizes="sm:60vw lg:30vw"
              />
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Quick facts -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

    <!-- Overview + feature grid -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <div class="grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
          <div>
            <h2 class="text-3xl font-bold mb-4">Built For OpenXR Tinkering</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              VectorXR is aimed at VR players and simulation users who want
              repeatable, per-application tuning. It started as a small
              experiment and grew into a full working suite that keeps profiles,
              feature toggles, device bindings, update checks, runtime logs, and
              OpenXR layer controls in one place.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-6">
              Everything is reversible by design: disable any enhancement, turn
              off the VectorXR layer, or uninstall entirely if something
              misbehaves.
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

    <!-- Enhancement modules deep dive -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-4">Enhancement Modules</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-3xl">
            Three runtime modules do the heavy lifting. Each can run with a
            global default or a dedicated profile for a specific OpenXR
            application.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="module in modules"
            :key="module.title"
            class="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 flex flex-col"
          >
            <UIcon :name="module.icon" class="h-8 w-8 text-primary mb-3" />
            <h3 class="font-bold text-xl mb-2">{{ module.title }}</h3>
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {{ module.summary }}
            </p>
            <ul class="space-y-2 mt-auto">
              <li
                v-for="point in module.points"
                :key="point"
                class="flex gap-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <UIcon
                  name="i-heroicons-check-circle"
                  class="h-5 w-5 text-primary flex-shrink-0"
                />
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Profiles & management -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-4">Profiles &amp; Management</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-3xl">
            Beyond the enhancements, VectorXR doubles as a control panel for the
            OpenXR layers and applications on your system.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
          <div
            v-for="item in management"
            :key="item.title"
            class="rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5"
          >
            <UIcon :name="item.icon" class="h-7 w-7 text-primary mb-3" />
            <h3 class="font-bold text-lg mb-2">{{ item.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ item.description }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- How it works + installation -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
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
              locally under <code>%LOCALAPPDATA%\VectorXR</code> &mdash; nothing
              is sent off your machine.
            </p>
          </div>

          <div
            class="rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6"
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

    <!-- Beta status -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8">
          <div class="flex items-center gap-3 mb-4">
            <UBadge color="emerald" variant="soft">Beta</UBadge>
            <h2 class="text-2xl font-bold">Where It Stands</h2>
          </div>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            VectorXR is in beta and feature-complete for its current scope. The
            desktop app, Windows installer, OpenXR layer registration,
            per-application profiles, the Depth, Pivot, and Quadviews modules,
            app discovery, logs, update checks, and the OpenXR layer manager are
            all implemented and working.
          </p>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Beta means it is ready for day-to-day use, but it is young and has
            had limited testing across the full range of VR runtimes and
            hardware. You may hit rough edges on an untested runtime &mdash; some
            headset-native OpenXR runtimes are known to ignore certain
            adjustments, for example. Current builds are unsigned, so the
            installer will show a Windows SmartScreen warning. Feedback and bug
            reports are genuinely welcome &mdash; that is what this stage is for.
          </p>
          <div class="flex flex-wrap gap-3">
            <UButton
              :to="`${product.githubUrl}/issues`"
              target="_blank"
              color="gray"
              variant="soft"
              icon="i-simple-icons-github"
            >
              Report an Issue
            </UButton>
            <UButton
              :to="product.githubUrl"
              target="_blank"
              color="gray"
              variant="ghost"
              icon="i-heroicons-document-text"
            >
              Read the Docs
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- License note -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="max-w-3xl">
          <h2 class="text-2xl font-bold mb-4">Open Source &amp; License</h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            The VectorXR source code is released under the Mozilla Public License
            2.0 (MPL-2.0), a file-level copyleft license. You are free to use,
            modify, and redistribute VectorXR, provided that changes to the
            MPL-covered files themselves remain available under the MPL.
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            VectorXR, the VectorXR name, and VectorXR branding are product
            identifiers of DienerTech LLC. The license covers the source code
            but does not grant rights to use DienerTech LLC trademarks, logos, or
            branding except to refer to the project.
          </p>
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
  { label: "Price", value: "Free" },
  { label: "Status", value: product.status },
  { label: "License", value: product.license },
];

const features = [
  {
    title: "Depth Module",
    description:
      "Tune stereo depth boost and convergence globally or per OpenXR application.",
    icon: "i-heroicons-cube-transparent",
  },
  {
    title: "Pivot Module",
    description:
      "Configure enhanced yaw and pitch rotation with smoothing, deadzones, and activation behavior.",
    icon: "i-heroicons-arrow-path-rounded-square",
  },
  {
    title: "Quadviews Module",
    description:
      "Drive foveated-style rendering with a visible performance budget you can dial in.",
    icon: "i-heroicons-viewfinder-circle",
  },
  {
    title: "Per-App Profiles",
    description:
      "Create profiles so different OpenXR games can each use their own settings.",
    icon: "i-heroicons-rectangle-stack",
  },
  {
    title: "OpenXR Layer Manager",
    description:
      "Inspect, enable, disable, and reorder installed OpenXR implicit API layers.",
    icon: "i-heroicons-adjustments-horizontal",
  },
  {
    title: "Input Bindings",
    description:
      "Bind feature toggles to keyboard shortcuts or detected input devices.",
    icon: "i-heroicons-command-line",
  },
];

const modules = [
  {
    title: "Depth",
    icon: "i-heroicons-cube-transparent",
    summary: "Stereo depth and convergence tuning.",
    points: [
      "Adjust stereo depth boost and convergence",
      "Apply globally or per application",
      "Reversible at any time",
    ],
  },
  {
    title: "Pivot",
    icon: "i-heroicons-arrow-path-rounded-square",
    summary: "Enhanced yaw and pitch head rotation.",
    points: [
      "Activation behavior, smoothing, and deadzones",
      "Helpful for seated VR and flight sim setups",
      "Bind to keyboard or detected devices",
    ],
  },
  {
    title: "Quadviews",
    icon: "i-heroicons-viewfinder-circle",
    summary: "Foveated-style rendering with a budget.",
    points: [
      "Foveated-style quad-views rendering",
      "Visible performance budget to balance quality and frame rate",
      "Per-application configuration",
    ],
  },
];

const management = [
  {
    title: "Application Registry",
    description:
      "Track OpenXR apps VectorXR has seen, register them as profile targets, and keep them organized as reusable entries.",
    icon: "i-heroicons-rectangle-stack",
  },
  {
    title: "OpenXR Layer Manager",
    description:
      "Inspect installed implicit API layers with signature and path status, then enable, disable, or reorder them.",
    icon: "i-heroicons-adjustments-horizontal",
  },
  {
    title: "Logs & Updates",
    description:
      "View VectorXR runtime logs in-app and check GitHub for newer releases from the About tab.",
    icon: "i-heroicons-document-magnifying-glass",
  },
  {
    title: "Settings Control",
    description:
      "Import, export, reset, and validate your local settings, all stored on your own machine.",
    icon: "i-heroicons-arrow-path",
  },
];

const { setPageMeta } = useSeo();

setPageMeta({
  title: "VectorXR",
  description:
    "VectorXR is a free, open source Windows desktop app and OpenXR API layer for per-game VR depth, convergence, head rotation, foveated rendering, and layer tuning. Maintained under DienerTech LLC.",
  image: "/images/vectorxr/icon-vectorxr.png",
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
          "Free, open source Windows desktop app and OpenXR API layer for tuning VR experiences on a per-game basis.",
        softwareVersion: product.status,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
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
