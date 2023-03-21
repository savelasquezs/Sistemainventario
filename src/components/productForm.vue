<template>
  <form>
    <h3 class="mb-5 text-center">Nuevo Producto</h3>
    <div class="mb-3">
      <label for="nombre" class="form-label">Nombre del producto</label>
      <input
        type="text"
        class="form-control"
        id="nombre"
        placeholder="...Nombre"
        v-model="nombre"
      />
    </div>
    <div class="mb-3">
      <label for="precio" class="form-label">Precio de Compra</label>
      <input
        type="number"
        class="form-control"
        id="precio"
        placeholder="Precio"
        v-model="precioCompra"
      />
    </div>
    <div class="mb-3">
      <label for="stock" class="form-label">Stock</label>
      <input
        type="number"
        class="form-control"
        id=""
        placeholder=""
        v-model="stock"
      />
    </div>

    <div class="mb-3">
      <label for="imagen" class="form-label">Selecciona una imagen</label>
      <input class="form-control" type="file" id="imagen" accept="image/*" />
    </div>

    <div class="button-container d-flex justify-content-between mt-5">
      <button type="button" class="btn btn-success" @click="guardarProducto">
        Guardar
      </button>
      <button type="button" class="btn btn-danger" @click="cerrarModalProducto">
        Cancelar
      </button>
    </div>
  </form>
</template>

<script>
import { useProductStore, useUtils } from "../stores/counter";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseInit";
export default {
  data() {
    return {
      nombre: "",
      precioCompra: 0,
      stock: 0,
    };
  },
  components: {},
  computed: {
    precioVenta() {
      return Math.round((this.precioCompra * 1.3) / 1000) * 1000;
    },
    ganaciaActual() {
      return this.precioVenta - this.precioCompra;
    },
  },
  methods: {
    cerrarModalProducto() {
      useProductStore().toggleNewProductForm();
    },
    async guardarProducto() {
      try {
        const data = {
          nombre: this.nombre,
          precioCompra: this.precioCompra,
          precioVenta: this.precioVenta,
          stock: this.stock,
          ganancia: this.ganaciaActual,
        };
        const collRef = collection(db, "productos");
        const docRef = await addDoc(collRef, data);
        console.log(docRef.id);
        useProductStore().guardarUno({ docId: docRef.id, ...data });
        useProductStore().mostrarArray();
        this.cerrarModalProducto();
        useUtils().abrirAlert("Producto Guardado exitosamente");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
</style>