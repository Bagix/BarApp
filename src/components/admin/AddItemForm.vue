<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { useBarStore } from '@/stores/bar'
import type { INewDrinkRaw } from '@/utils/types'
import { storeToRefs } from 'pinia'

const store = useBarStore()
const { isLoading } = storeToRefs(store)
let btnIcon = ''

const formModel: INewDrinkRaw = {
  name: '',
  description: '',
  preparation: '',
  ingredients: '',
  tools: '',
}

async function handleSubmit(): Promise<void> {
  await store.addDrink(formModel)
  btnIcon = 'pi pi-check'
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit" :inert="isLoading">
    <FloatLabel class="input-element" variant="on">
      <InputText id="name" v-model="formModel.name" autocomplete="off" required />
      <label for="name">Nazwa</label>
    </FloatLabel>

    <FloatLabel variant="on" class="textarea-element">
      <Textarea id="over_label" v-model="formModel.description" style="resize: none" required />
      <label for="over_label">opis</label>
    </FloatLabel>

    <FloatLabel class="input-element" variant="on">
      <InputText id="name" v-model="formModel.ingredients" autocomplete="off" required />
      <label for="name">Składniki</label>
    </FloatLabel>

    <FloatLabel class="input-element" variant="on">
      <InputText id="name" v-model="formModel.tools" autocomplete="off" required />
      <label for="name">Przybory</label>
    </FloatLabel>

    <FloatLabel variant="on" class="textarea-element">
      <Textarea
        id="over_label"
        v-model="formModel.preparation"
        autoresize
        style="resize: none"
        required
      />
      <label for="over_label">Przygotowanie</label>
    </FloatLabel>

    <UIButton
      type="submit"
      label="Zapisz"
      class="btn-submit"
      :loading="isLoading"
      :icon="btnIcon"
      iconPos="right"
    />
  </form>
</template>

<style scoped>
.form {
  padding-top: 32px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
}

.input-element input {
  width: 100%;
}

.textarea-element textarea {
  width: 100%;
  height: 150px;
}

.btn-submit {
  margin-top: 16px;
}
</style>
