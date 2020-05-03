<template>
  <q-layout view="lHh Lpr lFf">
    <Menu></Menu>
    <q-page-container class="bg-grey-9">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";
import Menu from "components/Menu";

export default {
  name: "MainLayout",

  components: {
    EssentialLink,
    Menu
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Costo del Pedido",
          caption: "Hoja de calculo",
          icon: "shopping_cart",
          link: "#"
        }
      ]
    };
  }
};
</script>
