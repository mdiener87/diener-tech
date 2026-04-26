<template>
  <main class="flex-grow">
    <!-- Hero Section -->
    <section
      class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 card-transition"
    >
      <UContainer>
        <div class="flex flex-col md:flex-row items-center gap-8">
          <!-- Hero Content -->
          <div class="md:w-3/5 space-y-6">
            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Hi, I'm <span class="text-primary">Michael Diener</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300">
              Senior software engineer focused on full-stack, cloud, and
              backend systems. I build modern frontend experiences with
              Vue/Nuxt and scalable integrations using Node.js, Go, Azure,
              Databricks, Spark, and Terraform.
            </p>
            <div class="flex flex-wrap gap-4 pt-2">
              <UButton
                to="/projects"
                color="primary"
                size="lg"
                icon="i-heroicons-code-bracket"
              >
                View My Projects
              </UButton>
              <UButton
                to="/contact"
                variant="outline"
                size="lg"
                icon="i-heroicons-envelope"
              >
                Get In Touch
              </UButton>
            </div>
          </div>

          <!-- Profile image -->
          <div class="md:w-2/5 flex justify-center">
            <div
              class="w-64 h-64 bg-primary/10 rounded-full flex items-center justify-center border-4 border-primary/20"
            >
              <NuxtImg
                src="/images/pics/diener-headshot.webp"
                alt="Michael Diener"
                width="256"
                height="256"
                class="rounded-full"
              />
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Technologies Display Component -->
    <TechnologiesDisplay />

    <!-- Featured Project Section -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">Featured Project</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Check out my latest work — projects that showcase my skills and
            passion for technology.
          </p>
        </div>

        <ProjectCard
          v-if="featuredProject"
          :project="featuredProject"
          variant="split"
        />

        <UAlert
          v-else
          title="Coming soon!"
          color="info"
          variant="soft"
          icon="i-heroicons-information-circle"
        >
          Projects are currently being added to the portfolio. Check back soon
          for featured work!
        </UAlert>
      </UContainer>
    </section>

    <!-- Latest Blog Posts Section -->
    <BlogPostRecommendations
      title="Latest from the Blog"
      subtitle="Thoughts, tutorials, and insights from my development journey."
      :posts="latestPosts"
      viewAllLink="/blog"
      bgClass="bg-gray-50 dark:bg-gray-800 card-transition"
    />

    <!-- Newsletter Section -->
    <NewsletterSignup />

    <!-- Contact CTA Section -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">Let's Connect</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Interested in working together or have questions about my projects?
            I'd love to hear from you!
          </p>
          <UButton
            to="/contact"
            color="primary"
            size="lg"
            icon="i-heroicons-envelope"
          >
            Get In Touch
          </UButton>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BlogPostRecommendations from "~/components/blog/BlogPostRecommendations.vue";
import NewsletterSignup from "~/components/newsletter/NewsletterSignup.vue";

// Import the useImagePath composable
import { useImagePath } from "~/composables/useImagePath";
const { resolveBlogImage } = useImagePath();

// Fetch latest blog posts
const rawLatestPosts = await queryContent("blog")
  .where({ _partial: false })
  .sort({ date: -1 })
  .limit(3)
  .find();

// Process posts to resolve image paths
const latestPosts = rawLatestPosts.map((post) => ({
  ...post,
  resolvedTitleImage: post.titleImage
    ? resolveBlogImage(post.titleImage, post._path)
    : undefined,
}));

// Featured project pulled from the shared projects data
const { featuredProjects } = await useProjects();
const featuredProject = computed(() => featuredProjects?.[0]);

// SEO metadata
const { setPageMeta } = useSeo();

setPageMeta({
  title: "Michael Diener - Software Engineer & Tech Enthusiast",
  description:
    "Personal portfolio and blog showcasing software development, creative projects, and more",
  type: "website",
  canonicalUrl: "https://diener.tech",
});
</script>

<style scoped>
/* Styles specific to this page, tech-card styles moved to TechnologiesDisplay.vue */
</style>
