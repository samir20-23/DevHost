import { createRouter, createWebHistory } from "vue-router";
import Layout from "./Pages/admin/Layout.vue";
import Products from "./Pages/admin/Product.vue";
import Order from "./Pages/admin/Order.vue";
import Users from "./Pages/admin/Users.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("./Pages/public/HomeRoute.vue"),
    },
    {
        path: "/admin",
        component: Layout,
        redirect: "/admin/products",
        children: [
            { path: "products", component: Products },
            { path: "users", component: Users },
            { path: "orders", component: Order },
        ],
    },
    {
        path: "/user/profile",
        name: "user.profile",
        component: () => import("./Pages/user/userProfile.vue"),
    },
    {
        path: "/regiser",
        name: "register",
        component: () => import("./Pages/auth/Register.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("./Pages/auth/Login.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
