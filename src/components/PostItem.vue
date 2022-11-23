<template>
  <div class="post">
    <div><strong>Название: </strong>{{ props.post.title }}</div>
    <div><strong>Описание: </strong>{{ props.post.body }}</div>
  </div>
  <div>
    <MyButton class="btn">Delete</MyButton>
  </div>
</template>

<script setup lang="ts">
import MyButton from './MyButton.vue';
import { Post } from '../models';

const props = defineProps<{ post: Post }>();
</script>