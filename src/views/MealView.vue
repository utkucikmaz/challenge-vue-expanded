<template>
  <div class="container">
    <div class="meal-card">
      <div v-if="store.randomMeal">
        <h2 class="meal-title">{{ store.randomMeal.name }}</h2>
        <div @click="toggleFavorite(store.randomMeal)" class="favorite-btn">
          <img
            v-if="isFavorite(store.randomMeal)"
            :src="favoriteIcon"
            alt="Favorite"
          />
          <img v-else :src="unfavoriteIcon" alt="Unfavorite" />
        </div>
        <div class="meal-content">
          <div class="meal-image">
            <ImageLoader class="meal-img" :imageUrl="store.randomMeal.image" />
          </div>
          <div class="meal-details">
            <div class="meal-props">
              <p class="meal-text">
                <b :aria-label="`Aufwand: ${store.randomMeal.effort}`"
                  >Aufwand: <MealChart :effort="store.randomMeal.effort"
                /></b>
              </p>
              <p class="meal-text">
                <b :aria-label="`Vegetarisch: ${store.randomMeal.veggie}`"
                  >Vegetarisch: <MealChart :veggie="store.randomMeal.veggie"
                /></b>
              </p>
              <p class="meal-text">
                <b :aria-label="`Kosten: ${store.randomMeal.cost}`"
                  >Kosten: <MealChart :cost="store.randomMeal.cost"
                /></b>
              </p>
            </div>
            <p class="lorem">
              Occaecat proident nostrud sit adipisicing tempor aute ipsum anim
              reprehenderit irure dolor est. Aute officia ex est et irure ex
              excepteur amet ullamco irure sint aliquip anim. Culpa nisi dolor
              proident irure id occaecat.
            </p>
            <h3 class="shopping-list-title">Einkaufsliste</h3>
            <ul class="shopping-list">
              <li v-for="item in store.randomMeal.ingredients" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else class="no-meal-message">
        <p>Es gibt keine Mahlzeit unter dieser Auswahl</p>
      </div>
    </div>
    <RouterLink to="/favorites" class="favorite-button">
      <div class="fav-text">Favoriten</div>
      <img :src="starIcon" alt="Favorites List" width="50" height="50" />
    </RouterLink>
  </div>

  <div class="button-group">
    <button class="button" @click="handleBackClick">Zurück</button>
    <button
      v-if="store.meals.length >= 3"
      class="button"
      @click="handleRandomizeClick"
      :disabled="store.meals.length === 1"
    >
      Randomisiert
    </button>
    <button
      v-else
      class="button"
      :class="{ 'disabled-button': store.meals.length === 1 }"
      @click="handleRandomizeClick"
      :disabled="store.meals.length === 1"
    >
      Nächste
    </button>
  </div>
  <MealList />
</template>

<script setup>
import { useMealStore } from '@/stores/meals.js'
import MealChart from '@/components/MealChart.vue'
import { useRouter } from 'vue-router'
import MealList from '@/components/MealList.vue'
import ImageLoader from '@/components/ImageLoader.vue'
import favoriteIcon from '@/assets/svg/favorite.svg'
import unfavoriteIcon from '@/assets/svg/unfavorite.svg'
import starIcon from '@/assets/svg/star.svg'

const store = useMealStore()
const router = useRouter()

const toggleFavorite = store.toggleFavorite
const isFavorite = store.isFavorite

const handleBackClick = () => {
  router.go(-1)
}

const handleRandomizeClick = () => {
  store.setRandomMeal()
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.meal-card {
  position: relative;
  background-color: rgb(252, 252, 252);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 50%;
  height: 32rem;
}

.favorite-btn {
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
  border: none;
}

.meal-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #4a5568;
  text-align: center;
}

.meal-content {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.meal-image {
  width: 40%;
  height: 22rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
}

.meal-img {
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 0.5rem;
}

.meal-details {
  display: grid;
  justify-content: center;
  text-align: center;
  width: 50%;
}

.meal-text {
  color: #718096;
  margin-bottom: 0.5rem;
}

.meal-props {
  display: flex;
  gap: 3rem;
  justify-content: center;
}
.lorem {
  padding-left: 0.5rem;
  font-weight: 300;
  font-style: italic;
}

.shopping-list-title {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: -0.5rem;
  color: #4a5568;
}

.shopping-list {
  list-style-type: decimal;
  list-style-position: inside;
  padding-left: 0.5rem;
  color: #718096;
}

.no-meal-message {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}

.button-group {
  display: flex;
  justify-content: space-evenly;
  margin-top: 0rem;
  margin-left: 2rem;
  margin-right: 2rem;
}

.button {
  padding: 0.5rem 1rem;
  color: white;
  background-color: #868f99;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
}

.disabled-button {
  opacity: 50%;
  cursor: not-allowed;
  pointer-events: none;
}

.button:hover {
  background-color: #40e0d0;
}

.button:active {
  background-color: #33b1a5;
}

.spinner {
  border: 4px solid #55b6d6;
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  display: block;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.favorite-button {
  position: absolute;
  top: 3rem;
  left: 2rem;
  margin: auto;
  width: max-content;
  text-decoration: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fav-text {
  padding: 0.5rem 1rem;
  color: white;
  background-color: #868f99;
  border-radius: 0.3rem;
}
.fav-text:hover {
  background-color: #40e0d0;
  color: black;
}

.fav-text:active {
  background-color: #33b1a5;
}
</style>
