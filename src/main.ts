import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MyButtonVue from "@/components/MyButton.vue";

const app = createApp(App);

app.component(MyButtonVue.name, MyButtonVue);

app.use(store).use(router).mount("#app");
