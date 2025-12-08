<script setup lang="ts">
import ItemCard from '@/components/ItemCard.vue'
import DetailsModal from '@/components/DetailsModal.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { useBarStore } from '@/stores/bar'
import type { IDrink } from '@/utils/types'
import { storeToRefs } from 'pinia'

const store = useBarStore()
const { mainItemsList } = storeToRefs(store)

function handleClick(item: IDrink) {
  store.openDetailsModal(item)
}
</script>

<template>
  <MainLayout>
    <template #content>
      <ItemCard
        v-for="item in mainItemsList"
        :key="item._id"
        :drink="item"
        @click="handleClick(item)"
      />
    </template>
    <template #modals>
      <DetailsModal />
    </template>
  </MainLayout>
</template>

<style scoped></style>
