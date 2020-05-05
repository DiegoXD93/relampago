<template>
  <q-table
    ref="myTable"
    :columns="columns"
    :data="sales"
    :filter="filter"
    :pagination.sync="pagination"
    title="REGISTRO DE VENTAS"
    row-key="name"
    no-data-label="No existen Ventas registradas"
    tabindex="0"
  >
    <template v-slot:top-right>
      <q-input outlined dense debounce="300" v-model="filter" placeholder="Fecha/Cliente">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-totalAmount="props">
      <q-td :props="props">{{totalSale(props.row)}}</q-td>
    </template>
    <template v-slot:body-cell-action="props">
      <q-td :props="props">
        <q-btn @click="editSale(props.row)" color="green" flat round icon="visibility">
          <!-- <q-btn color="amber" flat round icon="edit" />
          <q-btn color="red" flat round icon="delete" />-->
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      selected: [],
      navigationActive: false,
      filter: "",
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 8
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "date",
          align: "center",
          label: "Fecha",
          field: "date",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "client",
          required: true,
          label: "Cliente",
          align: "left",
          field: "client",
          format: val => `${val}`,
          sortable: true
        },
        { name: "totalAmount", label: "Monto Total (Bs)", align: "center" },
        { name: "action", label: "Accion", align: "center" }
      ]
    };
  },
  computed: {
    ...mapState("sales", ["sales"]),
    ...mapGetters("sales", ["totalSale"])
  },
  methods: {
    ...mapActions("sales", ["editSale"])
  }
};
</script>

<style lang="scss" scoped>
</style>