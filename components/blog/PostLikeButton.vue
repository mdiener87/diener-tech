<template>
  <div v-if="enabled" class="inline-flex">
    <UButton
      :color="liked ? 'rose' : 'gray'"
      :variant="liked ? 'soft' : 'outline'"
      :loading="pending"
      :disabled="pending"
      icon="i-heroicons-heart"
      class="group"
      @click="toggleLike"
    >
      <span class="mr-1">{{ liked ? "Liked" : "Like" }}</span>
      <span class="text-xs opacity-80">{{ count }}</span>
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

interface LikeResponse {
  count: number;
  liked: boolean;
  enabled: boolean;
}

const props = defineProps<{
  postPath: string;
}>();

const count = ref(0);
const liked = ref(false);
const enabled = ref(true);
const pending = ref(false);

async function fetchLikeStatus() {
  try {
    const response = await $fetch<LikeResponse>(`/api/likes${props.postPath}`);
    count.value = response.count;
    liked.value = response.liked;
    enabled.value = response.enabled;
  } catch (error) {
    console.error("Failed to fetch like status", error);
    enabled.value = false;
  }
}

async function toggleLike() {
  if (pending.value) {
    return;
  }

  pending.value = true;
  try {
    const method = liked.value ? "DELETE" : "POST";
    const response = await $fetch<LikeResponse>(`/api/likes${props.postPath}`, {
      method,
    });
    count.value = response.count;
    liked.value = response.liked;
    enabled.value = response.enabled;
  } catch (error) {
    console.error("Failed to update like state", error);
  } finally {
    pending.value = false;
  }
}

onMounted(() => {
  fetchLikeStatus();
});
</script>
