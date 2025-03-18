<template>
  <div class="text-center py-12">
    <img 
      src="/images/error/404.svg"
      alt="404 Error"
      class="mx-auto w-64 h-64 object-contain mb-8 animate-float"
    />
    <h1 class="text-4xl font-bold mb-4">Page Not Found</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      We couldn't find the page you're looking for. It might have been moved or deleted.
    </p>
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
        @click="goBack"
        color="gray"
        variant="soft"
        icon="i-heroicons-arrow-path"
      >
        Go Back
      </UButton>
    </div>
  </div>
</template>

<script setup>
const goHome = () => navigateTo('/');
const goBack = () => {
  if (window?.history?.length > 2) {
    return navigateTo(-1);
  }
  return navigateTo('/');
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