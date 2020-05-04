<template>
  <q-list dense bordered>
    <q-item-label class="text-subtitle1 row items-center" header>
      <span>{{title}}s</span>
      <span v-if="items.length < 1">(Vacio)</span>
      <q-space />
      <q-btn flat round color="green" icon="add_circle_outline" @click="onAdd()" />
    </q-item-label>
    <q-item v-for="item in items" :key="items.indexOf(item)">
      <q-item-section top avatar>
        <q-avatar color text-color="primary">{{item.quantity}}</q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{item.height}} x {{item.width}}</q-item-label>
        <q-item-label caption lines="2">
          <q-chip
            v-for="feature in item.features"
            :key="item.date + feature"
          >{{ labelFeature(feature, typeItem) }}</q-chip>
        </q-item-label>
      </q-item-section>
      <q-item-section side :top="!editMode">
        <q-item-label caption>Bs. {{item.price}}</q-item-label>
        <q-btn
          round
          flat
          color="red"
          icon="remove_circle_outline"
          @click="onDelete(items.indexOf(item),typeItem)"
        />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label header>Subtotal</q-item-label>
      </q-item-section>
      <q-item-section></q-item-section>
      <q-item-section side>
        <q-item-label>Bs. {{subtotalSale(items)}}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>


<script>
import FormItem from "../components/FormItem";

import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  props: {
    items: {
      type: Array[Object],
      default: [
        {
          height: 0,
          width: 0,
          features: [],
          price: 0,
          quantity: 0
        }
      ]
    },
    typeItem: {
      type: String,
      default: ""
    }
  },
  computed: {
    title() {
      if (this.typeItem == "door") {
        return "Puerta";
      } else {
        return "Ventana";
      }
    },
    ...mapGetters("sales", ["subtotalSale", "labelFeature", ""]),
    ...mapState("sales", ["editMode"])
  },
  methods: {
    // ...mapMutations("sales", ["resetWindow", "resetWindow"]),
    ...mapActions("sales", ["deleteItem", "addItem"]),
    onAdd() {
      this.$q
        .dialog({
          component: FormItem,
          parent: this,
          text: "something",
          title: this.title,
          type: this.typeItem
        })
        .onOk(data => {
          this.addItem({ item: data, type: this.typeItem });
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
    onDelete(index, type) {
      this.$q
        .dialog({
          title: "Cuidado",
          message: "Seguro que deseas eliminar el item?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteItem({ index, type });
          this.$q.notify({
            message: "Item eliminado con exito",
            type: "positive",
            timeout: 2000
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>