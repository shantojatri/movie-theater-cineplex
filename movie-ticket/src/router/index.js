import { createRouter, createWebHistory } from "vue-router";
import TheaterSelection from "../pages/TheaterSelection.vue";
import TicketSelection from "../pages/TicketSelection.vue";
import AllMovies from "../pages/AllMovies.vue";
import CheckoutPage from "../pages/CheckoutPage.vue";
import PaymentSuccess from "../pages/PaymentSuccess.vue";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import MyTickets from "../pages/MyTickets.vue";
import { useAuth } from "../composables/useAuth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/all-movies",
    name: "AllMovies",
    component: AllMovies,
  },
  {
    path: "/theaters",
    name: "TheaterSelection",
    component: TheaterSelection,
  },
  {
    path: "/tickets",
    name: "TicketSelection",
    component: TicketSelection,
    meta: { requiresAuth: true },
  },
  {
    path: "/checkout",
    name: "CheckoutPage",
    component: CheckoutPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/payment-success",
    name: "PaymentSuccess",
    component: PaymentSuccess,
    meta: { requiresAuth: true },
  },
  {
    path: "/my-tickets",
    name: "MyTickets",
    component: MyTickets,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guestOnly: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guestOnly: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();
  
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next("/login");
  } else if (to.meta.guestOnly && isAuthenticated.value) {
    next("/");
  } else {
    next();
  }
});

export default router;
