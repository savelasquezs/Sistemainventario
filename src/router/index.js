
//Esta es la  configuración y definición de rutas para Vue Router en una aplicación Vue.js. Aquí se establecen las rutas y se configuran las verificaciones de autenticación y autorización antes de permitir el acceso a ciertas rutas.
import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase/firebaseInit';//Primero, se importan las funciones necesarias de Vue Router y el objeto auth de firebaseInit

//Luego, se crea una instancia de router utilizando createRouter y se le pasa un objeto de configuración
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	//Cada ruta se define como un objeto con una path (ruta), un componente asociado y metadatos adicionales.
	routes: [
		{
			path: '/',
			component: () => import('../views/Dashboard.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/ventas',
			component: () => import('../views/vender.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/pedidos',
			component: () => import('../views/Ventas.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/productos',
			component: () => import('../views/Productos.vue'),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/register',
			component: () => import('../views/Register.vue'),
		},
		{
			path: '/login',
			component: () => import('../views/Login.vue'),
		},
	],
});

//A continuación, se define una función userIsAdmin que obtiene el token de identificación del usuario actual y verifica si el usuario tiene el reclamo admin
const userIsAdmin = async () => {
	let esCierto = await auth.currentUser.getIdTokenResult();
	let claims = esCierto.claims.admin;
	return claims;
};

//Si el usuario intenta acceder a la ruta de registro (/register) y ya ha iniciado sesión, se redirige a la ruta principal (/).
router.beforeEach((to, from, next) => {
	if (to.path == '/register' && auth.currentUser) {
		next('/');
		return;
	}
	//Si el usuario intenta acceder a la ruta de inicio de sesión (/login) y ya ha iniciado sesión, se redirige a la ruta principal (/) a menos que provenga de la ruta de registro (/register).
	if (to.path == '/login' && auth.currentUser && from.path !== '/register') {
		next('/');
		return;
	}
	if (
		to.matched.some((record) => record.meta.requiresAuth) &&
		!auth.currentUser
	) {
		console.log('requires auth');
		next('/login');
		return;
	}
	//Después de pasar por las verificaciones del guardia, se llama a next() para permitir la navegación a la ruta solicitada.
	next();
	(async () => {
		console.log(await userIsAdmin());
	})();
});

export default router;
