<template>
  <div>
    <q-table ref="myTable" :columns="columns" :data="sales" :filter="filter" :pagination.sync="pagination" title="REGISTRO DE VENTAS" row-key="name" no-data-label="No existen Ventas registradas" tabindex="0">
      <template v-slot:top-right>
        <q-btn color="primary" icon="check" label="OK" @click="cargar" />
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
          <q-btn @click="editSale(props.row)" color="green" flat round icon="visibility"></q-btn>
        </q-td>
      </template>
    </q-table>
    <q-card>
      <ul>
        <li v-for="item in sales"> {{item}}</li>
      </ul>
    </q-card>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { date } from "quasar";
let hoy = date.formatDate(new Date(), "DD-MM-YYYY");

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
      columns: [{
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
      ],
      sales: [{
        client: "Maria Cardenas",
        date: hoy,
        windows: [{
            height: 120,
            width: 180,
            features: ["grating", "handle"],
            price: 120,
            quantity: 4
          },
          {
            height: 120,
            width: 150,
            features: ["order"],
            price: 120,
            quantity: 1
          },
          {
            height: 120,
            width: 150,
            features: ["bath"],
            price: 120,
            quantity: 1
          }
        ],
        doors: [{
          height: 90,
          width: 180,
          features: [],
          price: 120,
          quantity: 1
        }]
      }]
    };
  },
  created() {
    /*this.getSales()*/
  },
  computed: {
    /*    ...mapState("sales", ["sales"]),*/
    ...mapGetters("sales", ["totalSale"])
  },
  methods: {
    ...mapMutations("sales", ['setSale', 'guardar']),
    ...mapActions("sales", ["editSale", "getSales", 'resetSale']),
    async cargar() {
      let s = await this.getSales()
      this.sales = s
    }

  }
};

</script>
<style lang="scss" scoped>
</style>
