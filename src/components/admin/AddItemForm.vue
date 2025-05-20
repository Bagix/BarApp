<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import { useBarStore } from '@/stores/bar'
import type { INewDrinkRaw } from '@/utils/types'
import { storeToRefs } from 'pinia'

const store = useBarStore()
const { isLoading } = storeToRefs(store)
const baseAlcohols = ['Whisky', 'Rum', 'Wódka', 'Gin', 'Likier']
const testes = ['Słodki', 'Kwaśny', 'Słodko-kwaśny', 'Wytrawny', 'Orzeźwiający']
const colors = ['Czerwony', 'Niebieski', 'Zielony', 'Żółty', 'Fioletowy', 'Rożówy']
let btnIcon = ''

const formModel: INewDrinkRaw = {
  name: '',
  baseAlcohol: '',
  description: '',
  preparation: '',
  ingredients: '',
  tools: '',
  taste: '',
  color: '',
}

async function handleSubmit(): Promise<void> {
  await store.addDrink(formModel)
  btnIcon = 'pi pi-check'
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit" :inert="isLoading">
    <div class="column">
      <FloatLabel class="input-element" variant="on">
        <InputText id="name" v-model="formModel.name" autocomplete="off" required />
        <label for="name">Nazwa</label>
      </FloatLabel>

      <FloatLabel class="input-element" variant="on">
        <InputText id="ingredients" v-model="formModel.ingredients" autocomplete="off" required />
        <label for="ingredients">Składniki</label>
      </FloatLabel>

      <FloatLabel class="input-element" variant="on">
        <InputText id="tools" v-model="formModel.tools" autocomplete="off" required />
        <label for="tools">Przybory</label>
      </FloatLabel>

      <Select
        v-model="formModel.baseAlcohol"
        :options="baseAlcohols"
        placeholder="Alkohol bazowy"
      />

      <Select v-model="formModel.taste" :options="testes" placeholder="Smak" />

      <Select v-model="formModel.color" :options="colors" placeholder="Kolor" />
    </div>

    <div class="column">
      <FloatLabel variant="on" class="textarea-element">
        <Textarea id="description" v-model="formModel.description" style="resize: none" required />
        <label for="description">Opis</label>
      </FloatLabel>

      <FloatLabel variant="on" class="textarea-element">
        <Textarea
          id="preparation"
          v-model="formModel.preparation"
          autoresize
          style="resize: none"
          required
        />
        <label for="preparation">Przygotowanie</label>
      </FloatLabel>
    </div>

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
  width: 100%;
  padding-top: 32px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 1024px) {
    max-width: 1366px;
    justify-content: center;
    display: grid;
    grid-template:
      'topLeft topRight' 1fr
      'bottomLeft bottomRight' 70px / 1fr 1fr;
  }
}

.column {
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (min-width: 1024px) {
    justify-content: space-between;
  }
}

.input-element input {
  width: 100%;
}

.textarea-element {
  display: flex;
  & textarea {
    width: 100%;
    height: 150px;
  }
}

.btn-submit {
  margin-top: 16px;

  @media (min-width: 1024px) {
    grid-column-start: bottomLeft;
    grid-column-end: bottomRight;
  }
}
</style>
