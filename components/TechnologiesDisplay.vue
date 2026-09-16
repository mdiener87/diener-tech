<template>
  <section
    ref="viewer"
    class="pt-8 sm:pt-10"
    aria-labelledby="technology-title"
  >
    <UContainer>
      <div
        class="rounded-xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              id="technology-title"
              class="text-lg font-semibold tracking-tight"
            >
              A peek inside my toolbox
            </h2>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Always exploring. Hover to browse; click a category to stay a
              while.
            </p>
          </div>
          <UButton
            variant="ghost"
            size="xs"
            :icon="motionPaused ? 'i-heroicons-play' : 'i-heroicons-pause'"
            @click="userPaused = !motionPaused"
          >
            {{ motionPaused ? "Resume rotation" : "Pause rotation" }}
          </UButton>
        </div>
        <div
          class="flex flex-wrap gap-2 mt-4"
          role="group"
          aria-label="Technology categories"
        >
          <button
            v-for="category in categories"
            :key="category.value"
            type="button"
            class="tech-category rounded-full px-3 py-2 text-xs font-medium"
            :class="{
              'tech-category--active': activeCategory === category.value,
            }"
            :style="{ '--tech-color': category.color }"
            :aria-pressed="selectedCategory === category.value"
            @pointerenter="previewCategory($event, category.value)"
            @pointerleave="hoveredCategory = null"
            @focus="focusCategory(category.value)"
            @blur="focusedCategory = null"
            @click="selectedCategory = category.value"
          >
            {{ category.label }}
          </button>
        </div>
        <div
          class="pt-5 pb-2"
          @mouseenter="hoveringCards = true"
          @mouseleave="hoveringCards = false"
        >
          <TransitionGroup
            name="tech-shuffle"
            tag="ul"
            class="tech-grid"
            aria-label="Technologies"
            @before-leave="placeLeavingCard"
            @after-leave="clearLeavingCard"
            @leave-cancelled="clearLeavingCard"
          >
            <li
              v-for="(tech, index) in visibleTechs"
              :key="tech.name"
              class="tech-card"
              :style="{
                '--tech-color': categoryColors.get(tech.category),
                '--slot': index,
              }"
            >
              <div class="tech-card-inner">
                <span class="tech-icon-wrap">
                  <img
                    v-if="tech.asset"
                    :src="tech.asset"
                    alt=""
                    width="28"
                    height="28"
                    class="tech-asset tech-icon"
                  />
                  <UIcon
                    v-else-if="tech.icon"
                    :name="tech.icon"
                    class="tech-icon"
                    aria-hidden="true"
                  />
                </span>
                <span
                  class="min-w-0 text-xs font-semibold leading-snug break-words"
                  >{{ tech.name }}</span
                >
              </div>
            </li>
          </TransitionGroup>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { technologies } from "~/utils/technologies";
import type { Technology } from "~/utils/technologies";

const categories = [
  { label: "A little of everything", value: "", color: "#475569" },
  { label: "AI & models", value: "AI & Emerging Tech", color: "#be185d" },
  { label: "Languages", value: "Languages", color: "#b45309" },
  { label: "Frontend", value: "Frontend & UI", color: "#0369a1" },
  {
    label: "Backend & cloud",
    value: "Backend & Infrastructure",
    color: "#6d28d9",
  },
  { label: "Dev tools", value: "Dev Tools & Ops", color: "#047857" },
  { label: "Creative & 3D", value: "2D & 3D Media", color: "#0e7490" },
];
const categoryColors = new Map(
  categories.map((category) => [category.value, category.color]),
);
// Index once, then sample with Fisher–Yates instead of randomly sorting the full list.
const pools = new Map(
  categories.map((category) => [
    category.value,
    category.value
      ? technologies.filter((tech) => tech.category === category.value)
      : technologies,
  ]),
);
const selectedCategory = ref("");
const hoveredCategory = ref<string | null>(null);
const focusedCategory = ref<string | null>(null);
const activeCategory = computed(
  () =>
    hoveredCategory.value ?? focusedCategory.value ?? selectedCategory.value,
);
const initialNames = [
  "HuggingFace",
  "Python",
  "Vue.js",
  "Cloudflare",
  "Docker",
  "OpenXR",
];
const visibleTechs = ref(
  initialNames.flatMap((name) =>
    technologies.filter((tech) => tech.name === name),
  ),
);

function takeRandom(items: Technology[], count: number) {
  for (let i = 0; i < Math.min(count, items.length); i++) {
    const j = i + Math.floor(Math.random() * (items.length - i));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items.slice(0, count);
}
function shuffleTechs() {
  const pool = pools.get(activeCategory.value) || technologies;
  const previous = new Set(visibleTechs.value.map((tech) => tech.name));
  const fresh: Technology[] = [];
  const seen: Technology[] = [];
  for (const tech of pool) (previous.has(tech.name) ? seen : fresh).push(tech);
  // Show as many fresh items as possible; small categories still fill all six slots.
  const next = takeRandom(fresh, 6);
  next.push(...takeRandom(seen, 6 - next.length));
  takeRandom(next, next.length);
  if (
    next.length > 1 &&
    next.every((tech, i) => tech.name === visibleTechs.value[i]?.name)
  ) {
    next.push(next.shift()!);
  }
  captureCardPositions();
  visibleTechs.value = next;
}
function previewCategory(event: PointerEvent, category: string) {
  if (event.pointerType === "mouse") hoveredCategory.value = category;
}
function focusCategory(category: string) {
  hoveredCategory.value = null;
  focusedCategory.value = category;
}

const viewer = ref<HTMLElement>();
const userPaused = ref<boolean | null>(null);
const reducedMotion = ref(false);
const motionPaused = computed(() => userPaused.value ?? reducedMotion.value);
const hoveringCards = ref(false);
const inView = ref(false);
const pageVisible = ref(true);
const rotating = computed(
  () =>
    !motionPaused.value &&
    !hoveringCards.value &&
    inView.value &&
    pageVisible.value,
);
let timer: ReturnType<typeof setTimeout> | undefined;
let observer: IntersectionObserver | undefined;
let motionQuery: MediaQueryList | undefined;
function scheduleRotation() {
  clearTimeout(timer);
  if (rotating.value)
    timer = setTimeout(() => {
      shuffleTechs();
      scheduleRotation();
    }, 5000);
}
function updateVisibility() {
  pageVisible.value = !document.hidden;
}
function updateMotionPreference() {
  reducedMotion.value = motionQuery?.matches ?? false;
  userPaused.value = null;
}
watch(rotating, scheduleRotation);
watch(activeCategory, () => {
  shuffleTechs();
  scheduleRotation();
});
onMounted(() => {
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  updateMotionPreference();
  motionQuery.addEventListener("change", updateMotionPreference);
  updateVisibility();
  document.addEventListener("visibilitychange", updateVisibility);
  observer = new IntersectionObserver(([entry]) => {
    inView.value = entry.isIntersecting;
  });
  if (viewer.value) observer.observe(viewer.value);
});
onBeforeUnmount(() => {
  clearTimeout(timer);
  observer?.disconnect();
  motionQuery?.removeEventListener("change", updateMotionPreference);
  document.removeEventListener("visibilitychange", updateVisibility);
});

interface CardPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}
const cardPositions = new WeakMap<Element, CardPosition>();
// Read all six positions before patching: removing one grid item otherwise
// shifts the others before their leave hooks run.
function captureCardPositions() {
  viewer.value
    ?.querySelectorAll<HTMLElement>(
      ".tech-card:not(.tech-shuffle-leave-active)",
    )
    .forEach((card) => {
      cardPositions.set(card, {
        left: card.offsetLeft,
        top: card.offsetTop,
        width: card.offsetWidth,
        height: card.offsetHeight,
      });
    });
}
// Hold departing cards in their original cells while Vue animates the next layout.
function placeLeavingCard(element: Element) {
  const card = element as HTMLElement;
  const position = cardPositions.get(card);
  if (!position) return;
  Object.assign(card.style, {
    left: `${position.left}px`,
    top: `${position.top}px`,
    width: `${position.width}px`,
    height: `${position.height}px`,
  });
}
function clearLeavingCard(element: Element) {
  const card = element as HTMLElement;
  for (const property of ["left", "top", "width", "height"])
    card.style.removeProperty(property);
}
</script>

<style scoped>
.tech-category {
  color: var(--tech-color);
  background: color-mix(in srgb, var(--tech-color) 10%, white);
  box-shadow: inset 0 0 0 1px
    color-mix(in srgb, var(--tech-color) 25%, transparent);
  transition:
    background 180ms ease,
    color 180ms ease,
    box-shadow 180ms ease;
}
.tech-category--active,
.tech-category:hover {
  color: white;
  background: var(--tech-color);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--tech-color) 25%, transparent);
}
.dark .tech-category:not(.tech-category--active):not(:hover) {
  color: color-mix(in srgb, var(--tech-color) 35%, white);
  background: color-mix(in srgb, var(--tech-color) 25%, #0f172a);
}
.tech-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}
.tech-card {
  min-width: 0;
}
.tech-card-inner {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  height: 6rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  color: white;
  background: linear-gradient(
    135deg,
    var(--tech-color),
    color-mix(in srgb, var(--tech-color) 82%, #0f172a)
  );
  border: 1px solid rgb(255 255 255 / 0.18);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--tech-color) 22%, transparent);
  transition:
    transform 250ms ease,
    box-shadow 250ms ease;
}
.tech-icon-wrap {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.16);
}
.tech-icon {
  width: 1.75rem;
  height: 1.75rem;
  transition: transform 250ms ease;
}
.tech-asset {
  object-fit: contain;
  filter: brightness(0) invert(1);
}
@media (hover: hover) {
  .tech-card:hover .tech-card-inner {
    transform: translateY(-5px) rotate(-1deg);
    box-shadow: 0 9px 18px
      color-mix(in srgb, var(--tech-color) 35%, transparent);
  }
  .tech-card:hover .tech-icon {
    transform: scale(1.18) rotate(5deg);
  }
}
.tech-shuffle-move {
  transition: transform 550ms cubic-bezier(0.22, 1, 0.36, 1);
}
.tech-shuffle-enter-active {
  transition:
    transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 400ms ease;
  transition-delay: calc(var(--slot) * 35ms);
}
.tech-shuffle-leave-active {
  position: absolute;
  pointer-events: none;
  transition:
    transform 250ms ease,
    opacity 250ms ease;
}
.tech-shuffle-enter-from {
  opacity: 0;
  transform: translateY(22px) scale(0.92) rotate(2deg);
}
.tech-shuffle-leave-to {
  opacity: 0;
  transform: translateY(-18px) scale(0.92) rotate(-2deg);
}
@media (min-width: 640px) {
  .tech-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .tech-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
@media (max-width: 399px) {
  .tech-card-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.375rem;
    padding: 0.625rem;
    height: 6.5rem;
  }
  .tech-icon-wrap {
    width: 1.75rem;
    height: 1.75rem;
  }
  .tech-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  .tech-shuffle-move,
  .tech-shuffle-enter-active,
  .tech-shuffle-leave-active,
  .tech-card-inner,
  .tech-icon,
  .tech-category {
    transition: none;
  }
  .tech-shuffle-enter-from,
  .tech-shuffle-leave-to,
  .tech-card:hover .tech-card-inner,
  .tech-card:hover .tech-icon {
    transform: none;
  }
}
</style>
