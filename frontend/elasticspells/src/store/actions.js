import axios from "@/axios";

const actions = {
  getSpells(context) {
    context.commit("pending", { action: "getSpells", status: true });
    context.commit("errored", { action: "getSpells", status: false });

    return axios.get("/spells").then((result) => {
      context.commit("pending", { action: "getSpells", status: false });
      context.commit("storeSpells", result.data);
      return result;
    });
  },
  getSpellsFiltered(context, { searchTerm, searchMode }) {
    context.commit("pending", { action: "getSpells", status: true });
    context.commit("errored", { action: "getSpells", status: false });

    return axios
      .get(`/spellSearch?searchTerm=${searchTerm}&searchMode=${searchMode}`)
      .then((result) => {
        context.commit("pending", { action: "getSpells", status: false });
        context.commit("storeSpells", result.data);
        return result;
      });
  },
  getNumberOfSpellsOfEachLevel() {
    return axios.get(`/aggs/numberOfSpellsOfEachLevel`).then((result) => {
      return result;
    });
  },
  getSpellsPerDnDClass() {
    return axios.get(`/aggs/spellsPerDnDClass?searchTerm`).then((result) => {
      return result;
    });
  },
  getSpellsPerDnDSubClass() {
    return axios.get(`/aggs/spellsPerDnDSubClass?searchTerm`).then((result) => {
      return result;
    });
  },
};

export default actions;
