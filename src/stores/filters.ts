import { defineStore } from 'pinia'
import type { ISelectedFilters } from '@/utils/types'
import { filtersSeparator } from '@/utils/myutils'

interface IFiltersState {
  filters: ISelectedFilters[]
  selectedFilters: ISelectedFilters[]
  activeFilters: ISelectedFilters[]
  isFiltersVisible: boolean
}

export const useFiltersStore = defineStore('filters', {
  state: (): IFiltersState => ({
    filters: [],
    selectedFilters: [],
    activeFilters: [],
    isFiltersVisible: false,
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
      const newUrl = new URL(window.location.href)

      // Remove filters that have been completely uncheked by user
      this.activeFilters.forEach((previousFilter) => {
        const filterIsDeleted = this.selectedFilters.every(
          (selectedFilter) => selectedFilter.filterName !== previousFilter.filterName,
        )
        if (filterIsDeleted) {
          newUrl.searchParams.delete(previousFilter.filterName)
        }
      })

      // Setup new active filters
      this.activeFilters = [...this.selectedFilters]

      // Go through new active filters, that have been selected by user
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
          const newFilter = {
            filterName,
            filterValues: filterFromUrl.split(filtersSeparator),
          }

          this.activeFilters.push(newFilter)
        }
      })

      this.selectedFilters = [...this.activeFilters]
    },

    resetFilters() {
      this.activeFilters = []
      this.selectedFilters = []
      const newUrl = new URL(window.location.href)
      window.history.pushState({}, '', newUrl.origin)
    },

    toogleFilters(isVisible: boolean) {
      this.isFiltersVisible = isVisible
    },
  },
})
