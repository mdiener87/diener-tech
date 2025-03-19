<template>
  <div class="container mx-auto py-10 px-6">
    <!-- Page Header -->
    <h1 class="text-4xl font-bold mb-6">Get in Touch</h1>
    <p class="text-lg mb-8">
      Have a project idea, a question, or just want to say hello? Reach out
      using the form below or the provided contact info.
    </p>

    <!-- Contact Form Section -->
    <UCard class="shadow-lg mb-10">
      <template #header>
        <h2 class="text-2xl font-semibold">Send Me a Message</h2>
      </template>
      <ContactForm />
    </UCard>

    <!-- Contact Info Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Email Section -->
      <UCard class="shadow-md">
        <template #header>
          <h3 class="text-xl font-semibold">Email</h3>
        </template>
        <p class="">Prefer to reach out directly? Drop me an email at:</p>
        <a
          href="mailto:contact@diener.tech"
          class="text-primary-600 hover:text-primary-700 hover:underline mt-2 inline-block"
        >
          contact@diener.tech
        </a>
      </UCard>

      <!-- Social Links Section -->
      <UCard class="shadow-md">
        <template #header>
          <h3 class="text-xl font-semibold">Social Links</h3>
        </template>
        <p class="">You can also connect with me on social platforms:</p>
        <ul class="mt-2 space-y-2">
          <li>
            <a
              href="https://github.com/mdiener87"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary-600 hover:text-primary-700 hover:underline inline-flex items-center"
            >
              <Icon name="mdi:github" class="w-5 h-5 mr-2" />
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/mdiener87/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary-600 hover:text-primary-700 hover:underline inline-flex items-center"
            >
              <Icon name="mdi:linkedin" class="w-5 h-5 mr-2" />
              LinkedIn
            </a>
          </li>
        </ul>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// Add SEO metadata
const { setPageMeta } = useSeo();

setPageMeta({
  title: 'Contact Me',
  description: 'Get in touch with me for project inquiries, questions, or just to say hello. Use the contact form or connect via email and social media.',
  type: 'website'
});
</script>
