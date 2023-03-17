import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
	state: () => {
		return {
			openedNewProduct: false,
		};
	},
	actions: {
		toggleNewProductForm() {
			this.openedNewProduct = !this.openedNewProduct;
		},
	},
});
