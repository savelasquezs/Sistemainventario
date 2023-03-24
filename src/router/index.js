import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/pedidos',
			component: import('../views/Ventas.vue'),
		},
		{
			path: '/productos',
			component: import('../views/Productos.vue'),
		},
	],
});

export default router;
