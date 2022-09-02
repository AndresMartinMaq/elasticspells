import axios from "@/axios";
import { sampleDataFireOnly } from "./sampleData";

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

    return axios.get("/spells").then((result) => {
      context.commit("pending", { action: "getSpells", status: false });
      context.commit("storeSpells", result.data);
      return result;
    });
  },
};

export default actions;
