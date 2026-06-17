import api from "@/utils/api";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

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
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/my-listings",
      name: "myListings",
      component: () => import("@/views/MyListingsView.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.name === "login" || to.name === "register") return;
  try {
    await api.get("/employees/me");
  } catch {
    return { name: "login" };
  }
});

export default router;
