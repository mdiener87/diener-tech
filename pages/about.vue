<template>
  <div class="container flex flex-col flex-grow mx-auto py-10 px-6">
    <h1 class="text-4xl font-bold text-gray-900 mb-6">About Me</h1>

    <UCard class="mb-6 shadow-lg">
      <template #header>
        <h2 class="text-2xl font-semibold">Welcome to My World 🌍</h2>
      </template>
      <p class="text-gray-100 leading-relaxed">
        I'm a passionate software developer with experience in front-end
        technologies like
        <strong>Vue.js</strong>, <strong>Node.js</strong>, and
        <strong>AngularJS</strong>. I enjoy crafting clean, intuitive user
        experiences and solving complex problems.
      </p>
      <p class="text-gray-100 mt-4 leading-relaxed">
        Beyond development, I love hiking, weightlifting, 3D printing, and
        running Dungeons & Dragons campaigns. I believe that curiosity and
        creativity are what make great developers.
      </p>
    </UCard>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Experience Section -->
      <UCard class="shadow-md">
        <template #header>
          <h3 class="text-xl font-semibold">My Experience</h3>
        </template>
        <ul class="list-disc list-inside text-gray-100 leading-relaxed">
          <li>7+ years working as a front-end engineer.</li>
          <li>
            Expertise in <strong>Vue.js</strong>, <strong>Node.js</strong>, and
            modern JavaScript frameworks.
          </li>
          <li>
            Proficiency in building high-performance, scalable web applications.
          </li>
          <li>Experience with Python and .NET for back-end development.</li>
        </ul>
      </UCard>

      <!-- Personal Interests Section -->
      <UCard class="shadow-md">
        <template #header>
          <h3 class="text-xl font-semibold">Personal Interests</h3>
        </template>
        <ul class="list-disc list-inside text-gray-100 leading-relaxed">
          <li>Exploring new technologies and open-source projects.</li>
          <li>3D printing functional and artistic creations.</li>
          <li>
            Training and enjoying the great outdoors—running, hiking, and
            weightlifting.
          </li>
          <li>Hosting D&D campaigns and sharing adventures with friends.</li>
        </ul>
      </UCard>
    </div>

    <!-- CTA Section -->
    <div class="text-center mt-10">
      <h3 class="text-2xl font-semibold text-gray-900 mb-4">
        Want to work together or say hello?
      </h3>
      <NuxtLink
        to="/contact"
        class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Get in Touch
      </NuxtLink>
    </div>
  </div>
</template>

<script setup></script>
