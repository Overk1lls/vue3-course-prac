<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view /> -->
  <div>
    <form @submit.prevent>
      <h4>Create a post</h4>
      <input v-model="title" class="input" type="text" name="" id="" placeholder="Title">
      <input v-model="body" class="input" type="text" name="" id="" placeholder="Description">
      <button class="btn" @click="createPost"></button>
    </form>
    <div class="post" v-for="post in posts" v-bind:key="post.id">
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'JavaScript',
          body: 'JavaScript info',
        },
        {
          id: 2,
          title: 'TypeScript',
          body: 'TypeScript info',
        },
      ],
      title: '',
      body: '',
    };
  },
  methods: {
    createPost() {
      const post = {
        id: Date.now(),
        title: this.title,
        body: this.body,
      };
      this.posts.push(post);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
