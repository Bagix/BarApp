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

const wrapperElement = useTemplateRef('wrapper-element')
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

async function prepareItemsSettings() {
  if (!wrapperElement.value) {
    return
  }

  const wrapperWidth = wrapperElement.value.getBoundingClientRect().width - 32 // 32 is padding from both sides
  const wrapperHeight = window.innerHeight - (topBar?.value?.getBoundingClientRect().height ?? 0)

  await barStore.calculateItemsPerPage(wrapperWidth, wrapperHeight)
}

onMounted(async () => {
  await prepareItemsSettings()
  const urlParams = new URLSearchParams(window.location.search)
  const searchPhrase = urlParams.get('search')?.trim() || ''

  if (searchPhrase) {
    barStore.setSearchPhrase(searchPhrase)
    await barStore.searchByName()
  } else {
    await barStore.getAllItems()
  }

  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', prepareItemsSettings)
})
</script>

<template>
  <div class="main-container">
    <FiltersWrapper class="filters" />

    <main class="content">
      <div ref="top-bar" class="top-bar">
        <div class="btn-wrapper">
          <UIButton label="Filtruj" @click="openFilters" severity="secondary" icon="pi pi-filter" />

          <slot name="topBarContent" />
        </div>
        <SearchBar />
      </div>

      <div ref="wrapper-element" class="wrapper">
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

  @media (max-width: 576px) {
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

.btn-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.empty {
  width: 100%;
  text-align: center;
}
</style>
