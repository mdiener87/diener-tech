<template>
  <main class="flex-grow">
    <!-- Contact Header Section -->
    <section class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 card-transition">
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Have a project idea, a question, or just want to say hello? I'd love to hear from you!
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Contact Section with Form and Info -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <!-- Contact Form -->
          <div class="md:col-span-3">
            <UCard class="contact-card shadow-xl border border-gray-200 dark:border-gray-800 h-full transition-all">
              <template #header>
                <div class="flex items-center gap-3 mb-2">
                  <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-primary" />
                  <h2 class="text-2xl font-bold">Send Me a Message</h2>
                </div>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </template>
              
              <div class="py-4">
                <ContactForm />
              </div>
            </UCard>
          </div>
          
          <!-- Contact Information -->
          <div class="md:col-span-2 flex flex-col gap-6">
            <!-- Social Links Card -->
            <UCard class="bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg border border-gray-200 dark:border-gray-800 h-full flex-1 transition-all hover:shadow-xl">
              <div class="flex flex-col h-full">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <UIcon name="i-heroicons-globe-alt" class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 class="text-xl font-bold">Connect Online</h3>
                </div>
                
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  You can also find me on these platforms:
                </p>
                
                <ul class="space-y-3 mt-auto">
                  <li>
                    <a
                      href="https://github.com/mdiener87"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UIcon name="i-simple-icons-github" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      </div>
                      <span class="font-medium">GitHub</span>
                      <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 ml-auto text-gray-500" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/in/mdiener87/"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <UIcon name="i-simple-icons-linkedin" class="w-5 h-5 text-blue-700 dark:text-blue-300" />
                      </div>
                      <span class="font-medium">LinkedIn</span>
                      <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 ml-auto text-gray-500" />
                    </a>
                  </li>
                </ul>
              </div>
            </UCard>
          </div>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
// Add FAQs
const faqs = [
  {
    title: 'What types of projects do you work on?',
    content: 'I primarily work on web applications, API development, and full-stack projects. My focus areas include Vue.js/Nuxt, modern JavaScript/TypeScript, and cloud services.',
    icon: 'i-heroicons-code-bracket'
  },
  {
    title: 'How can I collaborate with you?',
    content: 'I\'m open to consulting opportunities, contract work, and potential partnerships on interesting projects. The best way to start is by reaching out through the contact form with details about your project or idea.',
    icon: 'i-heroicons-users'
  },
  {
    title: 'Do you offer mentoring or advice?',
    content: 'Yes, I occasionally make time for mentoring sessions and technical consultations. Feel free to reach out with specific questions or areas where you need guidance.',
    icon: 'i-heroicons-academic-cap'
  },
  {
    title: 'What is your typical response time?',
    content: 'I aim to respond to all inquiries within 24-48 hours during weekdays. For urgent matters, please indicate so in your message subject.',
    icon: 'i-heroicons-clock'
  }
];

// Add SEO metadata
const { setPageMeta } = useSeo();

setPageMeta({
  title: 'Contact Me',
  description: 'Get in touch with me for project inquiries, questions, or just to say hello. Use the contact form or connect via email and social media.',
  type: 'website'
});
</script>

<style scoped>
.card-transition {
  transition: all 0.3s ease;
}

/* Card hover effects */
.contact-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Social link hover animation */
a[target="_blank"]:hover .w-4 {
  transform: translate(2px, -2px);
  transition: transform 0.2s ease;
}
</style>

<style scoped>
.card-transition {
  transition: all 0.3s ease;
}

/* Card hover effects */
.contact-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Social link hover animation */
a[target="_blank"]:hover .w-4 {
  transform: translate(2px, -2px);
  transition: transform 0.2s ease;
}
</style>
