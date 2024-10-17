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
/* Spinner styling */
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

/* Keyframe for spinner */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Loaded image styling */
.loaded-image {
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 0.5rem;
}

/* Responsive styling for smaller screens using CSS3 media queries */

/* Small screens (Tailwind 'sm' equivalent) */
@media (max-width: 640px) {
  .loaded-image {
    height: 8rem; /* Smaller height for small screens */
    border-radius: 0.25rem; /* Slightly smaller border radius */
  }

  .spinner {
    width: 30px;
    height: 30px; /* Smaller spinner */
  }
}

/* Medium screens (Tailwind 'md' equivalent) */
@media (max-width: 768px) {
  .loaded-image {
    height: 10rem; /* Medium size image for medium screens */
    border-radius: 0.375rem;
  }

  .spinner {
    width: 35px;
    height: 35px;
  }
}

/* Large screens (Tailwind 'lg' equivalent) */
@media (max-width: 1024px) {
  .loaded-image {
    height: 12rem;
    border-radius: 0.5rem; /* Slightly larger border-radius */
  }

  .spinner {
    width: 40px;
    height: 40px;
  }
}

/* Extra large screens (Tailwind 'xl' equivalent) */
@media (min-width: 1280px) {
  .loaded-image {
    height: 25rem; /* Larger images on bigger screens */
    border-radius: 0.75rem; /* Increased border radius */
  }

  .spinner {
    width: 50px;
    height: 50px; /* Larger spinner on bigger screens */
  }
}
</style>
