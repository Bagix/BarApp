<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Badge from 'primevue/badge'
import { useBarStore } from '@/stores/bar'
import { storeToRefs } from 'pinia'

const store = useBarStore()
const { isDetailsModalVisible, selectedItem } = storeToRefs(store)
</script>

<template>
  <Dialog id="details-modal" v-model:visible="isDetailsModalVisible" modal>
    <template #header>
      <p class="title">{{ selectedItem?.name }}</p>
    </template>
    <div class="content">
      <div class="image-box">
        <img src="http://localhost:5173/src/assets/images/test.jpg" alt="test" />
      </div>
      <div class="text">
        <p class="description">{{ selectedItem?.description }}</p>
        <div class="tools">
          <span>Przybory:</span>
          <ul class="tools-list">
            <li v-for="tool in selectedItem?.tools" :key="tool">
              {{ tool }}
            </li>
          </ul>
        </div>

        <ul class="ingredients">
          <li v-for="ingredient in selectedItem?.ingredients" :key="ingredient.type">
            {{ ingredient.amount }} {{ ingredient.type }}
          </li>
        </ul>
        <p class="prep">{{ selectedItem?.preparation }}</p>

        <div class="badge-wrapper">
          <Badge :value="selectedItem?.taste" severity="secondary" class="taste-badge" />
          <Badge
            :value="selectedItem?.color.label"
            :style="{ background: selectedItem?.color.value }"
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
    }
  }

  .content {
    padding-top: 16px;

    @media (min-width: 768px) {
      display: flex;
      flex-direction: row-reverse;
      gap: 64px;
    }
  }

  .text {
    margin-top: 16px;

    @media (min-width: 768px) {
      margin-top: 0;
    }
  }

  .image-box {
    max-width: 400px;
    max-height: 500px;
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    margin: auto;

    @media (min-width: 1920px) {
      max-height: unset;
      max-width: 50%;
    }

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .description {
    margin-bottom: 32px;
    font-style: italic;
    text-align: center;
  }

  .tools {
    display: flex;

    & span {
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
}
</style>
