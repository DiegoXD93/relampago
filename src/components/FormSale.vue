<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-card class="my-card">
      <q-card-section class="q-gutter-sm">
        <div class="text-h6 row">
          <span>{{formTitle}}</span>
          <q-space />
          <span>{{ saleEdited.date}}</span>
        </div>
        <q-input
          outlined
          v-model="saleEdited.client"
          label="Cliente"
          :readonly="editMode && 'readonly'"
        />
        <ItemList :items="saleEdited.windows" typeItem="window" />
        <ItemList :items="saleEdited.doors" typeItem="door" />
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
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  components: { ItemList },
  data() {
    return {
      indexSale: -1
    };
  },
  computed: {
    formTitle() {
      if (this.editMode) {
        return "Modificando Venta";
      } else {
        return "Nueva Venta";
      }
    },
    ...mapState("sales", ["saleEdited", "editMode"])
  },
  methods: {
    ...mapMutations("sales", ["setSalesDefault", "setSaleDefault"]),
    ...mapActions("sales", ["saveSale", "resetSale"]),
    onSubmit() {
      const typeDialog = "submit";
      if (this.editMode) {
        this.dialog(
          "¿Desea guardar las modificaciones hechas a la venta?",
          "Se modifico correctamente",
          typeDialog
        );
      } else {
        this.dialog(
          "¿Desea guardar el registro de la venta?",
          "Se agrego correctamente",
          typeDialog
        );
      }
    },
    onReset() {
      this.dialog(
        "¿Deseas limpiar el registro actual?",
        "Se limpio el registro correctamente",
        "reset"
      );
    },
    dialog(msgDialog, msgNotify, typeDialog) {
      this.$q
        .dialog({
          title: "Guardar",
          message: msgDialog,
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          typeDialog == "submit" && this.saveSale();
          typeDialog == "reset" && this.resetSale();
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