<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import { useBarStore } from '@/stores/bar'
import { storeToRefs } from 'pinia'

const store = useBarStore()
const { searchPhrase } = storeToRefs(store)

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
  await store.getAllDrinks()
}
</script>

<template>
  <div class="search-wrapper">
    <FloatLabel variant="on" class="search-element">
      <InputText
        id="search"
        v-model="searchPhrase"
        name="search"
        class="search-input"
        @keyup.enter="handleSearch"
      />
      <label for="search">Wyszkuj po nazwie</label>
    </FloatLabel>
    <div class="btn-wrapper">
      <UIButton label="Wyszukaj" @click="handleSearch" severity="info" class="btn" />
      <UIButton
        label="Wyczyść"
        @click="handleReset"
        severity="warn"
        class="btn"
        :disabled="!searchPhrase"
      />
    </div>
  </div>
</template>

<style scoped>
.search-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: center;
  }
}

.search-element,
.search-input {
  width: 100%;
}

.btn-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 32px;

  .btn {
    width: 50%;
  }
}
</style>
