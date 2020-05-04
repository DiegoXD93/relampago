export const deleteItem = ({ commit }, { index, type }) => {
  type == "door" && commit("deleteDoor", index);
  type == "window" && commit("deleteWindow", index);
};

export const addItem = ({ commit }, payload) => {
  payload.type == "door" && commit("addDoor", payload.item);
  payload.type == "window" && commit("addWindow", payload.item);
};

export const editSale = ({ commit, getters }, payload) => {
  commit("setEditMode", true);
  commit("setIndexSale", getters["getIndexSale"](payload));
  commit("setSaleEdited", payload);
};

export const saveSale = ({ commit }) => {
  commit("saveSale");
  commit("setIndexSale", -1);
  commit("setSaleDefault");
  commit("setSalesDefault");
};
export const resetSale = ({ commit, state }) => {
  state.editMode && commit("setSalesDefault");
  commit("setSaleDefault");
};
