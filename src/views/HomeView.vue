<template>
  <div class="container">
    <h1 class="heading">WAS KOCHEN WIR HEUTE?</h1>

    <div class="selection-card">
      <section class="form-section">
        <form @submit.prevent="submitForm" class="form">
          <div class="form-group">
            <label for="effort" class="label">Aufwand</label>
            <div class="input-group">
              <label
                v-for="option in effortOptions"
                :key="option"
                class="radio-label"
              >
                <input
                  type="radio"
                  :value="option.toLocaleLowerCase()"
                  v-model="store.effort"
                  class="radio-input option-input radio"
                  required
                />
                <div class="radio-text">{{ option }}</div>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label for="price" class="label">Preis</label>
            <div class="input-group">
              <label
                v-for="option in priceOptions"
                :key="option"
                class="radio-label"
              >
                <input
                  type="radio"
                  :value="option.toLocaleLowerCase()"
                  v-model="store.price"
                  class="radio-input option-input radio"
                  required
                />
                <div class="radio-text">{{ option }}</div>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label for="veggie" class="label">Vegetarisch</label>
            <div class="input-group">
              <label
                v-for="option in veggieOptions"
                :key="option"
                class="radio-label"
              >
                <input
                  type="radio"
                  :value="option"
                  v-model="store.veggie"
                  class="radio-input option-input radio"
                  required
                />
                <div class="radio-text">
                  {{
                    option === true ? 'Ja' : option === false ? 'Nein' : 'Egal'
                  }}
                </div>
              </label>
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
  <div class="button-group">
    <button class="button reset-btn" @click="handleReset">Zurücksetzen</button>
    <button
      type="submit"
      class="button submit-btn"
      @click="handleSubmit"
      :class="{ 'disabled-button': store.meals.length === 0 }"
      :disabled="store.meals.length === 0"
    >
      Weiter
    </button>
  </div>
  <div class="length-info">
    {{ mealLength }}
  </div>
</template>

<script setup>
import { useMealStore } from '@/stores/meals.js'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const effortOptions = ['Egal', 'Tief', 'Hoch']
const priceOptions = ['Egal', 'Tief', 'Hoch']
const veggieOptions = ['egal', true, false]

const store = useMealStore()
const router = useRouter()

const handleReset = () => {
  store.$reset()
}
const handleSubmit = () => {
  store.setRandomMeal()
  router.push('/meal')
}

const mealLength = computed(() => {
  if (store.meals.length === 1) {
    return `Es gibt nur ${store.meals.length} Rezept unter Ihrer Auswahl.`
  } else if (store.meals.length >= 2) {
    return `Es gibt ${store.meals.length} Rezepte unter Ihrer Auswahl.`
  } else {
    return 'Leider ist unter Ihrer Auswahl kein Rezept vorhanden!'
  }
})
</script>

<style scoped>
.container {
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.heading {
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 1rem;
}

.selection-card {
  background-color: rgb(252, 252, 252);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 50%;
  height: 26rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.label {
  width: 8rem;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: right;
}

.input-group {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
}

.radio-label {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 5rem;
  padding: 1.5rem;
}

.radio-input {
  margin-right: 0.5rem;
  padding-left: 2rem;
}

.radio-text {
  margin-left: 0.5rem;
  display: flex;
  display: inline-block;
  margin-right: 2rem;
}

label {
  display: block;
  line-height: 20px;
}
.option-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  position: relative;
  height: 30px;
  width: 30px;
  transition: all 0.15s ease-out 0s;
  background: #cbd1d8;
  border: none;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  margin-right: 1.5rem;
  outline: none;
  position: relative;
  z-index: 1000;
}
.option-input:hover {
  background: #9faab7;
}
.option-input:checked {
  background: #40e0d0;
}
.option-input:checked::before {
  width: 40px;
  height: 40px;
  display: flex;
  content: '\f00c';
  font-size: 25px;
  font-weight: bold;
  position: absolute;
  align-items: center;
  justify-content: center;
}
.option-input:checked::after {
  -webkit-animation: click-wave 0.65s;
  -moz-animation: click-wave 0.65s;
  animation: click-wave 0.65s;
  background: #40e0d0;
  content: '';
  display: block;
  position: relative;
  z-index: 100;
}
.option-input.radio {
  border-radius: 50%;
}
.option-input.radio::after {
  border-radius: 50%;
}

@keyframes click-wave {
  0% {
    height: 40px;
    width: 40px;
    opacity: 0.35;
    position: relative;
  }
  100% {
    height: 200px;
    width: 200px;
    margin-left: -80px;
    margin-top: -80px;
    opacity: 0;
  }
}
.button-group {
  display: flex;
  justify-content: space-evenly;
  margin-top: 0rem;
  margin-left: 2rem;
  margin-right: 2rem;
}
.disabled-button {
  opacity: 50%;
  cursor: not-allowed;
  pointer-events: none;
}

.length-info {
  width: 100%;
  text-align: center;
  margin-top: 5rem;
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
