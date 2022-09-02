import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pending: {},
    errored: {},
    spells: [],
  },
  getters: {},
  mutations: {
    pending(state, data) {
      Vue.set(state.pending, data.action, data.status);
    },
    errored(state, data) {
      Vue.set(state.errored, data.action, data.status);
    },
    storeSpells(state, data) {
      Vue.set(state, "spells", data);
    },
  },
  actions,
  modules: {},
});
