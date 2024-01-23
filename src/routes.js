import { createRouter, createWebHashHistory } from "vue-router";
import PageViewer from "./views/PageViewer.vue";
import CreatePage from "./views/CreatePage.vue";
import PagesView from "./views/PagesView.vue";
import PagesList from "./views/PagesList.vue";
import PageEdit from "./views/PageEdit.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/:index?",
      component: PageViewer,
    },
    {
      path: "/pages",
      component: PagesView,
      children: [
        {
          path: "",
          component: PagesList,
        },
        {
          path: "create",
          component: CreatePage,
        },
        {
          path: ":index/edit",
          component: PageEdit,
          props: true,
        },
      ],
    },
    {
      path: "/create",
      component: CreatePage,
    },
  ],
});

export default router;
