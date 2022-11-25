<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view /> -->
  <div class="app">
    <h1>Posts Page</h1>
    <div class="app-btn">
      <MyButton @click="showModal">Create a post</MyButton>
      <MySelector v-model="selectedSort" :options="sortOptions" />
    </div>
    <MyModal v-model:isVisible="isModalVisible">
      <PostForm @create="createPost" />
    </MyModal>
    <PostList
      v-if="!isPostsLoading"
      @delete="deletePost"
      :posts="sortedPosts"
    />
    <div v-else style="color: cornflowerblue">Loading...</div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { defineComponent } from "vue";
import { Options, Post } from "@/models";

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
      selectedSort: "title" as keyof Post,
      sortOptions: [
        {
          value: "id",
          name: "By its ID",
        },
        {
          value: "title",
          name: "By title",
        },
        {
          value: "body",
          name: "By description",
        },
      ] as Options[],
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

        const { data } = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );

        this.posts = data;
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
  computed: {
    sortedPosts(): Post[] {
      return [...this.posts].sort((a, b) => {
        return a[this.selectedSort]
          .toString()
          .localeCompare(b[this.selectedSort].toString());
      });
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

.app-btn {
  display: flex;
  justify-content: space-between;
}
</style>
