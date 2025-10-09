<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const emit = defineEmits(['submit', 'useGoogle'])
const props = defineProps(['btnText'])

const user = ref({
  email: '',
  password: '',
})

function handleSubmit() {
  console.log('asdadasd', user.value)
  emit('submit', { ...user.value })
}

function handleGoogleAction() {
  emit('useGoogle')
}
</script>

<template>
  <form class="user-form" @submit.prevent="handleSubmit">
    <FloatLabel class="input-element" variant="on">
      <InputText id="email" v-model="user.email" type="email" required />
      <label for="name">Email</label>
    </FloatLabel>

    <FloatLabel class="input-element" variant="on">
      <InputText id="password" v-model="user.password" type="password" required />
      <label for="name">Hasło</label>
    </FloatLabel>

    <UIButton :label="props.btnText" type="submit" />
    <UIButton type="button" @click="handleGoogleAction" icon="pi pi-google" class="btn-google" />
  </form>
</template>

<style scoped>
.user-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.btn-google {
  width: 100%;
}
</style>
