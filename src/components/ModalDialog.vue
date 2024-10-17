<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="meal-card">
          <h2 class="meal-title">{{ meal.name }}</h2>
          <div class="meal-card-buttons">
            <div @click="toggleFavorite(meal)" class="favorite-btn">
              <img v-if="isFavorite(meal)" :src="favoriteIcon" alt="Favorite" />
              <img v-else :src="unfavoriteIcon" alt="Unfavorite" />
            </div>

            <img
              @click="closeModal"
              :src="closeIcon"
              alt="Close"
              class="close-icon"
            />
          </div>
          <div class="meal-content">
            <div class="meal-image">
              <ImageLoader class="meal-img" :imageUrl="meal.image" />
            </div>
            <div class="meal-details">
              <div class="meal-props">
                <p class="meal-text">
                  <b :aria-label="`Aufwand: ${meal.effort}`"
                    >Aufwand: <MealChart :effort="meal.effort"
                  /></b>
                </p>
                <p class="meal-text">
                  <b :aria-label="`Vegetarisch: ${meal.veggie}`"
                    >Vegetarisch: <MealChart :veggie="meal.veggie"
                  /></b>
                </p>
                <p class="meal-text">
                  <b :aria-label="`Kosten: ${meal.cost}`"
                    >Kosten: <MealChart :cost="meal.cost"
                  /></b>
                </p>
              </div>
              <p class="lorem">
                Occaecat proident nostrud sit adipisicing tempor aute ipsum anim
                reprehenderit irure dolor est. Aute officia ex est et irure ex
                excepteur amet ullamco irure sint aliquip anim. Culpa nisi dolor
                proident irure id occaecat.Aute proident amet ullamco
                consectetur commodo et magna aute velit dolor. Elit occaecat
                proident incididunt ea occaecat ullamco elit amet culpa minim.
                Incididunt minim cillum fugiat qui aliqua.
              </p>
              <!-- <p>{{ store.favoritesArray }}</p> -->
              <h3 class="shopping-list-title">Einkaufsliste</h3>
              <ul class="shopping-list">
                <li v-for="item in meal.ingredients" :key="item">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import MealChart from '@/components/MealChart.vue'
import ImageLoader from '@/components/ImageLoader.vue'
import { useMealStore } from '@/stores/meals.js'
import favoriteIcon from '@/assets/svg/favorite.svg'
import unfavoriteIcon from '@/assets/svg/unfavorite.svg'
import closeIcon from '@/assets/svg/close.svg'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  meal: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['close'])

const store = useMealStore()

const closeModal = () => {
  emit('close')
}
const toggleFavorite = store.toggleFavorite
const isFavorite = store.isFavorite

const handleKeyDown = event => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background-color: rgb(245, 245, 245);
  padding: 2rem;
  border-radius: 8px;
  max-width: 80%;
  max-height: 90%;
  overflow-y: auto;
  font-family: 'roboto';
  font-weight: 400;
}

.meal-card-buttons {
  position: absolute;
  right: 2rem;
  top: 3rem;
  width: 12rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.favorite-btn {
  position: absolute;
  left: 0;
  cursor: pointer;
}
.close-icon {
  position: absolute;
  right: 0;
  border: none;
  background: none;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
}

.meal-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.meal-content {
  display: flex;
}

.meal-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.meal-img {
  width: 60%;
  height: 20rem;
  border-radius: 8px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.meal-details {
  padding: 1rem;
}

.meal-props {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  gap: 5rem;
}

.meal-text {
  margin-bottom: 0.5rem;
}

.lorem {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.2rem;
}

.shopping-list-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 2rem;
  text-align: center;
}

.shopping-list {
  list-style-type: decimal;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.shopping-list li {
  margin-bottom: 0.25rem;
}

@media (min-width: 768px) {
  .meal-content {
    flex-direction: row;
  }

  .meal-image {
    width: 50%;
    height: auto;
  }

  .meal-details {
    width: 50%;
  }
}
</style>
