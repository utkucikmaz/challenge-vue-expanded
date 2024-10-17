<!-- ImageLoader.vue -->
<template>
  <div>
    <div v-if="loading" class="spinner"></div>
    <img
      v-else
      :src="imageUrl"
      @error="handleImageError"
      @load="handleImageLoad"
      alt="Loaded Image"
      class="loaded-image"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import noImage from '@/assets/images/no-image.jpg'

const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
})

const loading = ref(true)

const handleImageLoad = () => {
  loading.value = false
}

const handleImageError = event => {
  loading.value = false
  event.target.src = noImage
}

watch(
  () => props.imageUrl,
  newImageUrl => {
    loading.value = true
    const img = new Image()
    img.src = newImageUrl
    img.onerror = handleImageError
    img.onload = handleImageLoad
  },
  { immediate: true },
)
</script>

<style scoped>
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  display: block;
  margin: 30% auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loaded-image {
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>
