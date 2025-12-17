<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Badge from 'primevue/badge'
import { useBarStore } from '@/stores/bar'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { Cloudinary } from '@cloudinary/url-gen'

const store = useBarStore()
const { isDetailsModalVisible, selectedItem } = storeToRefs(store)

const imageSrc = computed((): string => {
  if (!selectedItem.value?.image) {
    return ''
  }

  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUNDINARY_NAME },
  })

  return cld.image(selectedItem.value.image).toURL()
})
</script>

<template>
  <Dialog
    id="details-modal"
    v-model:visible="isDetailsModalVisible"
    :class="{ 'has-image': selectedItem?.image }"
    modal
  >
    <template #header>
      <p v-if="selectedItem" class="title">{{ selectedItem.name }}</p>
    </template>
    <div v-if="selectedItem" class="content">
      <div v-if="imageSrc" class="image-box">
        <img :src="imageSrc" :alt="selectedItem.name" />
      </div>
      <div class="text">
        <p class="description">{{ selectedItem.description }}</p>
        <div class="tools">
          <strong class="label">Przybory:</strong>
          <span>{{ selectedItem.tools }}</span>
        </div>

        <ul class="ingredients">
          <li v-for="ingredient in selectedItem.ingredients" :key="ingredient">
            {{ ingredient }}
          </li>
        </ul>
        <div v-if="selectedItem.decoration" class="decoration">
          <strong>Dekoracja: </strong>
          <span>{{ selectedItem.decoration }}</span>
        </div>
        <p class="prep">{{ selectedItem.preparation }}</p>

        <div class="badge-wrapper">
          <Badge :value="selectedItem.taste" severity="secondary" class="taste-badge" />
          <Badge
            v-if="selectedItem.color"
            :value="selectedItem.color.label"
            :style="{ background: selectedItem.color.value }"
            class="color-badge"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style>
#details-modal {
  .p-dialog-header {
    border-bottom: 1px solid #fff;
    padding: 12px 24px;

    @media (min-width: 768px) {
      padding: 24px;
    }

    .title {
      font-size: 18px;
      font-weight: bold;

      @media (min-width: 768px) {
        font-size: 24px;
      }

      &::first-letter {
        text-transform: capitalize;
      }
    }
  }

  .content {
    padding-top: 16px;
    min-width: 250px;
    width: 75vw;
    max-width: 1000px;
    font-size: 16px;

    @media (min-width: 768px) {
      display: flex;
      flex-direction: row-reverse;
      gap: 64px;
    }
  }

  .image-box {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;

    @media (min-width: 768px) and (max-width: 1023px) {
      max-width: 300px;
    }

    img {
      width: 100%;
      height: auto;
    }
  }

  .text {
    width: 100%;
  }

  .has-image .text {
    @media (min-width: 768px) {
      width: 50vw;
    }

    @media (min-width: 1600px) {
      width: 33vw;
    }
  }

  .description {
    margin-bottom: 32px;
    font-style: italic;
    text-align: center;
  }

  .tools {
    display: flex;

    & .label {
      margin-right: 5px;
    }
  }

  .tools-list {
    list-style: none;
    display: flex;

    & li {
      margin-right: 5px;

      &::after {
        content: ',';
        display: inline;
      }
    }

    & li:last-child {
      margin-right: 0;

      &::after {
        content: '';
      }
    }
  }

  .ingredients {
    margin: 32px 0;
    list-style: none;
    padding: 0 16px;

    & li {
      border-bottom: 1px solid #fff;
      margin-bottom: 12px;
      padding-left: 16px;
      padding-bottom: 3px;
      font-size: 16px;
    }
  }

  .badge-wrapper {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 32px;
    padding-top: 16px;
    border-top: 1px dashed #fff;
  }

  .taste-badge,
  .color-badge {
    font-size: 14px;
  }

  .taste-badge {
    background: #393e46;
  }

  .color-badge {
    color: #fff;
  }

  .decoration {
    margin-bottom: 32px;
  }
}
</style>
