<script setup lang="ts">
import AddItemForm from '@/components/admin/AddItemForm.vue'
import SearchBar from '@/components/SearchBar.vue'
import EditFormModal from '@/components/admin/EditFormModal.vue'
import ConfirmDialog from 'primevue/confirmdialog'
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
    <ConfirmDialog />
    <AddItemForm />
    <SearchBar />
    <div class="wrapper">
      <AdminItemCard v-for="drink in drinksList" :key="drink._id" :drink="drink" />
    </div>
    <EditFormModal />
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
  display: flex;
  margin-top: 32px;
  padding: 16px 0;
  width: 100%;
  gap: 24px;

  @media (max-width: 1023px) {
    align-items: center;
    flex-direction: column;
  }
}
</style>
