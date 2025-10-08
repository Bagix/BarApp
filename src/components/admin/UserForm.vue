<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const user = ref({
  email: '',
  password: '',
})

function handleSubmit() {
  console.log('asdadasd', user.value)
  emit('submit', { ...user.value })
}
</script>

<template>
  <div class="container">
    <form class="user-form" @submit.prevent="handleSubmit">
      <FloatLabel class="input-element" variant="on">
        <InputText id="email" v-model="user.email" type="email" required />
        <label for="name">Email</label>
      </FloatLabel>

      <FloatLabel class="input-element" variant="on">
        <InputText id="password" v-model="user.password" type="password" required />
        <label for="name">Hasło</label>
      </FloatLabel>

      <UIButton label="Wyślij" type="submit" />
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 16px;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
