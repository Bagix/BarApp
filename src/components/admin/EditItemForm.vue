<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import FileUpload from 'primevue/fileupload'
import { useBarStore } from '@/stores/bar'
import { colors, flavors, baseAlcohols } from '@/utils/types'
import { storeToRefs } from 'pinia'
import { computed, useTemplateRef } from 'vue'
import { Cloudinary } from '@cloudinary/url-gen'
import { useToast } from 'primevue/usetoast'

const store = useBarStore()
const { isLoadingAdminPanel, drinkToEdit } = storeToRefs(store)
const fileUpload = useTemplateRef<HTMLInputElement>('fileupload')
const toast = useToast()

const imageSrc = computed((): string => {
  if (!drinkToEdit.value?.image) {
    return ''
  }

  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUNDINARY_NAME },
  })

  return cld.image(drinkToEdit.value.image).toURL()
})

async function handleSubmit(): Promise<void> {
  try {
    const image = fileUpload?.value?.files?.[0] ?? null
    await store.editDrink(image)
    toast.add({
      severity: 'success',
      summary: 'Sukces',
      detail: 'Zmiany zostały zapisane.',
      life: 3000,
    })

    store.setEditModalVisibility(false)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Błąd',
      detail: `Wystąpił błąd podczas zapisywania zmian. ${error}`,
      life: 3000,
    })
  }
}
</script>

<template>
  <form v-if="drinkToEdit" class="form" @submit.prevent="handleSubmit" :inert="isLoadingAdminPanel">
    <div class="column">
      <FloatLabel class="input-element" variant="on">
        <InputText id="name" v-model="drinkToEdit.name" autocomplete="off" required />
        <label for="name">Nazwa</label>
      </FloatLabel>

      <FloatLabel class="input-element" variant="on">
        <InputText id="ingredients" v-model="drinkToEdit.ingredients" autocomplete="off" required />
        <label for="ingredients">Składniki</label>
      </FloatLabel>

      <FloatLabel class="input-element" variant="on">
        <InputText id="tools" v-model="drinkToEdit.tools" autocomplete="off" required />
        <label for="tools">Przybory</label>
      </FloatLabel>

      <Select
        v-model="drinkToEdit.baseAlcohol"
        :options="baseAlcohols"
        placeholder="Alkohol bazowy"
        checkmark
      />

      <Select v-model="drinkToEdit.taste" :options="flavors" placeholder="Smak" checkmark />

      <Select v-model="drinkToEdit.color" :options="colors" placeholder="Kolor" checkmark>
        <template #value="slotProps">
          <div v-if="slotProps.value">
            <div>{{ slotProps.value.label }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex items-center">
            <span class="color-ball" />
            <div>{{ slotProps.option.label }}</div>
          </div>
        </template>
      </Select>
    </div>

    <div class="column">
      <div class="image-wrapper">
        <FileUpload ref="fileupload" mode="basic" name="demo[]" accept="image/*" customUpload />
        <div v-if="imageSrc" class="current-image">
          <span>Obecny obrazek</span>
          <div class="thumb">
            <img :src="imageSrc" :alt="drinkToEdit.name" />
          </div>
        </div>
      </div>

      <FloatLabel variant="on" class="textarea-element">
        <Textarea
          id="description"
          v-model="drinkToEdit.description"
          style="resize: none"
          required
        />
        <label for="description">Opis</label>
      </FloatLabel>

      <FloatLabel variant="on" class="textarea-element">
        <Textarea
          id="preparation"
          v-model="drinkToEdit.preparation"
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

.image-wrapper {
  display: flex;
  justify-content: space-between;

  &:deep(.p-fileupload) {
    display: flex;
  }
}

.thumb {
  width: 100px;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
