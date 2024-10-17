<template>
  <div class="chart-wrapper">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default defineComponent({
  name: 'MealChart',
  components: {
    Doughnut,
  },
  props: {
    effort: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
      required: true,
    },
    veggie: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const chartData = computed(() => {
      if (
        props.effort === 'tief' ||
        props.cost === 'tief' ||
        props.veggie === true
      ) {
        return {
          datasets: [
            {
              data: [100],
              backgroundColor: ['green'],
            },
          ],
        }
      } else if (
        props.effort === 'hoch' ||
        props.cost === 'hoch' ||
        props.veggie === false
      ) {
        return {
          datasets: [
            {
              data: [100],
              backgroundColor: ['red'],
            },
          ],
        }
      } else {
        return {
          labels: ['Unbekannt'],
          datasets: [
            {
              data: [100],
              backgroundColor: ['gray'],
            },
          ],
        }
      }
    })

    const chartOptions = computed(() => {
      if (props.effort === 'egal') {
        return {
          circumference: 180,
          rotation: -90,
          cutout: '50%',
        }
      } else {
        return {
          circumference: 360,
          rotation: 0,
          cutout: '50%',
        }
      }
    })

    return {
      chartData,
      chartOptions,
    }
  },
})
</script>

<style scoped>
.chart-wrapper {
  width: 5rem;
  height: 5rem;
}
</style>
