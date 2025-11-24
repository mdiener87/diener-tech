<template>
  <UCard class="huggingface-model h-full overflow-hidden">
    <div
      class="flex items-center justify-between gap-4 bg-gradient-to-r from-amber-300 via-orange-300 to-orange-400 px-4 py-3 dark:from-amber-400/90 dark:via-orange-400/90 dark:to-orange-500/90"
    >
      <div class="flex items-center gap-3 min-w-0">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 text-amber-600 shadow-sm">
          <UIcon name="i-simple-icons-huggingface" class="h-7 w-7" />
        </div>
        <div class="min-w-0">
          <p class="text-[11px] font-semibold uppercase tracking-wide text-amber-900/90">
            Hugging Face Model
          </p>
          <h3 class="text-lg font-bold leading-tight text-slate-900 line-clamp-1">
            {{ displayName }}
          </h3>
          <p v-if="owner" class="text-xs text-amber-950/70">@{{ owner }}</p>
        </div>
      </div>

      <div class="flex flex-col items-end gap-2 text-right">
        <UBadge v-if="taskLabel" color="amber" variant="solid" size="sm">
          {{ taskLabel }}
        </UBadge>
        <UBadge v-if="framework" color="orange" variant="soft" size="sm">
          {{ framework }}
        </UBadge>
      </div>
    </div>

    <div class="space-y-4 p-4">
      <div v-if="pending" class="space-y-3">
        <div class="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
        <div class="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
        <div class="grid gap-3 sm:grid-cols-2">
          <div class="h-16 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"></div>
          <div class="h-16 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"></div>
        </div>
      </div>

      <template v-else>
        <p
          v-if="modelDescription"
          class="text-sm leading-relaxed text-gray-700 dark:text-gray-300"
        >
          {{ modelDescription }}
        </p>

        <div class="grid gap-3 sm:grid-cols-2">
          <div
            class="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm shadow-sm dark:border-gray-800 dark:bg-gray-900/60"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
              <UIcon name="i-heroicons-arrow-down-tray" class="h-5 w-5" />
            </div>
            <div>
              <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Downloads</p>
              <p class="text-base font-semibold text-gray-900 dark:text-gray-100">
                {{ formattedDownloads }}
              </p>
            </div>
          </div>

          <div
            class="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm shadow-sm dark:border-gray-800 dark:bg-gray-900/60"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
              <UIcon name="i-heroicons-hand-thumb-up" class="h-5 w-5" />
            </div>
            <div>
              <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Likes</p>
              <p class="text-base font-semibold text-gray-900 dark:text-gray-100">
                {{ formattedLikes }}
              </p>
            </div>
          </div>

          <div
            class="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm shadow-sm dark:border-gray-800 dark:bg-gray-900/60"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
              <UIcon name="i-heroicons-calendar-days" class="h-5 w-5" />
            </div>
            <div>
              <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Updated</p>
              <p class="text-base font-semibold text-gray-900 dark:text-gray-100">
                {{ formattedDate }}
              </p>
            </div>
          </div>

          <div
            class="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm shadow-sm dark:border-gray-800 dark:bg-gray-900/60"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
              <UIcon name="i-heroicons-shield-check" class="h-5 w-5" />
            </div>
            <div>
              <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">License</p>
              <p class="text-base font-semibold text-gray-900 dark:text-gray-100">
                {{ license || 'Not specified' }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="tags.length" class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in tags"
            :key="tag"
            color="orange"
            variant="outline"
            size="sm"
            class="capitalize"
          >
            {{ tag }}
          </UBadge>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div v-if="error" class="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-200">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5" />
            <span>Unable to load live model details right now.</span>
            <UButton color="orange" variant="ghost" size="xs" @click="refreshModel">
              Retry
            </UButton>
          </div>

          <div class="flex items-center gap-3 sm:justify-end">
            <UBadge
              v-if="modelPrivacy"
              color="gray"
              variant="subtle"
              size="sm"
            >
              {{ modelPrivacy }}
            </UBadge>
            <ULink
              :to="url"
              target="_blank"
              class="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark"
            >
              <UIcon name="i-heroicons-arrow-top-right-on-square" class="mr-1 h-4 w-4" />
              <span>View on Hugging Face</span>
            </ULink>
          </div>
        </div>
      </template>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface HuggingFaceCardData {
  license?: string;
  summary?: string;
  description?: string;
  library_name?: string;
}

interface HuggingFaceModel {
  id: string;
  pipeline_tag?: string;
  tags?: string[];
  downloads?: number;
  likes?: number;
  license?: string;
  library_name?: string;
  lastModified?: string;
  gated?: boolean;
  private?: boolean;
  cardData?: HuggingFaceCardData;
}

const props = defineProps({
  url: {
    type: String,
    required: true,
    validator: (value: string) => value.includes("huggingface.co"),
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});

const modelId = computed(() => {
  try {
    const parsed = new URL(props.url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    return segments.length >= 2 ? `${segments[0]}/${segments[1]}` : "";
  } catch {
    return "";
  }
});

const endpoint = computed(() =>
  modelId.value ? `https://huggingface.co/api/models/${modelId.value}` : null
);

const { data, pending, error, refresh } = useFetch<HuggingFaceModel | null>(
  () => endpoint.value,
  {
    server: false,
    immediate: true,
    default: () => null,
    retry: 0,
    headers: { Accept: "application/json" },
    responseType: "json",
    transform: (result) =>
      result && typeof result === "object" ? (result as HuggingFaceModel) : null,
  }
);

const model = computed(() => data.value ?? null);

const displayName = computed(() => props.title || model.value?.id?.split("/")?.[1] || modelId.value || "Hugging Face Model");
const owner = computed(() => model.value?.id?.split("/")?.[0] || (modelId.value ? modelId.value.split("/")[0] : ""));

const taskLabel = computed(() => {
  const raw = model.value?.pipeline_tag || model.value?.tags?.find((tag) => tag.startsWith("pipeline:"))?.replace("pipeline:", "");
  if (!raw) {
    return "";
  }
  return raw
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
});

const framework = computed(
  () => model.value?.library_name || model.value?.cardData?.library_name || ""
);

const modelDescription = computed(
  () =>
    props.description ||
    model.value?.cardData?.summary ||
    model.value?.cardData?.description ||
    ""
);

const tags = computed(
  () => model.value?.tags?.filter((tag) => !tag.startsWith("pipeline:"))?.slice(0, 8) ?? []
);

const downloads = computed(() => model.value?.downloads);
const likes = computed(() => model.value?.likes);
const license = computed(() => model.value?.cardData?.license || model.value?.license || "");
const lastUpdated = computed(() => model.value?.lastModified || "");

const numberFormatter = new Intl.NumberFormat("en-US", { notation: "compact" });

const formattedDownloads = computed(() =>
  downloads.value !== undefined ? numberFormatter.format(downloads.value) : "—"
);

const formattedLikes = computed(() =>
  likes.value !== undefined ? numberFormatter.format(likes.value) : "—"
);

const formattedDate = computed(() => {
  if (!lastUpdated.value) {
    return "Not available";
  }
  const date = new Date(lastUpdated.value);
  return Number.isNaN(date.getTime())
    ? "Not available"
    : new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
});

const modelPrivacy = computed(() => {
  if (!model.value) {
    return "";
  }
  if (model.value.private) {
    return "Private";
  }
  if (model.value.gated) {
    return "Gated";
  }
  return "Public";
});

const refreshModel = () => refresh();
</script>

<style scoped>
.huggingface-model {
  transition: transform 0.2s, box-shadow 0.2s;
}

.huggingface-model:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.12);
}
</style>
