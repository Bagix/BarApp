<script setup lang="ts">
import AddItemForm from '@/components/admin/AddItemForm.vue'
// import ItemCard from '@/components/ItemCard.vue'
import AdminItemCard from '@/components/admin/AdminItemCard.vue'
import { useBarStore } from '@/stores/bar'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useBarStore()
const { drinksList } = storeToRefs(store)

onMounted(async () => {
  await store.getAllDrinks()
})
</script>

<template>
  <main class="container">
    <AddItemForm />
    <div class="wrapper">
      <AdminItemCard v-for="drink in drinksList" :key="drink._id" :drink="drink" />
    </div>
  </main>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 0 16px;
  max-width: 1366px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 1920px) {
  .container {
    max-width: 85vw;
  }
}

.wrapper {
  margin-top: 32px;
  padding: 16px 0;
  width: 100%;
  gap: 24px;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
}
</style>
