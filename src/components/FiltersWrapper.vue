<script setup lang="ts">
import Checkbox from 'primevue/checkbox'
import { colors, flavors, baseAlcohols } from '@/utils/types'
import { useBarStore } from '@/stores/bar'
import { storeToRefs } from 'pinia'
import Drawer from 'primevue/drawer'
import { ref, watch } from 'vue'

const store = useBarStore()
const { selectedFilters, activeFilters, isFiltersVisible } = storeToRefs(store)
const componentSelectedFilter = ref([])

function handleInput(event: Event) {
  const el = event.target as HTMLInputElement

  const filterName = el.name
  const filterValue = el.value

  store.setActiveFilter(filterName, filterValue)
}

async function handleFilter() {
  store.resetResults()
  store.toogleFilters(false)
  await store.getAllDrinks()
}

async function handleFiltersReset() {
  componentSelectedFilter.value = []
  store.resetFilters()
  store.resetResults()
  isFiltersVisible.value = false
  await store.getAllDrinks()
}

watch(isFiltersVisible, () => {
  if (isFiltersVisible.value) {
    document.body.classList.add('no-scroll')
  } else {
    document.body.classList.remove('no-scroll')
  }
})
</script>

<template>
  <Drawer class="filters-wrapper" v-model:visible="isFiltersVisible" header="Filtry">
    <div class="filters-group">
      <p class="title">Alkohol Bazowy</p>
      <div class="options">
        <div v-for="baseAlco in baseAlcohols" :key="baseAlco" class="single-option">
          <Checkbox
            :inputId="baseAlco"
            name="baseAlcohol"
            :value="baseAlco"
            v-model="componentSelectedFilter"
            @input="handleInput"
          />
          <label :for="baseAlco"> {{ baseAlco }} </label>
        </div>
      </div>
    </div>

    <div class="filters-group">
      <p class="title">Smak</p>
      <div class="options">
        <div v-for="taste in flavors" :key="taste" class="single-option">
          <Checkbox
            :inputId="taste"
            name="taste"
            :value="taste"
            v-model="componentSelectedFilter"
            @input="handleInput"
          />
          <label :for="taste"> {{ taste }} </label>
        </div>
      </div>
    </div>

    <div class="filters-group">
      <p class="title">Kolor</p>
      <div class="options">
        <div v-for="color in colors" :key="color.label" class="single-option">
          <Checkbox
            :inputId="color.label"
            name="color.label"
            v-model="componentSelectedFilter"
            @input="handleInput"
            :value="color.label"
          />
          <label :for="color.label"> {{ color.label }} </label>
        </div>
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

  & label {
    cursor: pointer;
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
  box-shadow: 0px 1px 3px 2px #222831;
  background: #18181b;
}
</style>
