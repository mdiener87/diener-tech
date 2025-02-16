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
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Name Input -->
        <div>
          <label for="name" class="block font-medium mb-2">Name</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            required
            placeholder="Your name"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Email Input -->
        <div>
          <label for="email" class="block font-medium mb-2">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            required
            placeholder="Your email"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Message Input -->
        <div>
          <label for="message" class="block font-medium mb-2">Message</label>
          <textarea
            v-model="form.message"
            id="message"
            rows="5"
            required
            placeholder="Your message"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full text-white font-semibold py-2 px-4 rounded"
        >
          Send Message
        </button>
      </form>
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
          href="mailto:youremail@example.com"
          class="hover:underline mt-2 inline-block"
        >
          youremail@example.com
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
              class="hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/mdiener87/"
              target="_blank"
              class="hover:underline"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

// Form data
const form = reactive({
  name: "",
  email: "",
  message: "",
});

// Form submission handler
const submitForm = () => {
  // Placeholder functionality
  alert(`Thank you, ${form.name}! Your message has been sent.`);

  // Reset form
  form.name = "";
  form.email = "";
  form.message = "";
};
</script>
