<template>
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
    <div ref="observer" class="observer"></div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-undef */
import axios from "axios";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { defineComponent } from "vue";
import { Options, Pagination, Post } from "@/models";

const postsLimit = 100;

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
      } as Pagination,
    };
  },
  methods: {
    createPost(post: Post) {
      this.posts.push(post);
      this.isModalVisible = false;
    },
    deletePost(id: number) {
      this.posts = this.posts.filter((post) => post.id !== id);
    },
    showModal() {
      this.isModalVisible = true;
    },
    async fetchPosts() {
      try {
        if (!this.isPostsLoading) {
          this.pagination.page++;
        }
        const { page, limit } = this.pagination;

        const { data } = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: page,
              _limit: limit,
            },
          }
        );
        this.posts = [...this.posts, ...data];
      } catch (error) {
        alert("An error occurred");
      } finally {
        if (this.isPostsLoading) {
          this.isPostsLoading = false;
        }
      }
    },
  },
  mounted() {
    const options: IntersectionObserverInit = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback: IntersectionObserverCallback = (entries) => {
      const { page, limit } = this.pagination;
      if (entries[0].isIntersecting && page < Math.ceil(postsLimit / limit)) {
        this.fetchPosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);

    const ref = this.$refs.observer as HTMLDivElement;
    observer.observe(ref);
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

<style scoped>
.app-btn {
  display: flex;
  justify-content: space-between;
}
</style>
