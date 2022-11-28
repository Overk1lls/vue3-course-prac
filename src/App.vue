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
      <MyInput v-model="searchQuery" placeholder="Find a post" />
      <MySelector v-model="selectedSort" :options="sortOptions" />
    </div>
    <MyModal v-model:isVisible="isModalVisible">
      <PostForm @create="createPost" />
    </MyModal>
    <PostList
      v-if="!isPostsLoading"
      @delete="deletePost"
      :posts="sortedAndFilteredPosts"
    />
    <div v-else style="color: cornflowerblue">Loading...</div>
  </div>
  <div class="pagination">
    <div
      v-for="page in pagination.totalPages"
      :key="page"
      class="page-num"
      :class="{
        'page-current': page === pagination.page,
      }"
      @click="changePage(page)"
    >
      {{ page }}
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { defineComponent } from "vue";
import { Options, Pagination, Post } from "@/models";

const totalPagesCountHeader = "x-total-count";

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
      selectedSort: "id" as keyof Post,
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
      searchQuery: "",
      pagination: {
        page: 1,
        limit: 10,
        totalPages: 0,
      } as Pagination,
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
        const { page, limit } = this.pagination;

        const { data, headers } = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: page,
              _limit: limit,
            },
          }
        );

        this.posts = data;
        this.pagination.totalPages = headers[totalPagesCountHeader]
          ? Math.ceil(+headers[totalPagesCountHeader]! / limit)
          : 1;
      } catch (error) {
        alert("An error occurred");
      } finally {
        this.isPostsLoading = false;
      }
    },
    changePage(page: number) {
      this.pagination.page = page;
      this.fetchPosts();
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts(): Post[] {
      return [...this.posts].sort((a, b) => {
        return this.selectedSort === "id"
          ? a.id - b.id
          : a[this.selectedSort]
              .toString()
              .localeCompare(b[this.selectedSort].toString());
      });
    },
    sortedAndFilteredPosts(): Post[] {
      return this.sortedPosts.filter((post) => {
        return post.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.page-num {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}

.page-current {
  border: 2px solid teal;
}
</style>
