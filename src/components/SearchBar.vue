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
</script>

<template>
  <InputText v-model="searchPhrase" />
  <UIButton label="Wyszukaj" @click="handleSearch" />
</template>

<style scoped></style>
