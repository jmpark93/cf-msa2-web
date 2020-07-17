import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Book from "../views/Book.vue";

import Login from "../components/user/Login.vue";
import Register from "../components/user/Register";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/profile", name: "Profile", component: () => import("../components/user/Profile.vue") },
  { path: "/todo", name: "Todo", component: () => import("../views/Todo.vue") },
  { path: "/book", name: "Book", component: Book },
  { path: "/book/new", component: () => import("../components/book/new.vue") },
  { path: "/admin", name: "Admin", component: () => import("../views/Admin.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/login", "/register", "/about"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
