import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/components/LoginPage.vue";
import SignupPage from "@/components/SignupPage.vue";
import HomePage from "@/components/HomePage.vue";

const routes = [
    { path: "/", component: LoginPage },
    { path: "/signup", component: SignupPage },
    { path: "/home", component: HomePage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem("sqadra");
    if (to.path === "/" && isAuthenticated) {
        next({ path: "/home" });
    } else if (to.path === "/home" && !isAuthenticated) {
        next({ path: "/" });
    } else {
        // Otherwise, allow the navigation
        next();
    }
});

export default router;
