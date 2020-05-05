export const getIndexSale = state => sale => {
  return state.sales.indexOf(sale);
};

export const getSaleEdited = state => {
  return state.sales[state.index];
};

export const totalSale = (state, getters) => sale => {
  return getters.subtotalSale(sale.windows) + getters.subtotalSale(sale.doors);
};

export const subtotalSale = (state, getters) => items => {
  let subtotal = 0;
  items.forEach(element => {
    subtotal += getters.totalItem(element);
  });
  return subtotal;
};

export const totalItem = state => item => {
  return item.quantity * item.price;
};

export const labelFeature = state => (item, type) => {
  let feature = "";
  if (type == "window") {
    state.windowFeatures.forEach(element => {
      if (element.value === item) {
        feature = element.label;
      }
    });
  } else if (type == "door") {
    state.doorFeatures.forEach(element => {
      if (element.value === item) {
        feature = element.label;
      }
    });
  }
  if (feature != "") {
    return feature;
  }
};
////////////////////////////////////////////////////////////////
