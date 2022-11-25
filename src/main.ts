import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MyButtonVue from "@/components/MyButton.vue";
import MyInputVue from "@/components/MyInput.vue";
import MyModalVue from "@/components/MyModal.vue";
import MySelectorVue from "@/components/MySelector.vue";

const app = createApp(App);

app.component(MyButtonVue.name, MyButtonVue);
app.component(MyInputVue.name, MyInputVue);
app.component(MyModalVue.name, MyModalVue);
app.component(MySelectorVue.name, MySelectorVue);

app.use(store).use(router).mount("#app");
