<template>
  <q-dialog ref="dialogItem" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="q-col-gutter-md row">
        <div class="text-h6 col-12 text-center">{{title}}</div>

        <q-input class="col-6" outlined v-model="item.height" label="Alto" />
        <q-input class="col-6" outlined v-model="item.width" label="Ancho" />
        <q-input class="col-6" outlined v-model="item.quantity" label="Cantidad" />
        <q-input class="col-6" outlined v-model="item.price" label="Precio (Bs.)" />
        <q-option-group
          v-model="item.features"
          type="checkbox"
          color="secondary"
          :options="features"
        />
      </q-card-section>

      <q-card-section>{{item}}</q-card-section>
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOkClick" />
        <q-btn color="primary" label="Cancelar" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    text: "",
    title: "",
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      item: {
        height: 110,
        width: 180,
        features: [],
        price: 120,
        quantity: 2
      }
    };
  },
  computed: {
    ...mapState({
      features(state) {
        if (this.type == "door") {
          return state.sales.doorFeatures;
        }
        if (this.type == "window") {
          return state.sales.windowFeatures;
        }
      }
    })
  },
  methods: {
    ...mapActions("sales", ["addItem"]),
    show() {
      this.$refs.dialogItem.show();
    },
    hide() {
      this.$refs.dialogItem.hide();
    },
    onDialogHide() {
      this.$emit("hide");
    },
    onOkClick() {
      this.addItem({ item: this.item, type: this.type });
      this.$emit("ok");
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