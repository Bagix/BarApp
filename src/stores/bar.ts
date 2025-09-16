import { defineStore } from 'pinia'
import { Connector } from '@/repositories'
import type { IDrink, IEditDrink, INewDrinkRaw } from '@/utils/types'
import { useFiltersStore } from '@/stores/filters'

interface IBarState {
  mainItemsList: IDrink[]
  pagination: number
  isLoading: boolean
  drinkToEdit: IEditDrink | null
  isEditModalVisible: boolean
  searchPhrase: string
}

export const useBarStore = defineStore('bar', {
  state: (): IBarState => ({
    mainItemsList: [],
    pagination: 0,
    isLoading: false,
    drinkToEdit: null,
    isEditModalVisible: false,
    searchPhrase: '',
  }),

  getters: {},

  actions: {
    setEditModalVisibility(isVisible: boolean) {
      this.isEditModalVisible = isVisible
    },

    async getAllDrinks(limit: number = 7): Promise<void> {
      const filtersStore = useFiltersStore()
      try {
        const items = await Connector.getItems(this.pagination, limit, filtersStore.activeFilters)
        this.pagination += limit
        this.mainItemsList.push(...items)
      } catch (e) {
        console.error(`There was a problem in getAllDrinks(): ${e}`)
      }
    },

    async addDrink(data: INewDrinkRaw): Promise<void> {
      try {
        this.isLoading = true

        const ingredients = this.prepareIngredients(data.ingredients)
        const tools = this.prepareTools(data.tools)

        const preparedData = {
          name: data.name,
          baseAlcohol: data.baseAlcohol,
          description: data.description,
          preparation: data.preparation,
          color: data.color!,
          taste: data.taste,
          ingredients,
          tools,
        }

        await Connector.addItem(preparedData)
      } catch (e) {
        console.error(`There was a problem in addDrink(): ${e}`)
      } finally {
        this.isLoading = false
      }
    },

    async deleteItem(id: string) {
      try {
        this.isLoading = true
        const response = await Connector.deleteItem(id)

        if (response.acknowledged) {
          const indextoRemove = this.mainItemsList.findIndex((drink) => drink._id === id)
          this.mainItemsList.splice(indextoRemove, 1)
        }
      } catch (e) {
        console.error(`There was a problem in deleteItem(): ${e}`)
      } finally {
        this.isLoading = false
      }
    },

    async editDrink() {
      try {
        if (!this.drinkToEdit) {
          return
        }

        this.isLoading = true

        const ingredients = this.prepareIngredients(this.drinkToEdit.ingredients)
        const tools = this.prepareTools(this.drinkToEdit.tools)

        const preparedData = {
          id: this.drinkToEdit._id,
          name: this.drinkToEdit.name,
          baseAlcohol: this.drinkToEdit.baseAlcohol,
          description: this.drinkToEdit.description,
          preparation: this.drinkToEdit.preparation,
          color: this.drinkToEdit.color!,
          taste: this.drinkToEdit.taste,
          ingredients,
          tools,
        }

        await Connector.editItem(preparedData)
      } catch (e) {
        console.error(`There was a problem in editDrink(): ${e}`)
      } finally {
        this.isLoading = false
      }
    },

    async searchByName(limit: number = 6) {
      try {
        if (!this.searchPhrase.trim()) {
          return
        }

        const items = await Connector.searchItemsByName(this.pagination, limit, this.searchPhrase)
        this.pagination += limit
        this.mainItemsList.push(...items)
      } catch (e) {
        console.error(`There was a problem in searchByName(): ${e}`)
      }
    },

    resetResults() {
      this.pagination = 0
      this.mainItemsList = []
    },

    resetSearchPhrase() {
      this.searchPhrase = ''
    },

    setDrinkToEdit(id: string | null) {
      const selectedDrink = this.mainItemsList.find((el) => el._id === id)

      if (!selectedDrink) {
        return
      }

      const tools = selectedDrink!.tools.join(', ')
      const ingredients = selectedDrink!.ingredients
        .map((el) => `${el.amount} ${el.type}`)
        .join(', ')

      this.drinkToEdit = {
        _id: selectedDrink._id,
        name: selectedDrink.name,
        baseAlcohol: selectedDrink.baseAlcohol,
        description: selectedDrink.description,
        preparation: selectedDrink.preparation,
        ingredients,
        tools,
        taste: selectedDrink.taste,
        color: selectedDrink.color,
      }
    },

    resetDrinkToEdit() {
      this.drinkToEdit = null
    },

    prepareTools(rawTools: string) {
      return rawTools
        .trim()
        .split(',')
        .map((el) => el.trim())
    },

    prepareIngredients(rawIngredients: string) {
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
    },
  },
})
