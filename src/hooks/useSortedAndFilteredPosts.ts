import { computed } from "vue";
import { useStore } from "@/store";

export function useSortedAndFilteredPosts() {
  const store = useStore();

  const sortedAndFilteredPosts = computed(
    () => store.getters["posts/sortedAndFilteredPosts"]
  );

  return { sortedAndFilteredPosts };
}
