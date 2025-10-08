<script setup lang="ts">
import UserForm from '@/components/admin/UserForm.vue'
import router from '@/router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

async function handleLogin(data: { email: string; password: string }) {
  try {
    await signInWithEmailAndPassword(getAuth(), data.email, data.password)
    router.push({ path: '/admin' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <UserForm @submit="handleLogin" />
</template>

<style scoped></style>
