/* eslint-disable @typescript-eslint/no-explicit-any */

import { createStore, ModuleTree, useStore as baseUseStore } from "vuex";
import PostModule from "./post";

const modules: ModuleTree<RootState> = {
  posts: PostModule,
};

type ModulesState = {
  [key in keyof typeof modules]: Exclude<
    Exclude<typeof modules[key]["state"], undefined>,
    () => any
  >;
};

export interface RootState extends ModulesState {
  isModalVisible: boolean;
}

export default createStore<RootState>({
  state: {
    isModalVisible: false,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules,
});

export function useStore() {
  return baseUseStore<RootState>();
}

export * from "./post";
