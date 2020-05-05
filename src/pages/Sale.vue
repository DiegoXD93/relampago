<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-md justify-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <FormSale />
      </div>
      <div class="col-12 col-md-6 col-lg-6">
        <SalesTable />
      </div>
    </div>
  </q-page>
</template>

<script>
import SalesTable from "../components/SalesTable";
import FormSale from "../components/FormSale";
import { mapState, mapMutations } from "vuex";

export default {
  name: "PageSale",
  components: { SalesTable, FormSale }
};
</script>