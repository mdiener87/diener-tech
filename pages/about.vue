<template>
  <main class="flex-grow">
    <!-- Hero Section with Photo -->
    <section class="py-16 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 card-transition">
      <UContainer>
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <!-- Profile Photo Container -->
          <div class="md:w-1/3 flex justify-center">
            <div class="relative overflow-hidden rounded-2xl border-4 border-white dark:border-gray-700 shadow-xl w-64 h-64 md:w-80 md:h-80">
              <NuxtImg
                src="/images/pics/diener_windy_peak.jpg"
                alt="Profile Photo"
                class="object-cover w-full h-full rounded-2xl"
              />              
            </div>
          </div>
          
          <!-- Introduction -->
          <div class="md:w-2/3 text-center md:text-left">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
            <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-fade-in">
              <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                I'm a passionate software developer with experience in front-end technologies like 
                <span class="text-primary font-medium">Vue.js</span>, 
                <span class="text-primary font-medium">Node.js</span>, and
                <span class="text-primary font-medium">modern JavaScript frameworks</span>.
              </p>
              <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I believe that curiosity and creativity are the foundation of great development, 
                and I bring that mindset to every project I work on.
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
              [Your story paragraph 1 - Share your journey into tech, what motivated you, and how you got started. This can include your education, what sparked your interest in software development, and your early career experiences.]
            </p>
            
            <p class="leading-relaxed">
              [Your story paragraph 2 - Talk about significant milestones in your career, pivotal projects, or learning experiences that shaped your development philosophy. This helps visitors understand your growth trajectory.]
            </p>
            
            <p class="leading-relaxed">
              [Your story paragraph 3 - Discuss what you're focused on now, your current interests in technology, and where you see yourself heading. This gives visitors a sense of your present and future direction.]
            </p>
          </div>
          
          <!-- Quote Card -->
          <UCard class="mt-10 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary" color="primary">
            <div class="flex items-start gap-4">
              <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="w-8 h-8 text-primary shrink-0" />
              <div>
                <p class="italic text-gray-700 dark:text-gray-300">
                  "Your favorite quote or personal philosophy about development, creativity, or life in general."
                </p>
                <p class="mt-2 font-medium text-primary">— Your Name</p>
              </div>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Skills & Experience Section -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800 card-transition">
      <UContainer>
        <h2 class="text-3xl font-bold mb-10 text-center">Skills & Experience</h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Professional Experience -->
          <UCard class="h-full transition-all hover:shadow-lg">
            <template #header>
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <UIcon name="i-heroicons-briefcase" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 class="text-xl font-bold">Professional Experience</h3>
              </div>
            </template>
            
            <div class="space-y-6">
              <!-- Experience Item -->
              <div class="experience-item">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-bold text-gray-900 dark:text-white">Senior Software Engineer</h4>
                  <UBadge color="blue" variant="subtle">2021 - Present</UBadge>
                </div>
                <h5 class="text-primary font-medium mb-2">Company Name</h5>
                <p class="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  [Brief description of your role, responsibilities, and key achievements. Focus on impact and results.]
                </p>
                <div class="flex flex-wrap gap-2">
                  <UBadge color="gray" variant="subtle" size="xs">Vue.js</UBadge>
                  <UBadge color="gray" variant="subtle" size="xs">Node.js</UBadge>
                  <UBadge color="gray" variant="subtle" size="xs">TypeScript</UBadge>
                </div>
              </div>
              
              <UDivider />
              
              <!-- Experience Item -->
              <div class="experience-item">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-bold text-gray-900 dark:text-white">Software Engineer</h4>
                  <UBadge color="blue" variant="subtle">2018 - 2021</UBadge>
                </div>
                <h5 class="text-primary font-medium mb-2">Previous Company</h5>
                <p class="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  [Brief description of your role, responsibilities, and key achievements. Focus on impact and results.]
                </p>
                <div class="flex flex-wrap gap-2">
                  <UBadge color="gray" variant="subtle" size="xs">JavaScript</UBadge>
                  <UBadge color="gray" variant="subtle" size="xs">Python</UBadge>
                  <UBadge color="gray" variant="subtle" size="xs">.NET</UBadge>
                </div>
              </div>
            </div>
          </UCard>
          
          <!-- Technical Skills -->
          <div class="grid gap-6">
            <!-- Expertise Card -->
            <UCard class="transition-all hover:shadow-lg">
              <template #header>
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <UIcon name="i-heroicons-code-bracket" class="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 class="text-xl font-bold">Technical Expertise</h3>
                </div>
              </template>
              
              <div class="grid grid-cols-2 gap-4">
                <!-- Skill Category -->
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-3">Frontend</h4>
                  <ul class="space-y-2">
                    <li class="flex items-center gap-2">
                      <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500" />
                      <span>Vue.js / Nuxt</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500" />
                      <span>JavaScript / TypeScript</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500" />
                      <span>Responsive Design</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500" />
                      <span>UI/UX Principles</span>
                    </li>
                  </ul>
                </div>
                
                <!-- Skill Category -->
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-3">Backend</h4>
                  <ul class="space-y-2">
                    <li class="flex items-center gap-2">
                      <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500" />
                      <span>Node.js</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500" />
                      <span>Python</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500" />
                      <span>.NET</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500" />
                      <span>RESTful APIs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </UCard>
            
            <!-- Personal Interests Card -->
            <UCard class="transition-all hover:shadow-lg">
              <template #header>
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <UIcon name="i-heroicons-heart" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 class="text-xl font-bold">Beyond Coding</h3>
                </div>
              </template>
              
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                When I'm not crafting code, you'll find me engaged in a variety of activities that fuel my creativity and well-being:
              </p>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-3">
                  <div class="flex items-center gap-2">
                    <UIcon name="i-heroicons-globe-alt" class="w-5 h-5 text-purple-500" />
                    <span>Exploring new technologies</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <UIcon name="i-heroicons-cube" class="w-5 h-5 text-purple-500" />
                    <span>3D printing creations</span>
                  </div>
                </div>
                
                <div class="flex flex-col gap-3">
                  <div class="flex items-center gap-2">
                    <UIcon name="i-heroicons-fire" class="w-5 h-5 text-purple-500" />
                    <span>Weightlifting & hiking</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <UIcon name="i-heroicons-sparkles" class="w-5 h-5 text-purple-500" />
                    <span>Hosting D&D campaigns</span>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Featured Blog Posts Section -->
    <section class="py-12 bg-white dark:bg-gray-900 card-transition">
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-3">My Thoughts</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Get to know me better through my writing. Here are some selected articles I've written recently.
          </p>
          
          <div v-if="latestPosts.length > 0" class="grid md:grid-cols-2 gap-6 mt-8">
            <UCard 
              v-for="post in latestPosts" 
              :key="post._path" 
              class="text-left hover:shadow-lg transition-all duration-300"
            >
              <template #header>
                <h3 class="text-xl font-bold">{{ post.title || 'Untitled' }}</h3>
              </template>
              
              <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {{ post.description || 'No description available.' }}
              </p>
              
              <div class="flex justify-between items-center">
                <UBadge color="gray" variant="subtle">{{ formatDate(post.date) }}</UBadge>
                <NuxtLink :to="post._path" class="text-primary font-medium hover:underline">
                  Read More
                </NuxtLink>
              </div>
            </UCard>
          </div>
          
          <div v-else class="text-center py-8">
            <UIcon name="i-heroicons-document-text" class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <p class="text-gray-600 dark:text-gray-400">Blog posts coming soon!</p>
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
          <UIcon name="i-heroicons-envelope" class="w-16 h-16 text-primary mx-auto mb-6 opacity-80" />
          <h2 class="text-3xl font-bold mb-4">Let's Connect</h2>
          <p class="text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            Whether you want to discuss a project, talk about technology, or just say hello, I'd love to hear from you!
          </p>
          <UButton to="/contact" color="primary" size="lg" icon="i-heroicons-envelope">
            Get in Touch
          </UButton>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<script setup>
// Fetch latest blog posts for the "My Thoughts" section
const latestPosts = await queryContent('blog')
  .where({ _partial: false })
  .sort({ date: -1 })
  .limit(2)
  .find();

// Format date function
function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Add SEO metadata
const { setPageMeta } = useSeo();

setPageMeta({
  title: 'About Me',
  description: 'Learn about my experience as a software developer, my skills in Vue.js and Node.js, and my personal interests including hiking, 3D printing, and running D&D campaigns.',
  type: 'profile'
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
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Experience items hover effect */
.experience-item {
  transition: transform 0.3s ease;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.experience-item:hover {
  background-color: rgba(var(--color-primary-50), 0.5);
  transform: translateX(4px);
}

.dark .experience-item:hover {
  background-color: rgba(var(--color-primary-900), 0.2);
}

/* Skill items animations */
.text-green-500, .text-purple-500 {
  transition: transform 0.2s ease;
}

li:hover .text-green-500, 
div:hover .text-purple-500 {
  transform: scale(1.2);
}
</style>
