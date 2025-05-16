<script setup lang="ts">
import { useBarStore } from '@/stores/bar'

const store = useBarStore()

async function handleClick() {
  await store.getAllDrinks()
}
</script>

<template>
  <main>
    Test
    <UIButton label="pobierz driny" @click="handleClick" />
  </main>
</template>
