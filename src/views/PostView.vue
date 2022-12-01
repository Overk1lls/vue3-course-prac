<template>
  <div v-if="!!post">
    <h1>Post #{{ $route.params.id }}</h1>
    <PostItem :post="post" />
  </div>
  <div v-else class="else">There is no such post!</div>
</template>

<script lang="ts">
import PostItem from "@/components/PostItem.vue";
import { defineComponent } from "vue";
import { PostState, useStore } from "@/store";
import { Post } from "@/models";

export default defineComponent({
  components: {
    PostItem,
  },
  setup() {
    const store = useStore();
    const posts: PostState = store.state.posts;

    return {
      posts: posts.posts,
    };
  },
  mounted() {
    if (!this.posts.length) {
      this.$router.push("/posts");
    }
  },
  computed: {
    post(): Post | undefined {
      return this.posts.find((post) => post.id === +this.$route.params.id);
    },
  },
});
</script>

<style scoped>
.else {
  color: crimson;
  padding-top: 20px;
  font-weight: bold;
}
</style>
