<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import { useBarStore } from '@/stores/bar'
import { storeToRefs } from 'pinia'

const store = useBarStore()
const { searchPhrase, isLoading, loadBySearch } = storeToRefs(store)

async function handleSearch() {
  if (!searchPhrase.value.trim()) {
    return
  }

  store.resetResults()
  await store.searchByName()
}

async function handleReset() {
  store.resetSearchPhrase()
  store.resetResults()
  await store.getAllItems()
}
</script>

<template>
  <div class="search-wrapper">
    <div class="search-with-icon">
      <FloatLabel variant="on" class="search-element">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            id="search"
            v-model="searchPhrase"
            name="search"
            type="search"
            autocomplete="off"
            class="search-input"
            @keyup.enter="handleSearch"
          />
        </IconField>
        <label for="search">Wyszkuj po nazwie</label>
      </FloatLabel>
      <UIButton icon="pi pi-search" :disabled="isLoading || !searchPhrase" @click="handleSearch" />
    </div>

    <UIButton
      icon="pi pi-undo"
      severity="warn"
      :disabled="isLoading || !loadBySearch"
      @click="handleReset"
    />
  </div>
</template>

<style scoped>
.search-wrapper {
  display: flex;
  gap: 8px;
  width: 100%;

  @media (min-width: 1024px) {
    gap: 16px;
  }
}

.search-element,
.search-input {
  width: 100%;
}

.clear-icon {
  cursor: pointer;
}

.search-with-icon {
  display: flex;
  width: 100%;

  & .p-inputtext {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & .p-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
