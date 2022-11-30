<template>
  <div class="app">
    <h1>Posts Page</h1>
    <div class="app-btn">
      <MyButton @click="showModal">Create a post</MyButton>
      <MyInput
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Find a post"
      />
      <MySelector
        :model-value="selectedSort"
        @update:model-value="setSort"
        :options="sortOptions"
      />
    </div>
    <MyModal v-model:isVisible="isModalVisible">
      <PostForm @create="createPost" />
    </MyModal>
    <PostList
      v-if="!isPostLoading"
      @delete="deletePost"
      :posts="sortedAndFilteredPosts"
    />
    <div v-else style="color: cornflowerblue">Loading...</div>
    <div ref="observer" class="observer"></div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-undef */
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { defineComponent } from "vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { useStore, PostState } from "@/store";
import { Options, Pagination, Post } from "@/models";

const postsLimit = 100;

export default defineComponent({
  setup() {
    const store = useStore();

    return {
      postsModule: store.state.posts as PostState,
    };
  },
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: "posts/setPage",
      setSearchQuery: "posts/setSearchQuery",
      setSort: "posts/setSort",
    }),
    ...mapActions({
      fetchPosts: "posts/fetchPosts",
    }),
    createPost(post: Post) {
      this.posts.push(post);
      this.isModalVisible = false;
    },
    deletePost(id: number) {
      this.postsModule.posts = this.posts.filter((post) => post.id !== id);
    },
    showModal() {
      this.isModalVisible = true;
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
    posts(): Post[] {
      return this.postsModule.posts;
    },
    selectedSort(): string {
      return this.postsModule.selectedSort;
    },
    sortOptions(): Options[] {
      return this.postsModule.sortOptions;
    },
    searchQuery(): string {
      return this.postsModule.postSearchQuery;
    },
    isPostLoading(): boolean {
      return this.postsModule.isPostLoading;
    },
    pagination(): Pagination {
      return this.postsModule.pagination;
    },
    ...mapGetters({
      sortedPosts: "posts/sortedPosts",
      sortedAndFilteredPosts: "posts/sortedAndFilteredPosts",
    }),
  },
});
</script>

<style scoped>
.app-btn {
  display: flex;
  justify-content: space-between;
}
</style>