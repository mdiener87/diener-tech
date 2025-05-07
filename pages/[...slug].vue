<template>
  <main class="flex-grow">
    <ContentDoc>
      <template #default="{ doc }">
        <div v-if="doc">
          <!-- Blog Post Layout -->
          <template v-if="isBlogPost">
            <!-- Blog Post Header -->
            <section
              class="pt-8 pb-0 sm:py-10 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900"
            >
              <UContainer>
                <div class="max-w-4xl mx-auto">
                  <!-- Back to Blog Link -->
                  <NuxtLink
                    to="/blog"
                    class="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 mb-4 transition-colors"
                  >
                    <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
                    <span>Back to Blog</span>
                  </NuxtLink>

                  <!-- Blog Header Card -->
                  <UCard
                    class="animate-fade-in overflow-hidden shadow-md"
                    :ui="{ body: { padding: 'p-0' } }"
                  >
                    <div class="flex flex-col md:flex-row">
                      <!-- Title Image (Left Side on Desktop) -->
                      <div
                        v-if="doc.titleImage"
                        class="md:w-1/3 order-2 md:order-1 overflow-hidden flex items-center justify-center p-4"
                      >
                        <NuxtImg
                          :src="resolvedTitleImage"
                          :alt="doc.title"
                          class="w-full object-contain max-h-[300px] sm:max-h-[320px] md:max-h-[350px]"
                          format="webp"
                          loading="eager"
                          placeholder
                        />
                      </div>

                      <!-- Content (Right Side on Desktop) -->
                      <div class="p-6 md:p-8 md:w-2/3 order-1 md:order-2">
                        <!-- Featured Badge -->
                        <UBadge
                          v-if="doc.featured"
                          color="amber"
                          variant="solid"
                          size="md"
                          class="mb-4 inline-flex items-center gap-1"
                        >
                          <UIcon name="i-heroicons-star" class="w-4 h-4" />
                          Featured Post
                        </UBadge>

                        <h1
                          class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
                        >
                          {{ doc.title }}
                        </h1>

                        <div
                          class="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-4"
                        >
                          <!-- Date -->
                          <div v-if="doc.date" class="flex items-center gap-2">
                            <UIcon
                              name="i-heroicons-calendar"
                              class="w-5 h-5"
                            />
                            <time :datetime="doc.date">{{
                              formatDate(doc.date)
                            }}</time>
                          </div>

                          <!-- Reading Time -->
                          <div class="flex items-center gap-2">
                            <UIcon name="i-heroicons-clock" class="w-5 h-5" />
                            <span>{{ doc.readingTime || "5" }} min read</span>
                          </div>
                        </div>

                        <!-- Tags -->
                        <div
                          v-if="doc.tags && doc.tags.length"
                          class="flex flex-wrap gap-2"
                        >
                          <UBadge
                            v-for="tag in doc.tags"
                            :key="tag"
                            color="gray"
                            variant="subtle"
                          >
                            {{ tag }}
                          </UBadge>
                        </div>
                        <!-- Subtitle / Description -->
                        <p
                          v-if="doc.description"
                          class="text-lg text-gray-700 dark:text-gray-300 my-4"
                        >
                          {{ doc.description }}
                        </p>
                      </div>
                    </div>
                  </UCard>
                </div>
              </UContainer>
            </section>

            <!-- Blog Content Section -->
            <section class="pt-0 pb-10 bg-white dark:bg-gray-900">
              <UContainer>
                <div class="max-w-3xl mx-auto">
                  <div
                    class="prose dark:prose-invert prose-lg max-w-none px-0 md:px-4"
                  >
                    <ContentRenderer :value="doc" />
                  </div>

                  <!-- Social Sharing Links -->
                  <div
                    class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800"
                  >
                    <SocialShareButtons
                      :url="pageUrl"
                      :title="doc.title"
                      :platforms="['copy', 'linkedin']"
                    />
                  </div>
                </div>
              </UContainer>
            </section>

            <!-- Related Articles Section (if available) -->
            <BlogPostRecommendations
              v-if="relatedPosts.length"
              title="You might also like"
              :posts="relatedPosts"
              viewAllLink=""
              bgClass="bg-gray-50 dark:bg-gray-800"
              readMoreText="Read more"
            />
          </template>

          <!-- Default Content Page Layout -->
          <template v-else>
            <section class="py-12">
              <UContainer>
                <div class="max-w-4xl mx-auto prose dark:prose-invert prose-lg">
                  <h1 class="text-3xl md:text-4xl font-bold mb-8">
                    {{ doc.title }}
                  </h1>
                  <ContentRenderer :value="doc" />
                </div>
              </UContainer>
            </section>
          </template>
        </div>
      </template>
      <template #not-found>
        <Error404 />
      </template>
    </ContentDoc>
  </main>
</template>

<script setup lang="ts">
import { notFound } from "~/utils/error";
import { ref, computed, onMounted } from "vue";
import { useImagePath } from "~/composables/useImagePath";
import SocialShareButtons from "~/components/blog/SocialShareButtons.vue";
import BlogPostRecommendations from "~/components/blog/BlogPostRecommendations.vue";
import { formatDate } from '~/utils/dateFormatter';

// Add interfaces at the top of the script section
interface BlogPost {
  _path: string;
  title?: string;
  description?: string;
  date: string;
  category?: string;
  tags?: string[];
  readingTime?: number;
  titleImage?: string;
  resolvedTitleImage?: string;
  featured?: boolean;
  _id: string;
}

// Handle 404 errors for non-content routes
const route = useRoute();
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join("/")
  : route.params.slug;

// Check if the current path is a blog post
const isBlogPost = computed(() => slug.startsWith("blog/") && slug !== "blog");

// Get image path resolver
const { resolveImage } = useImagePath();

// Page URL for social sharing
const pageUrl = computed(() => {
  const requestURL = useRequestURL();
  const baseUrl = `${requestURL.protocol}//${requestURL.host}`;
  const fullUrl = `${baseUrl}${useRoute().path}`;
  return fullUrl;
});

// Check if this is a content route
const { data } = await useAsyncData(`content-${slug}`, () => {
  return queryContent()
    .where({ _path: `/${slug}` })
    .findOne();
});

// Get the resolved title image path
const resolvedTitleImage = computed(() => {
  if (!data.value?.titleImage) return undefined;
  return resolveImage(data.value.titleImage);
});

const resolvedShareImage = computed(() => {
  if (data.value?.shareImage) return resolveImage(data.value.shareImage);
  return resolvedTitleImage.value;
});

// Fetch related posts for blog posts
const relatedPosts = ref<BlogPost[]>([]);

onMounted(async () => {
  if (isBlogPost.value && data.value) {
    // Get the current post's category or tags if available
    const category = data.value.category;
    const tags = data.value.tags || [];

    // Query posts with same category or tags, excluding current post
    const related = await queryContent<BlogPost>("blog")
      .where({ _partial: false, _path: { $ne: `/${slug}` } })
      .sort({ date: -1 })
      .limit(3)
      .find();

    // Preprocess the related posts to resolve image paths
    const processedRelated = related.map(post => ({
      ...post,
      resolvedTitleImage: post.titleImage && post._path
        ? resolveImage(post.titleImage, post._path.replace(/^\//, ''))
        : undefined
    }));

    // If we have a category or tags, sort by relevance
    if (category || tags.length) {
      // Score posts by relevance (same category or matching tags)
      const scored = processedRelated.map((post) => {
        let score = 0;
        if (category && post.category === category) score += 3;
        if (tags.length && post.tags) {
          const matchingTags = post.tags.filter((t: string) => tags.includes(t));
          score += matchingTags.length;
        }
        return { ...post, score };
      });

      // Sort by relevance score (high to low), then by date
      scored.sort(
        (a, b) => (b.score as number) - (a.score as number) || 
          (new Date(b.date).getTime() - new Date(a.date).getTime())
      );
      relatedPosts.value = scored.slice(0, 3);
    } else {
      // If no category/tags, just use most recent
      relatedPosts.value = processedRelated.slice(0, 3);
    }
  }
});

// Set SEO metadata for blog posts
if (data.value && isBlogPost.value) {
  const { setPageMeta } = useSeo();

  setPageMeta({
    title: data.value.title || "Blog Post",
    description: data.value.description || "Blog post on DienerTech",
    type: "article",
    image: resolvedShareImage.value,
    publishedTime: data.value.date,
    tags: data.value.tags,
  });
}

// If no content found and not a valid route, throw 404
if (!data.value) {
  notFound(`Page not found: ${slug}`);
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Subtle border animation for featured posts */
@keyframes borderGlow {
  0% { border-color: rgba(251, 191, 36, 0.7); }
  50% { border-color: rgba(251, 191, 36, 1); }
  100% { border-color: rgba(251, 191, 36, 0.7); }
}

.featured-border-glow {
  animation: borderGlow 3s ease-in-out infinite;
}

/* Enhance typography for blog posts */
:deep(.prose) {
  line-height: 1.8;
}

:deep(.prose h2) {
  margin-top: 2em;
  font-weight: 700;
  color: var(--color-primary-600);
}

:deep(.prose h3) {
  margin-top: 1.5em;
  font-weight: 600;
}

:deep(.prose img) {
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
/* 
:deep(.prose a) {
  color: var(--color-primary-600);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  transition: border-color 0.3s ease;
}

:deep(.prose a:hover) {
  border-color: transparent;
} */

:deep(.prose blockquote) {
  font-style: italic;
  border-left-color: var(--color-primary-200);
  background-color: var(--color-gray-50);
  border-radius: 0.25rem;
  padding: 1rem 1.5rem;
}

:deep(.prose code) {
  background-color: var(--color-gray-100);
  border-radius: 0.25rem;
  padding: 0.2em 0.4em;
  font-size: 0.9em;
}

.dark :deep(.prose blockquote) {
  border-left-color: var(--color-primary-800);
  background-color: var(--color-gray-800);
}

.dark :deep(.prose code) {
  background-color: var(--color-gray-800);
}
</style>
