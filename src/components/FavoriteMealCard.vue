<template>
  <div class="meal-card" @click="openModal(meal)">
    <div class="meal-image-wrapper">
      <ImageLoader :imageUrl="meal.image" class="meal-image" />
    </div>
    <div class="meal-name-wrapper">
      <h2 class="meal-name">{{ meal.name }}</h2>
      <MealModal :is-open="isModalOpen" :meal="modalMeal" @close="closeModal" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MealModal from '@/components/ModalDialog.vue'
import ImageLoader from '@/components/ImageLoader.vue'

const isModalOpen = ref(false)
const modalMeal = ref(null)

defineProps({
  meal: Object,
})

const openModal = meal => {
  modalMeal.value = meal
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.meal-card {
  width: 16rem;
  text-align: center;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.meal-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.meal-image-wrapper {
  width: 100%;
  height: 8rem;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

.meal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.meal-name-wrapper {
  padding: 0.5rem 1rem;
}

.meal-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}
</style>
