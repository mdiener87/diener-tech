<template>
  <UCard
    class="project-card h-full overflow-hidden border border-gray-200 dark:border-gray-800 transition-transform duration-300"
    :ui="{ body: { padding: 'p-0' } }"
  >
    <div :class="containerClass">
      <div :class="imageWrapperClass">
        <NuxtImg
          :src="project.image || '/images/default-social.svg'"
          :alt="project.title"
          class="h-full w-full object-contain transition-transform duration-700"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        />
      </div>

      <div :class="contentWrapperClass">
        <div class="flex items-start justify-between gap-4">
          <div class="space-y-1">
            <h3 class="text-xl font-bold leading-tight">
              {{ project.title }}
            </h3>
          </div>
          <div class="flex flex-wrap gap-2 justify-end">
            <UBadge
              v-for="type in projectTypes"
              :key="type"
              :color="getProjectTypeColor(type)"
              variant="soft"
            >
              {{ type }}
            </UBadge>
          </div>
        </div>

        <p class="text-gray-600 dark:text-gray-400">
          {{ project.description }}
        </p>

        <div v-if="techList.length" class="flex flex-wrap gap-2">
          <UBadge
            v-for="tech in techList"
            :key="tech"
            :color="getBadgeColor(tech)"
            variant="subtle"
            size="xs"
          >
            {{ tech }}
          </UBadge>
        </div>

        <div
          v-if="project.highlights?.length && variant !== 'compact'"
          class="space-y-2"
        >
          <p class="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Key highlights
          </p>
          <ul class="space-y-1">
            <li
              v-for="(highlight, idx) in project.highlights"
              :key="idx"
              class="flex items-start gap-2"
            >
              <UIcon
                name="i-heroicons-sparkles"
                class="mt-0.5 h-5 w-5 text-primary shrink-0"
              />
              <span class="text-sm text-gray-600 dark:text-gray-300">{{
                highlight
              }}</span>
            </li>
          </ul>
        </div>

        <div
          v-if="project.relatedPostsMeta?.length"
          class="rounded-xl bg-primary/5 dark:bg-gray-800 p-3 border border-primary/10"
        >
          <p class="text-xs font-semibold uppercase text-primary mb-2">
            Related posts
          </p>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="post in project.relatedPostsMeta"
              :key="post.slug"
              color="primary"
              :to="post.path"
              variant="soft"
              size="xs"
              class="cursor-pointer"
              aria-label="Open related blog post"
            >
              {{ post.title }}
            </UButton>
          </div>
        </div>

        <div v-if="linkButtons.length" class="flex flex-wrap gap-3 mt-auto">
          <UButton
            v-for="link in linkButtons"
            :key="link.label"
            :to="link.url"
            target="_blank"
            :color="link.color"
            :variant="link.variant || 'solid'"
            :icon="link.icon"
            size="sm"
          >
            {{ link.label }}
          </UButton>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ProjectWithPosts } from "~/composables/useProjects";

type BadgeColor =
  | "gray"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "primary";

interface LinkButton {
  label: string;
  url: string;
  color: BadgeColor;
  variant?: "solid" | "soft" | "ghost";
  icon?: string;
}

const props = defineProps<{
  project: ProjectWithPosts;
  variant?: "split" | "stacked" | "compact";
}>();

const variant = computed(() => props.variant || "stacked");
const isSplit = computed(() => variant.value === "split");
const isCompact = computed(() => variant.value === "compact");

const projectTypes = computed(() => {
  if (Array.isArray(props.project.types)) return props.project.types;
  return props.project.type ? [props.project.type] : [];
});

const techList = computed(() =>
  isCompact.value ? props.project.technologies.slice(0, 6) : props.project.technologies
);

const containerClass = computed(() =>
  [
    "flex",
    "h-full",
    isSplit.value ? "flex-col lg:flex-row" : "flex-col",
  ].join(" ")
);

const imageWrapperClass = computed(() =>
  [
    "relative",
    "overflow-hidden",
    "bg-gray-100",
    "dark:bg-gray-800",
    isSplit.value ? "lg:w-1/2 h-72" : isCompact.value ? "h-44" : "h-60",
  ].join(" ")
);

const contentWrapperClass = computed(() =>
  [
    "flex flex-col gap-4",
    isSplit.value ? "lg:w-1/2 p-6" : "p-6",
    isCompact.value ? "pt-4" : "",
  ].join(" ")
);

const linkButtons = computed<LinkButton[]>(() => {
  const links: LinkButton[] = [];

  if (props.project.demoUrl) {
    links.push({
      label: "Live Demo",
      url: props.project.demoUrl,
      color: "primary",
      variant: "soft",
      icon: "i-heroicons-globe-alt",
    });
  }

  if (props.project.huggingfaceUrl) {
    links.push({
      label: "Model",
      url: props.project.huggingfaceUrl,
      color: "amber",
      variant: "soft",
      icon: "i-simple-icons-huggingface",
    });
  }

  if (props.project.githubUrl) {
    links.push({
      label: "GitHub",
      url: props.project.githubUrl,
      color: "gray",
      variant: "soft",
      icon: "i-simple-icons-github",
    });
  }

  return links;
});

function getBadgeColor(tech: string): BadgeColor {
  const colorMap: Record<string, BadgeColor> = {
    Vue: "emerald",
    Nuxt: "green",
    TypeScript: "blue",
    "Node.js": "yellow",
    JavaScript: "amber",
    React: "cyan",
    Python: "indigo",
    PyTorch: "red",
    Transformers: "purple",
    NLP: "violet",
    Flask: "gray",
    OpenCV: "teal",
    FFmpeg: "orange",
    "Tailwind CSS": "sky",
    ChatGPT: "pink",
  };
  return colorMap[tech] || "gray";
}

function getProjectTypeColor(type: string): BadgeColor {
  const typeColorMap: Record<string, BadgeColor> = {
    Web: "blue",
    "AI/ML": "purple",
    "Computer Vision": "indigo",
    Automation: "amber",
  };
  return typeColorMap[type] || "gray";
}
</script>

<style scoped>
.project-card:hover img {
  transform: scale(1.03);
}
</style>
