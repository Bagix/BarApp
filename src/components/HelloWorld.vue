<script setup lang="ts">
import { onMounted } from 'vue'

defineProps<{
  msg: string
}>()

async function handleClick() {
  const test = await fetch('http://localhost:3000/api/test')
  const res = await test.json()

  console.log('res', res)
}

async function handleClick2() {
  const test = JSON.stringify({ name: 'dfdfgdfgdfgd', taste: 'supefgdfgdfgdfgdfr' })
  const response = await fetch('http://localhost:3000/api/add', {
    method: 'POST',
    body: test,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const res = await response.json()

  console.log('res', res)
}

async function handleClick3() {
  const data = JSON.stringify({ name: 'dfdfgdfgdfgd' })
  const response = await fetch('http://localhost:3000/api/delete', {
    method: 'DELETE',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const res = await response.json()

  console.log('res', res)
}

onMounted(async () => {
  console.log('asdasdasdasdasd')
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}asd</h1>
    <h3>
      You’ve successfully created a project with
      <button @click="handleClick">Click</button>
      <button @click="handleClick2">Click2</button>
      <button @click="handleClick3">Click3</button>
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
