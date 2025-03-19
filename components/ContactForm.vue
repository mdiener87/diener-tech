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

    <!-- Debug section - only visible in development -->
    <div v-if="isDev" class="mt-8 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
      <h3 class="text-sm font-semibold mb-2">Debug Tools</h3>
      <div class="space-y-2">
        <div class="flex space-x-2">
          <UButton size="xs" @click="checkReCaptchaStatus" color="gray">Check reCAPTCHA Status</UButton>
          <UButton size="xs" @click="loadReCaptcha" color="gray" :loading="isLoading">
            {{ isLoaded ? 'Reload reCAPTCHA' : 'Load reCAPTCHA' }}
          </UButton>
        </div>
        <div v-if="recaptchaStatusData" class="text-xs space-y-1 mt-2">
          <div><span class="font-medium">Site Key:</span> {{ recaptchaStatusData.hasSiteKey ? '✓' : '✗' }} (length: {{ recaptchaStatusData.siteKeyLength }})</div>
          <div><span class="font-medium">Secret Key:</span> {{ recaptchaStatusData.hasSecretKey ? '✓' : '✗' }} (length: {{ recaptchaStatusData.secretKeyLength }})</div>
          <div><span class="font-medium">Client Status:</span> {{ isLoaded ? 'Loaded ✓' : 'Not Loaded ✗' }}</div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useReCaptcha } from '~/composables/useReCaptcha'

interface ContactFormResponse {
  remainingAttempts: number;
  message?: string;
}

interface ReCaptchaStatusResponse {
  status: string;
  data: {
    hasSecretKey: boolean;
    secretKeyLength: number;
    hasSiteKey: boolean;
    siteKeyLength: number;
    timestamp: string;
  };
}

const form = ref({
  name: '',
  email: '',
  message: '',
  website: '' // honeypot
})

const isSubmitting = ref(false)
const isVerifying = ref(false)
const status = ref<{ type: 'success' | 'error', message: string } | null>(null)
const remainingAttempts = ref<number | null>(null)
const { executeReCaptcha, isLoaded, isLoading } = useReCaptcha()
const recaptchaStatusData = ref<ReCaptchaStatusResponse['data'] | null>(null)

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development'

const handleSubmit = async () => {
  try {
    status.value = null
    isSubmitting.value = true
    isVerifying.value = true

    // Honeypot check
    if (form.value.website) {
      throw new Error('Invalid submission')
    }

    let recaptchaToken = '';
    
    // Only execute reCAPTCHA in production
    if (process.env.NODE_ENV !== 'development') {
      console.log('Executing reCAPTCHA verification...')
      // Get reCAPTCHA token
      try {
        recaptchaToken = await executeReCaptcha('submit_contact')
        console.log('reCAPTCHA token received:', recaptchaToken.substring(0, 20) + '...')
      } catch (error) {
        console.error('reCAPTCHA error:', error)
        throw new Error('Failed to verify reCAPTCHA. Please try again.')
      }

      // Validate token is not empty
      if (!recaptchaToken) {
        throw new Error('Invalid reCAPTCHA response. Please try again.')
      }
    } else {
      console.log('Development mode: Skipping reCAPTCHA verification')
    }
    
    isVerifying.value = false

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

    const data = await response.json() as ContactFormResponse

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
    console.error('Form submission error:', error)
    status.value = {
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to send message. Please try again later.'
    }
  } finally {
    isSubmitting.value = false
    isVerifying.value = false
  }
}

// Debug function to check reCAPTCHA status
const checkReCaptchaStatus = async () => {
  try {
    const response = await fetch('/api/recaptcha-status')
    if (!response.ok) {
      console.error('Failed to fetch reCAPTCHA status:', await response.text())
      return
    }
    const data = await response.json() as ReCaptchaStatusResponse
    recaptchaStatusData.value = data.data
    console.log('reCAPTCHA status:', data.data)
  } catch (error) {
    console.error('Failed to check reCAPTCHA status:', error)
  }
}

// Load reCAPTCHA manually for debugging
const loadReCaptcha = async () => {
  try {
    console.log('Manually loading reCAPTCHA...')
    await executeReCaptcha('load_test')
    console.log('reCAPTCHA loaded successfully')
  } catch (error) {
    console.error('Failed to manually load reCAPTCHA:', error)
  }
}

// Fetch initial remaining attempts
onMounted(async () => {
  try {
    const response = await fetch('/api/contact/rate-limit')
    const data = await response.json() as ContactFormResponse
    remainingAttempts.value = data.remainingAttempts
    
    // In development, check reCAPTCHA status on load
    if (isDev) {
      await checkReCaptchaStatus()
    }
  } catch (error) {
    console.error('Failed to fetch rate limit info:', error)
  }
})
</script> 