<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view /> -->
  <div class="app">
    <PostForm @create="createPost" />
    <PostList @delete="deletePost" :posts="posts" />
  </div>
</template>

<script lang="ts">
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { defineComponent } from 'vue';
import { Post } from './models';

export default defineComponent({
  components: {
    PostForm,
    PostList,
  },
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
      ] as Post[],
    };
  },
  methods: {
    createPost(post: Post) {
      this.posts.push(post);
    },
    deletePost(i: number) {
      this.posts.splice(i, 1);
    },
  },
});
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
