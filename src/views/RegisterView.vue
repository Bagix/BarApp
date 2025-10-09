<script setup lang="ts">
import UserForm from '@/components/admin/UserForm.vue'
import router from '@/router'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

async function handleRegistration(data: { email: string; password: string }) {
  try {
    await createUserWithEmailAndPassword(getAuth(), data.email, data.password)
    router.push({ path: '/admin' })
  } catch (error) {
    console.error(error)
  }
}

async function handleGoogleAction() {
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(getAuth(), provider)
    router.push({ path: '/admin' })
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="container">
    <h1>Rejestracja</h1>
    <UserForm @submit="handleRegistration" @useGoogle="handleGoogleAction" btnText="Zarejestruj" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 0 16px;
}
</style>
