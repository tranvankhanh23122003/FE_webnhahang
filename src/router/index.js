import { createRouter, createWebHistory } from "vue-router";
import users from "./client";
import admin from "./admin";
import account from "./account";
import authRoutes from "./auth";

const routes = [...users, ...admin, ...account, ...authRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = [
    "login",
    "admin-login",
    "users-login",
    "register",
    "users-register",
    "users-home",
    "scan",
    "reset-password",
    "users-contact",
    "users-news",
    "users-introduce",
    "users-category",
    "users-shoppingCart",
  ]; // các route không cần login
  const authRequired = !publicPages.includes(to.name);
  const isLoggedIn = !!localStorage.getItem("auth_token");

  if (authRequired && !isLoggedIn) {
    // Nếu chưa login, chuyển sang trang login
    return next({ name: "users-login" });
  }

  next(); // Cho phép đi tiếp nếu đã login hoặc là trang công khai
});

export default router;
