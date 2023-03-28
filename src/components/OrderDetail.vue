<template>
  <div class="detail-container">
    <div class="">
      <Icon
        icon="mdi:close-circle"
        color="red"
        width="24"
        role="button"
        @click="closeDetails"
      />
    </div>
    <h5>Pedido # 240</h5>
    <div class="tableContainer">
      <table class="table table-hover" id="tablaProductos">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in allProducts" :key="index">
            <td>{{ product.nombre }}</td>
            <td>{{ product.precioVenta }}</td>
            <td>5</td>
            <td>19855</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <h6>Total: $85900</h6>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { mapState } from "pinia";
import { useVentas, useProductStore } from "../stores/counter";
export default {
  components: {
    Icon,
  },
  methods: {
    closeDetails() {
      useVentas().toogleEditVentas();
    },
  },
  computed: {
    ...mapState(useVentas, ["edittingVentas"]),
    ...mapState(useProductStore, ["allProducts"]),
  },
};
</script>

<style scoped lang="scss">
.tableContainer {
  max-height: 400px;
  overflow: scroll;
}
.detail-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 34px 10px 20px;
  gap: 20px;
  box-shadow: -4px 0px 20px rgba(0, 0, 0, 0.02);
  min-width: 350px;
  max-width: 500px;
  width: 400px;
  height: 100%;

  .table-head {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 0px 40px 0px 10px;
    gap: 20px;
    margin-left: 20px;
  }

  //   scrollbar
  /* width */
  ::-webkit-scrollbar {
    width: 20px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #808080;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #b30000;
  }
}
</style>