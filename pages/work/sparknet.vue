<template>
  <main>
    <section class="section-space bg-gray-50 dark:bg-gray-950/40">
      <UContainer
        ><NuxtLink to="/work" class="text-link text-sm">← All work</NuxtLink>
        <p class="eyebrow mt-8 mb-4">
          Independent experiments / Language models
        </p>
        <h1 class="editorial-title text-5xl sm:text-7xl">SparkNet</h1>
        <p class="text-xl sm:text-2xl mt-5 max-w-2xl leading-relaxed">
          Small models. Big lessons about how intelligence gets built.
        </p>
        <p
          class="text-gray-600 dark:text-gray-300 mt-5 max-w-2xl leading-relaxed"
        >
          What started with a 70M-parameter model and a billion-token challenge
          has grown into 400M training runs, supervised fine-tuning, inference,
          and a much closer look at evaluation.
        </p>
        <div class="flex flex-wrap gap-3 mt-7">
          <UButton
            to="https://github.com/mdiener87/sparknet"
            icon="i-simple-icons-github"
            >Explore the source</UButton
          ><UButton
            to="https://huggingface.co/DienerTech/sparknet-70m"
            variant="outline"
            >Original 70M model</UButton
          >
        </div></UContainer
      >
    </section>
    <section class="section-space">
      <UContainer class="grid md:grid-cols-3 gap-8"
        ><div v-for="lesson in lessons" :key="lesson.title">
          <p class="eyebrow mb-3">{{ lesson.label }}</p>
          <h2 class="text-xl font-semibold mb-3">{{ lesson.title }}</h2>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ lesson.text }}
          </p>
        </div></UContainer
      >
    </section>
    <section
      class="section-space border-t border-gray-200 dark:border-gray-800"
    >
      <UContainer class="max-w-4xl"
        ><p class="eyebrow mb-3">The build log</p>
        <h2 class="editorial-title text-3xl mb-8">Follow the experiments</h2>
        <ol class="divide-y divide-gray-200 dark:divide-gray-800">
          <li
            v-for="(post, index) in posts"
            :key="post._path"
            class="py-6 flex gap-5"
          >
            <span class="font-mono text-primary text-sm pt-1"
              >0{{ index + 1 }}</span
            >
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {{ formatDate(post.date) }}
              </p>
              <h3 class="text-xl font-semibold">
                <NuxtLink :to="post._path" class="hover:text-primary"
                  >{{ post.title }} →</NuxtLink
                >
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mt-2">
                {{ post.description }}
              </p>
            </div>
          </li>
        </ol></UContainer
      >
    </section>
  </main>
</template>
<script setup lang="ts">
import { formatDate } from "~/utils/dateFormatter";
const posts = await queryContent("blog")
  .where({ series: "sparknet" })
  .sort({ date: 1 })
  .only(["_path", "title", "description", "date"])
  .find();
const lessons = [
  {
    label: "01 / Pretraining",
    title: "The data is part of the system.",
    text: "Dataset composition, throughput, and hardware constraints all shape a training run. The experiments document the choices and the failures along the way.",
  },
  {
    label: "02 / Fine-tuning",
    title: "A base model is only the beginning.",
    text: "Conversation formatting, masking, and tokenization became central problems in turning the 400M model into something you can chat with.",
  },
  {
    label: "03 / Evaluation",
    title: "Question the measuring stick.",
    text: "A WikiText-only validation set told an incomplete story. That experience changed how I think about checkpoints and behavioral evaluation.",
  },
];
useSeo().setPageMeta({
  title: "SparkNet — Language Model Experiments",
  description:
    "Follow Michael Diener’s SparkNet experiments in language model pretraining, fine-tuning, inference, and evaluation.",
});
</script>
