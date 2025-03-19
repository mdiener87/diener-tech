<template>
  <form @submit.prevent="handleSubmit" class="max-w-lg mx-auto space-y-6">
    <div v-if="remainingAttempts !== null" class="text-sm text-gray-500 dark:text-gray-400">
      {{ remainingAttempts }} submissions remaining this hour
    </div>

    <div class="space-y-4">
      <UFormGroup label="Name">
        <UInput
          v-model="form.name"
          type="text"
          required
          autocomplete="name"
          :disabled="isSubmitting"
          placeholder="Your name"
        />
      </UFormGroup>

      <UFormGroup label="Email">
        <UInput
          v-model="form.email"
          type="email"
          required
          autocomplete="email"
          :disabled="isSubmitting"
          placeholder="your.email@example.com"
        />
      </UFormGroup>

      <UFormGroup label="Message">
        <UTextarea
          v-model="form.message"
          required
          :rows="5"
          :disabled="isSubmitting"
          placeholder="Your message"
        />
      </UFormGroup>

      <!-- Honeypot field -->
      <input
        v-model="form.website"
        type="text"
        style="opacity: 0; position: absolute; z-index: -1;"
        tabindex="-1"
        autocomplete="off"
      >
    </div>

    <div class="flex items-center justify-between">
      <UButton
        type="submit"
        :loading="isSubmitting"
        :disabled="isSubmitting || remainingAttempts === 0"
        color="primary"
      >
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </UButton>

      <UBadge
        v-if="remainingAttempts === 0"
        color="red"
        variant="subtle"
      >
        Rate limit reached. Please try again later.
      </UBadge>
    </div>

    <UAlert
      v-if="status"
      :type="status.type === 'success' ? 'success' : 'error'"
      :title="status.type === 'success' ? 'Success!' : 'Error'"
      :description="status.message"
    />
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useReCaptcha } from '~/composables/useReCaptcha'

const form = ref({
  name: '',
  email: '',
  message: '',
  website: '' // honeypot
})

const isSubmitting = ref(false)
const status = ref<{ type: 'success' | 'error', message: string } | null>(null)
const remainingAttempts = ref<number | null>(null)
const { executeReCaptcha } = useReCaptcha()

const handleSubmit = async () => {
  try {
    status.value = null
    isSubmitting.value = true

    // Honeypot check
    if (form.value.website) {
      throw new Error('Invalid submission')
    }

    // Get reCAPTCHA token
    const recaptchaToken = await executeReCaptcha('submit_contact')

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...form.value,
        recaptchaToken
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send message')
    }

    // Update remaining attempts
    remainingAttempts.value = data.remainingAttempts

    if (response.status === 200) {
      status.value = {
        type: 'success',
        message: 'Message sent successfully! We\'ll get back to you soon.'
      }

      // Reset form
      form.value = {
        name: '',
        email: '',
        message: '',
        website: ''
      }
    }
  } catch (error) {
    status.value = {
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to send message. Please try again later.'
    }
  } finally {
    isSubmitting.value = false
  }
}

// Fetch initial remaining attempts
onMounted(async () => {
  try {
    const response = await fetch('/api/contact/rate-limit')
    const data = await response.json()
    remainingAttempts.value = data.remainingAttempts
  } catch (error) {
    console.error('Failed to fetch rate limit info:', error)
  }
})
</script> 