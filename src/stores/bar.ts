import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Connector } from '@/repositories'
import type { IDrink } from '@/utils/types'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useBarStore = defineStore('bar', () => {
  const drinksList = ref<Array<IDrink>>([])
  const pagination = ref(0)

  async function getAllDrinks(limit: number = 1): Promise<void> {
    try {
      const items = await Connector.getItems(pagination.value, limit)
      pagination.value += limit
      drinksList.value.push(...items)
    } catch (e) {
      console.error(`There was a problem in getAllDrinks(): ${e}`)
    }
  }

  return { drinksList, getAllDrinks }
})
