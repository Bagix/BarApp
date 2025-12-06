<script setup lang="ts">
import Card from 'primevue/card'
import Badge from 'primevue/badge'
import type { IDrink } from '@/utils/types'
import { computed } from 'vue'

const props = defineProps<{ drink: IDrink }>()
const emits = defineEmits(['click'])
const tools = computed(() => props.drink?.tools ?? [])
const ingredients = computed(() => props.drink?.ingredients ?? [])

function handleClick() {
  emits('click')
}
</script>

<template>
  <div
    class="item-card"
    role="button"
    tabindex="0"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <Card class="item">
      <template #title>
        <p class="title">{{ props.drink.name }}</p>
      </template>
      <template #content>
        <p class="description">{{ props.drink.description }}</p>
        <div class="tools">
          <span>Przybory:</span>
          <ul class="tools-list">
            <li v-for="tool in tools" :key="tool">
              {{ tool }}
            </li>
          </ul>
        </div>

        <ul class="ingredients">
          <li v-for="ingredient in ingredients" :key="ingredient.type">
            {{ ingredient.amount }} {{ ingredient.type }}
          </li>
        </ul>
        <p class="prep">{{ props.drink.preparation }}</p>
        <div class="badge-wrapper">
          <Badge :value="props.drink.taste" severity="secondary" class="taste-badge" />
          <Badge
            :value="props.drink.color.label"
            :style="{ background: props.drink.color.value }"
            class="color-badge"
          />
        </div>
      </template>
      <template v-if="$slots.footer" #footer>
        <slot name="footer" />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.item-card {
  width: 100%;
  border-radius: 4px;

  @media (min-width: 576px) {
    max-width: 300px;
  }

  @media (min-width: 1300px) {
    max-width: 375px;
  }

  @media (min-width: 2005px) {
    max-width: 400px;
  }
}
.item {
  font-size: 16px;
  height: 100%;
  border: 1px solid var(--secondary-color);
  box-shadow: 0px 1px 3px 2px #222831;
}

.badge-wrapper {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px dashed #fff;
}

.title {
  text-align: center;

  &::first-letter {
    text-transform: capitalize;
  }
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-style: italic;

  &::first-letter {
    text-transform: capitalize;
  }
}

.tools {
  margin-top: 24px;
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

.prep {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.taste-badge {
  background: #393e46;
}

.color-badge {
  color: #fff;
}
</style>
