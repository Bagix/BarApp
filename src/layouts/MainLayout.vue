<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import FiltersWrapper from '@/components/FiltersWrapper.vue'
import InfinitiScrollTrigger from '@/components/InfinitiScrollTrigger.vue'
import { useFiltersStore } from '@/stores/filters'
import { onMounted, ref, useTemplateRef } from 'vue'
import { useBarStore } from '@/stores/bar'
import { storeToRefs } from 'pinia'

const barStore = useBarStore()
const { loadBySearch, mainItemsList } = storeToRefs(barStore)
const filtersStore = useFiltersStore()
const lastScrollTop = ref(0)

const topBar = useTemplateRef('top-bar')

async function handleInfinitiScroll() {
  if (loadBySearch.value) {
    await barStore.searchByName()
    return
  }

  await barStore.getAllItems()
}

function openFilters() {
  filtersStore.toogleFilters(true)
}

function handleScroll() {
  const currentOffset = window.pageYOffset
  console.log(window.scrollY)
  if (!topBar.value || currentOffset < 100) {
    return
  }

  if (currentOffset > lastScrollTop.value) {
    // downscroll code
    topBar.value.classList.add('hide')
  } else {
    // upscroll code
    topBar.value.classList.remove('hide')
  }

  lastScrollTop.value = currentOffset <= 0 ? 0 : currentOffset // For Mobile or negative scrolling
}

onMounted(async () => {
  await barStore.getAllItems()
  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="main-container">
    <FiltersWrapper class="filters" />

    <main class="content">
      <div ref="top-bar" class="top-bar">
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
        <div v-if="!mainItemsList.length && loadBySearch" class="empty">
          <h2>Brak wyników</h2>
          <p>Spróbuj zmienić kryteria wyszukiwania lub filtry.</p>
        </div>
        <slot v-else name="content" />
      </div>

      <slot name="modals" />
      <InfinitiScrollTrigger @triggered="handleInfinitiScroll" />
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
  justify-content: center;
  margin-top: 32px;
  padding: 0 var(--padding) 16px;
  width: 100%;
  gap: var(--gap);

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
  transition: transform 0.3s ease-in-out;

  &.hide {
    transform: translateY(-100%);
  }
}

.filter-trigger {
  margin-bottom: 16px;
}

.empty {
  width: 100%;
  text-align: center;
}
</style>
