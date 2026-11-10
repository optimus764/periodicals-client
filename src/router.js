import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import('./components/HomePage')
    },
    {
        path: "/publications",
        name: "publications",
        component: () => import('./components/PublicationsPage')
    },
    {
        path: "/readers",
        name: "readers",
        component: () => import('./components/ReadersPage')
    },
    {
        path: "/subscriptions",
        name: "subscriptions",
        component: () => import('./components/SubscriptionsPage')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;