<script setup lang="ts">
import AddItemForm from '@/components/admin/AddItemForm.vue'
import SearchBar from '@/components/SearchBar.vue'
import EditFormModal from '@/components/admin/EditFormModal.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import AdminItemCard from '@/components/admin/AdminItemCard.vue'
import { ref } from 'vue'

import { useBarStore } from '@/stores/bar'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useBarStore()
const { drinksList } = storeToRefs(store)

const isOpen = ref(false)

function handleToggle() {
  isOpen.value = !isOpen.value
}

onMounted(async () => {
  await store.getAllDrinks()
})
</script>

<template>
  <main class="container">
    <ConfirmDialog />
    <div class="add-form-wrapper" :class="{ 'is-open': isOpen }">
      <UIButton label="Zwiń/Rozwiń Formularz" class="toggle-btn" @click="handleToggle" />
      <AddItemForm />
    </div>
    <SearchBar class="search" />
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

.search {
  margin: 48px 0 24px;
}

.add-form-wrapper {
  margin-top: 16px;
  width: 100%;
  max-height: 45px;
  overflow: hidden;
  transition: all 0.75s linear;

  .toggle-btn {
    display: block;
    margin: auto;
  }

  &.is-open {
    max-height: 5000px;
  }
}
</style>
