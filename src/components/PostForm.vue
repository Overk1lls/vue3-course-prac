<template>
  <div>
    <form @submit.prevent>
      <h4>Create a post</h4>
      <input v-model="post.title" class="input" type="text" name="" id="" placeholder="Title">
      <input v-model="post.body" class="input" type="text" name="" id="" placeholder="Description">
      <MyButton class="btn" @click="createPost">Add</MyButton>
    </form>
  </div>
</template>

<script lang="ts">
import MyButton from './MyButton.vue';

export default {
  components: {
    MyButton,
  },
  data: () => ({
    post: {
      title: '',
      body: '',
    },
  }),
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: '',
      };
    },
  },
};
</script>

<style lang="scss" scoped>

</style>