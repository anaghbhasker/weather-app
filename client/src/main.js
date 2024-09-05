import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./routes";
import PrimeVue from "primevue/config";
import MultiSelect from "primevue/multiselect";
import Aura from "@primevue/themes/aura";
import apolloProvider from "./server/apollo";
import { messaging } from "./config/firebase";

const app = createApp(App);
app.config.globalProperties.$messaging = messaging;
app.use(apolloProvider);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    },
});
app.component("MultiSelect", MultiSelect);
app.mount("#app");
