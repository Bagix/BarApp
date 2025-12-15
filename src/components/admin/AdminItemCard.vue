<script setup lang="ts">
import ItemCard from '@/components/ItemCard.vue'
import { useConfirm } from 'primevue/useconfirm'
import { useBarStore } from '@/stores/bar'
import type { IDrink } from '@/utils/types'

const store = useBarStore()
const confirm = useConfirm()

const props = defineProps<{ drink: IDrink }>()

function handleEdit() {
  store.setDrinkToEdit(props.drink._id)
  store.setEditModalVisibility(true)
}

async function deleteItem() {
  await store.deleteItem(props.drink._id)
}

function handleDelete() {
  confirm.require({
    message: 'Czy na pewno chcesz usunać tego drinka?',
    header: 'Powierdź usunięcie ',
    accept: deleteItem,
    acceptProps: {
      severity: 'danger',
      label: 'Tak',
    },
    rejectProps: {
      label: 'Nie',
    },
  })
}
</script>

<template>
  <ItemCard :drink="props.drink" class="admin-card">
    <template #footer>
      <div class="buttons">
        <UIButton label="Edytuj" severity="help" @click="handleEdit" />
        <UIButton label="Usuń" severity="danger" @click="handleDelete" />
      </div>
    </template>
  </ItemCard>
</template>

<style scoped>
.buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;
}

:deep(.p-card-body) {
  height: 100%;
}

:deep(.p-card-footer) {
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
}
</style>
