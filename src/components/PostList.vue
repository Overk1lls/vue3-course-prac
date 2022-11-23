<template>
  <div>
    <h3>Posts List</h3>
    <PostItem v-for="post in posts" :post="post" :key="post.id" />
  </div>
</template>

<script setup lang="ts">
import PostItem from '@/components/PostItem.vue';
import { Post } from '../models';

interface Props {
  posts: Post[];
}

defineProps<Props>();
</script>

<style lang="scss" scoped>

</style>