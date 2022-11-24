<template>
  <div>
    <h3>Posts List</h3>
    <PostItem v-for="(post, idx) in posts" :post="post" :key="post.id" @delete="deletePost(idx)" />
  </div>
</template>

<script lang="ts">
import PostItem from '@/components/PostItem.vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array as PropType<Post[]>,
      required: true,
    },
  },
  emits: ['delete'],
  methods: {
    deletePost(i: number) {
      this.$emit('delete', i);
    },
  },
});
</script>

<style lang="scss" scoped>

</style>