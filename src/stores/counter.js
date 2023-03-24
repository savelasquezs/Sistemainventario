import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseInit';

export const useProductStore = defineStore('product', {
	state: () => {
		return {
			openedNewProduct: false,
			allProducts: [],
			editting: null,
			currentProduct: [],
		};
	},
	actions: {
		toogleaditting() {
			this.editting = !this.editting;
		},
		toggleNewProductForm() {
			this.openedNewProduct = !this.openedNewProduct;
		},
		setCurrentProduct(id) {
			this.currentProduct = this.allProducts.find(
				(product) => product.docId == id
			);
			console.log(this.currentProduct);
		},
		async getProducts() {
			const collRef = collection(db, 'productos');
			const todosProductos = await getDocs(collRef);

			todosProductos.forEach((doc) => {
				if (!this.allProducts.some((product) => product.docId == doc.id)) {
					this.allProducts.push({ docId: doc.id, ...doc.data() });
				}
			});
			console.log(this.allProducts);
		},
		guardarUno(producto) {
			this.allProducts.push(producto);
		},
		mostrarArray() {
			console.log(this.allProducts);
		},
		borrarProducto(id) {
			this.allProducts = this.allProducts.filter(
				(producto) => producto.docId !== id
			);
		},
	},
});

export const useUtils = defineStore('utils', {
	state: () => {
		return {};
	},
	actions: {
		abrirAlert(mensaje, icono = 'success', titulo = '') {
			Swal.fire({
				icon: icono,
				title: titulo,
				text: mensaje,
			});
		},
		numeroAMoneda(cantidad) {
			const dato = cantidad.toLocaleString('es-CO', {
				style: 'currency',
				currency: 'COP',
			});
			return dato;
		},
		async borrarProductoArray(id, colleccion) {
			Swal.fire({
				title: 'Estas seguro de borrar el elemento?',
				text: 'Esta accion no se puede revertir!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si, Deseo borrar!',
			}).then(async (result) => {
				if (result.isConfirmed) {
					const docRef = doc(db, colleccion, id);
					await deleteDoc(docRef);
					switch (colleccion) {
						case 'productos':
							useProductStore().borrarProducto(id);
					}

					Swal.fire(
						'Borrado!',
						'El elemento fue borrado exitosamente',
						'success'
					);
				}
			});
		},
	},
});
