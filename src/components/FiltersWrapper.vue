<script setup lang="ts">
import { useBarStore } from '@/stores/bar'
import { useFiltersStore } from '@/stores/filters'
import { storeToRefs } from 'pinia'
import Drawer from 'primevue/drawer'
import { onBeforeMount, watch } from 'vue'
import { baseFilters } from '@/utils/filters'

const barStore = useBarStore()
const filtersStore = useFiltersStore()
const { selectedFilters, activeFilters, isFiltersVisible } = storeToRefs(filtersStore)

function handleInput(event: Event) {
  const el = event.target as HTMLInputElement

  const filterName = el.name
  const filterValue = el.value

  filtersStore.setSelectedFilter(filterName, filterValue)
}

function isChecked(filterName: string, filterValue: string): boolean {
  const filterGroup = selectedFilters.value.find((filter) => filter.filterName === filterName)
  return filterGroup?.filterValues.some((val) => val === filterValue) ?? false
}

async function handleFilter() {
  barStore.resetResults()
  filtersStore.setActiveFilters()
  filtersStore.toogleFilters(false)
  await barStore.getAllDrinks()
}

async function handleFiltersReset() {
  filtersStore.resetFilters()
  barStore.resetResults()
  filtersStore.toogleFilters(false)
  await barStore.getAllDrinks()
}

watch(isFiltersVisible, () => {
  if (isFiltersVisible.value) {
    document.body.classList.add('no-scroll')
  } else {
    document.body.classList.remove('no-scroll')
  }
})

onBeforeMount(() => {
  filtersStore.setActiveFiltersFromUrl()
})
</script>

<template>
  <Drawer class="filters-wrapper" v-model:visible="isFiltersVisible" header="Filtry">
    <div class="filters-group" v-for="filtersGroup in baseFilters" :key="filtersGroup.name">
      <p class="title">{{ filtersGroup.displayName }}</p>
      <div class="options">
        <label v-for="option in filtersGroup.options" :key="option" class="single-option">
          <input
            type="checkbox"
            class="checkbox"
            @change="handleInput"
            :value="option"
            :name="filtersGroup.name"
            :checked="isChecked(filtersGroup.name, option)"
          />
          <span>{{ option }}</span>
        </label>
      </div>
    </div>

    <div class="filters-btn-wrapper">
      <UIButton label="Filtruj" :disabled="!selectedFilters.length" @click="handleFilter" />
      <UIButton
        label="Reset filtrów"
        :disabled="!activeFilters.length"
        @click="handleFiltersReset"
      />
    </div>
  </Drawer>
</template>

<style>
div.filters-wrapper {
  border-right: 1px solid var(--secondary-color);
}

div.p-drawer-content {
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  gap: 24px;
  position: relative;
}

.title {
  margin-bottom: 8px;
}

.options {
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.single-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: fit-content;
  padding-right: 15px;

  & .checkbox {
    width: 20px;
    height: 20px;
  }
}

.filters-btn-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 -23px 0 -24px;
  padding: 24px;
  position: sticky;
  bottom: 0;
  border-top: 1px solid var(--secondary-color);
  background: #18181b;
}
</style>
