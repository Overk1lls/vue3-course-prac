<template>
  <div class="post">
    <div><strong>Название: </strong>{{ props.post.title }}</div>
    <div><strong>Описание: </strong>{{ props.post.body }}</div>
  </div>
  <div>
    <MyButton @click="deletePost">Delete</MyButton>
  </div>
</template>

<script lang="ts">
import MyButton from './MyButton.vue';
import { defineComponent, PropType } from 'vue';

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
  emits: ['delete'],
  methods: {
    deletePost() {
      this.$emit('delete', this.post);
    }
  },
});
</script>