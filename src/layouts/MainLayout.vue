<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import FiltersWrapper from '@/components/FiltersWrapper.vue'
import { useFiltersStore } from '@/stores/filters'

const filtersStore = useFiltersStore()

function openFilters() {
  filtersStore.toogleFilters(true)
}
</script>

<template>
  <div class="main-container">
    <FiltersWrapper class="filters" />

    <main class="content">
      <div class="top-bar">
        <UIButton
          label="Filtruj"
          @click="openFilters"
          severity="secondary"
          icon="pi pi-filter"
          class="filter-trigger"
        />
        <SearchBar />
      </div>

      <div class="wrapper">
        <slot name="content" />
      </div>

      <slot name="modals" />
    </main>
  </div>
</template>

<style scoped>
.main-container {
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
  position: sticky;
  padding: 16px 16px 24px;
  width: 100%;
  top: 0;
  background: var(--main-background-color);
  border-bottom: 2px solid #444;
  z-index: 1;
}

.filter-trigger {
  margin-bottom: 16px;
}
</style>
