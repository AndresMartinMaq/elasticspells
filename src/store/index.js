import Vue from "vue";
import Vuex from "vuex";
import { sampleData, sampleDataFireOnly } from "./sampleData";

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
  actions: {
    getSpells(context) {
      context.commit("pending", { action: "getSpells", status: true });
      context.commit("errored", { action: "getSpells", status: false });

      return Promise.resolve(sampleData).then((result) => {
        context.commit("pending", { action: "getSpells", status: false });
        context.commit("storeSpells", result);
        return result;
      });
    },
    getSpellsFiltered(context, searchTerm) {
      context.commit("pending", { action: "getSpells", status: true });
      context.commit("errored", { action: "getSpells", status: false });

      if (searchTerm === "fire") {
        return Promise.resolve(sampleDataFireOnly).then((result) => {
          context.commit("pending", { action: "getSpells", status: false });
          context.commit("storeSpells", result);
          return result;
        });
      }

      return Promise.resolve(sampleData).then((result) => {
        context.commit("pending", { action: "getSpells", status: false });
        context.commit("storeSpells", result);
        return result;
      });
    },
  },
  modules: {},
});
