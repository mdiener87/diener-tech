<template>
  <div class="video-carousel">
    <!-- Player -->
    <div
      class="video-carousel__player overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-black shadow-xl"
    >
      <iframe
        v-if="isPlaying"
        :key="activeVideo.id"
        class="absolute inset-0 h-full w-full"
        :src="`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`"
        :title="activeVideo.title"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <button
        v-else
        type="button"
        class="video-carousel__poster group absolute inset-0 h-full w-full"
        :aria-label="`Play video: ${activeVideo.title}`"
        @click="isPlaying = true"
      >
        <img
          :key="activeVideo.id"
          :src="posterUrl(activeVideo.id)"
          :alt="''"
          class="h-full w-full object-cover"
          @error="handlePosterError"
        />
        <span class="video-carousel__scrim" aria-hidden="true"></span>
        <span
          class="video-carousel__play transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110"
          aria-hidden="true"
        >
          <UIcon name="i-heroicons-play-solid" class="h-8 w-8" />
        </span>
      </button>
    </div>

    <!-- Thumbnail rail -->
    <div class="mt-5 flex items-center gap-2">
      <button
        v-if="hasOverflow"
        type="button"
        class="video-carousel__arrow"
        aria-label="Scroll to earlier videos"
        :disabled="isAtStart"
        @click="scrollRail(-1)"
      >
        <UIcon name="i-heroicons-chevron-left" class="h-5 w-5" />
      </button>

      <ul
        ref="rail"
        class="video-carousel__rail flex flex-1 gap-4 overflow-x-auto pb-2"
        aria-label="VectorXR videos"
        @scroll.passive="updateRailState"
      >
        <li
          v-for="(video, index) in videos"
          :key="video.id"
          class="video-carousel__item shrink-0"
        >
          <button
            type="button"
            class="group block w-full rounded-xl text-left"
            :aria-current="index === activeIndex ? 'true' : undefined"
            :aria-label="`Play video: ${video.title}`"
            @click="selectVideo(index)"
          >
            <span
              class="relative block overflow-hidden rounded-xl border-2 bg-black transition-colors"
              :class="
                index === activeIndex
                  ? 'border-primary'
                  : 'border-transparent group-hover:border-gray-300 dark:group-hover:border-gray-600'
              "
            >
              <img
                :src="`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`"
                :alt="''"
                loading="lazy"
                width="320"
                height="180"
                class="aspect-video w-full object-cover transition-opacity"
                :class="
                  index === activeIndex
                    ? 'opacity-100'
                    : 'opacity-80 group-hover:opacity-100'
                "
              />
              <span
                v-if="index === activeIndex"
                class="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white"
              >
                {{ isPlaying ? "Playing" : "Selected" }}
              </span>
            </span>
            <span
              v-if="video.label"
              class="mt-2 block text-xs font-semibold uppercase tracking-wide text-primary"
            >
              {{ video.label }}
            </span>
            <span
              class="mt-1 block text-sm font-medium leading-snug text-gray-800 dark:text-gray-200"
            >
              {{ video.title }}
            </span>
          </button>
        </li>
      </ul>

      <button
        v-if="hasOverflow"
        type="button"
        class="video-carousel__arrow"
        aria-label="Scroll to more videos"
        :disabled="isAtEnd"
        @click="scrollRail(1)"
      >
        <UIcon name="i-heroicons-chevron-right" class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface CarouselVideo {
  /** YouTube video id */
  id: string;
  title: string;
  label?: string;
}

const props = defineProps<{
  videos: CarouselVideo[];
}>();

const activeIndex = ref(0);
const isPlaying = ref(false);
const rail = ref<HTMLElement | null>(null);
const hasOverflow = ref(false);
const isAtStart = ref(true);
const isAtEnd = ref(false);

const activeVideo = computed(() => props.videos[activeIndex.value]);

function posterUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

// Not every video has a max-resolution poster; hqdefault always exists.
function handlePosterError(event: Event) {
  const img = event.target as HTMLImageElement;
  const fallback = `https://i.ytimg.com/vi/${activeVideo.value.id}/hqdefault.jpg`;
  if (img.src !== fallback) {
    img.src = fallback;
  }
}

function selectVideo(index: number) {
  activeIndex.value = index;
  isPlaying.value = true;
}

function updateRailState() {
  const el = rail.value;
  if (!el) return;
  hasOverflow.value = el.scrollWidth > el.clientWidth + 1;
  isAtStart.value = el.scrollLeft <= 1;
  isAtEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
}

function scrollRail(direction: 1 | -1) {
  const el = rail.value;
  if (!el) return;
  el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
}

onMounted(() => {
  updateRailState();
  window.addEventListener("resize", updateRailState);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateRailState);
});
</script>

<style scoped>
.video-carousel__player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
}

.video-carousel__scrim {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.12);
  transition: background-color 0.2s ease;
}

.video-carousel__poster:hover .video-carousel__scrim {
  background: rgba(0, 0, 0, 0);
}

.video-carousel__play {
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-flex;
  width: 4.5rem;
  height: 4.5rem;
  margin: -2.25rem 0 0 -2.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.95);
  color: rgb(17 24 39);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
}

.video-carousel__poster:focus-visible {
  outline: 3px solid white;
  outline-offset: -6px;
}

.video-carousel__rail {
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
}

.video-carousel__item {
  width: 70%;
  scroll-snap-align: start;
}

@media (min-width: 640px) {
  .video-carousel__item {
    width: calc((100% - 1rem) / 2);
  }
}

@media (min-width: 1024px) {
  .video-carousel__item {
    width: calc((100% - 3rem) / 4);
  }
}

/* Touch-width screens swipe the rail; arrows appear from the sm breakpoint. */
.video-carousel__arrow {
  display: none;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgb(209 213 219);
  background: white;
  color: rgb(55 65 81);
  transition: background-color 0.2s ease;
}

@media (min-width: 640px) {
  .video-carousel__arrow {
    display: inline-flex;
  }
}

.video-carousel__arrow:hover:not(:disabled) {
  background: rgb(243 244 246);
}

.video-carousel__arrow:disabled {
  opacity: 0.35;
  cursor: default;
}

.dark .video-carousel__arrow {
  border-color: rgb(75 85 99);
  background: rgb(17 24 39);
  color: rgb(229 231 235);
}

.dark .video-carousel__arrow:hover:not(:disabled) {
  background: rgb(31 41 55);
}
</style>
