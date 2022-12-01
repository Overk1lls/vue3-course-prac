import { computed } from "vue";
import { PostState, useStore } from "@/store";

export function useSortedPosts() {
  const store = useStore();
  const postsModule = store.state.posts as PostState;

  const selectedSort = computed(() => postsModule.selectedSort);
  const sortedPosts = computed(() => store.getters["posts/sortedPosts"]);

  return { selectedSort, sortedPosts };
}
