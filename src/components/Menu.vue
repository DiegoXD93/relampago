<template>
  <div>
    <q-header elevated>
      <q-toolbar>
        <q-btn v-if="loggedIn" flat dense round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
        </q-avatar>
        <q-toolbar-title><!-- CERRAJERIA RELAMPAGO
 --></q-toolbar-title>
        <!-- <q-btn flat round dense icon="whatshot" @click="toggleMode" /> -->
        <q-btn v-if="loggedIn" flat label="Cerrar Sesion" @click="onLogout" />
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Essential Links</q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import EssentialLink from "components/EssentialLink";
export default {
  name: "Menu",
  components: {
    EssentialLink
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [{
          title: "Docs",
          caption: "quasar.dev",
          icon: "school",
          link: "https://quasar.dev"
        },
        {
          title: "Costo del Pedido",
          caption: "Hoja de calculo",
          icon: "shopping_cart",
          link: "/sales"
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn"])
  },
  methods: {
    ...mapMutations("auth", ["setLoggedIn"]),
    ...mapActions("auth", ["logoutUser"]),
    onLogout() {
      this.logoutUser()
      this.leftDrawerOpen = false
    },
    toggleMode() {
      this.$q.dark.toggle()
    }
  }
}

</script>
