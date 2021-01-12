import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/watch",
    name: "Watch",
    component: () => import("../views/Watch.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
