<template>
  <div>
    <h3 v-if="showHeading" class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
      {{ heading }}
    </h3>
    <div class="flex gap-4">
      <!-- Copy Link Button -->
      <div v-if="platforms.includes('copy')">
        <UTooltip :text="copySuccess ? 'Copied!' : 'Copy link'">
          <UButton
            color="gray"
            variant="soft"
            square
            @click="copyUrl"
          >
            <UIcon name="i-heroicons-link" class="w-5 h-5" />
          </UButton>
        </UTooltip>
      </div>

      <!-- LinkedIn Share Button -->
      <div v-if="platforms.includes('linkedin')">
        <UTooltip text="Share on LinkedIn">
          <a
            :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
          >
            <UButton color="blue" variant="soft" square>
              <!-- LinkedIn Logo SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </UButton>
          </a>
        </UTooltip>
      </div>

      <!-- Facebook Share Button -->
      <div v-if="platforms.includes('facebook')">
        <UTooltip text="Share on Facebook">
          <a
            :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
          >
            <UButton color="indigo" variant="soft" square>
              <!-- Facebook Logo SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </UButton>
          </a>
        </UTooltip>
      </div>

      <!-- Email Share Button -->
      <div v-if="platforms.includes('email')">
        <UTooltip text="Share via Email">
          <a
            :href="`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share via Email"
          >
            <UButton color="orange" variant="soft" square>
              <!-- Email Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </UButton>
          </a>
        </UTooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  /**
   * Array of social platforms to display
   * Supported values: 'copy', 'linkedin', 'facebook', 'email'
   */
  platforms: {
    type: Array as () => string[],
    default: () => ['copy', 'linkedin']
  },
  /**
   * URL to share
   */
  url: {
    type: String,
    required: true
  },
  /**
   * Title to share (for platforms that support it)
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * Whether to show the heading
   */
  showHeading: {
    type: Boolean,
    default: true
  },
  /**
   * Heading text to display
   */
  heading: {
    type: String,
    default: 'Share this post'
  }
});

// Copy to clipboard functionality
const copySuccess = ref(false);

function copyUrl() {
  if (process.client) {
    navigator.clipboard.writeText(props.url).then(() => {
      copySuccess.value = true;
      setTimeout(() => {
        copySuccess.value = false;
      }, 2000);
    });
  }
}
</script>
