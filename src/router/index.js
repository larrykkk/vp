import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/Index.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/favorite",
        name: "Favorite",
        component: () => import("../views/Favorite.vue"),
      },
      {
        path: "/watch",
        name: "Watch",
        component: () => import("../views/Watch.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/error",
    name: "Error",
    component: () => import("../views/Error.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
