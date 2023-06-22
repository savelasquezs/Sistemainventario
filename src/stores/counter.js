//ref: Importa la función ref de la biblioteca Vue, que se utiliza para crear una referencia reactiva a un valor.
import { ref, computed } from 'vue';
//defineStore: Importa la función defineStore de la biblioteca Pinia, que se utiliza para definir una tienda de Vuex en una aplicación Vue.
import { defineStore } from 'pinia';
//Swal: Importa la biblioteca SweetAlert2, que se utiliza para mostrar ventanas emergentes con estilo y personalizables en el navegador.
import Swal from 'sweetalert2';
//collection, getDocs, doc y deleteDoc: Importa varias funciones de la biblioteca Firebase Firestore para interactuar con la base de datos Firestore de Firebase.
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
//db: Importa la instancia de la base de datos Firestore inicializada en el archivo '../firebase/firebaseInit'.
import { db } from '../firebase/firebaseInit';
//auth: Importa la instancia de autenticación de Firebase inicializada en el archivo '../firebase/firebaseInit'.
import { auth } from '../firebase/firebaseInit';
//createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut y updateProfile: Importa varias funciones de la biblioteca Firebase Authentication para realizar operaciones relacionadas con la autenticación de usuarios.
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
//router: Importa la instancia del enrutador de Vue Router, que se utiliza para navegar entre las diferentes rutas de la aplicación.
import router from '../router';

//useProductStore: Nombre de la instancia de la tienda.
// defineStore: Función utilizada para definir una tienda en Pinia. Recibe dos argumentos: el nombre de la tienda y un objeto que define el estado y las acciones de la tienda.
export const useProductStore = defineStore('product', {
	state: () => {
		return {
			openedNewProduct: false,
			allProducts: [],
			editting: null,
			currentProduct: [],
		};
	},
	//actions: Un objeto que define las acciones (métodos) de la tienda
	actions: {
		toogleaditting() {
			this.editting = !this.editting;
		},
		toggleNewProductForm() {
			this.openedNewProduct = !this.openedNewProduct;
			useUtils().toggleModal();
		},
		setCurrentProduct(id) {
			this.currentProduct = this.allProducts.find(
				(product) => product.docId == id
			);
		},
		async getProducts() {
			const collRef = collection(db, 'productos');
			const todosProductos = await getDocs(collRef);
			// Esta tienda se llama product y tiene un estado con propiedades como openedNewProduct, allProducts, editting y currentProduct.
			todosProductos.forEach((doc) => {
				if (!this.allProducts.some((product) => product.docId == doc.id)) {
					this.allProducts.push({ docId: doc.id, ...doc.data() });
				}
			});
		},
		guardarUno(producto) {
			this.allProducts.push(producto);
		},
		mostrarArray() {},
		borrarProducto(id) {
			this.allProducts = this.allProducts.filter(
				(producto) => producto.docId !== id
			);
		},
	},
});
// Esta tienda se llama utils y tiene un estado con propiedades como user y opennedModal.
// Esta tienda se llama utils y tiene un estado con propiedades como user y opennedModal.
// actions: Aquí se definen las acciones (métodos) de la tienda useUtils que manipulan el estado de useUtils.
export const useUtils = defineStore('utils', {
	state: () => {
		return {
			user: null,
			opennedModal: null,
		};
	},
	actions: {
		toggleModal() {
			this.opennedModal = !this.opennedModal;
		},
		fetchUser() {
			auth.onAuthStateChanged(async (user) => {
				if (user == null) {
					this.clearUser();
				} else {
					user.getIdTokenResult().then((idTokenResult) => {
						this.user.admin = idTokenResult.claims.admin;
					});
					this.setUser(user);
					if (
						router.isReady() &&
						(router.currentRoute.value.path == '/login' ||
							router.currentRoute.value.path == '/register')
					) {
						router.push('/');
					}
				}
			});
		},
		setUser(user) {
			this.user = { ...user };
		},
		clearUser() {
			this.user = null;
		},
		async login(datosUsuario) {
			const { email, password } = datosUsuario;
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
				// Cada acción en ambas tiendas realiza operaciones específicas en el estado utilizando this para acceder a las propiedades y modificarlas.
			}
			user.getIdTokenResult().then((idTokenResult) => {
				this.user.admin = idTokenResult.claims.admin;
				console.log(this.user.admin);
			});
			this.setUser(user);
			router.push('/');
		},
		async register(datosUsuario) {
			const { email, password, password2, name, lastName } = datosUsuario;
			try {
				if (password == password2) {
					await createUserWithEmailAndPassword(auth, email, password).then(
						(cred) => {
							updateProfile(cred.user, {
								displayName: `${name} ${lastName}`,
							});
							this.setUser(cred.user);
							return;
						}
					);
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
		
// La función numeroAMoneda definida en la tienda useUtils se utiliza para formatear una cantidad numérica como un valor monetario en la moneda colombiana (COP)
		numeroAMoneda(cantidad) {
			const dato = cantidad.toLocaleString('es-CO', {
				style: 'currency',
				currency: 'COP',
			});
			return dato;
		},
		// La acción borrarProductoArray definida en la tienda useUtils se encarga de mostrar un cuadro de diálogo de confirmación utilizando SweetAlert2 (Swal.fire
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
// Esta tienda se llama useVentas y tiene un estado con propiedades como edittingVentas y openedPedidoForm.
// actions: Aquí se definen las acciones (métodos) de la tienda useVentas que manipulan el estado de useVentas
export const useVentas = defineStore('useVentas', {
	state: () => {
		return {
			edittingVentas: null,
			openedPedidoForm: null,
		};
	},
	actions: {
		toogleEditVentas() {
			this.edittingVentas = !this.edittingVentas;
		},
		tooglePedidoForm() {
			useUtils().toggleModal();
			this.openedPedidoForm = !this.openedPedidoForm;
		},
	},
});
