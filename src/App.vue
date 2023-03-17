<script>
import Navbar from "./components/navbar.vue";
import MenuNavbar from "./components/MenuNavbar.vue";
import Productos from "./views/Productos.vue";
import ProductForm from "./components/productForm.vue";
import Modal from "./components/Modal.vue";
import { mapState } from "pinia";
import { useProductStore } from "./stores/counter.js";

export default {
  components: {
    Navbar,
    MenuNavbar,
    Productos,
    ProductForm,
    Modal,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(useProductStore, ["openedNewProduct"]),
  },
};
</script>

<template>
  <Navbar>
    <MenuNavbar />
  </Navbar>
  <div class="contenido">
    <Productos />
  </div>
  <Modal v-if="openedNewProduct">
    <ProductForm v-if="openedNewProduct" />
  </Modal>
</template>

<style scoped>
.contenido {
  margin-left: 150px;
}
</style>
