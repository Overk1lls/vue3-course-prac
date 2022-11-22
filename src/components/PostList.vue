<template>
  <div class="post" v-for="post in props.posts" v-bind:key="post.id">
    <div><strong>Название: </strong>{{ post.title }}</div>
    <div><strong>Описание: </strong>{{ post.body }}</div>
  </div>
</template>

<script setup lang="ts">
import { Post } from '../models';

interface Props {
  posts: Post[];
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>

</style>