<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { storeToRefs } from 'pinia'
import { useBarStore } from '@/stores/bar'
import ProgressSpinner from 'primevue/progressspinner'

const barStore = useBarStore()
const { isLoading } = storeToRefs(barStore)

const emit = defineEmits(['triggered'])

const trigger = useTemplateRef('trigger')

onMounted(() => {
  console.log('test', trigger)

  if (!trigger.value) {
    return
  }

  const options = {
    rootMargin: '50px',
  }

  const observer = new IntersectionObserver(([entry]) => {
    // console.log('co jest', entry)
    if (entry.isIntersecting && !isLoading.value) {
      console.log('idzie jak przcinak')
      emit('triggered')
    }
  }, options)

  observer.observe(trigger.value)
})
</script>

<template>
  <div class="trigger-wrapper">
    <div ref="trigger" class="infinity-scroll-trigger" :class="{ hide: isLoading }" />
    <ProgressSpinner v-if="isLoading" />
  </div>
</template>

<style>
.infinity-scroll-trigger {
  width: 100px;
  height: 10px;
  background: red;
  margin: 15px 0;

  &.hide {
    opacity: 0;
  }
}
</style>
