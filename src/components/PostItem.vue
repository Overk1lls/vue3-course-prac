<template>
  <div class="post">
    <div><strong>Название: </strong>{{ props.post.title }}</div>
    <div><strong>Описание: </strong>{{ props.post.body }}</div>
  </div>
  <div class="button">
    <button>Удалить</button>
  </div>
</template>

<script setup lang="ts">
import { Post } from '../models';

const props = defineProps<{ post: Post }>();
</script>