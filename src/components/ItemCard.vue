<script setup lang="ts">
import Card from 'primevue/card'
import Badge from 'primevue/badge'

const props = defineProps(['drink'])
const tools = props.drink.tools
const ingredients = props.drink.ingredients
</script>

<template>
  <Card class="item">
    <template #title>
      <div class="badge-wrapper">
        <Badge :value="props.drink.taste" severity="secondary" class="taste-badge" />
        <Badge
          :value="props.drink.color.label"
          :style="{ background: props.drink.color.value }"
          class="color-badge"
        />
      </div>
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
  border: 1px solid var(--secondary-color);
  box-shadow: 0px 1px 3px 2px #222831;

  @media (min-width: 767px) {
    max-width: 300px;
  }

  @media (min-width: 1300px) {
    max-width: 400px;
  }
}

.badge-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.title {
  text-align: center;

  &::first-letter {
    text-transform: capitalize;
  }
}

.description {
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
  margin-top: 16px;
}

.taste-badge {
  background: #393e46;
}

.color-badge {
  color: #fff;
}
</style>
