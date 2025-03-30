<template>
  <main class="flex-grow">
    <!-- Hero Section with Photo -->
    <section
      class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 card-transition"
    >
      <UContainer>
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <!-- Profile Photo Container -->
          <div class="md:w-1/3 flex justify-center">
            <div
              class="relative overflow-hidden rounded-2xl border-4 border-white dark:border-gray-700 shadow-xl w-64 h-64 md:w-80 md:h-80"
            >
              <NuxtImg
                src="/images/pics/diener-mountain.jpg"
                alt="Profile Photo"
                class="object-cover w-full h-full rounded-2xl"
              />
            </div>
          </div>

          <!-- Introduction -->
          <div class="md:w-2/3 text-center md:text-left">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
            <div
              class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-fade-in"
            >
              <p
                class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
              >
                I'm a passionate software developer with experience in front-end
                technologies like
                <span class="text-primary font-medium">Vue.js</span>,
                <span class="text-primary font-medium">Node.js</span>, and
                <span class="text-primary font-medium"
                  >modern JavaScript frameworks</span
                >.
              </p>
              <p
                class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                I believe that curiosity and creativity are the foundation of
                great development, and I bring that mindset to every project I
                work on.
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- My Story Section -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">My Story</h2>

          <div class="space-y-6 text-gray-700 dark:text-gray-300">
            <p class="leading-relaxed">
              I've spent the last decade crafting intuitive, elegant, and
              impactful software solutions, driven by a deep curiosity and
              passion for technology. My career has been an exciting evolution,
              taking me from building interactive frontend experiences to
              full-stack engineering, and most recently exploring how AI and
              machine learning can enhance everyday applications.
            </p>

            <p class="leading-relaxed">
              Outside the world of software development, I'm an avid gamer, a
              passionate Dungeon Master running a rich, long-term campaign, and
              enjoy spending time outdoors hiking and exploring the beauty of
              Colorado. I'm fascinated by the intersection of technology,
              storytelling, and creativity, whether that's through experimenting
              with AI-driven narratives or diving into the immersive world of
              flight simulation.
            </p>

            <p class="leading-relaxed">
              I believe deeply in lifelong learning, always embracing new
              technologies and challenging myself to grow—not just
              professionally, but personally. My goal is to build thoughtful
              software solutions that improve people's lives, foster community,
              and help bridge the gap between complex technologies and
              meaningful user experiences.
            </p>
          </div>

          <!-- Quote Card -->
          <UCard
            class="mt-10 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary"
            color="primary"
          >
            <div class="flex items-start gap-4">
              <UIcon
                name="i-heroicons-chat-bubble-bottom-center-text"
                class="w-8 h-8 text-primary shrink-0"
              />
              <div>
                <p class="italic text-gray-700 dark:text-gray-300">
                  "The only way to make sense out of change is to plunge into
                  it, move with it, and join the dance."
                </p>
                <p class="mt-2 font-medium text-primary">— Alan Watts</p>
              </div>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Beyond Coding Section (Expanded) -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <h2 class="text-3xl font-bold mb-10 text-center">
          Beyond Coding
        </h2>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Gaming & D&D Card -->
          <UCard class="h-full transition-all hover:shadow-lg">
            <template #header>
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center"
                >
                  <UIcon
                    name="i-heroicons-sparkles"
                    class="w-6 h-6 text-purple-600 dark:text-purple-400"
                  />
                </div>
                <h3 class="text-xl font-bold">Gaming & Imagination</h3>
              </div>
            </template>

            <div class="space-y-4">
              <p class="text-gray-700 dark:text-gray-300">
                I've been an avid Dungeon Master for over a decade, running rich, narrative-driven campaigns that blend strategy, storytelling, and collaborative worldbuilding.
              </p>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-bolt" class="w-5 h-5 text-purple-500" />
                <span>Homebrew campaign creator</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-puzzle-piece" class="w-5 h-5 text-purple-500" />
                <span>Strategy & board game enthusiast</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-computer-desktop" class="w-5 h-5 text-purple-500" />
                <span>PC gaming & simulation experiences</span>
              </div>
            </div>
          </UCard>

          <!-- Outdoor Activities Card -->
          <UCard class="h-full transition-all hover:shadow-lg">
            <template #header>
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center"
                >
                  <UIcon
                    name="i-heroicons-fire"
                    class="w-6 h-6 text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h3 class="text-xl font-bold">Outdoor Pursuits</h3>
              </div>
            </template>

            <div class="space-y-4">
              <p class="text-gray-700 dark:text-gray-300">
                Living in Colorado provides endless opportunities to explore the outdoors. I'm passionate about hiking, fitness, and experiencing natural wonders.
              </p>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-map" class="w-5 h-5 text-blue-500" />
                <span>14er peak climbing</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-arrow-trending-up" class="w-5 h-5 text-blue-500" />
                <span>Weightlifting & strength training</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-camera" class="w-5 h-5 text-blue-500" />
                <span>Nature photography</span>
              </div>
            </div>
          </UCard>

          <!-- Creative & Technical Hobbies Card -->
          <UCard class="h-full transition-all hover:shadow-lg">
            <template #header>
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center"
                >
                  <UIcon
                    name="i-heroicons-light-bulb"
                    class="w-6 h-6 text-green-600 dark:text-green-400"
                  />
                </div>
                <h3 class="text-xl font-bold">Creative Projects</h3>
              </div>
            </template>

            <div class="space-y-4">
              <p class="text-gray-700 dark:text-gray-300">
                I enjoy merging technology with creativity through various hands-on projects and continuous learning.
              </p>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-cube" class="w-5 h-5 text-green-500" />
                <span>3D printing & modeling</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-academic-cap" class="w-5 h-5 text-green-500" />
                <span>Learning game development</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-beaker" class="w-5 h-5 text-green-500" />
                <span>Experimenting with AI tools</span>
              </div>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Featured Blog Posts Section -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-3">My Thoughts</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Get to know me better through my writing. Here are some selected
            articles I've written recently.
          </p>

          <div
            v-if="latestPosts.length > 0"
            class="grid md:grid-cols-2 gap-6 mt-8"
          >
            <UCard
              v-for="post in latestPosts"
              :key="post._path"
              class="text-left hover:shadow-lg transition-all duration-300"
            >
              <template #header>
                <h3 class="text-xl font-bold">
                  {{ post.title || "Untitled" }}
                </h3>
              </template>

              <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {{ post.description || "No description available." }}
              </p>

              <div class="flex justify-between items-center">
                <UBadge color="gray" variant="subtle">{{
                  formatDate(post.date)
                }}</UBadge>
                <NuxtLink
                  :to="post._path"
                  class="text-primary font-medium hover:underline"
                >
                  Read More
                </NuxtLink>
              </div>
            </UCard>
          </div>

          <div v-else class="text-center py-8">
            <UIcon
              name="i-heroicons-document-text"
              class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4"
            />
            <p class="text-gray-600 dark:text-gray-400">
              Blog posts coming soon!
            </p>
          </div>

          <UButton to="/blog" color="primary" variant="outline" class="mt-8">
            View All Posts
          </UButton>
        </div>
      </UContainer>
    </section>

    <!-- CTA Section -->
    <section class="py-12 bg-primary/5 dark:bg-gray-800 card-transition">
      <UContainer>
        <div class="max-w-3xl mx-auto text-center">
          <UIcon
            name="i-heroicons-envelope"
            class="w-16 h-16 text-primary mx-auto mb-6 opacity-80"
          />
          <h2 class="text-3xl font-bold mb-4">Let's Connect</h2>
          <p class="text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            Whether you want to discuss a project, talk about technology, or
            just say hello, I'd love to hear from you!
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <UButton
              to="/contact"
              color="primary"
              size="lg"
              icon="i-heroicons-envelope"
            >
              Get in Touch
            </UButton>
            <UButton
              to="/career"
              color="gray"
              variant="outline"
              size="lg"
              icon="i-heroicons-briefcase"
            >
              View Career
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup>
// Fetch latest blog posts for the "My Thoughts" section
const latestPosts = await queryContent("blog")
  .where({ _partial: false })
  .sort({ date: -1 })
  .limit(2)
  .find();

// Format date function
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Add SEO metadata
const { setPageMeta } = useSeo();

setPageMeta({
  title: "About Me",
  description:
    "Learn about my personal interests including gaming, hiking, 3D printing, and running D&D campaigns.",
  type: "profile",
});
</script>

<style scoped>
.card-transition {
  transition: all 0.3s ease;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects */
.text-green-500,
.text-purple-500,
.text-blue-500 {
  transition: transform 0.2s ease;
}

div:hover .text-green-500,
div:hover .text-purple-500,
div:hover .text-blue-500 {
  transform: scale(1.2);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .card-transition {
    transition: none;
  }
  .card-transition:hover {
    transform: none;
  }
  div:hover .text-green-500,
  div:hover .text-purple-500,
  div:hover .text-blue-500 {
    transform: none;
  }
}
</style>