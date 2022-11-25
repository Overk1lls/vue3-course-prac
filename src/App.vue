<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view /> -->
  <div class="app">
    <h1>Posts Page</h1>
    <MyButton @click="showModal">Create a post</MyButton>
    <MyModal v-model:isVisible="isModalVisible">
      <PostForm @create="createPost" />
    </MyModal>
    <PostList v-if="!isPostsLoading" @delete="deletePost" :posts="posts" />
    <div v-else style="color: cornflowerblue">Loading...</div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { defineComponent } from "vue";
import { Post } from "@/models";

export default defineComponent({
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [] as Post[],
      isModalVisible: false,
      isPostsLoading: true,
    };
  },
  methods: {
    createPost(post: Post) {
      this.posts.push(post);
      this.isModalVisible = false;
    },
    deletePost(i: number) {
      this.posts.splice(i, 1);
    },
    showModal() {
      this.isModalVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;

        setTimeout(async () => {
          const { data } = await axios.get<Post[]>(
            "https://jsonplaceholder.typicode.com/posts?_limit=10"
          );

          this.posts = data;
        }, 1500);
      } catch (error) {
        alert("An error occurred");
      } finally {
        this.isPostsLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
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
