import { createRouter, createWebHashHistory } from "vue-router";
import PageViewer from "./views/PageViewer.vue";
import CreatePage from "./views/CreatePage.vue";

const router = createRouter(
    {
        history: createWebHashHistory(),
        routes: [
            { path: '/:index?', component: PageViewer, props: true}, // props означает, что переданные параметры будут переданы как props
            { path: '/personal', component: CreatePage }
        ]
    }
);

export default router;