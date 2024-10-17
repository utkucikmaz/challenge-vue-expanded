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
                excepteur amet ullamco irure sint aliquip anim.
              </p>
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
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  font-family: 'Roboto', sans-serif;
}

.meal-card-buttons {
  position: absolute;
  right: 2rem;
  top: 2rem;
  display: flex;
  justify-content: space-between;
  width: 6rem;
  height: 2rem;
}

.favorite-btn {
  cursor: pointer;
}

.close-icon {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}

.meal-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

.meal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.meal-image {
  margin-bottom: 1rem;
}

.meal-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
}

.meal-details {
  padding: 1rem;
  text-align: center;
}

.meal-props {
  position: relative;
  display: flex;
  justify-content: center;
  margin: auto;
  width: 15rem;

}

.meal-text {
  margin-bottom: 0.5rem;
}

.lorem {
  margin-bottom: 1rem;
  font-size: 1rem;
}

.shopping-list-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1.5rem;
}

.shopping-list {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.shopping-list li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 1rem;
    max-width: 90%;
  }
  .meal-title {
    font-size: 1.25rem;
    margin-bottom: 3rem;
  }
  .meal-img {
    width: 80%;
    height: auto;
  }
  .meal-details {
    padding: 0.75rem;
  }
  .meal-props {
    flex-direction: row;
    gap: 0.5rem;
  }
  .shopping-list-title {
    font-size: 1.1rem;
  }
  .shopping-list li {
    font-size: 0.9rem;
  }
}

@media (max-width: 640px) {
  .modal-content {
    padding: 0.5rem;
    max-width: 100%;
  }
  .meal-title {
    font-size: 1.1rem;
  }
  .meal-img {
    width: 100%;
    height: auto;
  }
  .meal-details {
    padding: 0.5rem;
  }
  .meal-props {
    gap: 0.3rem;
  }
  .shopping-list-title {
    font-size: 1rem;
  }
  .shopping-list li {
    font-size: 0.8rem;
  }
}
</style>
