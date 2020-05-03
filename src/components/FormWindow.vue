<template>
  <q-dialog ref="dialogWindow" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="q-col-gutter-md row">
        <div class="text-h6 col-12 text-center">Ventana</div>

        <q-input class="col-6" outlined v-model="window.height" label="Alto" />
        <q-input class="col-6" outlined v-model="window.width" label="Ancho" />
        <q-input class="col-6" outlined v-model="window.quantity" label="Cantidad" />
        <q-input class="col-6" outlined v-model="window.price" label="Precio (Bs.)" />
        <q-option-group
          v-model="window.features"
          type="checkbox"
          color="secondary"
          :options="features"
        />
      </q-card-section>

      <q-card-section>{{window}}</q-card-section>
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOkClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    text: "",
    window: {},
    features: {}
  },
  methods: {
    show() {
      this.$refs.dialogWindow.show();
    },
    hide() {
      this.$refs.dialogWindow.hide();
    },
    onDialogHide() {
      this.$emit("hide");
    },
    onOkClick() {
      this.$emit("ok", this.window);
      this.hide();
    },
    onCancelClick() {
      this.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>