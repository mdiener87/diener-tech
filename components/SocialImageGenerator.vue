<template>
  <div ref="imageContainer" class="social-image-container">
    <div class="social-image">
      <div class="social-title">DienerTech</div>
      <div class="social-subtitle">Personal Portfolio &amp; Blog</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import html2canvas from 'html2canvas';

const imageContainer = ref(null);

onMounted(async () => {
  if (imageContainer.value) {
    const canvas = await html2canvas(imageContainer.value, {
      width: 1200,
      height: 630,
      scale: 1,
    });
    
    // Convert to image
    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    
    // You can download or use this image data
    const link = document.createElement('a');
    link.download = 'default-social.jpg';
    link.href = imageData;
    link.click();
  }
});
</script>

<style scoped>
.social-image-container {
  width: 1200px;
  height: 630px;
  overflow: hidden;
  position: relative;
}

.social-image {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1E293B;
  color: white;
}

.social-title {
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 20px;
}

.social-subtitle {
  font-size: 36px;
  color: #94A3B8;
}
</style> 