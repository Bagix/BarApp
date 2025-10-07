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
  if (!trigger.value) {
    return
  }

  const options = {
    rootMargin: '100px 0px 0px 0px',
  }

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !isLoading.value) {
      emit('triggered')
    }
  }, options)

  observer.observe(trigger.value)
})
</script>

<template>
  <div class="trigger-wrapper">
    <div ref="trigger" class="infinity-scroll-trigger" :class="{ hide: isLoading }" />
    <ProgressSpinner v-if="isLoading" class="spinner" />
  </div>
</template>

<style>
.trigger-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.infinity-scroll-trigger {
  width: 100%;
  height: 6px;
  width: 30%;
  background: #333;
  margin: 15px 0;
  border-radius: 5px;

  &.hide {
    opacity: 0;
  }
}

.spinner {
  position: absolute;
}
</style>
