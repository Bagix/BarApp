<script setup lang="ts">
import Checkbox from 'primevue/checkbox'
import { colors, flavors, baseAlcohols } from '@/utils/types'
import { useBarStore } from '@/stores/bar'
import { storeToRefs } from 'pinia'
import Drawer from 'primevue/drawer'
import { watch } from 'vue'

const store = useBarStore()
const { filters, isFiltersVisible } = storeToRefs(store)

function handleInput(event: Event) {
  const el = event.target as HTMLInputElement

  const filterName = el.name
  const filterValue = el.value

  store.setFilter(filterName, filterValue)
}

async function handleFilter() {
  store.resetResults()
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
          <Checkbox :inputId="baseAlco" name="baseAlcohol" :value="baseAlco" @input="handleInput" />
          <label :for="baseAlco"> {{ baseAlco }} </label>
        </div>
      </div>
    </div>

    <div class="filters-group">
      <p class="title">Smak</p>
      <div class="options">
        <div v-for="taste in flavors" :key="taste" class="single-option">
          <Checkbox :inputId="taste" name="taste" :value="taste" @input="handleInput" />
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
            :value="color.label"
            @input="handleInput"
          />
          <label :for="color.label"> {{ color.label }} </label>
        </div>
      </div>
    </div>
    <UIButton
      label="Filtruj"
      :disabled="!filters.length"
      @click="handleFilter"
      class="filter-btn"
    />
  </Drawer>
</template>

<style>
div.filters-wrapper {
  border-right: 1px solid var(--secondary-color);
}

.p-drawer-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
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

.filter-btn {
  flex-shrink: 0;
}
</style>
