<template>
  <q-list dense bordered>
    <q-item-label class="text-subtitle1 row items-center" header>
      <span>{{title}}s</span>
      <span v-if="items.length < 1">(Vacio)</span>
      <q-space />
      <q-btn flat round color="green" icon="add_circle_outline" @click="onAdd()" />
    </q-item-label>
    <transition-group name="list" tag="p">
      <q-item v-for="item in items" :key="items.indexOf(item)">
        <q-item-section top avatar>
          <q-avatar color>{{item.quantity}}</q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{item.height}} x {{item.width}}</q-item-label>
          <q-item-label caption lines="2">
            <q-chip v-for="feature in item.features" :key="item.date + feature">{{ labelFeature(feature, typeItem) }}</q-chip>
          </q-item-label>
        </q-item-section>
        <q-item-section side :top="!editMode">
          <q-item-label caption>Bs. {{item.price}}</q-item-label>
          <q-btn round flat color="red" icon="remove_circle_outline" @click="onDelete(items.indexOf(item),typeItem)" />
        </q-item-section>
      </q-item>
    </transition-group>
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

import { mapState, mapGetters, mapActions } from "vuex";
export default {
  props: {
    items: {
      type: Array[Object],
      default: [{
        height: 0,
        width: 0,
        features: [],
        price: 0,
        quantity: 0
      }]
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
    ...mapGetters("sales", ["subtotalSale", "labelFeature"]),
    ...mapState("sales", ["editMode"])
  },
  methods: {
    ...mapActions("sales", ["deleteItem"]),
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
.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to

/* .list-leave-active for <2.1.8 */
  {
  opacity: 0;
  transform: translateY(-30px);
}

</style>
