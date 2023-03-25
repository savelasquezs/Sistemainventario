import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseInit';
import { auth } from '../firebase/firebaseInit';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import router from '../router';

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
		return {
			user: null,
		};
	},
	actions: {
		fetchUser() {
			auth.onAuthStateChanged(async (user) => {
				if (user == null) {
					this.clearUser();
				} else {
					this.setUser(user);
					if (router.isReady() && router.currentRoute.value.path == '/login') {
						router.push('/');
					}
				}
			});
		},
		setUser(user) {
			this.user = user;
		},
		clearUser() {
			this.user = null;
		},
		async login(datosUsuario) {
			const { email, password, password2, name, lastName } = datosUsuario;
			try {
				await signInWithEmailAndPassword(auth, email, password);
			} catch (error) {
				switch (error.code) {
					case 'auth/user-not-found':
						this.abrirAlert('No encontramos este usuario', 'error');
						break;
					case 'auth/wrong-password':
						this.abrirAlert(
							'La contraseña no coincide, intenta de nuevo',
							'error'
						);
						break;
					default:
						this.abrirAlert(`Algo salió mal ${error}`, 'error');
						break;
				}
				return;
			}
			this.setUser(auth.currentUser);
			router.push('/');
		},
		async register(datosUsuario) {
			const { email, password, password2 } = datosUsuario;
			try {
				if (password == password2) {
					await createUserWithEmailAndPassword(auth, email, password);
				} else {
					this.abrirAlert(
						'La contraseña no coincide, intenta de nuevo',
						'error'
					);
				}
			} catch (error) {
				switch (error.code) {
					case 'auth/email-already-in-use':
						this.abrirAlert('Este correo ya esta registrado', 'error');
						break;
					case 'auth/invalid-email':
						this.abrirAlert('Debes ingresar un correo valido', 'error');
						break;
					case 'auth/operation-not-allowed':
						this.abrirAlert('Operación no permitida', 'error');
						break;
					case 'auth/weak-password':
						this.abrirAlert(
							'Ingresa una contraseña mas fuerte, esta no sirve',
							'error'
						);
						break;
					default:
						this.abrirAlert(`Algo salió mal ${error}`, 'error');
				}
				return;
			}
			this.setUser(auth.currentUser);
			router.push('/');
		},
		async logout() {
			await signOut(auth);
			this.clearUser();
			router.push('/login');
		},
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
