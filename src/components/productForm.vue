
<template>
  <!--Aqui se define un formulario para la insercion de nuevos datos-->
  <form>
    <h3 class="mb-5 text-center" v-if="editting">Actualizar Producto</h3>
    <h3 class="mb-5 text-center" v-else>Nuevo Producto</h3>
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
      <!--se debe seleccionar una imagen y esta  se renderizara-->
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
    <div v-if="imageURL" class="d-flex justify-content-center">
      <img :src="imageURL" alt="" width="100" />
    </div>

    <div class="button-container d-flex justify-content-between mt-5">
      <button
        type="button"
        class="btn btn-success"
        v-if="editting"
        @click="actualizarProducto(currentProduct.docId)"
      >
        Actualizar
      </button>
      <button
        type="button"
        class="btn btn-success"
        v-else
        @click="guardarProducto"
      >
        Guardar
      </button>
      <button type="button" class="btn btn-danger" @click="cerrarModalProducto">
        Cancelar
      </button>
    </div>
  </form>
</template>
<!-- En este script se encuentran las importaciones del modulo con sus respectivas funciones-->
<script>
import { useProductStore, useUtils } from "../stores/counter";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase/firebaseInit";
import { mapState } from "pinia";
//data() es una función que devuelve un objeto con las propiedades de datos utilizadas en el componente.
//Las propiedades incluyen nombre, precioCompra, stock, file e imageURL, inicializadas con valores predeterminados.
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
  //precioVenta es una propiedad computada que calcula el valor de venta en función del precioCompra.
  computed: {
    precioVenta() {
      return Math.round((this.precioCompra * 1.3) / 1000) * 1000;
    },
    ganaciaActual() {
      return this.precioVenta - this.precioCompra;
    },
    ...mapState(useProductStore, ["editting", "currentProduct", "allProducts"]),
  },
  //cerrarModalProducto es un método que se llama para cerrar el modal de producto. También realiza ciertas acciones según la condición editting.
  methods: {
    //guardarProducto es un método asíncrono que guarda un nuevo producto en la base de datos de Firestore utilizando la función addDoc.
    cerrarModalProducto() {
      useProductStore().toggleNewProductForm();
      if (this.editting) {
        useProductStore().toogleaditting();
      }
    },
    async onFileSelected(event) {
      this.file = event.target.files[0];
      console.log(this.file);
      await this.uploadImage();
    },
    async uploadImage() {
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
    // es un método asíncrono que guarda un nuevo producto en la base de datos de Firestore
    async guardarProducto() {
      try {
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
    //es un método asíncrono que actualiza un producto existente en la base de datos de Firestore 
    async actualizarProducto(id) {
      try {
        const data = {
          nombre: this.nombre,
          precioCompra: this.precioCompra,
          precioVenta: this.precioVenta,
          stock: this.stock,
          ganancia: this.ganaciaActual,
          imageURL: this.imageURL,
        };
        const docRef = doc(db, "productos", id);
        await updateDoc(docRef, data);
        const index = this.allProducts.findIndex(
          (product) => product.docId == id
        );
        const productoACambiar = this.allProducts.find(
          (product) => product.docId == id
        );
        this.allProducts[index] = { docId: id, ...productoACambiar, ...data };
        this.cerrarModalProducto();
        useUtils().abrirAlert("Producto Actualizado exitosamente");
      } catch (error) {
        console.log(error);
      }
    },
  },
  //El hook created se ejecuta cuando se crea el componente. 
  created() {
    if (this.editting) {
      this.nombre = this.currentProduct.nombre;
      this.precioCompra = this.currentProduct.precioCompra;
      this.stock = this.currentProduct.stock;
      this.imageURL = this.currentProduct.imageURL;
    }
  },
};
</script>

<style scoped>
</style>