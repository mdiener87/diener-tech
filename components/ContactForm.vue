<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Form Header with Attempt Counter -->
    <div v-if="remainingAttempts !== null" class="flex justify-between items-center mb-2">
      <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <UIcon name="i-heroicons-shield-check" class="w-4 h-4 text-green-500" v-if="recaptchaReady" />
        <UIcon name="i-heroicons-shield-exclamation" class="w-4 h-4 text-yellow-500" v-else />
        <span>{{ recaptchaReady ? 'Protected by reCAPTCHA' : 'reCAPTCHA loading...' }}</span>
      </div>
      
      <UBadge 
        :color="remainingAttempts > 1 ? 'green' : remainingAttempts === 1 ? 'yellow' : 'red'"
        variant="subtle"
        size="sm"
      >
        {{ remainingAttempts }} {{ remainingAttempts === 1 ? 'submission' : 'submissions' }} remaining
      </UBadge>
    </div>

    <div class="space-y-6">
      <!-- Name Field -->
      <UFormGroup label="Name" required>
        <UInput
          v-model="form.name"
          type="text"
          required
          autocomplete="name"
          :disabled="isSubmitting"
          placeholder="Your name"
          :ui="{ 
            base: 'relative w-full',
            input: 'form-input block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500' 
          }"
          icon="i-heroicons-user"
        />
      </UFormGroup>

      <!-- Email Field -->
      <UFormGroup label="Email" required>
        <UInput
          v-model="form.email"
          type="email"
          required
          autocomplete="email"
          :disabled="isSubmitting"
          placeholder="your.email@example.com"
          :ui="{ 
            base: 'relative w-full',
            input: 'form-input block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500' 
          }"
          icon="i-heroicons-envelope"
        />
      </UFormGroup>

      <!-- Subject Field (new) -->
      <UFormGroup label="Subject">
        <UInput
          v-model="form.subject"
          type="text"
          autocomplete="off"
          :disabled="isSubmitting"
          placeholder="What's this regarding?"
          :ui="{ 
            base: 'relative w-full',
            input: 'form-input block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500' 
          }"
          icon="i-heroicons-chat-bubble-bottom-center-text"
        />
      </UFormGroup>

      <!-- Message Field -->
      <UFormGroup label="Message" required>
        <UTextarea
          v-model="form.message"
          required
          :rows="5"
          :disabled="isSubmitting"
          placeholder="Your message"
          :ui="{
            base: 'relative w-full',
            input: 'form-textarea block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500'
          }"
        />
      </UFormGroup>

      <!-- Honeypot field - hidden from users -->
      <input
        v-model="form.website"
        type="text"
        style="opacity: 0; position: absolute; height: 0; width: 0; z-index: -1;"
        tabindex="-1"
        aria-hidden="true"
        autocomplete="off"
      >
    </div>

    <!-- Form Actions -->
    <div>
      <UButton
        type="submit"
        :loading="isSubmitting"
        :disabled="isSubmitting || remainingAttempts === 0 || !recaptchaReady"
        color="primary"
        size="lg"
        block
        :ui="{
          rounded: 'rounded-lg',
          padding: 'py-3 px-4',
          font: 'font-medium'
        }"
      >
        <template #leading>
          <UIcon v-if="!isSubmitting" name="i-heroicons-paper-airplane" class="w-5 h-5" />
        </template>
        {{ isSubmitting ? 'Sending Message...' : 'Send Message' }}
      </UButton>
      
      <!-- Rate Limit Notice -->
      <div 
        v-if="remainingAttempts === 0" 
        class="mt-3 text-center text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg"
      >
        <UIcon name="i-heroicons-clock" class="w-4 h-4 inline-block mr-1" />
        Rate limit reached. Please try again in an hour.
      </div>
      
      <!-- reCAPTCHA Notice - Required when hiding the badge -->
      <div class="text-xs text-center text-gray-500 dark:text-gray-400 mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
        <p>
          This site is protected by reCAPTCHA and the
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Google Privacy Policy</a> and
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Terms of Service</a> apply.
        </p>
      </div>
    </div>

    <!-- Status Messages -->
    <UAlert
      v-if="status"
      :type="status.type === 'success' ? 'success' : 'error'"
      :title="status.type === 'success' ? 'Message Sent!' : 'Error'"
      :description="status.message"
      variant="soft"
      class="animate-fade-in"
    />

    <!-- Debug section - only visible in development -->
    <div v-if="isDev" class="mt-8 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
      <details>
        <summary class="text-sm font-semibold mb-2 cursor-pointer">Debug Tools</summary>
        <div class="space-y-2 pt-2">
          <div class="flex flex-wrap gap-2">
            <UButton size="xs" @click="checkReCaptchaStatus" color="gray" icon="i-heroicons-document-check">
              Check reCAPTCHA Status
            </UButton>
            <UButton size="xs" @click="loadReCaptcha" color="gray" :loading="isLoading" icon="i-heroicons-arrow-path">
              {{ isLoaded ? 'Reload reCAPTCHA' : 'Load reCAPTCHA' }}
            </UButton>
            <UButton size="xs" @click="resetRecaptcha" color="gray" icon="i-heroicons-x-mark">
              Reset reCAPTCHA
            </UButton>
          </div>
          <div v-if="recaptchaStatusData" class="text-xs space-y-1 mt-2 bg-gray-50 dark:bg-gray-800 p-3 rounded">
            <div><span class="font-medium">Site Key:</span> {{ recaptchaStatusData.hasSiteKey ? '✓' : '✗' }} (length: {{ recaptchaStatusData.siteKeyLength }})</div>
            <div><span class="font-medium">Secret Key:</span> {{ recaptchaStatusData.hasSecretKey ? '✓' : '✗' }} (length: {{ recaptchaStatusData.secretKeyLength }})</div>
            <div><span class="font-medium">Client Status:</span> {{ isLoaded ? 'Loaded ✓' : 'Not Loaded ✗' }}</div>
            <div><span class="font-medium">Site Key Prefix:</span> {{ recaptchaStatusData.siteKeyPrefix || 'N/A' }}</div>
          </div>
        </div>
      </details>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
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
    siteKeyPrefix?: string;
    secretKeyPrefix?: string;
  };
}

// Enhanced form with subject field
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '' // honeypot
})

const isSubmitting = ref(false)
const isVerifying = ref(false)
const status = ref<{ type: 'success' | 'error', message: string } | null>(null)
const remainingAttempts = ref<number | null>(null)
const { executeReCaptcha, isLoaded, isLoading, cleanup: cleanupRecaptcha } = useReCaptcha()
const recaptchaStatusData = ref<ReCaptchaStatusResponse['data'] | null>(null)

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development'

// Computed property to determine if reCAPTCHA is ready to use
const recaptchaReady = computed(() => {
  // In development, we consider reCAPTCHA always ready
  if (isDev) return true
  
  // In production, check if it's loaded
  return isLoaded.value
})

const handleSubmit = async () => {
  try {
    // Reset status and set submitting state
    status.value = null
    isSubmitting.value = true
    isVerifying.value = true

    // Honeypot check - if filled, silently fail but pretend success
    if (form.value.website) {
      console.warn('Honeypot triggered')
      await new Promise(resolve => setTimeout(resolve, 1500)) // Fake delay
      
      status.value = {
        type: 'success',
        message: 'Message sent successfully! We\'ll get back to you soon.'
      }
      
      resetForm()
      return
    }

    let recaptchaToken = '';
    
    // Only execute reCAPTCHA in production
    if (process.env.NODE_ENV !== 'development') {
      try {
        recaptchaToken = await executeReCaptcha('submit_contact')
        console.log('reCAPTCHA token received')
      } catch (error) {
        console.error('reCAPTCHA error:', error)
        throw new Error('Failed to verify security check. Please refresh the page and try again.')
      }

      // Validate token is not empty
      if (!recaptchaToken) {
        throw new Error('Security validation failed. Please refresh the page and try again.')
      }
    } else {
      console.log('Development mode: Using test reCAPTCHA token')
      recaptchaToken = 'dev-mode-token'
    }
    
    isVerifying.value = false

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject || 'Contact Form Submission',
        message: form.value.message,
        recaptchaToken
      })
    })

    const data = await response.json() as ContactFormResponse

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send message. Please try again later.')
    }

    // Update remaining attempts
    remainingAttempts.value = data.remainingAttempts

    if (response.status === 200) {
      status.value = {
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you as soon as possible.'
      }

      // Reset form
      resetForm()
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

// Reset form to initial state
const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: '',
    website: ''
  }
}

// Reset reCAPTCHA (for debugging)
const resetRecaptcha = () => {
  cleanupRecaptcha()
  setTimeout(() => {
    loadReCaptcha()
  }, 500)
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

// Cleanup function to remove reCAPTCHA before component is destroyed
onBeforeUnmount(() => {
  cleanupRecaptcha()
})

// Fetch initial remaining attempts and setup
onMounted(async () => {
  try {
    // Get rate limit info
    const response = await fetch('/api/contact/rate-limit')
    const data = await response.json() as ContactFormResponse
    remainingAttempts.value = data.remainingAttempts
    
    // In development mode, check reCAPTCHA status
    if (isDev) {
      await checkReCaptchaStatus()
    }
  } catch (error) {
    console.error('Failed to fetch rate limit info:', error)
  }
})
</script>

<style scoped>
/* Form animations */
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Improve focus states */
:deep(input:focus), :deep(textarea:focus) {
  box-shadow: 0 0 0 2px rgba(var(--color-primary-500), 0.3);
}

/* Debug section styling */
details summary {
  list-style: none;
}

details summary::-webkit-details-marker {
  display: none;
}

details summary::before {
  content: '►';
  display: inline-block;
  width: 1em;
  margin-right: 0.5em;
  transform: rotate(0);
  transition: transform 0.2s;
}

details[open] summary::before {
  transform: rotate(90deg);
}
</style>