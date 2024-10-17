<template>
  <div class="meal-lists-view">
    <h1>Meine Essenspläne</h1>

    <!-- Favorites List -->
    <div class="meal-list">
      <h2>Favoriten</h2>
      <Draggable
        class="meal-cards-container"
        :list="store.favoritesArray"
        :group="{ name: 'favoriteMeals', pull: 'clone', put: false }"
        :clone="clone"
      >
        <template #item="{ element }">
          <div :key="element.id">
            <FavoriteMealCards :meal="element" />
          </div>
        </template>
      </Draggable>
    </div>

    <!-- To Cook List -->
    <div class="meal-list">
      <h2>Zum Kochen</h2>
      <Draggable
        class="meal-cards-container"
        :list="store.toCookArray"
        group="favoriteMeals"
      >
        <template #item="{ element }">
          <div :key="element.id">
            <FavoriteMealCards :meal="element" />
            <button
              @click="handleDeleteToCook(element)"
              class="delete-button"
              title="Delete"
            >
              Delete
            </button>
          </div>
        </template>
      </Draggable>
    </div>

    <!-- Cooked List -->
    <div class="meal-list">
      <h2>Gekocht</h2>
      <Draggable
        class="meal-cards-container"
        :list="store.cookedArray"
        group="favoriteMeals"
      >
        <template #item="{ element }">
          <div :key="element.id">
            <FavoriteMealCards :meal="element" />
            <button
              @click="handleDeleteCooked(element)"
              class="delete-button"
              title="Delete"
            >
              Delete
            </button>
          </div>
        </template>
      </Draggable>
    </div>
  </div>
  <RouterLink to="/" class="homepage-button">Zurück zur Startseite</RouterLink>
</template>

<script setup>
import { useMealStore } from '@/stores/meals.js'
import FavoriteMealCards from '@/components/FavoriteMealCard.vue'
import Draggable from 'vuedraggable'

const store = useMealStore()

const handleDeleteToCook = event => {
  store.deleteMealToCook(event.id)
}
const handleDeleteCooked = event => {
  store.deleteMealCooked(event.id)
}
</script>

<style scoped>
body {
  position: relative;
}
.meal-lists-view {
  padding: 2rem;
}

.meal-list {
  margin-bottom: 2rem;
}

.meal-cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.delete-button {
  padding: 0.5rem 1rem;
  color: white;
  background-color: #868f99;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  width: 50%;
  margin-left: 4rem;
}
.delete-button:hover {
  background-color: #40e0d0;
  color: black;
}

.delete-button:active {
  background-color: #33b1a5;
}
.homepage-button {
  position: absolute;
  bottom: 5rem;
  left: 0;
  right: 0;
  margin: auto;
  width: max-content;
  text-decoration: none;
  padding: 0.5rem 1rem;
  color: white;
  background-color: #868f99;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
}
.homepage-button:hover {
  background-color: #40e0d0;
  color: black;
}

.homepage-button:active {
  background-color: #33b1a5;
}
</style>
