export const updateClient = (state, payload) => {
  state.sale.client = payload;
};
export const setEditMode = (state, payload) => {
  state.editMode = payload;
};
export const setIndex = (state, payload) => {
  state.index = payload;
};
export const setSale = (state, payload) => {
  state.sale = payload;
};
export const saveSale = state => {
  state.editMode
    ? (state.sales[state.indexSale] = state.sale)
    : state.sales.push(state.sale);
};

export const deleteDoor = (state, { index }) => {
  state.sale.doors.splice(index, 1);
};
export const deleteWindow = (state, { index }) => {
  state.sale.windows.splice(index, 1);
};

export const addDoor = (state, payload) => {
  state.sale.doors.push(payload);
};
export const addWindow = (state, payload) => {
  state.sale.windows.push(payload);
};
///////////////////////////////////////////////////////////////
