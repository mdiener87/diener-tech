<template>
  <main>
    <article v-if="post">
      <header class="mb-8">
        <h1 class="text-4xl font-bold mb-2">{{ post.title }}</h1>
        <div class="text-gray-600 dark:text-gray-400 mb-4">
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <span v-if="post.tags && post.tags.length"> • </span>
          <span v-for="(tag, i) in post.tags" :key="i" class="mr-2">
            #{{ tag }}
          </span>
        </div>
      </header>

      <div class="prose dark:prose-invert max-w-none">
        <ContentRenderer :value="post" />
      </div>
    </article>

    <div v-else class="text-center py-8">
      <h2 class="text-2xl font-bold mb-2">Post not found</h2>
      <p>Sorry, the post you're looking for doesn't exist or has been moved.</p>
      <NuxtLink to="/blog" class="text-primary hover:underline mt-4 inline-block">
        Back to blog
      </NuxtLink>
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const slugArray = Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug];
const slug = slugArray.join('/');

// Fetch the blog post
const { data: post } = await useAsyncData(`blog-post-${slug}`, () => queryContent('blog', slug).findOne());

// 404 if post not found
if (!post.value) {
  throw createError({
    statusCode: 404,
    message: 'Post not found'
  });
}

// Format the date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Site information
const siteUrl = 'https://diener.tech';
const authorName = 'Michael Diener';

// SEO metadata for the blog post
useHead({
  title: post.value?.title || 'Blog Post',
  titleTemplate: '%s | DienerTech',
  meta: [
    { name: 'description', content: post.value?.description || post.value?.excerpt || 'Blog post on DienerTech' },
    { property: 'og:title', content: `${post.value?.title || 'Blog Post'} | DienerTech` },
    { property: 'og:description', content: post.value?.description || post.value?.excerpt || 'Blog post on DienerTech' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `${siteUrl}/blog/${slug}` },
    { property: 'og:image', content: post.value?.image || '/images/default-social.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${post.value?.title || 'Blog Post'} | DienerTech` },
    { name: 'twitter:description', content: post.value?.description || post.value?.excerpt || 'Blog post on DienerTech' },
    { name: 'twitter:image', content: post.value?.image || '/images/default-social.jpg' },
    ...(post.value?.date ? [{ property: 'article:published_time', content: new Date(post.value.date).toISOString() }] : []),
    ...(post.value?.tags ? post.value.tags.map(tag => ({ property: 'article:tag', content: tag })) : []),
  ],
  link: [
    { rel: 'canonical', href: `${siteUrl}/blog/${slug}` }
  ]
});

// JSON-LD structured data for the blog post
useSchemaOrg([
  defineArticle({
    headline: post.value?.title,
    description: post.value?.description || post.value?.excerpt,
    image: post.value?.image || '/images/default-social.jpg',
    datePublished: post.value?.date ? new Date(post.value.date).toISOString() : undefined,
    dateModified: post.value?.updatedAt ? new Date(post.value.updatedAt).toISOString() : undefined,
    author: [
      {
        '@type': 'Person',
        name: authorName,
        url: siteUrl
      }
    ],
    isAccessibleForFree: true,
    keywords: post.value?.tags?.join(', '),
  })
]);
</script>

<style scoped>
.prose {
  @apply max-w-none;
}
</style> 