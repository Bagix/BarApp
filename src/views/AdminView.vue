<script setup lang="ts">
import AddItemForm from '@/components/admin/AddItemForm.vue'
</script>

<template>
  <main class="container">
    <AddItemForm />
  </main>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 0 16px;
  max-width: 1366px;
}

@media (min-width: 1920px) {
  .container {
    max-width: 1680px;
  }
}
</style>
