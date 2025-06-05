<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useBarStore } from '@/stores/bar'
import { storeToRefs } from 'pinia'

const store = useBarStore()
const { searchPhrase } = storeToRefs(store)

async function handleSearch() {
  store.resetForSearch()
  await store.searchByName()
}

async function handleReset() {
  store.resetForSearch()
  await store.getAllDrinks()
}
</script>

<template>
  <div class="search-wrapper">
    <InputText
      v-model="searchPhrase"
      name="search"
      class="search-input"
      @keyup.enter="handleSearch"
    />
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

.search-input {
  min-width: 60vw;
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
