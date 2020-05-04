import Vue from "vue";
import Vuex from "vuex";
import sales from "./sales";

Vue.use(Vuex);

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      sales
    },
    strict: process.env.DEV
  });

  return Store;
}
