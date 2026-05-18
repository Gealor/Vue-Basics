import { createApp } from "vue";

// если используется export default, то импортировать нужно без фигурных скобок, е
// если используется export, то импортировать нужно с фигурными скобками.
import App from "./App.vue";
// импортируем стили бутстрепа, чтобы они были доступны во всем приложении
import '../node_modules//bootstrap/dist/css/bootstrap.css';
import $bus from './utils/Events';

const app = createApp(App)

app.config.globalProperties.$bus = $bus;

app.mount("#app");