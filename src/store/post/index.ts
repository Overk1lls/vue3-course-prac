import axios from "axios";
import { Module } from "vuex";
import { RootState } from "@/store";
import { Options, Pagination, Post } from "@/models";

export interface PostState {
  posts: Post[];
  selectedSort: keyof Post;
  sortOptions: Options[];
  postSearchQuery: string;
  isPostLoading: boolean;
  pagination: Pagination;
}

export const postModule: Module<PostState, RootState> = {
  state: {
    posts: [],
    selectedSort: "id",
    sortOptions: [
      {
        value: "id",
        name: "By its ID",
      },
      {
        value: "title",
        name: "By its title",
      },
      {
        value: "body",
        name: "By its description",
      },
    ],
    postSearchQuery: "",
    isPostLoading: true,
    pagination: {
      page: 1,
      limit: 10,
    },
  },
  getters: {
    sortedPosts(state): Post[] {
      return [...state.posts].sort((a, b) => {
        return state.selectedSort === "id"
          ? a.id - b.id
          : a[state.selectedSort]
              .toString()
              .localeCompare(b[state.selectedSort].toString());
      });
    },
    sortedAndFilteredPosts(state, getters): Post[] {
      return getters.sortedPosts.filter((post: Post) => {
        return post.title
          .toLowerCase()
          .includes(state.postSearchQuery.toLowerCase());
      });
    },
  },
  mutations: {
    setPosts: (state, posts: Post[]) => {
      state.posts = posts;
    },
    setSort: (state, sort: keyof Post) => {
      state.selectedSort = sort;
    },
    setSortOptions: (state, options: Options[]) => {
      state.sortOptions = options;
    },
    setSearchQuery: (state, query: string) => {
      state.postSearchQuery = query;
    },
    setLoading: (state, isLoading: boolean) => {
      state.isPostLoading = isLoading;
    },
    setPage: (state, page: number) => {
      state.pagination.page = page;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        if (!state.isPostLoading) {
          commit("setPage", state.pagination.page + 1);
        }
        const { page, limit } = state.pagination;

        const { data } = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: page,
              _limit: limit,
            },
          }
        );

        commit("setPosts", [...state.posts, ...data]);
      } catch (error) {
        alert("An error occurred");
      } finally {
        if (state.isPostLoading) {
          commit("setLoading", false);
        }
      }
    },
  },
  modules: {},
  namespaced: true,
};

export default postModule;
