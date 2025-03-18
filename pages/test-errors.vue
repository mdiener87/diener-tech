<template>
  <div class="container mx-auto py-10 px-6">
    <h1 class="text-3xl font-bold mb-8">Test Error Pages</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">403 Forbidden</h2>
        </template>
        <p class="mb-4">Test the forbidden error page</p>
        <UButton @click="() => triggerError(403)" color="amber" variant="soft">
          Trigger 403
        </UButton>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">500 Server Error</h2>
        </template>
        <p class="mb-4">Test the server error page</p>
        <UButton @click="() => triggerError(500)" color="red" variant="soft">
          Trigger 500
        </UButton>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">408 Timeout</h2>
        </template>
        <p class="mb-4">Test the timeout error page</p>
        <UButton @click="() => triggerError(408)" color="blue" variant="soft">
          Trigger 408
        </UButton>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Generic Error</h2>
        </template>
        <p class="mb-4">Test the generic error page</p>
        <UButton @click="() => triggerError(400)" color="gray" variant="soft">
          Trigger Generic Error
        </UButton>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ErrorConfig {
  [key: number]: {
    message: string;
    fatal: boolean;
  };
}

const errorConfigs: ErrorConfig = {
  400: {
    message: 'This is a test generic error',
    fatal: false
  },
  403: {
    message: 'This is a test 403 error',
    fatal: false
  },
  408: {
    message: 'This is a test timeout error',
    fatal: false
  },
  500: {
    message: 'This is a test 500 error',
    fatal: true
  }
};

async function triggerError(statusCode: number) {
  const config = errorConfigs[statusCode];
  const error = createError({
    statusCode,
    statusMessage: config.message,
    fatal: config.fatal
  });
  await showError(error);
}
</script> 