<script setup lang="ts">
import UserForm from '@/components/admin/UserForm.vue'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

async function handleRegistration(data: { email: string; password: string }) {
  try {
    await createUserWithEmailAndPassword(getAuth(), data.email, data.password)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <UserForm @submit="handleRegistration" />
</template>

<style scoped></style>
