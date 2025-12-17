<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import FileUpload from 'primevue/fileupload'
import { useBarStore } from '@/stores/bar'
import { colors, type INewDrinkRaw, flavors, baseAlcohols } from '@/utils/types'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const store = useBarStore()
const { isLoadingAdminPanel } = storeToRefs(store)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileUpload = ref<any>(null)
const toast = useToast()

const emptyModel: INewDrinkRaw = {
  name: '',
  baseAlcohol: '',
  description: '',
  preparation: '',
  ingredients: '',
  tools: '',
  taste: '',
  color: null,
}

const formModel = reactive<INewDrinkRaw>({ ...emptyModel })

async function handleSubmit(): Promise<void> {
  try {
    const image = fileUpload?.value?.files?.[0]

    if (image) {
      formModel.image = image
    }

    await store.addDrink(formModel)

    toast.add({
      severity: 'success',
      summary: 'Sukces',
      detail: 'Nowy drink został dodany.',
      life: 3000,
    })

    Object.assign(formModel, emptyModel)

    if (image) {
      fileUpload.value.remove()
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Błąd',
      detail: `Wystąpił błąd podczas dodawania nowego drinka. ${error}`,
      life: 3000,
    })
  }
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit" :inert="isLoadingAdminPanel">
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

      <FloatLabel class="input-element" variant="on">
        <InputText id="tools" v-model="formModel.decoration" autocomplete="off" required />
        <label for="tools">Dekoracja</label>
      </FloatLabel>

      <Select
        v-model="formModel.baseAlcohol"
        :options="baseAlcohols"
        placeholder="Alkohol bazowy"
      />

      <Select v-model="formModel.taste" :options="flavors" placeholder="Smak" />

      <Select v-model="formModel.color" :options="colors" placeholder="Kolor">
        <template #value="slotProps">
          <div v-if="slotProps.value">
            <div class="option-wrapper">
              <div class="color-ball" :style="{ 'background-color': slotProps.value.value }" />
              <div>{{ slotProps.value.label }}</div>
            </div>
          </div>
          <span v-else> {{ slotProps.placeholder }} </span>
        </template>
        <template #option="slotProps">
          <div class="option-wrapper">
            <div class="color-ball" :style="{ 'background-color': slotProps.option.value }" />
            <div>{{ slotProps.option.label }}</div>
          </div>
        </template>
      </Select>
    </div>

    <div class="column">
      <FileUpload
        ref="fileUpload"
        mode="basic"
        name="demo[]"
        accept="image/*"
        customUpload
        chooseLabel="Wybierz obrazek (opcjonalne)"
      />

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

    <UIButton type="submit" label="Zapisz" class="btn-submit" :loading="isLoadingAdminPanel" />
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

.color-ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 8px;
}

.option-wrapper {
  display: flex;
  align-items: center;
}
</style>
