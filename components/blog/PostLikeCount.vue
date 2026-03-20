<template>
  <div
    v-if="enabled"
    class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
  >
    <UIcon name="i-heroicons-heart" class="w-4 h-4 text-rose-500" />
    <span>{{ count }} {{ count === 1 ? "like" : "likes" }}</span>
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
const enabled = ref(true);

async function fetchLikeStatus() {
  try {
    const response = await $fetch<LikeResponse>(`/api/likes${props.postPath}`);
    count.value = response.count;
    enabled.value = response.enabled;
  } catch (error) {
    console.error("Failed to fetch like count", error);
    enabled.value = false;
  }
}

onMounted(() => {
  fetchLikeStatus();
});
</script>
