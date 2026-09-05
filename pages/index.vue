<template>
  <main>
    <section class="home-hero section-space">
      <UContainer>
        <div class="grid md:grid-cols-[1fr_auto] items-center gap-8 lg:gap-16">
          <div class="max-w-3xl">
            <p class="eyebrow mb-5">Michael Diener / AI engineer & builder</p>
            <h1 class="editorial-title text-4xl sm:text-5xl lg:text-7xl">
              Making AI work
              <span class="block text-primary">in the real world.</span>
            </h1>
            <p
              class="mt-6 text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
            >
              I build AI systems, open source tools, and the teams behind them.
              From training language models to untangling business workflows, I
              like getting my hands on the whole problem.
            </p>
            <div class="flex flex-wrap gap-3 mt-7">
              <UButton
                to="/work"
                size="lg"
                trailing-icon="i-heroicons-arrow-right"
                >Explore my work</UButton
              >
              <UButton to="/blog" size="lg" variant="ghost"
                >Read my writing</UButton
              >
            </div>
          </div>
          <div class="hidden md:block w-44 lg:w-56">
            <NuxtImg
              src="/images/pics/profile-photo.webp"
              alt="Michael Diener"
              width="224"
              height="224"
              class="w-full rounded-full border-4 border-white dark:border-gray-700 shadow-sm"
            />
            <p
              class="text-center text-sm text-gray-500 dark:text-gray-400 mt-4"
            >
              Engineer. Tinkerer. Dungeon Master.
            </p>
          </div>
        </div>
        <div
          class="mt-9 pt-6 border-t border-blue-200/70 dark:border-gray-700 flex flex-col sm:flex-row gap-3 sm:gap-8 text-sm"
        >
          <NuxtLink to="/career" class="font-medium"
            >Senior AI Engineer
            <span class="text-gray-500 dark:text-gray-400"
              >/ TaxCloud</span
            ></NuxtLink
          >
          <NuxtLink to="/company" class="font-medium"
            >Founder
            <span class="text-gray-500 dark:text-gray-400"
              >/ DienerTech LLC</span
            ></NuxtLink
          >
        </div>
      </UContainer>
    </section>

    <section class="border-b border-gray-200 dark:border-gray-800 py-6">
      <UContainer
        class="flex flex-col md:flex-row md:items-center gap-3 md:gap-8"
      >
        <p class="eyebrow shrink-0">Now / September 2026</p>
        <p
          class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1"
        >
          Starting a new AI engineering team at TaxCloud, building VectorXR, and
          continuing the SparkNet experiments.
        </p>
        <NuxtLink
          to="/blog/starting-an-ai-engineering-team"
          class="text-link text-sm shrink-0"
          >A new chapter →</NuxtLink
        >
      </UContainer>
    </section>

    <section class="section-space">
      <UContainer>
        <div class="flex items-end justify-between gap-4 mb-8">
          <div>
            <p class="eyebrow mb-2">Built, tested, learned</p>
            <h2 class="editorial-title text-3xl sm:text-4xl">Selected work</h2>
          </div>
          <NuxtLink to="/work" class="text-link text-sm">All work →</NuxtLink>
        </div>
        <SelectedWork />
      </UContainer>
    </section>

    <section
      class="section-space bg-gray-50 dark:bg-gray-950/40 border-y border-gray-200 dark:border-gray-800"
    >
      <UContainer>
        <div class="grid lg:grid-cols-[.7fr_1.3fr] gap-8 lg:gap-16">
          <div>
            <p class="eyebrow mb-3">From the workshop</p>
            <h2 class="editorial-title text-3xl sm:text-4xl">
              Things I’m learning<br />along the way.
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
              Experiments, wrong turns, and opinions grounded in building
              things.
            </p>
            <NuxtLink to="/blog" class="text-link inline-block mt-5"
              >All writing →</NuxtLink
            >
          </div>
          <div class="divide-y divide-gray-200 dark:divide-gray-800">
            <article
              v-for="post in selectedPosts"
              :key="post._path"
              class="py-5 first:pt-0 last:pb-0"
            >
              <p
                class="text-xs font-mono text-gray-500 dark:text-gray-400 mb-2"
              >
                {{ post.kind || "Essay" }} / {{ formatDate(post.date) }}
              </p>
              <h3 class="text-xl font-semibold tracking-tight">
                <NuxtLink :to="post._path" class="hover:text-primary"
                  >{{ post.title }}
                  <span class="text-primary" aria-hidden="true"
                    >↗</span
                  ></NuxtLink
                >
              </h3>
              <p
                class="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed"
              >
                {{ post.description }}
              </p>
            </article>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="section-space">
      <UContainer
        class="grid md:grid-cols-[.65fr_1fr] items-center gap-8 lg:gap-16"
      >
        <NuxtImg
          src="/images/pics/diener-mountain.webp"
          alt="Michael hiking in the Colorado mountains"
          width="720"
          height="540"
          sizes="sm:90vw md:35vw"
          loading="lazy"
          class="rounded-xl w-full aspect-[4/3] object-cover"
        />
        <div>
          <p class="eyebrow mb-3">Away from the keyboard</p>
          <h2 class="editorial-title text-3xl sm:text-4xl">
            Same curiosity.<br />Different adventures.
          </h2>
          <p class="mt-5 text-gray-600 dark:text-gray-300 leading-relaxed">
            I’m based in Colorado, where I split my time between building
            software, running a long-standing D&D campaign, exploring the
            mountains, and disappearing into a flight simulator.
          </p>
          <NuxtLink to="/about" class="text-link inline-block mt-5"
            >A little more about me →</NuxtLink
          >
        </div>
      </UContainer>
    </section>
    <NewsletterSignup />
  </main>
</template>
<script setup lang="ts">
import SelectedWork from "~/components/work/SelectedWork.vue";
import NewsletterSignup from "~/components/newsletter/NewsletterSignup.vue";
import { formatDate } from "~/utils/dateFormatter";
const paths = [
  "/blog/starting-an-ai-engineering-team",
  "/blog/the-eval-was-lying-to-me",
  "/blog/ship-of-theseus",
];
const posts = await queryContent("blog")
  .where({ _path: { $in: paths } })
  .only(["_path", "title", "description", "date", "kind"])
  .find();
const selectedPosts = paths
  .map((path) => posts.find((post) => post._path === path))
  .filter(Boolean);
const { setPageMeta } = useSeo();
setPageMeta({
  title: "Michael Diener — AI Engineer & Builder",
  description:
    "Senior AI Engineer at TaxCloud and founder of DienerTech LLC. Building practical AI systems, open source software, and sharing lessons from the workshop.",
});
</script>
<style scoped>
.home-hero {
  background: linear-gradient(120deg, #eff6ff 0%, #fff 80%);
}
.dark .home-hero {
  background: linear-gradient(120deg, #172640 0%, #0f172a 80%);
}
</style>
