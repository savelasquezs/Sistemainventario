<template>
  <div>fecha</div>
  <div>
    <h3>Producto mas vendido</h3>
    <ul>
      <li>
        <comprasIcon />
        <h4>$12 456</h4>
        <h5>Total Ventas</h5>
      </li>
      <li>
        <comprasIcon />
        <h4>654654</h4>
        <h5>Ganancia</h5>
      </li>
      <li>
        <comprasIcon />
        <h4>199</h4>
        <h5>Unidades Vendidas</h5>
      </li>
    </ul>
  </div>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th align="center">Nombre</th>
          <th align="center">Precio de Compra</th>
          <th align="center">Precio de Venta</th>
          <th align="center">Stock</th>
          <th align="center">Ganacia por Unidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in allProducts" :key="index">
          <td align="center">
            <div class="d-flex">
              <img
                :src="product.imageURL"
                alt=""
                width="35"
                class="mx-5"
                height="35"
              />
              <h6>
                {{ product.nombre }}
              </h6>
            </div>
          </td>
          <td align="center" v-text="moneda(product.precioCompra)"></td>
          <td align="center">{{ moneda(product.precioVenta) }}</td>
          <td align="center">{{ product.stock }} Un</td>
          <td align="center">{{ moneda(product.ganancia) }}</td>
          <td>
            <!-- <Icon
              class="iconos"
              icon="bi:trash-fill"
              color="red"
              @click="borrarProducto(product.docId)"
            /> -->
            <BotonBorrar />

            <Icon
              icon="material-symbols:edit"
              color="green"
              width="24"
              height="24"
              class="iconos"
              @click="editProduct(product.docId)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <add-button @click="abrirModal" />
</template>

<script>
import comprasIcon from "../components/icons/comprasIcon.vue";
import addButton from "../components/addButton.vue";
import BotonBorrar from "../components/BotonBorrar.vue";
import { Icon } from "@iconify/vue";
import { useProductStore, useUtils } from "../stores/counter";
import { mapState } from "pinia";
import { doc, deleteDoc } from "firebase/firestore";

export default {
  components: {
    comprasIcon,
    Icon,
    addButton,
    BotonBorrar,
  },
  methods: {
    editProduct(id) {
      useProductStore().setCurrentProduct(id);
      useProductStore().toogleaditting();
      useProductStore().toggleNewProductForm();
    },

    abrirModal() {
      if (this.editting) {
        useProductStore().toogleaditting();
      }
      useProductStore().toggleNewProductForm();
    },

    borrarProducto(id) {
      useUtils().borrarProductoArray(id, "productos");
    },
    moneda(cantidad) {
      const dato = cantidad.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
      });
      return dato;
    },
  },
  computed: {
    ...mapState(useProductStore, ["allProducts", "editting"]),
  },
};
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  li {
    background: #003049;
    width: 60%;
    height: 130px;
    display: grid;
    place-items: center;
    color: white;
    border-radius: 4px;
    h4,
    h5 {
      margin: 0;
    }
  }
}
</style>