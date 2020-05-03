<template>
  <div>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Essential Links</q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>
  </div>
</template>

<script>
import EssentialLink from "components/EssentialLink";
export default {
  name: "Menu",
  components: {
    EssentialLink
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Docs",
          caption: "quasar.dev",
          icon: "school",
          link: "https://quasar.dev"
        },
        {
          title: "Costo del Pedido",
          caption: "Hoja de calculo",
          icon: "shopping_cart",
          link: "/sale"
        }
      ]
    };
  }
};
</script>