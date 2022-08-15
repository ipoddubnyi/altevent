import { createApp } from "vue";
import moment from "moment";
import ElementPlus from "element-plus";
import ElementPlusRU from "element-plus/es/locale/lang/ru";
import "element-plus/dist/index.css";

import { AltPluginSet } from "./plugins/alt-plugin-set";
import "@/assets/scss/style.scss";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router, app);
app.use(ElementPlus, { locale: ElementPlusRU });
app.use(AltPluginSet);

moment.locale("ru");

app.mount("#app");
