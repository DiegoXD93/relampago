import { date } from "quasar";
import { db } from "boot/firebase";
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
  type == "door" && commit("deleteDoor", { index });
  type == "window" && commit("deleteWindow", { index });
};

export const addItem = ({ commit }, { item, type }) => {
  type == "door" && commit("addDoor", item);
  type == "window" && commit("addWindow", item);
};
///////////////////////////////////////////////////////////////

export const getSales = async ({ state, commit }) => {
  try {
    const res = await db.collection("sales").get()
    let sales = []
    res.forEach(item => {
      let d = Date(item.data().date.seconds)
      d = date.formatDate(d, "DD-MM-YYYY");
      let sale = {
        ...item.data(),
        date: d,
      }
      sales.push(sale)
    })

    return sales
    console.log('sales', sales)
    commit('setSales', sales)



  } catch (error) {
    console.log('error: ', error)

  }
};

///////////////////////////////////////////////////////////////
