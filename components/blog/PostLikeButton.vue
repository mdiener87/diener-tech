<template>
  <div v-if="status.enabled" class="inline-flex">
    <UButton
      :color="status.liked ? 'rose' : 'gray'"
      :variant="
        compact
          ? status.liked
            ? 'soft'
            : 'ghost'
          : status.liked
            ? 'soft'
            : 'outline'
      "
      :loading="status.pending"
      :disabled="status.pending"
      :icon="status.liked ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
      :size="compact ? 'sm' : 'md'"
      :aria-pressed="status.liked"
      :aria-label="`${status.liked ? 'Unlike' : 'Like'} this post (${status.count} ${status.count === 1 ? 'like' : 'likes'})`"
      class="group"
      :class="compact ? 'px-2.5' : ''"
      @click="toggleLike"
    >
      <span v-if="showLabel" class="mr-1">{{
        status.liked ? "Liked" : "Like"
      }}</span>
      <span class="text-xs opacity-80">{{ status.count }}</span>
    </UButton>
  </div>
</template>

<script setup lang="ts">
interface LikeResponse {
  count: number;
  liked: boolean;
  enabled: boolean;
}
interface LikeState extends LikeResponse {
  pending: boolean;
}

const props = withDefaults(
  defineProps<{
    postPath: string;
    compact?: boolean;
    showLabel?: boolean;
  }>(),
  { compact: false, showLabel: true },
);

// Both article controls share state, including pending requests. Nuxt keeps this
// store isolated per SSR request; each post retains its own state on navigation.
const likesByPost = useState<Record<string, LikeState>>(
  "post-likes",
  () => ({}),
);
const status = computed(() => {
  if (!likesByPost.value[props.postPath]) {
    likesByPost.value[props.postPath] = {
      count: 0,
      liked: false,
      enabled: true,
      pending: false,
    };
  }
  return likesByPost.value[props.postPath];
});

async function fetchLikeStatus() {
  const target = status.value;
  if (target.pending) return;
  target.pending = true;
  try {
    const response = await $fetch<LikeResponse>(`/api/likes${props.postPath}`);
    Object.assign(target, response);
  } catch (error) {
    console.error("Failed to fetch like status", error);
    target.enabled = false;
  } finally {
    target.pending = false;
  }
}

async function toggleLike() {
  const target = status.value;
  if (target.pending) return;
  target.pending = true;
  try {
    const response = await $fetch<LikeResponse>(`/api/likes${props.postPath}`, {
      method: target.liked ? "DELETE" : "POST",
    });
    Object.assign(target, response);
  } catch (error) {
    console.error("Failed to update like state", error);
  } finally {
    target.pending = false;
  }
}

onMounted(fetchLikeStatus);
watch(() => props.postPath, fetchLikeStatus);
</script>
