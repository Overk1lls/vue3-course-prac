<template>
  <div class="post">
    <div><strong>Title: </strong>{{ post.title }}</div>
    <div><strong>Description: </strong>{{ post.body }}</div>
  </div>
  <div>
    <MyButton @click="deletePost">Delete</MyButton>
  </div>
</template>

<script lang="ts">
import MyButton from "@/components/MyButton.vue";
import { Post } from "@/models";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: {
    MyButton,
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  emits: ["delete"],
  methods: {
    deletePost() {
      this.$emit("delete", this.post);
    },
  },
});
</script>
