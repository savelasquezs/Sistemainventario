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
	console.log(auth.currentUser);
	if (to.path == '/register' && auth.currentUser) {
		next('/');
		return;
	}
	if (
		to.matched.some((record) => record.meta.requiresAuth) &&
		!auth.currentUser
	) {
		next('/register');
		return;
	}
	next();
});

export default router;
