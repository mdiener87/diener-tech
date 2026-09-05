<template>
  <main>
    <section
      class="section-space border-b border-gray-200 dark:border-gray-800"
    >
      <UContainer
        ><p class="eyebrow mb-4">The workshop notebook</p>
        <h1 class="editorial-title text-4xl sm:text-6xl">
          Building things.<br /><span class="text-primary"
            >Thinking out loud.</span
          >
        </h1>
        <p
          class="mt-5 text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
        >
          AI engineering, open source projects, and the occasional D&D detour.
          Longer essays when a subject needs room; short notes when there’s
          something worth sharing.
        </p>
        <div class="flex flex-wrap gap-5 mt-6 text-sm">
          <NuxtLink to="/work/sparknet" class="text-link"
            >The SparkNet series →</NuxtLink
          ><a href="/feed.xml" class="text-link">RSS ↗</a
          ><a href="#newsletter" class="text-link">Subscribe ↓</a>
        </div></UContainer
      >
    </section>
    <section class="section-space">
      <UContainer>
        <div
          class="flex flex-col md:flex-row gap-5 md:items-end justify-between mb-8"
        >
          <div>
            <p class="text-sm font-medium mb-3">Browse by format</p>
            <div class="flex flex-wrap gap-2">
              <UButton
                v-for="kind in kinds"
                :key="kind"
                :variant="selectedKind === kind ? 'solid' : 'soft'"
                :aria-pressed="selectedKind === kind"
                @click="selectedKind = kind"
                >{{ kind }}</UButton
              >
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <div>
              <label for="writing-search" class="block text-sm font-medium mb-2"
                >Search writing</label
              ><UInput
                id="writing-search"
                v-model="search"
                placeholder="A topic or project…"
                icon="i-heroicons-magnifying-glass"
              />
            </div>
            <div>
              <label for="writing-topic" class="block text-sm font-medium mb-2"
                >Topic</label
              ><select
                id="writing-topic"
                v-model="selectedTag"
                class="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm py-2 pl-3 pr-8"
              >
                <option value="">All topics</option>
                <option v-for="tag in tags" :key="tag" :value="tag">
                  {{ tag }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div
          class="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400"
        >
          <p role="status">
            {{ filteredPosts.length }}
            {{ filteredPosts.length === 1 ? "entry" : "entries" }}
          </p>
          <button
            v-if="search || selectedTag || selectedKind !== 'All'"
            class="text-link"
            @click="resetFilters"
          >
            Clear filters
          </button>
        </div>
        <div
          class="divide-y divide-gray-200 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-800"
        >
          <article
            v-for="post in filteredPosts"
            :key="post._path"
            class="py-7 sm:py-9 grid sm:grid-cols-[140px_1fr] lg:grid-cols-[160px_1fr_180px] gap-4 sm:gap-8 items-start"
          >
            <div class="text-sm text-gray-500 dark:text-gray-400">
              <p class="eyebrow mb-2">{{ post.kind }}</p>
              <time :datetime="post.date">{{ formatDate(post.date) }}</time>
              <p v-if="post.readingTime" class="mt-1">
                {{ post.readingTime.minutes }} min read
              </p>
            </div>
            <div>
              <h2 class="text-2xl font-semibold tracking-tight leading-snug">
                <NuxtLink :to="post._path" class="hover:text-primary">{{
                  post.title
                }}</NuxtLink>
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
                {{ post.description }}
              </p>
              <NuxtLink
                :to="post._path"
                class="text-link inline-block mt-4 text-sm"
                :aria-label="`Read ${post.title}`"
                >Read the {{ post.kind.toLowerCase() }} →</NuxtLink
              >
            </div>
            <NuxtLink
              v-if="post.titleImage"
              :to="post._path"
              class="hidden lg:block"
              :aria-label="`Read ${post.title}`"
              ><NuxtImg
                :src="resolveBlogImage(post.titleImage, post._path)"
                :alt="post.title"
                width="180"
                height="130"
                loading="lazy"
                class="rounded-lg w-full aspect-[1.4] object-contain bg-gray-50 dark:bg-gray-800"
            /></NuxtLink>
          </article>
        </div>
        <div v-if="!filteredPosts.length" class="py-12">
          <h2 class="text-xl font-semibold">No entries match those filters.</h2>
          <button class="text-link mt-4" @click="resetFilters">
            Show all writing →
          </button>
        </div>
      </UContainer>
    </section>
    <div id="newsletter"><NewsletterSignup /></div>
  </main>
</template>
<script setup lang="ts">
import NewsletterSignup from "~/components/newsletter/NewsletterSignup.vue";
import { formatDate } from "~/utils/dateFormatter";
const { resolveBlogImage } = useImagePath();
const posts = await queryContent("blog")
  .where({ _partial: false })
  .sort({ date: -1 })
  .find();
const kinds = ["All", "Note", "Build log", "Essay"];
const selectedKind = ref("All");
const selectedTag = ref("");
const search = ref("");
const tags = [...new Set(posts.flatMap((post) => post.tags || []))].sort();
const filteredPosts = computed(() =>
  posts.filter((post) => {
    const matchesKind =
      selectedKind.value === "All" || post.kind === selectedKind.value;
    const matchesTag =
      !selectedTag.value || post.tags?.includes(selectedTag.value);
    const text =
      `${post.title} ${post.description} ${(post.tags || []).join(" ")}`.toLowerCase();
    return (
      matchesKind &&
      matchesTag &&
      text.includes(search.value.trim().toLowerCase())
    );
  }),
);
function resetFilters() {
  selectedKind.value = "All";
  selectedTag.value = "";
  search.value = "";
}
useSeo().setPageMeta({
  title: "Writing — Notes, Build Logs & Essays",
  description:
    "AI engineering, SparkNet experiments, open source software, and lessons from building things. Writing by Michael Diener.",
});
</script>
