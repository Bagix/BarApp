<script setup lang="ts">
import AddItemForm from '@/components/admin/AddItemForm.vue'
import SearchBar from '@/components/SearchBar.vue'
import EditFormModal from '@/components/admin/EditFormModal.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import AdminItemCard from '@/components/admin/AdminItemCard.vue'
import FiltersWrapper from '@/components/FiltersWrapper.vue'
import { ref } from 'vue'

import { useBarStore } from '@/stores/bar'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useBarStore()
const { mainItemsList, isFiltersVisible } = storeToRefs(store)

const isOpen = ref(false)
const isFiltersOpen = ref(false)

function handleToggle() {
  isOpen.value = !isOpen.value
}

function openFilters() {
  isFiltersVisible.value = true
}

onMounted(async () => {
  await store.getAllDrinks()
})
</script>

<template>
  <div class="container">
    <FiltersWrapper class="filters" :class="{ 'is-open': isFiltersOpen }" />
    <main class="content">
      <ConfirmDialog />
      <div class="add-form-wrapper" :class="{ 'is-open': isOpen }">
        <UIButton label="Zwiń/Rozwiń Formularz" class="toggle-btn" @click="handleToggle" />
        <AddItemForm />
      </div>
      <div class="top-bar">
        <button class="filter-trigger" @click="openFilters" />
        <SearchBar />
      </div>
      <div class="wrapper">
        <AdminItemCard v-for="drink in mainItemsList" :key="drink._id" :drink="drink" />
      </div>
      <EditFormModal />
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  position: relative;
}
.content {
  --gap: 24px;
  --padding: 16px;

  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: 1920px) {
    width: 85vw;
    max-width: calc(2000px + (2 * var(--padding)) + (4 * var(--gap)));
  }
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-top: 32px;
  padding: 0 var(--padding) 16px;
  width: 100%;
  gap: var(--gap);
  justify-content: center;

  @media (max-width: 767px) {
    align-items: center;
    flex-direction: column;
  }
}

.top-bar {
  margin: 32px 0 8px;
  position: sticky;
  padding: 16px 16px 24px;
  width: 100%;
  top: 0;
  background: var(--main-background-color);
  border-bottom: 2px solid #444;
  z-index: 1;
}

.add-form-wrapper {
  margin-top: 16px;
  width: 100%;
  max-height: 45px;
  overflow: hidden;
  transition: all 0.5s linear;

  .toggle-btn {
    display: block;
    margin: auto;
  }

  &.is-open {
    max-height: 1000px;
  }
}

.filter-trigger {
  width: 50px;
  height: 50px;
  background: red;
  cursor: pointer;
  margin-bottom: 16px;
  border: 0;
}
</style>
