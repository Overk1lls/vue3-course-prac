<template>
  <div>
    <form @submit.prevent>
      <h4>Create a post</h4>
      <input
        v-model="post.title"
        class="input"
        type="text"
        name=""
        id=""
        placeholder="Title"
      />
      <input
        v-model="post.body"
        class="input"
        type="text"
        name=""
        id=""
        placeholder="Description"
      />
      <MyButton @click="createPost">Add</MyButton>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Post } from "@/models";

export default defineComponent({
  data: () => ({
    post: {
      title: "",
      body: "",
    },
  }),
  emits: ["create"],
  methods: {
    createPost() {
      const postWithId: Post = { ...this.post, id: Date.now() };
      this.$emit("create", postWithId);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
});
</script>
