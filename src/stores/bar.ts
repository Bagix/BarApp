import { defineStore } from 'pinia'
import { Connector } from '@/repositories'
import type { IDrink, IEditDrink, INewDrink, INewDrinkRaw } from '@/utils/types'
import { useFiltersStore } from '@/stores/filters'

interface IBarState {
  mainItemsList: IDrink[]
  pagination: number
  isLoadingAdminPanel: boolean
  isLoading: boolean
  drinkToEdit: IEditDrink | null
  isEditModalVisible: boolean
  searchPhrase: string
  isEndOfCollection: boolean
  loadBySearch: boolean
  selectedItem: IDrink | null
  isDetailsModalVisible: boolean
  perPage: number
}

export const useBarStore = defineStore('bar', {
  state: (): IBarState => ({
    mainItemsList: [],
    pagination: 0,
    isLoadingAdminPanel: false,
    isLoading: false,
    drinkToEdit: null,
    isEditModalVisible: false,
    searchPhrase: '',
    isEndOfCollection: false,
    loadBySearch: false,
    selectedItem: null,
    isDetailsModalVisible: false,
    perPage: 5,
  }),

  getters: {},

  actions: {
    setEditModalVisibility(isVisible: boolean) {
      this.isEditModalVisible = isVisible
    },

    calculateItemsPerPage(containerWidth: number, containerHeight: number): Promise<void> {
      return new Promise((resolve) => {
        let itemWidth: number

        switch (true) {
          case window.innerWidth >= 2005:
            itemWidth = 400
            break
          case window.innerWidth >= 1300:
            itemWidth = 375
            break
          case window.innerWidth >= 576:
            itemWidth = 300
            break
          default:
            itemWidth = containerWidth
        }

        const itemsAmount =
          Math.floor(containerWidth / itemWidth) * (Math.floor(containerHeight / 550) + 1)
        this.perPage = itemsAmount < 5 ? 5 : itemsAmount

        resolve()
      })
    },

    async getAllItems(): Promise<void> {
      if (this.isEndOfCollection) {
        return
      }

      const filtersStore = useFiltersStore()
      try {
        this.isLoading = true
        const data = await Connector.getItems(
          this.pagination,
          this.perPage,
          filtersStore.activeFilters,
        )
        this.pagination += this.perPage
        this.mainItemsList.push(...data.items)
        this.isEndOfCollection = data.isEndOfCollection
      } catch (e) {
        console.error(`There was a problem in getAllItems(): ${e}`)
      } finally {
        this.isLoading = false
      }
    },

    async addDrink(data: INewDrinkRaw): Promise<void> {
      try {
        this.isLoadingAdminPanel = true

        const ingredients = this.prepareIngredients(data.ingredients)
        const tools = this.prepareTools(data.tools)
        let imageUrl

        if (data.image) {
          imageUrl = await Connector.uploadImage(data.image)
        }

        const preparedData: INewDrink = {
          name: data.name,
          baseAlcohol: data.baseAlcohol,
          description: data.description,
          preparation: data.preparation,
          color: data.color,
          taste: data.taste,
          ingredients,
          tools,
        }

        if (imageUrl) {
          preparedData.image = imageUrl.public_id
        }

        await Connector.addItem(preparedData)
      } catch (e) {
        console.error(`There was a problem in addDrink(): ${e}`)
      } finally {
        this.isLoadingAdminPanel = false
      }
    },

    async deleteItem(id: string): Promise<void> {
      try {
        this.isLoadingAdminPanel = true
        const response = await Connector.deleteItem(id)
        const imageId = this.mainItemsList.find((drink) => drink._id === id)?.image

        if (imageId) {
          await Connector.deleteImage(imageId)
        }

        if (response.acknowledged) {
          const indextoRemove = this.mainItemsList.findIndex((drink) => drink._id === id)
          this.mainItemsList.splice(indextoRemove, 1)
        }
      } catch (e) {
        console.error(`There was a problem in deleteItem(): ${e}`)
      } finally {
        this.isLoadingAdminPanel = false
      }
    },

    async editDrink(newImage: File | null) {
      try {
        if (!this.drinkToEdit) {
          return
        }

        this.isLoadingAdminPanel = true

        const ingredients = this.prepareIngredients(this.drinkToEdit.ingredients)
        const tools = this.prepareTools(this.drinkToEdit.tools)

        const preparedData: IDrink = {
          _id: this.drinkToEdit._id,
          name: this.drinkToEdit.name,
          baseAlcohol: this.drinkToEdit.baseAlcohol,
          description: this.drinkToEdit.description,
          preparation: this.drinkToEdit.preparation,
          color: this.drinkToEdit.color,
          taste: this.drinkToEdit.taste,
          ingredients,
          tools,
        }

        if (!this.drinkToEdit.image && newImage) {
          const uploadResult = await Connector.uploadImage(newImage)
          preparedData.image = uploadResult.public_id
        }

        const isImageToEdit = this.drinkToEdit.image && newImage

        await Promise.all([
          Connector.editItem(preparedData),
          isImageToEdit ? Connector.editImage(this.drinkToEdit.image!, newImage) : undefined,
        ])
      } catch (e) {
        console.error(`There was a problem in editDrink(): ${e}`)
      } finally {
        this.isLoadingAdminPanel = false
      }
    },

    setSearchPhrase(phrase: string) {
      this.searchPhrase = phrase
    },

    async searchByName() {
      if (!this.searchPhrase.trim() || this.isEndOfCollection) {
        return
      }

      const newUrl = new URL(window.location.href)
      newUrl.search = ''

      try {
        this.loadBySearch = true
        this.isLoading = true

        const data = await Connector.searchItemsByName(
          this.pagination,
          this.perPage,
          this.searchPhrase,
        )

        this.pagination += this.perPage
        this.mainItemsList.push(...data.items)
        this.isEndOfCollection = data.isEndOfCollection

        newUrl.searchParams.set('search', this.searchPhrase.trim())
        window.history.pushState({}, '', newUrl)
      } catch (e) {
        console.error(`There was a problem in searchByName(): ${e}`)
      } finally {
        this.isLoading = false
      }
    },

    resetResults() {
      this.pagination = 0
      this.mainItemsList = []
      this.isEndOfCollection = false
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('search')
      window.history.pushState({}, '', newUrl)
    },

    resetSearchPhrase() {
      this.searchPhrase = ''
      this.loadBySearch = false
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
        image: selectedDrink.image ?? '',
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
        .filter((el) => el !== '')
    },

    prepareIngredients(rawIngredients: string) {
      return rawIngredients
        .trim()
        .split(',')
        .filter((el) => el.trim() !== '')
        .map((ingredient) => {
          const ingredientParts = ingredient.trim().split(' ')
          return {
            amount: ingredientParts[0],
            type: ingredientParts[1],
          }
        })
    },

    openDetailsModal(item: IDrink) {
      this.selectedItem = item
      this.isDetailsModalVisible = true
    },

    closeDetailsModal() {
      this.selectedItem = null
      this.isDetailsModalVisible = false
    },
  },
})
