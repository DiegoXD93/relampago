<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-card class="my-card">
      <q-card-section class="q-gutter-sm">
        <div class="text-h6 row">
          <span>{{formTitle}}</span>
          <q-space />
          <span>{{ sale.date}}</span>
        </div>
        <q-input outlined v-model="client" label="Cliente" :readonly="editMode && true" />
        <ItemList :items="sale.windows" typeItem="window" />
        <ItemList :items="sale.doors" typeItem="door" />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn label="Guardar" type="submit" color="primary" />
        <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
      </q-card-actions>
    </q-card>
  </q-form>
</template>
<script>
import ItemList from "../components/ItemList";
import { deleteWindow } from "../store/sales/mutations";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  components: { ItemList },
  data() {
    return {
      formTitle: ""
    };
  },
  computed: {
    ...mapState("sales", ["editMode", "sale"]),
    client: {
      get() {
        return this.sale.client;
      },
      set(value) {
        this.updateClient(value);
      }
    }
  },
  watch: {
    editMode(val) {
      if (val) {
        this.formTitle = "Modificando Venta";
      } else {
        this.formTitle = "Nueva Venta";
      }
    }
  },
  methods: {
    ...mapActions("sales", ["resetSale"]),
    ...mapMutations("sales", ["updateClient", 'guardar']),
    onSubmit() {
      const typeDialog = "submit";
      if (this.editMode) {
        this.dialog(
          "Guardar Venta",
          "¿Desea guardar las modificaciones hechas a la venta?",
          "Se modifico correctamente",
          typeDialog
        );
      } else {
        this.dialog(
          "Guardar Venta",
          "¿Desea guardar el registro de la venta?",
          "Se agrego correctamente",
          typeDialog
        );
      }
    },
    onReset() {
      this.dialog(
        "Limpiar formulario",
        "¿Deseas limpiar el registro actual?",
        "Se limpio el registro correctamente",
        "reset"
      );
    },
    dialog(titleDialog, msgDialog, msgNotify, typeDialog) {
      this.$q
        .dialog({
          title: titleDialog,
          message: msgDialog,
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          typeDialog == "submit" && this.guardar(this.sale);
          this.resetSale();
          this.$q.notify({
            type: "positive",
            message: msgNotify,
            timeout: 2000
          });
        });
    }
  }
};

</script>
<style lang="scss" scoped>
</style>
