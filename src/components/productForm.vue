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
      />
    </div>
    <div class="mb-3">
      <label for="precio" class="form-label">Precio</label>
      <input
        type="number"
        class="form-control"
        id="precio"
        placeholder="Precio"
      />
    </div>
    <div class="mb-3">
      <label for="imagen" class="form-label">Selecciona una imagen</label>
      <input class="form-control" type="file" id="imagen" accept="image/*" />
    </div>

    <div class="button-container d-flex justify-content-between mt-5">
      <button type="submit" class="btn btn-success">Guardar</button>
      <button type="button" class="btn btn-danger" @click="cerrarModalProducto">
        Cancelar
      </button>
    </div>
  </form>
</template>

<script>
import { useProductStore } from "../stores/counter";
export default {
  methods: {
    cerrarModalProducto() {
      useProductStore().toggleNewProductForm();
    },
  },
};
</script>

<style scoped>
</style>