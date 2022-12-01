<template>
  <div class="app">
    <h1>Posts Page</h1>
    <div class="app-btn">
      <MyButton @click="showModal">Create a post</MyButton>
      <MyInput
        v-focus
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
    <div v-else class="loading">Loading...</div>
    <div
      v-intersection:[pagination]="fetchPosts"
      ref="observer"
      class="observer"
    ></div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-undef */
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { usePosts, useSortedPosts, useSortedAndFilteredPosts } from "@/hooks";
import { defineComponent } from "vue";
import { mapActions, mapMutations } from "vuex";
import { Post } from "@/models";

export default defineComponent({
  setup() {
    const {
      posts,
      isPostLoading,
      sortOptions,
      searchQuery,
      pagination,
      deletePost,
      createPost: storePost,
    } = usePosts();
    const { selectedSort, sortedPosts } = useSortedPosts();
    const { sortedAndFilteredPosts } = useSortedAndFilteredPosts();

    return {
      posts,
      isPostLoading,
      selectedSort,
      sortedPosts,
      sortedAndFilteredPosts,
      sortOptions,
      searchQuery,
      pagination,
      deletePost,
      storePost,
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
      this.storePost(post);
      this.isModalVisible = false;
    },
    showModal() {
      this.isModalVisible = true;
    },
  },
});
</script>

<style scoped>
.app-btn {
  display: flex;
  justify-content: space-between;
}

.loading {
  font-weight: 900;
  padding-top: 30px;
  color: cornflowerblue;
}

.observer {
  height: 30px;
}
</style>
