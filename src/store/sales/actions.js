import { date } from "quasar";
let hoy = date.formatDate(new Date(), "DD-MM-YYYY");
export const editSale = ({ commit, getters }, payload) => {
  const index = getters["getIndexSale"](payload);
  commit("setIndex", index);
  const saleEdited = getters["getSaleEdited"];
  commit("setEditMode", true);
  commit("setSale", saleEdited);
};
export const resetSale = ({ commit }) => {
  commit("setEditMode", false);
  commit("setIndex", -1);
  commit("setSale", { client: "", date: hoy, windows: [], doors: [] });
};

export const saveSale = ({ commit }) => {
  commit("saveSale");
};
export const deleteItem = ({ commit }, { index, type }) => {
  type == "door" && commit("deleteDoor", index);
  type == "window" && commit("deleteWindow", index);
};

export const addItem = ({ commit }, { item, type }) => {
  type == "door" && commit("addDoor", item);
  type == "window" && commit("addWindow", item);
};
///////////////////////////////////////////////////////////////
