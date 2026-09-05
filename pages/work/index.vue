<template>
  <main>
    <section class="section-space">
      <UContainer
        ><p class="eyebrow mb-4">Products & experiments</p>
        <h1 class="editorial-title text-4xl sm:text-6xl">
          Built out of curiosity.
        </h1>
        <p
          class="mt-5 text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
        >
          Open source products, language model experiments, and tools built to
          solve problems I’ve run into. Here’s what I’m making, and what it’s
          teaching me.
        </p></UContainer
      >
    </section>
    <section class="pb-16">
      <UContainer><SelectedWork /></UContainer>
    </section>
    <section
      class="section-space bg-gray-50 dark:bg-gray-950/40 border-y border-gray-200 dark:border-gray-800"
    >
      <UContainer
        ><p class="eyebrow mb-3">Also from the workshop</p>
        <h2 class="editorial-title text-3xl mb-8">
          Smaller tools. Useful problems.
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <article
            v-for="project in otherWork"
            :key="project.id"
            class="border-t border-gray-300 dark:border-gray-700 pt-5"
          >
            <h3 class="text-xl font-semibold">{{ project.title }}</h3>
            <p
              class="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed text-sm"
            >
              {{ project.description }}
            </p>
            <p class="text-xs font-mono text-gray-500 dark:text-gray-400 mt-4">
              {{ project.technologies.join(" / ") }}
            </p>
            <div class="flex flex-wrap gap-4 mt-5 text-sm">
              <a :href="project.githubUrl" class="text-link">Source ↗</a
              ><NuxtLink
                v-if="project.relatedPostsMeta?.length"
                :to="project.relatedPostsMeta[0].path"
                class="text-link"
                >The story →</NuxtLink
              >
            </div>
          </article>
        </div>
      </UContainer>
    </section>
    <section class="section-space">
      <UContainer class="max-w-3xl"
        ><p class="eyebrow mb-3">At TaxCloud</p>
        <h2 class="editorial-title text-3xl">Building the team, too.</h2>
        <p class="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
          As Senior AI Engineer, I’m starting a new team with a broad mandate:
          tackle business problems with agentic AI. This is my professional work
          at TaxCloud; the projects above are my independent work.
        </p>
        <NuxtLink to="/career" class="text-link inline-block mt-5"
          >My career and current role →</NuxtLink
        ></UContainer
      >
    </section>
  </main>
</template>
<script setup lang="ts">
import SelectedWork from "~/components/work/SelectedWork.vue";
const { projects } = await useProjects();
const otherWork = projects.filter((project) => project.id !== "sparknet");
useSeo().setPageMeta({
  title: "Work — Products & AI Experiments",
  description:
    "Explore VectorXR, SparkNet, and independent open source projects by Michael Diener.",
});
</script>
