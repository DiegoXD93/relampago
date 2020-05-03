<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-md justify-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card class="my-card">
            <q-card-section class="q-gutter-sm">
              <div class="text-h6 row">
                <span>{{formTitle}}</span>
                <q-space />
                <span>{{ saleEdited.date}}</span>
              </div>
              <q-input outlined v-model="saleEdited.client" label="Cliente" />
              <q-list dense bordered>
                <q-item-label class="text-subtitle1 row items-center" header>
                  <span>Ventanas</span>
                  <span v-if="saleEdited.windows.length < 1">(Vacio)</span>
                  <q-space />
                  <q-btn flat round color="green" icon="add_circle_outline" @click="addWindow()" />
                </q-item-label>
                <q-item
                  v-for="window in saleEdited.windows"
                  :key="'s' + saleEdited.windows.indexOf(window)"
                >
                  <q-item-section top avatar>
                    <q-avatar color text-color="primary">{{window.quantity}}</q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{window.height}} x {{window.width}}</q-item-label>
                    <q-item-label caption lines="2">
                      <q-chip
                        v-for="item in window.features"
                        :key="'w'+window.features.indexOf(item)"
                      >{{ label(item, 'window') }}</q-chip>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    <q-item-label caption>Bs. {{window.price}}</q-item-label>
                    <q-btn
                      round
                      flat
                      color="red"
                      icon="remove_circle_outline"
                      @click="deleteWindow(saleEdited.windows.indexOf(window))"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label header>Subtotal</q-item-label>
                  </q-item-section>
                  <q-item-section></q-item-section>
                  <q-item-section side>
                    <q-item-label>Bs. {{subtotalSale(saleEdited.windows)}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator spaced />
                <q-item-label class="text-subtitle1 row items-center" header>
                  <span>Puertas</span>
                  <span v-if="saleEdited.doors.length < 1">(Vacio)</span>
                  <q-space />
                  <q-btn flat round color="green" icon="add_circle_outline" @click="addDoor()" />
                </q-item-label>
                <q-item v-for="door in saleEdited.doors" :key="saleEdited.doors.indexOf(door)">
                  <q-item-section top avatar>
                    <q-avatar color text-color="primary">{{door.quantity}}</q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{door.height}} x {{door.width}}</q-item-label>
                    <q-item-label caption lines="2">
                      <q-chip
                        v-for="item in door.features"
                        :key="'d' + door.features.indexOf(item)"
                      >{{ label(item, 'door') }}</q-chip>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    <q-item-label caption>Bs. {{door.price}}</q-item-label>
                    <q-btn
                      round
                      flat
                      color="red"
                      icon="remove_circle_outline"
                      @click="deleteDoor(saleEdited.doors.indexOf(door))"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label header>Subtotal</q-item-label>
                  </q-item-section>
                  <q-item-section></q-item-section>
                  <q-item-section side>
                    <q-item-label>Bs. {{subtotalSale(saleEdited.doors)}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-separator inset />
            <q-card-actions align="center">
              <q-btn label="Guardar" type="submit" color="primary" />
              <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
      <div class="col-12 col-md-6 col-lg-6">
        <q-table
          title="REGISTRO DE VENTAS"
          :data="sales"
          :columns="columns"
          row-key="name"
          :pagination.sync="pagination"
          no-data-label="No existen Ventas registradas"
        >
          <template v-slot:body-cell-totalAmount="props">
            <q-td :props="props">{{totalSale(props.row)}}</q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn color="green" flat round icon="visibility" @click="onEdit(props.row)" />
              <!-- <q-btn color="amber" flat round icon="edit" />
              <q-btn color="red" flat round icon="delete" />-->
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import FormWindow from "../components/FormWindow";
import FormDoor from "../components/FormDoor";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

//hoy = hoy.toString();
import { date } from "quasar";
let hoy = date.formatDate(new Date(), "DD-MM-YYYY");

export default {
  name: "PageSale",
  data() {
    return {
      indexSale: -1,
      editMode: false,
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 3
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
      ],
      windowFeatures: [
        { label: "Mandado", value: "order" },
        { label: "Corrediza", value: "sliding" },
        { label: "Bañera", value: "bath" },
        { label: "Rejas", value: "grating" },
        { label: "Manija", value: "handle" }
      ],
      doorFeatures: [
        { label: "Mandado", value: "order" },
        //{ label: "Corrediza", value: "sliding" },
        { label: "Bañera", value: "bath" }
        //{ label: "Rejas", value: "grating" },
        //{ label: "Manija", value: "handle" }
      ],
      saleEdited: {
        client: "",
        date: hoy,
        windows: [
          {
            height: 120,
            width: 180,
            features: ["grating", "handle"],
            price: 120,
            quantity: 2
          },
          {
            height: 120,
            width: 150,
            features: ["order", "handle"],
            price: 120,
            quantity: 1
          }
        ],
        doors: [
          {
            height: 90,
            width: 180,
            features: [],
            price: 120,
            quantity: 1
          }
        ]
      },
      saleDefault: {
        client: "",
        date: hoy,
        windows: [],
        doors: []
      },
      windowEdited: {
        height: 120,
        width: 180,
        features: [],
        price: 120,
        quantity: 4
      },
      windowDefault: {
        height: 0,
        width: 0,
        features: [],
        price: 0,
        quantity: 0
      },
      doorEdited: {
        height: 180,
        width: 60,
        features: [],
        price: 190,
        quantity: 4
      },
      doorDefault: {
        height: 0,
        width: 0,
        features: [],
        price: 0,
        quantity: 0
      }
    };
  },
  created() {},
  computed: {
    formTitle() {
      if (this.editMode) {
        return "Modificando Venta";
      } else {
        return "Nueva Venta";
      }
    },
    ...mapState("sales", ["sales"]),
    ...mapGetters("sales", ["someGetter"])
  },
  methods: {
    ...mapMutations("sales", ["saveSale"]),
    ...mapActions("sales", ["someAction"]),
    totalItem(item) {
      return item.quantity * item.price;
    },
    subtotalSale(items) {
      let subtotal = 0;
      items.forEach(element => {
        subtotal += this.totalItem(element);
      });
      return subtotal;
    },
    totalSale(sale) {
      let total = 0;
      total += this.subtotalSale(sale.windows);
      total += this.subtotalSale(sale.doors);
      return total;
    },
    addWindow() {
      this.$q
        .dialog({
          component: FormWindow,
          parent: this,
          text: "something",
          window: this.windowEdited,
          features: this.windowFeatures
        })
        .onOk(data => {
          this.windowEdited = data;
          this.saleEdited.windows.push(this.windowEdited);
          this.$q.notify({
            message: "Item agregado con exito",
            type: "positive",
            timeout: 2000
          });
        })
        .onCancel(() => {})
        .onDismiss(() => {
          this.windowEdited = this.windowDefault;
        });
    },
    addDoor() {
      this.$q
        .dialog({
          component: FormDoor,
          parent: this,
          text: "something",
          door: this.doorEdited,
          features: this.doorFeatures
        })
        .onOk(data => {
          this.doorEdited = data;
          this.saleEdited.doors.push(this.doorEdited);
          this.$q.notify({
            message: "Item agregado con exito",
            type: "positive",
            timeout: 2000
          });
        })
        .onCancel(() => {})
        .onDismiss(() => {
          this.doorEdited = this.doorDefault;
        });
    },
    deleteWindow(index) {
      if (index > -1) {
        this.$q
          .dialog({
            title: "Cuidado",
            message: "Seguro que deseas eliminar el item?",
            cancel: true,
            persistent: true
          })
          .onOk(() => {
            this.saleEdited.windows.splice(index, 1);
            this.$q.notify({
              message: "Item eliminado con exito",
              type: "positive",
              timeout: 2000
            });
          });
      }
    },
    deleteDoor(index) {
      if (index > -1) {
        this.$q
          .dialog({
            title: "Cuidado",
            message: "Seguro que deseas eliminar el item?",
            cancel: true,
            persistent: true
          })
          .onOk(() => {
            this.saleEdited.doors.splice(index, 1);
            this.$q.notify({
              message: "Item eliminado con exito",
              type: "positive",
              timeout: 2000
            });
          });
      }
    },
    onEdit(sale) {
      this.editMode = true;
      this.saleEdited = sale;
      this.indexSale = this.sales.indexOf(sale);
    },
    onSubmit() {
      if (this.editMode) {
        this.$q
          .dialog({
            title: "Guardar",
            message: "¿Desea guardar las modificaciones hechas a la venta?",
            cancel: true,
            persistent: true
          })
          .onOk(() => {
            this.sales[this.indexSale] = this.saleEdited;
            this.saleEdited = this.saleDefault;
            this.editMode = false;
            this.$q.notify({
              type: "positive",
              message: "Se modifico correctamente",
              timeout: 2000
            });
          });
      } else {
        this.$q
          .dialog({
            title: "Guardar",
            message: "¿Desea guardar el registro de la venta?",
            cancel: true,
            persistent: true
          })
          .onOk(() => {
            this.sales.push(this.saleEdited);
            this.saleEdited = this.saleDefault;
            this.$q.notify({
              type: "positive",
              message: "Se agrego correctamente",
              timeout: 2000
            });
          });
      }
    },
    onReset() {
      this.$q
        .dialog({
          title: "Reset",
          message: "¿Deseas limpiar rel registro actual?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.saleEdited = this.saleDefault;
          this.$q.notify({
            type: "positive",
            message: "Se limpio el registro correctamente",
            timeout: 2000
          });
          this.editMode = false;
        });
    },
    label(item, type) {
      let feature = "";
      if (type == "window") {
        this.windowFeatures.forEach(element => {
          if (element.value === item) {
            feature = element.label;
          }
        });
      } else if (type == "door") {
        this.doorFeatures.forEach(element => {
          if (element.value === item) {
            feature = element.label;
          }
        });
      }
      if (feature != "") {
        return feature;
      }
    }
  }
};
</script>
