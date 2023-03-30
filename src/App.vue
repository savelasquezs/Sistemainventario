<script>
import Navbar from "./components/navbar.vue";
import MenuNavbar from "./components/MenuNavbar.vue";
import Productos from "./views/Productos.vue";
import ProductForm from "./components/productForm.vue";
import Modal from "./components/Modal.vue";
import { mapState } from "pinia";
import { useProductStore, useUtils, useVentas } from "./stores/counter.js";
import PedidoForm from "./components/pedidoForm.vue";

export default {
  components: {
    Navbar,
    MenuNavbar,
    Productos,
    ProductForm,
    Modal,
    PedidoForm,
  },
  data() {
    return {
      store: useUtils(),
      userstate: null,
    };
  },
  computed: {
    ...mapState(useProductStore, ["openedNewProduct"]),
    ...mapState(useUtils, ["user", "opennedModal"]),
    ...mapState(useVentas, ["openedPedidoForm"]),
  },
  created() {
    this.store.fetchUser();
    useProductStore().getProducts();
  },
  watch: {},
};
</script>

<template>
  <Navbar v-if="user">
    <MenuNavbar />
  </Navbar>
  <div :class="user ? 'contenido' : ''">
    <router-view />
  </div>
  <Modal v-if="opennedModal">
    <ProductForm v-if="openedNewProduct" />
    <PedidoForm v-else-if="openedPedidoForm" />
  </Modal>
</template>

<style scoped >
@import url("https://fonts.googleapis.com/css2?family=Acme&display=swap");
.contenido {
  margin-left: 150px;
}
* {
  font-family: "Acme", sans-serif;
}
</style>
