<template>
  <div v-if="posts.length > 0">
    <h3>Posts List</h3>
    <PostItem
      v-for="(post, idx) in posts"
      :post="post"
      :key="post.id"
      @delete="deletePost(idx)"
    />
  </div>
  <h2 v-else style="color: firebrick">There is nothing to show you...</h2>
</template>

<script lang="ts">
import PostItem from "@/components/PostItem.vue";
import { defineComponent, PropType } from "vue";
import { Post } from "@/models";

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
  emits: ["delete"],
  methods: {
    deletePost(i: number) {
      this.$emit("delete", i);
    },
  },
});
</script>
