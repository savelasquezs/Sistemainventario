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
      <input
        class="form-control"
        type="file"
        id="imagen"
        accept="image/*"
        @change="onFileSelected"
      />
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
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db } from "../firebase/firebaseInit";
export default {
  data() {
    return {
      nombre: "",
      precioCompra: 0,
      stock: 0,
      file: "",
      imageURL: "",
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
    onFileSelected(event) {
      this.file = event.target.files[0];
    },
    async uploadImage() {
      const storage = getStorage();
      console.log(this.file);
      const productRef = ref(storage, this.file.name);

      // Upload image file to Firebase Storage
      const snapshot = await uploadBytes(productRef, this.file).then(
        (snapshot) => {
          console.log("Cargado exitosamente!");
        }
      );

      // // Store download URL in Firestore
      await getDownloadURL(productRef).then((url) => {
        this.imageURL = url;
        console.log(this.imageURL);
      });
      // `url` is the download URL for 'images/stars.jpg'

      // // Clear file input
      // this.file = null;
    },
    async guardarProducto() {
      try {
        await this.uploadImage();
        console.log(this.imageURL);
        const data = {
          nombre: this.nombre,
          precioCompra: this.precioCompra,
          precioVenta: this.precioVenta,
          stock: this.stock,
          ganancia: this.ganaciaActual,
          imageURL: this.imageURL,
        };
        const collRef = collection(db, "productos");
        const docRef = await addDoc(collRef, data);
        console.log(data);
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