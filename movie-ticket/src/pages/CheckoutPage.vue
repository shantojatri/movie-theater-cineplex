<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMovies } from "../composables/useMovies";
import { useAuth } from "../composables/useAuth";
import AppHeaderDesktop from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";

// 1. Discount Logic
const couponCode = ref("");
const appliedDiscount = ref(0); // Percentage
const isInvalidCoupon = ref(false);
const route = useRoute();
const router = useRouter();
const totalPrice = ref(0);

const { getMovieById, fetchMovies } = useMovies();
const { token } = useAuth();
const isProcessing = ref(false);
const errorMsg = ref("");

const selectedMovie = getMovieById(route.query.movieId);

const applyCoupon = () => {
  if (couponCode.value.toUpperCase() === "SAVE10") {
    appliedDiscount.value = 10;
    isInvalidCoupon.value = false;
  } else {
    isInvalidCoupon.value = true;
    appliedDiscount.value = 0;
  }
};

// 2. Calculation with Discount
const discountAmount = computed(
  () => (totalPrice.value * appliedDiscount.value) / 100,
);
const finalTotal = computed(() => totalPrice.value - discountAmount.value);

// 3. Payment Methods
const paymentMethods = [
  { id: "card", name: "Credit/Debit Card", icon: "credit_card" },
  { id: "apple", name: "Apple Pay", icon: "apple" },
  { id: "google", name: "Google Pay", icon: "google" },
];
const selectedPayment = ref("card");

onMounted(async () => {
  totalPrice.value = route.query.price * route.query.seats.split(",").length;
  await fetchMovies();
});

const paymentSuccess = async () => {
  isProcessing.value = true;
  errorMsg.value = "";
  try {
    const response = await fetch("http://localhost:8080/api/tickets/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        movieId: parseInt(route.query.movieId),
        theaterId: route.query.theaterId,
        showTime: new Date(route.query.date + " " + route.query.time),
        seatNumber: route.query.seats,
        price: finalTotal.value,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || "Failed to book ticket");
    }

    router.push({
      name: "PaymentSuccess",
      query: {
        movieId: route.query.movieId,
        theaterId: route.query.theaterId,
        date: route.query.date,
        time: route.query.time,
        price: finalTotal.value,
        seats: route.query.seats,
      },
    });
  } catch (error) {
    errorMsg.value = error.message || "An error occurred during booking.";
  } finally {
    isProcessing.value = false;
  }
};
</script>

<template>
  <div class="flex h-full grow flex-col min-h-screen">
    <!-- Shared Header -->
    <AppHeaderDesktop />

    <main class="flex flex-col lg:flex-row flex-1 overflow-hidden">
      <div class="max-w-6xl mx-auto p-6 lg:py-12">
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-8">
            <section>
              <h2 class="text-2xl font-bold mb-6">Checkout</h2>
              {{ route.query.seats }}

              <div class="space-y-4">
                <h3
                  class="text-sm font-bold uppercase tracking-wider text-slate-500"
                >
                  Select Payment Method
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    v-for="method in paymentMethods"
                    :key="method.id"
                    @click="selectedPayment = method.id"
                    :class="[
                      'flex items-center gap-3 p-4 rounded-xl border-2 transition-all',
                      selectedPayment === method.id
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-slate-100 dark:border-slate-800 hover:border-primary/30',
                    ]"
                  >
                    <span class="material-symbols-outlined">{{
                      method.icon
                    }}</span>
                    <span class="font-bold text-sm">{{ method.name }}</span>
                  </button>
                </div>
              </div>
            </section>

            <section
              class="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800"
            >
              <h3 class="text-sm font-bold mb-4">Have a Coupon?</h3>
              <div class="flex gap-2">
                <input
                  v-model="couponCode"
                  placeholder="Enter Code (e.g. SAVE10)"
                  class="flex-1 bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 ring-primary/20"
                />
                <button
                  @click="applyCoupon"
                  class="bg-slate-900 dark:bg-primary px-6 py-3 rounded-lg text-white font-bold text-sm hover:opacity-90"
                >
                  Apply
                </button>
              </div>
              <p
                v-if="appliedDiscount > 0"
                class="text-green-500 text-xs mt-2 font-medium"
              >
                Coupon applied! You saved 10%
              </p>
              <p
                v-if="isInvalidCoupon"
                class="text-red-500 text-xs mt-2 font-medium"
              >
                Invalid coupon code.
              </p>
            </section>
          </div>

          <aside class="space-y-6">
            <div
              class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none sticky top-24"
            >
              <h3 class="font-bold text-lg mb-4">Order Summary</h3>

              <div
                class="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800"
              >
                <div class="flex justify-between text-sm" v-if="selectedMovie">
                  <span class="text-slate-500">Movie</span>
                  <span class="font-semibold">{{ selectedMovie.title }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-slate-500">Seats</span>
                  <span class="font-semibold">{{ route.query.seats }}</span>
                </div>
                <div class="flex justify-between text-sm text-primary">
                  <span class="text-slate-500">Subtotal</span>
                  <span class="font-bold">${{ totalPrice }}</span>
                </div>
                <div
                  v-if="appliedDiscount > 0"
                  class="flex justify-between text-sm text-green-500"
                >
                  <span>Discount (10%)</span>
                  <span>-${{ discountAmount }}</span>
                </div>
              </div>

              <div class="pt-4 flex justify-between items-center mb-6">
                <span class="text-slate-500 font-medium">Total to Pay</span>
                <span class="text-3xl font-black text-primary"
                  >${{ finalTotal }}</span
                >
              </div>

              <div
                v-if="errorMsg"
                class="mb-4 text-red-500 text-sm font-bold text-center"
              >
                {{ errorMsg }}
              </div>

              <button
                @click="paymentSuccess"
                :disabled="isProcessing"
                class="w-full bg-primary py-4 rounded-xl text-white font-black text-lg shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <span
                  v-if="isProcessing"
                  class="material-symbols-outlined animate-spin"
                  >progress_activity</span
                >
                <span>{{ isProcessing ? "Processing..." : "Pay Now" }}</span>
              </button>

              <p
                class="text-[10px] text-center text-slate-400 mt-4 leading-relaxed"
              >
                By clicking "Pay Now", you agree to our terms of service and
                refund policy.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
