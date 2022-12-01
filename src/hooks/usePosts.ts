import { computed, ref } from "vue";
import { Post } from "@/models";
import { PostState, useStore } from "@/store";

export function usePosts() {
  const totalPages = ref(100);

  const store = useStore();
  const postsModule = store.state.posts as PostState;

  const posts = computed(() => postsModule.posts);
  const isPostLoading = computed(() => postsModule.isPostLoading);
  const sortOptions = computed(() => postsModule.sortOptions);
  const searchQuery = computed(() => postsModule.postSearchQuery);
  const pagination = computed(() => postsModule.pagination);

  const createPost = (post: Post) => {
    store.commit("posts/setPosts", [...posts.value, post]);
  };

  const deletePost = (id: number) => {
    store.commit(
      "posts/setPosts",
      posts.value.filter((post) => post.id !== id)
    );
  };

  return {
    posts,
    totalPages,
    isPostLoading,
    sortOptions,
    searchQuery,
    pagination,
    createPost,
    deletePost,
  };
}
