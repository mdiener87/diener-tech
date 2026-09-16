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
          ><NuxtLink to="/subscribe" class="text-link">Subscribe →</NuxtLink>
        </div></UContainer
      >
    </section>
    <section class="section-space">
      <UContainer>
        <div
          class="writing-filters grid lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] gap-6 lg:gap-8 mb-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-950/30 p-5 sm:p-6"
        >
          <div>
            <label for="writing-search" class="block text-sm font-medium mb-3"
              >Search writing</label
            ><UInput
              id="writing-search"
              v-model="search"
              type="search"
              placeholder="Try SparkNet, Python, or D&D"
              aria-describedby="writing-search-help"
              icon="i-heroicons-magnifying-glass"
            />
            <p
              id="writing-search-help"
              class="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400"
            >
              Matches titles, summaries, tags, and topics as you type, within
              your selected filters. Article bodies aren’t searched.
            </p>
            <div class="flex flex-wrap items-center gap-3 mt-2 text-xs">
              <span class="text-gray-500 dark:text-gray-400">Try:</span>
              <button
                v-for="example in searchExamples"
                :key="example"
                type="button"
                class="text-link"
                @click="trySearch(example)"
              >
                {{ example }}
              </button>
            </div>
          </div>
          <div class="min-w-0 space-y-5">
            <fieldset>
              <legend class="text-sm font-medium mb-3">Browse by format</legend>
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
            </fieldset>
            <fieldset>
              <legend class="text-sm font-medium mb-3">Browse by topic</legend>
              <div class="flex flex-wrap gap-2">
                <UButton
                  :variant="!selectedTopic ? 'solid' : 'soft'"
                  :aria-pressed="!selectedTopic"
                  @click="selectedTopic = ''"
                  >All topics</UButton
                >
                <UButton
                  v-for="topic in topics"
                  :key="topic"
                  :variant="selectedTopic === topic ? 'solid' : 'soft'"
                  :aria-pressed="selectedTopic === topic"
                  @click="selectedTopic = topic"
                  >{{ topic }}</UButton
                >
              </div>
            </fieldset>
          </div>
        </div>
        <div
          class="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400"
        >
          <p role="status" aria-atomic="true">
            {{ filteredPosts.length }}
            {{ filteredPosts.length === 1 ? "entry" : "entries" }}
            <span v-if="search.trim()"> matching “{{ search.trim() }}”</span>
          </p>
          <button
            v-if="search || selectedTopic || selectedKind !== 'All'"
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
              <div class="mt-2 -ml-2.5">
                <PostLikeButton :post-path="post._path" compact />
              </div>
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
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Try a shorter phrase, another topic, or clear the filters to start
            again.
          </p>
          <button class="text-link mt-4" @click="resetFilters">
            Show all writing →
          </button>
        </div>
      </UContainer>
    </section>
    <div id="newsletter"><SubscribeInvitation /></div>
  </main>
</template>
<script setup lang="ts">
import PostLikeButton from "~/components/blog/PostLikeButton.vue";
import SubscribeInvitation from "~/components/newsletter/SubscribeInvitation.vue";
import { formatDate } from "~/utils/dateFormatter";
const { resolveBlogImage } = useImagePath();
const posts = await queryContent("blog")
  .where({ _partial: false })
  .sort({ date: -1 })
  .find();
const kinds = ["All", "Note", "Build log", "Essay"];
const selectedKind = ref("All");
const selectedTopic = ref("");
const search = ref("");
const searchExamples = ["SparkNet", "Python", "D&D"];
const topics = [
  "AI & models",
  "Software & tools",
  "Career & industry",
  "Life & play",
];
const filteredPosts = computed(() =>
  posts.filter((post) => {
    const matchesKind =
      selectedKind.value === "All" || post.kind === selectedKind.value;
    const matchesTag =
      !selectedTopic.value || post.topics?.includes(selectedTopic.value);
    const text =
      `${post.title} ${post.description} ${(post.tags || []).join(" ")} ${(post.topics || []).join(" ")}`.toLowerCase();
    return (
      matchesKind &&
      matchesTag &&
      text.includes(search.value.trim().toLowerCase())
    );
  }),
);
function resetFilters() {
  selectedKind.value = "All";
  selectedTopic.value = "";
  search.value = "";
}
function trySearch(example: string) {
  resetFilters();
  search.value = example;
}
useSeo().setPageMeta({
  title: "Writing — Notes, Build Logs & Essays",
  description:
    "AI engineering, SparkNet experiments, open source software, and lessons from building things. Writing by Michael Diener.",
});
</script>
