import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import allMeals from '@/db/meals.json'

export const useMealStore = defineStore('meal', () => {
  const effort = ref(localStorage.getItem('effort') || 'egal')
  const price = ref(localStorage.getItem('price') || 'egal')
  const veggie = ref(localStorage.getItem('veggie') || 'egal')
  const counter = ref(Number(localStorage.getItem('counter')) || 0)
  const randomMeal = ref(JSON.parse(localStorage.getItem('randomMeal')) || null)

  const favoritesArray = ref(
    JSON.parse(localStorage.getItem('favoritesArray')) || [],
  )
  const toCookArray = ref(JSON.parse(localStorage.getItem('toCookArray')) || [])
  const cookedArray = ref(JSON.parse(localStorage.getItem('cookedArray')) || [])

  const meals = computed(() => {
    return allMeals.filter(
      meal =>
        (effort.value === 'egal' || effort.value === meal.effort) &&
        (price.value === 'egal' || price.value === meal.cost) &&
        (veggie.value === 'egal' || veggie.value === meal.veggie),
    )
  })

  // Reset function
  function $reset() {
    effort.value = 'egal'
    price.value = 'egal'
    veggie.value = 'egal'
    randomMeal.value = null
    counter.value = 0
    saveStateToLocalStorage()
  }
  function deleteMealToCook(mealId) {
    toCookArray.value = toCookArray.value.filter(meal => meal.id !== mealId)
    saveStateToLocalStorage()
  }
  function deleteMealCooked(mealId) {
    cookedArray.value = cookedArray.value.filter(meal => meal.id !== mealId)
    saveStateToLocalStorage()
  }

  // Shuffle array for randomizing
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  // Finding a Random Meal logic
  function setRandomMeal() {
    if (meals.value.length > 0) {
      if (counter.value === 0 || counter.value >= meals.value.length) {
        shuffleArray(meals.value)
        counter.value = 0
      }
      let nextMeal = meals.value[counter.value]

      if (randomMeal.value && randomMeal.value.name === nextMeal.name) {
        counter.value++

        if (counter.value >= meals.value.length) {
          shuffleArray(meals.value)
          counter.value = 0
        }
        nextMeal = meals.value[counter.value]
      }
      randomMeal.value = nextMeal
      counter.value++
      saveStateToLocalStorage()
    } else {
      randomMeal.value = null
      saveStateToLocalStorage()
    }
  }

  // Saving states to localStorage
  function saveStateToLocalStorage() {
    localStorage.setItem('effort', effort.value)
    localStorage.setItem('price', price.value)
    localStorage.setItem('veggie', veggie.value)
    localStorage.setItem('counter', counter.value)
    localStorage.setItem('randomMeal', JSON.stringify(randomMeal.value))
    localStorage.setItem('favoritesArray', JSON.stringify(favoritesArray.value))
    localStorage.setItem('toCookArray', JSON.stringify(toCookArray.value))
    localStorage.setItem('cookedArray', JSON.stringify(cookedArray.value))
  }

  // Toggle favorites
  function toggleFavorite(meal) {
    const index = favoritesArray.value.findIndex(fav => fav.id === meal.id)

    if (index === -1) {
      favoritesArray.value.push(meal)
    } else {
      favoritesArray.value.splice(index, 1)
    }

    saveStateToLocalStorage()
  }

  const isFavorite = meal => {
    return favoritesArray.value.some(fav => fav.id === meal.id)
  }

  watch(
    [
      effort,
      price,
      veggie,
      randomMeal,
      counter,
      favoritesArray,
      toCookArray,
      cookedArray,
    ],
    saveStateToLocalStorage,
    {
      deep: true,
    },
  )

  return {
    effort,
    price,
    veggie,
    randomMeal,
    meals,
    favoritesArray,
    toCookArray,
    cookedArray,
    $reset,
    setRandomMeal,
    shuffleArray,
    toggleFavorite,
    isFavorite,
    deleteMealToCook,
    deleteMealCooked,
  }
})
