import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/registro",
    name: "Registro",
    component: () => import("../views/Registro.vue"),
  },
  {
    path: "/recuperar",
    name: "Recuperar",
    component: () => import("../views/RecuperarPas.vue"),
  },
  {
    path: "/Cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/Orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
  },
  {
    path: "/:category",
    name: "Category",
    component: () => import("../views/Category.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
