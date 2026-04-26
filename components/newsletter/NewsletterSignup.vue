<template>
  <!-- Full variant: used on homepage and end of blog posts -->
  <section
    v-if="!compact"
    class="py-12 bg-primary/5 dark:bg-gray-800/50 card-transition"
  >
    <UContainer>
      <div class="max-w-2xl mx-auto text-center">
        <UIcon
          name="i-heroicons-envelope-open"
          class="w-10 h-10 text-primary mx-auto mb-4"
        />
        <h2 class="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
          Stay in the Loop
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Part engineering log, part learning journal — get dispatches from the workshop delivered to your inbox.
        </p>

        <Transition name="fade" mode="out-in">
          <div v-if="success" key="success">
            <UAlert
              color="green"
              variant="soft"
              icon="i-heroicons-check-circle"
              title="You're in!"
              description="Check your email for a confirmation link from Buttondown."
              class="max-w-md mx-auto"
            />
          </div>

          <form
            v-else
            key="form"
            @submit.prevent="handleSubscribe"
            class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <UInput
              v-model="email"
              type="email"
              name="email"
              required
              placeholder="your.email@example.com"
              icon="i-heroicons-envelope"
              :disabled="isSubmitting"
              class="flex-1"
              :ui="{
                base: 'relative w-full',
                input: 'block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500'
              }"
            />
            <UButton
              type="submit"
              color="primary"
              size="md"
              :loading="isSubmitting"
              :disabled="isSubmitting"
              icon="i-heroicons-arrow-right"
              icon-right
            >
              Subscribe
            </UButton>
          </form>
        </Transition>

        <UAlert
          v-if="error"
          color="red"
          variant="soft"
          icon="i-heroicons-exclamation-circle"
          :title="error"
          class="max-w-md mx-auto mt-4"
        />

        <p class="mt-4 text-xs text-gray-400 dark:text-gray-500">
          Powered by
          <a
            href="https://buttondown.com/refer/dienertech"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-primary transition-colors"
          >Buttondown</a>.
          No spam — unsubscribe anytime.
        </p>
      </div>
    </UContainer>
  </section>

  <!-- Compact variant: used in footer -->
  <div v-else class="space-y-2">
    <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">
      Stay in the Loop
    </p>

    <Transition name="fade" mode="out-in">
      <p
        v-if="success"
        key="success"
        class="text-sm text-green-600 dark:text-green-400 flex items-center gap-1.5"
      >
        <UIcon name="i-heroicons-check-circle" class="w-4 h-4 shrink-0" />
        Check your email for a confirmation link!
      </p>

      <form
        v-else
        key="form"
        @submit.prevent="handleSubscribe"
        class="flex gap-2"
      >
        <UInput
          v-model="email"
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          :disabled="isSubmitting"
          size="sm"
          class="flex-1 min-w-0"
          :ui="{
            base: 'relative w-full',
            input: 'block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500'
          }"
        />
        <UButton
          type="submit"
          color="primary"
          size="sm"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          Subscribe
        </UButton>
      </form>
    </Transition>

    <p v-if="error" class="text-xs text-red-500 dark:text-red-400">{{ error }}</p>

    <p class="text-xs text-gray-400 dark:text-gray-500">
      Powered by
      <a
        href="https://buttondown.com/refer/dienertech"
        target="_blank"
        rel="noopener noreferrer"
        class="underline hover:text-primary transition-colors"
      >Buttondown</a>.
      No spam.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  compact: {
    type: Boolean,
    default: false
  }
})

const email = ref('')
const isSubmitting = ref(false)
const success = ref(false)
const error = ref('')

const handleSubscribe = async () => {
  error.value = ''
  isSubmitting.value = true

  try {
    const body = new URLSearchParams({ email: email.value })
    await fetch('https://buttondown.com/api/emails/embed-subscribe/dienertech', {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      mode: 'no-cors'
    })
    success.value = true
    email.value = ''
  } catch {
    error.value = 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
