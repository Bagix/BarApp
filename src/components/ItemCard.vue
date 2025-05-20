<script setup lang="ts">
import Card from 'primevue/card'

const props = defineProps(['drink'])
const tools = props.drink.tools
const ingredients = props.drink.ingredients
</script>

<template>
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
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </Card>
</template>

<style scoped>
.item {
  font-size: 16px;
  width: 100%;
  max-width: 400px;
}
.title {
  text-align: center;
}

.description {
  text-align: center;
  font-style: italic;
  &::first-letter {
    text-transform: capitalize;
  }
}

.tools {
  margin-top: 16px;
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
    padding-left: 6px;
    padding-bottom: 3px;
    font-size: 16px;
  }
}

.prep {
  margin-top: 16px;
}
</style>
