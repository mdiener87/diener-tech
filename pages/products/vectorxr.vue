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
              <UBadge color="emerald" variant="soft">{{
                product.status
              }}</UBadge>
              <UBadge color="blue" variant="soft">Open source</UBadge>
              <UBadge color="gray" variant="soft">{{ product.license }}</UBadge>
            </div>

            <div>
              <h1
                class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              >
                VectorXR
              </h1>
              <p
                class="text-xl text-gray-800 dark:text-gray-200 font-medium mb-4"
              >
                {{ product.tagline }}
              </p>
              <p class="text-lg text-gray-700 dark:text-gray-300">
                VectorXR is a free, open source Windows desktop app and OpenXR
                API layer for tuning VR experiences on a per-game basis. It
                gives practical controls for stereo depth, convergence, enhanced
                head rotation, foveated-style rendering, frame pacing, and
                OpenXR layer management &mdash; without hand-editing config
                files or digging through the Windows registry.
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

    <!-- How it works + installation -->
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

    <!-- Product video -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-8">
            <p
              class="text-sm font-semibold uppercase tracking-wide text-primary mb-2"
            >
              Product walkthrough
            </p>
            <h2 class="text-3xl font-bold mb-3">See VectorXR In Action</h2>
            <p class="text-gray-600 dark:text-gray-400">
              Tour the desktop app and see how VectorXR brings OpenXR tuning
              into one approachable workflow.
            </p>
          </div>
          <div
            class="video-embed overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-black shadow-xl"
          >
            <iframe
              class="absolute inset-0 h-full w-full"
              src="https://www.youtube-nocookie.com/embed/_Vtdf_vobwI"
              title="VectorXR product walkthrough"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Key differentiator -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <div
          class="rounded-2xl border border-primary-200 dark:border-primary-900/60 bg-gradient-to-br from-primary-50 to-white dark:from-primary-950/40 dark:to-gray-900 p-8 md:p-10"
        >
          <div class="flex items-start gap-4">
            <UIcon
              name="i-heroicons-sparkles"
              class="h-8 w-8 text-primary flex-shrink-0 mt-1"
            />
            <div>
              <p
                class="text-sm font-semibold uppercase tracking-wide text-primary mb-2"
              >
                What makes VectorXR different
              </p>
              <p class="text-xl md:text-2xl font-bold leading-snug mb-3">
                The first and only OpenXR solution where enhanced head rotation
                and quad-views foveated rendering work together.
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                When you turn your view with the Pivot module, the foveated
                high-detail region follows your pivoted view instead of being
                left behind &mdash; so you keep both the wider rotation and the
                performance headroom, with no blurry sweet spot stuck
                off-center.
              </p>
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
            <p
              class="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400"
            >
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
              feature toggles, device bindings, frame-pacing diagnostics, update
              checks, runtime logs, and OpenXR layer controls in one place.
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
            Four runtime modules do the heavy lifting. Each can run with a
            global default or a dedicated profile for a specific OpenXR
            application.
          </p>
        </div>

        <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div
            v-for="module in modules"
            :key="module.title"
            class="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 flex flex-col"
          >
            <UIcon :name="module.icon" class="h-8 w-8 text-primary mb-3" />
            <h3 class="font-bold text-xl mb-2">{{ module.title }}</h3>
            <p
              class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
            >
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

    <!-- App screens -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-4">App Screens</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-3xl">
            The current VectorXR v0.14.0 desktop experience, from system status
            and enhancement profiles to diagnostics, application registration,
            and OpenXR layer management.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <figure
            v-for="screen in screenshots"
            :key="screen.src"
            class="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm"
          >
            <button
              type="button"
              class="group relative block w-full cursor-zoom-in overflow-hidden bg-gray-100 text-left dark:bg-gray-950"
              :aria-label="`Open full-size preview of ${screen.title}`"
              @click="openScreenshot(screen, $event)"
            >
              <NuxtImg
                :src="screen.src"
                :alt="screen.alt"
                class="w-full aspect-[1.2984] object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                sizes="sm:100vw md:50vw"
              />
              <span
                class="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                aria-hidden="true"
              >
                <UIcon
                  name="i-heroicons-arrows-pointing-out"
                  class="h-4 w-4"
                />
                View full size
              </span>
            </button>
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

    <!-- Profiles & management -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
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

    <!-- Beta status -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div
          class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8"
        >
          <div class="flex items-center gap-3 mb-4">
            <UBadge color="emerald" variant="soft">Beta</UBadge>
            <h2 class="text-2xl font-bold">Where It Stands</h2>
          </div>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            VectorXR is in beta and feature-complete for its current scope. The
            desktop app, Windows installer, OpenXR layer registration,
            per-application profiles, the Depth, Pivot, Quadviews, and Turbo
            modules, app discovery, logs, update checks, and the OpenXR layer
            manager are all implemented and working.
          </p>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Beta means it is ready for day-to-day use, but it is young and has
            had limited testing across the full range of VR runtimes and
            hardware. You may hit rough edges on an untested runtime &mdash;
            some game-level Force IPD or world-scale controls can override
            Stereo Boost, for example. Current builds are unsigned, so the
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
    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <div class="max-w-3xl">
          <h2 class="text-2xl font-bold mb-4">Open Source &amp; License</h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            The VectorXR source code is released under the Mozilla Public
            License 2.0 (MPL-2.0), a file-level copyleft license. You are free
            to use, modify, and redistribute VectorXR, provided that changes to
            the MPL-covered files themselves remain available under the MPL.
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            VectorXR, the VectorXR name, and VectorXR branding are product
            identifiers of DienerTech LLC. The license covers the source code
            but does not grant rights to use DienerTech LLC trademarks, logos,
            or branding except to refer to the project.
          </p>
        </div>
      </UContainer>
    </section>

    <Teleport to="body">
      <Transition name="screenshot-lightbox">
        <div
          v-if="selectedScreenshot"
          class="screenshot-lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="`${selectedScreenshot.title} full-size preview`"
          @click="closeScreenshot"
        >
          <div class="screenshot-lightbox-content" @click.stop>
            <img
              :src="selectedScreenshot.src"
              :alt="selectedScreenshot.alt"
              class="screenshot-lightbox-image"
            />
            <div class="mt-4 max-w-4xl text-center text-white">
              <p class="font-bold">{{ selectedScreenshot.title }}</p>
              <p class="mt-1 text-sm text-gray-300">
                {{ selectedScreenshot.description }}
              </p>
            </div>
            <button
              type="button"
              class="screenshot-lightbox-close"
              aria-label="Close full-size screenshot preview"
              @click="closeScreenshot"
            >
              <UIcon name="i-heroicons-x-mark" class="h-6 w-6" />
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
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
    title: "Quadviews Module",
    description:
      "Drive foveated-style rendering with a visible performance budget you can dial in.",
    icon: "i-heroicons-viewfinder-circle",
  },
  {
    title: "Pivot Module",
    description:
      "Configure enhanced yaw and pitch rotation with smoothing, deadzones, and activation behavior.",
    icon: "i-heroicons-arrow-path-rounded-square",
  },
  {
    title: "Depth Module",
    description:
      "Tune stereo depth boost and convergence globally or per OpenXR application.",
    icon: "i-heroicons-cube-transparent",
  },
  {
    title: "Turbo Module",
    description:
      "Test per-application frame-pacing strategies with in-headset A/B controls and built-in diagnostics.",
    icon: "i-heroicons-bolt",
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
  {
    title: "System Dashboard",
    description:
      "See runtime health, layer readiness, and the active state of every enhancement at a glance.",
    icon: "i-heroicons-squares-2x2",
  },
];

const modules = [
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
  {
    title: "Turbo",
    icon: "i-heroicons-bolt",
    summary: "Opt-in OpenXR frame-pacing control.",
    points: [
      "Automatic or manually selected runtime strategies",
      "In-headset A/B controls and performance diagnostics",
      "Compatibility-sensitive and configured per application",
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
    title: "Depth",
    icon: "i-heroicons-cube-transparent",
    summary: "Stereo depth and convergence tuning.",
    points: [
      "Tune world scale and the convergence plane",
      "Depth Lock preserves tuned stereo geometry at submission",
      "Apply globally or per application",
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
      "Inspect installed implicit API layers with signature and path status, then enable, disable, reorder, or remove stale registrations.",
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

const screenshots = [
  {
    title: "Home Dashboard",
    src: "/images/vectorxr/screenshots/home.webp",
    alt: "VectorXR Home dashboard showing system health and enhancement status",
    description:
      "Check runtime and layer health, then see the default profile, custom profiles, and active state for every enhancement.",
  },
  {
    title: "Depth",
    src: "/images/vectorxr/screenshots/depth.webp",
    alt: "VectorXR Depth tab showing world-scale and convergence profile controls",
    description:
      "Tune world scale and the convergence plane with a live pairing map, Depth Lock, and quick in-headset A/B controls.",
  },
  {
    title: "Pivot",
    src: "/images/vectorxr/screenshots/pivot.webp",
    alt: "VectorXR Pivot tab showing yaw and pitch rotation controls",
    description:
      "Enhanced yaw and pitch rotation with activation mode, smoothing, an activation ramp, and per-axis multipliers and deadzones.",
  },
  {
    title: "Quadviews",
    src: "/images/vectorxr/screenshots/quadviews.webp",
    alt: "VectorXR Quadviews tab showing foveated rendering profile controls",
    description:
      "Configure foveated-style rendering with focus, tracking, and resolution controls plus a live performance budget.",
  },
  {
    title: "Turbo",
    src: "/images/vectorxr/screenshots/turbo.webp",
    alt: "VectorXR Turbo tab showing frame-pacing and performance diagnostic controls",
    description:
      "Compare frame-pacing strategies per application with automatic runtime selection, an in-game toggle, and measured diagnostics.",
  },
  {
    title: "Application Registry",
    src: "/images/vectorxr/screenshots/application-registry.webp",
    alt: "VectorXR Application Registry showing registered and discovered OpenXR apps",
    description:
      "Register discovered OpenXR apps as reusable targets for dedicated enhancement profiles.",
  },
  {
    title: "OpenXR Layer Manager",
    src: "/images/vectorxr/screenshots/openxr-layer-manager.webp",
    alt: "VectorXR OpenXR Layer Manager showing installed API layers",
    description:
      "Inspect all four Windows registry slices, then enable, disable, reorder, or clean up implicit API layer registrations.",
  },
  {
    title: "Settings",
    src: "/images/vectorxr/screenshots/settings.webp",
    alt: "VectorXR Settings tab showing runtime, theme, logging, and configuration controls",
    description:
      "Control the runtime master switch, theme, logging, app discovery, and local configuration import, export, or reset.",
  },
  {
    title: "About & Updates",
    src: "/images/vectorxr/screenshots/about.webp",
    alt: "VectorXR About tab showing release information and project support links",
    description:
      "Review the latest patch notes, check release status, and find project and support links from inside the app.",
  },
  {
    title: "Dark Mode",
    src: "/images/vectorxr/screenshots/home-dark.webp",
    alt: "VectorXR Home dashboard displayed in dark mode",
    description:
      "Use VectorXR in system, light, or dark theme without changing the workflow.",
  },
];

const selectedScreenshot = ref<(typeof screenshots)[number] | null>(null);
let screenshotTrigger: HTMLElement | null = null;

function openScreenshot(
  screen: (typeof screenshots)[number],
  event: MouseEvent,
) {
  screenshotTrigger = event.currentTarget as HTMLElement;
  selectedScreenshot.value = screen;
}

function closeScreenshot() {
  selectedScreenshot.value = null;
  nextTick(() => {
    screenshotTrigger?.focus();
    screenshotTrigger = null;
  });
}

function handleScreenshotKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && selectedScreenshot.value) {
    closeScreenshot();
  }
}

watch(selectedScreenshot, (screen) => {
  if (import.meta.client) {
    document.body.style.overflow = screen ? "hidden" : "";
  }
});

onMounted(() => {
  window.addEventListener("keydown", handleScreenshotKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleScreenshotKeydown);
  document.body.style.overflow = "";
});

const { setPageMeta } = useSeo();

setPageMeta({
  title: "VectorXR",
  description:
    "VectorXR is a free, open source Windows desktop app and OpenXR API layer for per-game VR depth, convergence, head rotation, foveated rendering, frame pacing, and layer tuning.",
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
          "Free, open source Windows desktop app and OpenXR API layer for per-game VR depth, convergence, head rotation, foveated rendering, frame pacing, and layer management.",
        softwareVersion: "0.14.0",
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

.video-embed {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
}

.screenshot-lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.92);
  cursor: zoom-out;
}

.screenshot-lightbox-content {
  position: relative;
  display: flex;
  width: min(96vw, 1700px);
  max-height: 94vh;
  flex-direction: column;
  align-items: center;
  cursor: default;
}

.screenshot-lightbox-image {
  max-width: 100%;
  max-height: calc(94vh - 5rem);
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.screenshot-lightbox-close {
  position: absolute;
  top: -1rem;
  right: -1rem;
  display: inline-flex;
  width: 2.75rem;
  height: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(8px);
  transition: background-color 0.2s ease;
}

.screenshot-lightbox-close:hover,
.screenshot-lightbox-close:focus-visible {
  background: rgba(255, 255, 255, 0.35);
  outline: 2px solid white;
  outline-offset: 2px;
}

.screenshot-lightbox-enter-active,
.screenshot-lightbox-leave-active {
  transition: opacity 0.2s ease;
}

.screenshot-lightbox-enter-from,
.screenshot-lightbox-leave-to {
  opacity: 0;
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
