<script setup lang="ts">
import ItemCard from '@/components/ItemCard.vue'

const props = defineProps(['drink'])

function handleEdit() {
  console.log('edit')
}

function handleDelete() {
  console.log('delete')
}
</script>

<template>
  <ItemCard :drink="props.drink" class="card">
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
