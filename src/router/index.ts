import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/create",
      name: "createListing",
      component: () => import("@/components/CreateListingButton.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/my-listings",
      name: "myListings",
      component: () => import("@/views/MyListingsView.vue"),
    },
  ],
});

export default router;
