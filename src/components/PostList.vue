<template>
  <div v-if="posts.length > 0">
    <h3>Posts List</h3>
    <TransitionGroup name="posts-list">
      <PostItem
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @delete="deletePost(post.id)"
      />
    </TransitionGroup>
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
    deletePost(id: number) {
      this.$emit("delete", id);
    },
  },
});
</script>

<style scoped>
.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 0.5s ease;
}

.posts-list-enter-from,
.posts-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.posts-list-move {
  transition: transform 0.4s ease;
}
</style>
