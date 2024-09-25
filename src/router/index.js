import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import { useStore } from "vuex";
import RegisterView from "../views/RegisterView.vue";

const routes = [
  { path: "/login", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegisterView },
  // Outras rotas protegidas
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useStore(); // Obter o store do Vuex
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = store.getters.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
