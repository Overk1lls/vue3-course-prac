<template>
  <div class="post-wrapper">
    <div class="post">
      <div>ID: {{ post.id }}</div>
      <div><strong>Title: </strong>{{ post.title }}</div>
      <div><strong>Description: </strong>{{ post.body }}</div>
    </div>
    <div>
      <MyButton
        style="cursor: pointer"
        @click="$router.push(`/posts/${post.id}`)"
      >
        Read
      </MyButton>
      <MyButton @click="deletePost">Delete</MyButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Post } from "@/models";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  emits: ["delete"],
  methods: {
    deletePost() {
      this.$emit("delete", this.post.id);
    },
  },
});
</script>

<style scoped>
.post-wrapper {
  margin-bottom: 15px;
}
</style>
