<script setup lang="ts">
import ItemCard from '@/components/ItemCard.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { useBarStore } from '@/stores/bar'
import { storeToRefs } from 'pinia'

const store = useBarStore()
const { mainItemsList } = storeToRefs(store)
</script>

<template>
  <MainLayout>
    <template #content>
      <ItemCard v-for="drink in mainItemsList" :key="drink._id" :drink="drink" />
    </template>
  </MainLayout>
</template>

<style scoped></style>
