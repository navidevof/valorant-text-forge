import { App, createApp } from "vue";
import MyApp from "./App.vue";
import router from "./router";
import { auth } from "./firebase";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./style.css";

let app: App;

auth.onAuthStateChanged(() => {
	if (!app) {
		const pinia = createPinia();
		pinia.use(piniaPluginPersistedstate);

		app = createApp(MyApp).use(router).use(Toast).use(pinia);
		app.mount("#app");
	}
});
