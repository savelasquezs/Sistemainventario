import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase/firebaseInit';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: () => import('../views/Dashboard.vue'),
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

router.beforeEach((to, from, next) => {
	if (to.path == '/register' && auth.currentUser) {
		console.log(to.path);
		console.log('Usuario autenticado');

		next('/');
	}
	if (to.path == '/login' && auth.currentUser) {
		console.log(to.path);

		console.log('Usuario autenticado');

		next('/');
	}
	if (
		to.matched.some((record) => record.meta.requiresAuth) &&
		!auth.currentUser
	) {
		console.log('requires auth');
		next('/login');
	}
	console.log(to.path);
	console.log(auth.currentUser);
	next();
});

export default router;
