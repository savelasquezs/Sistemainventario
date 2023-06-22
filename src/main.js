import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

// En este código, se importa la función createApp de Vue para crear una nueva instancia de la aplicación Vue. Luego, se importa la función createPinia de Pinia para crear una instancia de Pinia y configurarla como el estado centralizado de la aplicación mediante app.use(createPinia()).