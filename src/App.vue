<script>
import Navbar from "./components/navbar.vue";
import MenuNavbar from "./components/MenuNavbar.vue";
import Productos from "./views/Productos.vue";
import ProductForm from "./components/productForm.vue";
import Modal from "./components/Modal.vue";
import { mapState } from "pinia";
import { useProductStore, useUtils } from "./stores/counter.js";

export default {
  components: {
    Navbar,
    MenuNavbar,
    Productos,
    ProductForm,
    Modal,
  },
  data() {
    return {
      store: useUtils(),
      userstate: null,
    };
  },
  computed: {
    ...mapState(useProductStore, ["openedNewProduct"]),
    ...mapState(useUtils, ["user"]),
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
  <Modal v-if="openedNewProduct">
    <ProductForm v-if="openedNewProduct" />
  </Modal>
</template>

<style scoped>
.contenido {
  margin-left: 150px;
}
</style>
