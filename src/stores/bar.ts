import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Connector } from '@/repositories'
import type { IDrink, IEditDrink, INewDrinkRaw } from '@/utils/types'

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
  const drinkToEdit = ref<IEditDrink | null>()
  const isEditModalVisible = ref<boolean>(false)
  const searchPhrase = ref<string>('')

  function setEditModalVisibility(isVisible: boolean) {
    isEditModalVisible.value = isVisible
  }

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

      const ingredients = prepareIngredients(data.ingredients)
      const tools = prepareTools(data.tools)

      const preparedData = {
        name: data.name,
        baseAlcohol: data.baseAlcohol,
        description: data.description,
        preparation: data.preparation,
        color: data.color,
        taste: data.taste,
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

  async function deleteItem(id: string) {
    try {
      isLoading.value = true
      const response = await Connector.deleteItem(id)

      if (response.acknowledged) {
        const indextoRemove = drinksList.value.findIndex((drink) => drink._id === id)
        drinksList.value.splice(indextoRemove, 1)
      }
    } catch (e) {
      console.error(`There was a problem in deleteItem(): ${e}`)
    } finally {
      isLoading.value = false
    }
  }

  async function editDrink() {
    try {
      if (!drinkToEdit.value) {
        return
      }

      isLoading.value = true

      const ingredients = prepareIngredients(drinkToEdit.value.ingredients)
      const tools = prepareTools(drinkToEdit.value.tools)

      const preparedData = {
        id: drinkToEdit.value._id,
        name: drinkToEdit.value.name,
        baseAlcohol: drinkToEdit.value.baseAlcohol,
        description: drinkToEdit.value.description,
        preparation: drinkToEdit.value.preparation,
        color: drinkToEdit.value.color,
        taste: drinkToEdit.value.taste,
        ingredients,
        tools,
      }

      await Connector.editItem(preparedData)
    } catch (e) {
      console.error(`There was a problem in editDrink(): ${e}`)
    } finally {
      isLoading.value = false
    }
  }

  async function searchByName(limit: number = 5) {
    try {
      if (!searchPhrase.value) {
        return
      }

      const items = await Connector.searchItemsByName(pagination.value, limit, searchPhrase.value)
      pagination.value += limit
      drinksList.value.push(...items)
    } catch (e) {
      console.error(`There was a problem in searchByName(): ${e}`)
    }
  }

  function resetForSearch() {
    pagination.value = 0
    drinksList.value = []
  }

  function setDrinkToEdit(id: string | null) {
    const selectedDrink = drinksList.value.find((el) => el._id === id)

    const tools = selectedDrink!.tools.join(', ')
    const ingredients = selectedDrink!.ingredients.map((el) => `${el.amount} ${el.type}`).join(', ')

    drinkToEdit.value = {
      _id: selectedDrink!._id,
      name: selectedDrink!.name,
      baseAlcohol: selectedDrink!.baseAlcohol,
      description: selectedDrink!.description,
      preparation: selectedDrink!.preparation,
      ingredients,
      tools,
      taste: selectedDrink!.taste,
      color: selectedDrink!.color,
    }
  }

  function resetDrinkToEdit() {
    drinkToEdit.value = null
  }

  function prepareTools(rawTools: string) {
    return rawTools
      .trim()
      .split(',')
      .map((el) => el.trim())
  }

  function prepareIngredients(rawIngredients: string) {
    return rawIngredients
      .trim()
      .split(',')
      .map((ingredient) => {
        const ingredientParts = ingredient.trim().split(' ')
        return {
          amount: ingredientParts[0],
          type: ingredientParts[1],
        }
      })
  }

  return {
    drinksList,
    isLoading,
    drinkToEdit,
    isEditModalVisible,
    searchPhrase,
    getAllDrinks,
    addDrink,
    deleteItem,
    setDrinkToEdit,
    editDrink,
    resetDrinkToEdit,
    setEditModalVisibility,
    searchByName,
    resetForSearch,
  }
})
