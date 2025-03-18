<template>
  <div class="min-h-[70vh] flex items-center justify-center p-4">
    <div class="max-w-2xl w-full text-center">
      <!-- Error Image -->
      <img 
        :src="errorImage" 
        :alt="error?.statusCode?.toString() || 'Error'" 
        class="mx-auto w-64 h-64 object-contain mb-8 animate-float"
      />
      
      <!-- Error Content -->
      <h1 class="text-4xl font-bold mb-4" :class="{'text-red-500': isServerError}">
        {{ errorTitle }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        {{ errorMessage }}
      </p>

      <!-- Action Buttons -->
      <div class="flex justify-center gap-4">
        <UButton
          @click="goHome"
          color="primary"
          variant="solid"
          icon="i-heroicons-home"
        >
          Go Home
        </UButton>
        <UButton
          v-if="canRetry"
          @click="retry"
          color="gray"
          variant="soft"
          icon="i-heroicons-arrow-path"
        >
          Try Again
        </UButton>
      </div>

      <!-- Technical Details (only in development) -->
      <div v-if="showTechnicalDetails" class="mt-8 text-left">
        <UAccordion :items="[{
          label: 'Technical Details',
          content: error,
          icon: 'i-heroicons-exclamation-triangle',
          defaultOpen: true
        }]">
          <template #content="{ item }">
            <pre class="text-sm overflow-x-auto whitespace-pre-wrap">{{ item.content }}</pre>
          </template>
        </UAccordion>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ErrorProps {
  error: {
    statusCode?: number;
    statusMessage?: string;
    url?: string;
    data?: any;
    message?: string;
  };
}

const props = defineProps<ErrorProps>();

const isServerError = computed(() => {
  const statusCode = props.error?.statusCode || 500;
  return statusCode >= 500;
});

const canRetry = computed(() => {
  return isServerError.value || props.error?.statusCode === 408;
});

const errorImage = computed(() => {
  switch (props.error?.statusCode) {
    case 404:
      return '/images/error/404.svg';
    case 403:
      return '/images/error/403.svg';
    case 500:
      return '/images/error/500.svg';
    default:
      return '/images/error/generic.svg';
  }
});

const errorTitle = computed(() => {
  switch (props.error?.statusCode) {
    case 404:
      return 'Page Not Found';
    case 403:
      return 'Access Denied';
    case 500:
      return 'Server Error';
    case 408:
      return 'Request Timeout';
    default:
      return 'Oops! Something Went Wrong';
  }
});

const errorMessage = computed(() => {
  // Use statusMessage if available, otherwise fall back to message or default text
  if (props.error?.statusMessage) {
    return props.error.statusMessage;
  }
  
  switch (props.error?.statusCode) {
    case 404:
      return "We couldn't find the page you're looking for. It might have been moved or deleted.";
    case 403:
      return "Sorry, you don't have permission to access this page.";
    case 500:
      return "Our servers are having a bit of trouble. We're working on fixing it!";
    case 408:
      return 'The request took too long to complete. Please try again.';
    default:
      return props.error?.message || 'An unexpected error occurred. Please try again later.';
  }
});

const showTechnicalDetails = computed(() => {
  return process.env.NODE_ENV === 'development';
});

const goHome = () => navigateTo('/');

const retry = () => {
  if (props.error?.url) {
    return navigateTo(props.error.url);
  }
  window.location.reload();
};
</script>

<style scoped>
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style> 