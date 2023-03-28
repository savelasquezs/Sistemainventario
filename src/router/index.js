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

const userIsAdmin = async () => {
	let esCierto = await auth.currentUser.getIdTokenResult();
	let claims = esCierto.claims.admin;
	return claims;
};

router.beforeEach((to, from, next) => {
	if (to.path == '/register' && auth.currentUser) {
		next('/');
		return;
	}
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
	next();
	(async () => {
		console.log(await userIsAdmin());
	})();
});

export default router;
