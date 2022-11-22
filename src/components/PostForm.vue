<template>
  <div>
    <form @submit.prevent>
      <h4>Create a post</h4>
      <input v-model="post.title" class="input" type="text" name="" id="" placeholder="Title">
      <input v-model="post.body" class="input" type="text" name="" id="" placeholder="Description">
      <button class="btn" @click="createPost">Add</button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
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