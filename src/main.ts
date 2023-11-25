import "./assets/main.css";
import "ant-design-vue/dist/reset.css";
import "virtual:uno.css";

import { createApp } from "vue";

import App from "./App.vue";
import Antd from "ant-design-vue";

const app = createApp(App);

app.use(Antd);

app.mount("#app");
