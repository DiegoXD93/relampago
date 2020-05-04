export const saveSale = state => {
  state.editMode
    ? (state.salesDefault[state.indexSale] = state.saleEdited)
    : state.salesDefault.push(state.saleEdited);
};
export const setSalesDefault = state => {
  state.salesEdited = state.salesDefault;
};

export const setEditMode = (state, payload) => {
  state.editMode = payload;
};

export const setIndexSale = (state, payload) => {
  state.indexSale = payload;
};
export const setSaleEdited = (state, payload) => {
  state.saleEdited = payload;
};
export const setSaleDefault = state => {
  state.saleEdited = state.saleDefault;
  state.editMode = false;
};

export const addDoor = (state, payload) => {
  state.saleEdited.doors.push(payload);
};
export const addWindow = (state, payload) => {
  state.saleEdited.windows.push(payload);
};

export const deleteDoor = (state, { index }) => {
  state.saleEdited.doors.splice(index, 1);
};
export const deleteWindow = (state, { index }) => {
  state.saleEdited.windows.splice(index, 1);
};

export const resetWindow = state => {
  state.windowEdited = state.windowDefault;
};
export const resetDoor = state => {
  state.doorEdited = state.doorDefault;
};
