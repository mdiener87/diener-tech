<template>
  <div class="blog-image-container">
    <figure class="image-with-caption">
      <img 
        :src="resolvedSrc" 
        :alt="alt" 
        :style="computedImageStyle"
        loading="lazy"
        @error="handleImageError"
        @load="handleImageLoad"
        :class="{ 
          'image-error': hasError,
          'image-loading': !isLoaded 
        }"
        :srcset="props.srcset"
        :sizes="props.sizes"
        @click="enableLightbox && openLightbox()"
      />
      <figcaption v-if="calcCaption.length">{{ calcCaption }}</figcaption>
      <div v-if="hasError" class="image-error-message">
        Image failed to load
      </div>
    </figure>
    
    <!-- Lightbox overlay -->
    <Teleport to="body">
      <div v-if="showLightbox" class="blog-image-lightbox" @click="closeLightbox">
        <div class="lightbox-content" @click.stop>
          <img :src="resolvedSrc" :alt="alt" :srcset="props.srcset" :sizes="props.sizes" />
          <figcaption v-if="calcCaption.length">{{ calcCaption }}</figcaption>
          <button class="lightbox-close" @click="closeLightbox" aria-label="Close lightbox">×</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
/**
 * BlogImage Component
 * 
 * A component for rendering images in blog posts with support for:
 * - Automatic path resolution based on blog post context
 * - Maximum size constraints while maintaining aspect ratio
 * - Responsive images via srcset
 * - Lazy loading
 * - Automatic fallback for image loading errors
 * - Caption display
 * - Lightbox overlay (click to expand)
 * 
 * @example
 * Basic usage:
 * <BlogImage src="image.jpg" alt="Description of the image" />
 * 
 * With size constraints:
 * <BlogImage src="image.jpg" alt="Description" maxWidth="800" maxHeight="600" />
 * 
 * With responsive images:
 * <BlogImage 
 *   src="image.jpg" 
 *   alt="Description" 
 *   srcset="image-small.jpg 400w, image-medium.jpg 800w, image-large.jpg 1200w"
 *   sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
 * />
 * 
 * Disable lightbox:
 * <BlogImage src="image.jpg" alt="Description" :lightbox="false" />
 */
import { resolveImagePath } from '~/utils/imagePathResolver';

const props = defineProps({
  /**
   * The image source path. Can be relative to the blog post or absolute.
   * If relative, it will be resolved based on the context.
   */
  src: String,
  
  /**
   * Alternative text for the image. Required for accessibility.
   * Also used as caption if no caption is provided.
   */
  alt: String,
  
  /**
   * Optional caption to display below the image.
   * If not provided, alt text will be used as caption.
   */
  caption: String,
  
  /**
   * Optional context to use for resolving relative paths.
   * If not provided, will attempt to extract from the current route.
   */
  context: String,
  
  /**
   * Maximum width for the image.
   * Can be a number (interpreted as pixels) or a string with CSS units.
   * Example: 800, "800px", "100%", "50vw"
   */
  maxWidth: {
    type: [String, Number],
    default: null, 
  },
  
  /**
   * Maximum height for the image.
   * Can be a number (interpreted as pixels) or a string with CSS units.
   * Example: 600, "600px", "50vh"
   */
  maxHeight: {
    type: [String, Number], 
    default: null,
  },
  
  /**
   * Optional srcset attribute for responsive images.
   * Example: "image-small.jpg 400w, image-medium.jpg 800w, image-large.jpg 1200w"
   */
  srcset: {
    type: String,
    default: null,
  },
  
  /**
   * Optional sizes attribute for responsive images.
   * Example: "(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
   */
  sizes: {
    type: String,
    default: null,
  },
  
  /**
   * Enable lightbox functionality. When enabled, clicking the image
   * will open it in a fullscreen lightbox overlay.
   * Default: true
   */
  lightbox: {
    type: Boolean,
    default: true,
  },
});

// Get the current route
const route = useRoute();

// Calculate the context based on the route or provided context
const imageContext = computed(() => {
  // If a context is explicitly provided, use it
  if (props.context) {
    return props.context;
  }
  
  // Extract context from route path if it's a blog post
  if (route.path.startsWith('/blog/')) {
    // Parse the blog slug from the path
    // For path like /blog/post-title, extract 'post-title'
    const pathParts = route.path.split('/');
    if (pathParts.length >= 3) {
      return pathParts[2]; // The blog post slug
    }
  }
  
  // Default: no specific context
  return '';
});

// Resolve the image source
const resolvedSrc = computed(() => {
  return resolveImagePath(props.src, imageContext.value);
});

const calcCaption = computed(() => {
  return props.caption || props.alt || "";
});

// Track image loading states
const hasError = ref(false);
const isLoaded = ref(false);
const showLightbox = ref(false);

// Handle image loading events
function handleImageError() {
  hasError.value = true;
  console.error(`Failed to load image: ${props.src}`);
}

function handleImageLoad() {
  isLoaded.value = true;
}

// Lightbox functionality
const enableLightbox = computed(() => props.lightbox !== false);

function openLightbox() {
  if (enableLightbox.value) {
    showLightbox.value = true;
  }
}

function closeLightbox() {
  showLightbox.value = false;
}

// Compute the base style object for the image based on maxWidth and maxHeight props
const imageStyle = computed(() => {
  const style = {};
  
  // Apply maxWidth if provided
  if (props.maxWidth) {
    // Add 'px' suffix if it's a number without unit
    style.maxWidth = typeof props.maxWidth === 'number' || /^\d+$/.test(props.maxWidth)
      ? `${props.maxWidth}px`
      : props.maxWidth;
  }
  
  // Apply maxHeight if provided
  if (props.maxHeight) {
    // Add 'px' suffix if it's a number without unit
    style.maxHeight = typeof props.maxHeight === 'number' || /^\d+$/.test(props.maxHeight)
      ? `${props.maxHeight}px`
      : props.maxHeight;
  }
  
  return style;
});

// Add lightbox-related styles to the base imageStyle
const computedImageStyle = computed(() => {
  const style = { ...imageStyle.value };
  
  // Add pointer cursor if lightbox is enabled
  if (enableLightbox.value) {
    style.cursor = 'pointer';
  }
  
  return style;
});
</script>

<style scoped>
.image-with-caption {
  text-align: center;
  margin: 2rem 0;
  width: 100%;
  position: relative;
}

.image-with-caption img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
  object-fit: contain; /* Maintains aspect ratio */
  border-radius: 4px; /* Slightly rounded corners */
}

.image-with-caption figcaption {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  color: #555;
  padding: 0 1rem;
}

/* Add a subtle transition when image loads */
.image-with-caption img {
  transition: opacity 0.3s ease;
}

.image-with-caption .image-loading {
  opacity: 0.7;
}

/* Error state styling */
.image-error {
  min-height: 100px;
  background-color: #f8f9fa;
  border: 1px dashed #dee2e6;
  opacity: 0.6;
}

.image-error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #dc3545;
  font-size: 0.9rem;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

/* Lightbox styles */
.blog-image-lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: lightbox-fade-in 0.3s ease;
}

.lightbox-content {
  max-width: 90%;
  max-height: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.lightbox-content figcaption {
  margin-top: 1rem;
  color: white;
  font-size: 1rem;
  text-align: center;
  max-width: 80%;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.lightbox-close:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

/* Animation */
@keyframes lightbox-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
