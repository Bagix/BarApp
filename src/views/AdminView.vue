<script setup lang="ts">
import AddItemForm from '@/components/admin/AddItemForm.vue'
import EditFormModal from '@/components/admin/EditFormModal.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import AdminItemCard from '@/components/admin/AdminItemCard.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { ref } from 'vue'
import { useBarStore } from '@/stores/bar'
import { storeToRefs } from 'pinia'
import { getAuth, signOut } from 'firebase/auth'
import router from '@/router'

const store = useBarStore()
const { mainItemsList } = storeToRefs(store)
const isOpen = ref(false)

function handleToggle() {
  isOpen.value = !isOpen.value
}

async function handleLogout() {
  try {
    const auth = getAuth()
    await signOut(auth)
    router.push({ path: '/' })
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <MainLayout>
    <template #topBarContent>
      <UIButton label="Wyloguj" severity="danger" icon="pi pi-sign-out" @click="handleLogout" />
    </template>
    <template #content>
      <div class="add-form-wrapper" :class="{ 'is-open': isOpen }">
        <UIButton label="Zwiń/Rozwiń Formularz" class="toggle-btn" @click="handleToggle" />
        <AddItemForm class="form" />
      </div>
      <AdminItemCard v-for="drink in mainItemsList" :key="drink._id" :drink="drink" />
    </template>

    <template #modals>
      <ConfirmDialog />
      <EditFormModal />
    </template>
  </MainLayout>
</template>

<style scoped>
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

  .form {
    margin: auto;
  }

  &.is-open {
    max-height: 1000px;
  }
}
</style>
