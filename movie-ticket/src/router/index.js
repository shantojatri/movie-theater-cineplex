import { createRouter, createWebHistory } from "vue-router";
import TheaterSelection from "../pages/TheaterSelection.vue";
import TicketSelection from "../pages/TicketSelection.vue";
import AllMovies from "../pages/AllMovies.vue";
import CheckoutPage from "../pages/CheckoutPage.vue";
import PaymentSuccess from "../pages/PaymentSuccess.vue";
import Home from "../pages/Home.vue";

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
  },
  {
    path: "/checkout",
    name: "CheckoutPage",
    component: CheckoutPage,
  },
  {
    path: "/payment-success",
    name: "PaymentSuccess",
    component: PaymentSuccess,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
