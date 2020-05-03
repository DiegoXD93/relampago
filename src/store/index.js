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
  if (process.env.DEV && module.hot) {
    module.hot.accept(["./sales"], () => {
      const newSales = require("./sales").default;
      Store.hotUpdate({ modules: { sales: newSales } });
    });
  }

  return Store;
}
