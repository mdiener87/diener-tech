<template>
    <main class="flex-grow container mx-auto p-6 text-center">
        <UCard class="mb-6">
            <template #header>
                <h2 class="text-xl font-bold">About This Site</h2>
            </template>
            <p>
                Diener.tech is a personal portfolio and blog showcasing my journey in
                software development, creative projects, and more. Whether you're here
                to explore my work or read my thoughts on technology, you're in the
                right place.
            </p>
        </UCard>
    </main>
</template>

<script setup>
// Set SEO metadata for the homepage
useHead({
    title: 'Home',
    titleTemplate: '%s | Diener.tech',
    meta: [
        { name: 'description', content: 'Personal portfolio and blog showcasing software development, creative projects, and more.' },
        { property: 'og:title', content: 'Home | Diener.tech' },
        { property: 'og:description', content: 'Personal portfolio and blog showcasing software development, creative projects, and more.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://diener.tech' },
        { property: 'og:image', content: '/images/default-social.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Home | Diener.tech' },
        { name: 'twitter:description', content: 'Personal portfolio and blog showcasing software development, creative projects, and more.' },
        { name: 'twitter:image', content: '/images/default-social.jpg' },
    ],
    link: [
        { rel: 'canonical', href: 'https://diener.tech' }
    ]
});
</script>