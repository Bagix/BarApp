import { defineStore } from 'pinia'
import type { ISelectedFilters } from '@/utils/types'
import { filtersSeparator } from '@/utils/Utils'

interface IFiltersState {
  filters: ISelectedFilters[]
  selectedFilters: ISelectedFilters[]
  activeFilters: ISelectedFilters[]
  isFiltersVisible: boolean
  rawFiltersValues: string[]
}

export const useFiltersStore = defineStore('filters', {
  state: (): IFiltersState => ({
    filters: [],
    selectedFilters: [],
    activeFilters: [],
    isFiltersVisible: false,
    rawFiltersValues: [],
  }),

  getters: {},

  actions: {
    setSelectedFilter(name: string, value: string) {
      const filterIndex = this.selectedFilters.findIndex((filter) => filter.filterName === name)

      if (filterIndex === -1) {
        this.selectedFilters.push({ filterName: name, filterValues: [value] })
        return
      }

      const filterValueIndex = this.selectedFilters[filterIndex].filterValues.indexOf(value)

      if (filterValueIndex === -1) {
        this.selectedFilters[filterIndex].filterValues.push(value)
        return
      }

      this.selectedFilters[filterIndex].filterValues.splice(filterValueIndex, 1)

      if (!this.selectedFilters[filterIndex].filterValues.length) {
        this.selectedFilters.splice(filterIndex, 1)
      }
    },

    setActiveFilters() {
      this.activeFilters = [...this.selectedFilters]
      const newUrl = new URL(window.location.href)

      this.activeFilters.forEach((filter) => {
        newUrl.searchParams.delete(filter.filterName)
        const valueString = filter.filterValues.join(filtersSeparator)
        newUrl.searchParams.set(filter.filterName, valueString)
      })

      window.history.pushState({}, '', newUrl)
    },

    setActiveFiltersFromUrl() {
      const params = new URL(window.location.href).searchParams

      if (params.size === 0) {
        return
      }

      const filtersArr = ['baseAlcohol', 'taste', 'color.label']

      filtersArr.forEach((filterName) => {
        const filterFromUrl = params.get(filterName)

        if (filterFromUrl) {
          const filterValuesArr = filterFromUrl.split(filtersSeparator)
          this.rawFiltersValues = [...this.rawFiltersValues, ...filterValuesArr]

          const newFilter = {
            filterName,
            filterValues: filterValuesArr,
          }

          this.activeFilters.push(newFilter)
        }
      })

      this.selectedFilters = [...this.activeFilters]
    },

    resetFilters() {
      this.activeFilters = []
      this.selectedFilters = []
      this.rawFiltersValues = []
      const newUrl = new URL(window.location.href)
      window.history.pushState({}, '', newUrl.origin)
    },

    toogleFilters(isVisible: boolean) {
      this.isFiltersVisible = isVisible
    },
  },
})
