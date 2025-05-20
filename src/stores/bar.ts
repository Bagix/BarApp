import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Connector } from '@/repositories'
import type { IDrink, INewDrinkRaw } from '@/utils/types'

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
  const isLoading = ref<boolean>(false)

  async function getAllDrinks(limit: number = 5): Promise<void> {
    try {
      const items = await Connector.getItems(pagination.value, limit)
      pagination.value += limit
      drinksList.value.push(...items)
    } catch (e) {
      console.error(`There was a problem in getAllDrinks(): ${e}`)
    }
  }

  async function addDrink(data: INewDrinkRaw): Promise<void> {
    try {
      isLoading.value = true
      console.log('test', isLoading.value)
      const ingredients = data.ingredients
        .trim()
        .split(',')
        .map((ingredient) => {
          const ingredientParts = ingredient.trim().split(' ')
          return {
            amount: ingredientParts[0],
            type: ingredientParts[1],
          }
        })

      const tools = data.tools
        .trim()
        .split(',')
        .map((el) => el.trim())

      const preparedData = {
        name: data.name,
        baseAlcohol: data.baseAlcohol,
        description: data.description,
        preparation: data.preparation,
        ingredients,
        tools,
      }

      await Connector.addItem(preparedData)
    } catch (e) {
      console.error(`There was a problem in addDrink(): ${e}`)
    } finally {
      isLoading.value = false
    }
  }

  return { drinksList, isLoading, getAllDrinks, addDrink }
})
