<template>
  <q-dialog ref="dialogDoor" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="q-col-gutter-md row">
        <div class="text-h6 col-12 text-center">Puerta</div>

        <q-input class="col-6" outlined v-model="door.height" label="Alto" />
        <q-input class="col-6" outlined v-model="door.width" label="Ancho" />
        <q-input class="col-6" outlined v-model="door.quantity" label="Cantidad" />
        <q-input class="col-6" outlined v-model="door.price" label="Precio (Bs.)" />
        <q-option-group
          v-model="door.features"
          type="checkbox"
          color="secondary"
          :options="features"
        />
      </q-card-section>

      <q-card-section>{{door}}</q-card-section>
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
    door: {},
    features: {}
  },
  methods: {
    show() {
      this.$refs.dialogDoor.show();
    },
    hide() {
      this.$refs.dialogDoor.hide();
    },
    onDialogHide() {
      this.$emit("hide");
    },
    onOkClick() {
      this.$emit("ok", this.door);
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