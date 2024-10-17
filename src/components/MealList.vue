<template>
  <div class="carousel-container" ref="container">
    <div
      class="carousel-content"
      :style="{ transform: `translateX(${translateX}px)` }"
    >
      <div
        v-for="(meal, index) in displayMeals"
        :key="`${meal.name}-${index}`"
        class="meal-card-wrapper"
        @click="openModal(meal)"
      >
        <div
          class="meal-card"
          @mouseover="setShowCard(meal, true)"
          @mouseleave="setShowCard(meal, false)"
          @focus="setShowCard(meal, true)"
          @blur="setShowCard(meal, false)"
          @keydown.enter="openModal(meal)"
          tabindex="0"
          :aria-label="`Meal: ${meal.name}`"
        >
          <ImageLoader class="meal-image" :imageUrl="meal.image" />
          <span class="meal-name">{{ meal.name }}</span>
        </div>
        <MealModal
          :is-open="isModalOpen"
          :meal="modalMeal"
          @close="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useMealStore } from '@/stores/meals.js'
import MealModal from '@/components/ModalDialog.vue'
import ImageLoader from '@/components/ImageLoader.vue'

const store = useMealStore()
const container = ref(null)
const translateX = ref(window.innerWidth)
const scrollSpeed = 1
const isModalOpen = ref(false)
const modalMeal = ref(null)

//to shuffle array again - I don't want Randomisiert button brings the same indexes with the carousel
const displayMeals = computed(() => {
  const mealsBeforeShuffled = store.meals
  const meals = store.shuffleArray(mealsBeforeShuffled)
  return [...meals]
})

displayMeals.value.forEach(meal => {
  meal.showCard = ref(false)
})

const openModal = meal => {
  modalMeal.value = meal
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
}

const setShowCard = (meal, value) => {
  meal.showCard.value = value
}
// for animation of the carousel
let animationId = null

const animate = () => {
  translateX.value -= scrollSpeed
  if (Math.abs(translateX.value) >= container.value.offsetWidth) {
    translateX.value = window.innerWidth
  }
  animationId = requestAnimationFrame(animate)
}
// to calculate screen width
const updateScreenWidth = () => {
  translateX.value = window.innerWidth
}

onMounted(() => {
  animationId = requestAnimationFrame(animate)
  window.addEventListener('resize', updateScreenWidth)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', updateScreenWidth)
  }
})
</script>

<style scoped>
.carousel-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 12rem;
  background-color: rgb(245, 245, 245);
  z-index: 1000;
}

.carousel-content {
  display: flex;
  transition: transform 5s linear;
  transform: translateX(0px);
}

.meal-card-wrapper {
  flex: 0 0 auto;
  width: 16rem;
}

.meal-card {
  width: 12rem;
  height: 12rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: height 0.3s ease;
  position: relative;
  cursor: pointer;
}

.meal-card:hover {
  height: 30vh;
}

.meal-image {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  border-radius: 10%;
  box-sizing: border-box;
  overflow: hidden;
}

.meal-image:hover {
  transform: scale(1.1);
}

.meal-name {
  position: absolute;
  bottom: 25rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  font-weight: bold;
  color: white;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.7);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  opacity: 0;
  width: 100%;
}

.meal-card:hover .meal-name {
  opacity: 1;
  transform: translate(-50%, -10px);
  width: 80%;
}

.meal-card:hover .meal-image {
  transform: scale(1.05);
}
</style>
