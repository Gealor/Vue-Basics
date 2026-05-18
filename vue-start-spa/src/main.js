import { createApp } from "vue";

// если используется export default, то импортировать нужно без фигурных скобок, е
// если используется export, то импортировать нужно с фигурными скобками.
import App from "./App.vue";
// импортируем стили бутстрепа, чтобы они были доступны во всем приложении
import '../node_modules//bootstrap/dist/css/bootstrap.css';
import $bus from './utils/Events';
import router from "./router";
import $datas from "./data";

const app = createApp(App);

app.use(router);

app.config.globalProperties.$bus = $bus;
app.config.globalProperties.$datas = $datas;

app.mount("#app");