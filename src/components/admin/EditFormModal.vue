<script setup lang="ts">
import Dialog from 'primevue/dialog'
import EditItemForm from '@/components/admin/EditItemForm.vue'
import { useBarStore } from '@/stores/bar'
import { storeToRefs } from 'pinia'

const store = useBarStore()
const { isEditModalVisible } = storeToRefs(store)
</script>

<template>
  <Dialog v-model:visible="isEditModalVisible" modal class="edit-modal">
    <template #header> <h2>Edycja</h2> </template>
    <EditItemForm />
  </Dialog>
</template>

<style>
.edit-modal {
  width: 100%;

  @media (min-width: 768px) {
    width: 90%;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }
}

.form {
  margin: auto;
}
</style>
