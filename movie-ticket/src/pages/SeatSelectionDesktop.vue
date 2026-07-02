<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMovies } from "../composables/useMovies";
import HeaderDesktop from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";

const route = useRoute();
const router = useRouter();

const { getMovieById, fetchMovies } = useMovies();

const selectedMovie = getMovieById(route.query.movieId);

const theatersList = ref([]);

const selectedTheater = computed(() => {
  return theatersList.value.find((t) => t.theaterId === route.query.theaterId);
});

const formatedDate = () => {
  const date = new Date(route.query.date) || new Date();
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
};

// Get price from query (e.g., ?price=22.50)
const ticketPrice = computed(() => parseFloat(route.query.price) || 0);

// Configuration for the seat map
const rows = ["A", "B", "C", "D", "E"];
const seatsPerRow = 10;
const aisles = [3, 7]; // Aisle appears after these seat numbers

// Reactive state for sold-out seats from backend
const soldOutSeats = ref([]);

onMounted(async () => {
  await fetchMovies();
  try {
    const resTheaters = await fetch("http://localhost:8080/api/theaters");
    if (resTheaters.ok) {
      theatersList.value = await resTheaters.json();
    }

    const { movieId, theaterId, date, time } = route.query;
    const showTimeStr = new Date(`${date} ${time}`).toISOString();
    
    const resSeats = await fetch(`http://localhost:8080/api/seats/booked?movieId=${movieId}&theaterId=${theaterId}&showTime=${encodeURIComponent(showTimeStr)}`);
    if (resSeats.ok) {
      const data = await resSeats.json();
      soldOutSeats.value = data.bookedSeats || [];
    }
  } catch (err) {
    console.error("Failed to load seats or theaters:", err);
  }
});

// Reactive state for user selection
const selectedSeats = ref([]);

const toggleSeat = (row, col) => {
  const seatId = `${row}${col}`;

  // 1. Block if seat is sold out
  if (soldOutSeats.value.includes(seatId)) return;

  const index = selectedSeats.value.indexOf(seatId);

  if (index > -1) {
    // 2. Always allow deselecting
    selectedSeats.value.splice(index, 1);
  } else {
    // 3. Check limit before adding
    if (selectedSeats.value.length >= 5) {
      alert("You can only select up to 5 seats per transaction.");
      return;
    }
    selectedSeats.value.push(seatId);
  }
};

const totalPrice = computed(
  () => selectedSeats.value.length * ticketPrice.value,
);

const confirmBooking = () => {
  if (selectedTheater?.value?.theaterId) {
    router.push({
      name: "CheckoutPage",
      query: {
        movieId: selectedMovie.value.ID || selectedMovie.value.id,
        theaterId: selectedTheater.value.theaterId,
        date: route.query.date,
        time: route.query.time,
        price: ticketPrice.value,
        seats: selectedSeats.value.join(", "),
      },
    });
  } else {
    alert("Please select a movie first!");
  }
};
</script>

<template>
  <div class="flex h-full grow flex-col">
    <!-- Shared Header -->
    <HeaderDesktop />
    <main class="flex flex-col lg:flex-row flex-1 overflow-hidden">
      <!-- Left Sidebar: Selection Details (Desktop) -->
      <aside
        class="hidden lg:flex w-80 flex-col border-r border-primary/10 bg-background-light dark:bg-background-dark p-6 gap-8"
      >
        <div>
          <div
            class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-4"
          >
            <span>Home</span>
            <span class="material-symbols-outlined text-[12px]"
              >chevron_right</span
            >
            <span>Movies</span>
            <span class="material-symbols-outlined text-[12px]"
              >chevron_right</span
            >
            <span class="text-primary font-semibold">Seat Selection</span>
          </div>
          <h1 class="text-2xl font-bold mb-1">{{ selectedMovie.title }}</h1>
          <p
            class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-sm">schedule</span>
            {{ selectedTheater?.name ?? "Star Cineplex" }} •
            {{ formatedDate() }} •
            {{ route.query.time }}
          </p>
        </div>
        <div class="flex flex-col gap-4">
          <div
            class="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-4 rounded-xl"
          >
            <div class="flex items-center gap-3 mb-3">
              <span class="material-symbols-outlined text-primary"
                >confirmation_number</span
              >
              <p class="font-bold text-sm">Booking Summary</p>
            </div>
            <div class="flex flex-col gap-2">
              <div class="flex justify-between text-sm">
                <span class="text-slate-500 dark:text-slate-400"
                  >Seats Selected</span
                >
                <span class="font-medium">{{ selectedSeats.join(", ") }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-slate-500 dark:text-slate-400">Type</span>
                <span class="font-medium">{{
                  route.query.type === "STANDARD" ? "Standard" : "Imax"
                }}</span>
              </div>
              <div class="border-t border-primary/10 my-2"></div>
              <div class="flex justify-between items-end">
                <span class="text-slate-500 dark:text-slate-400 text-xs"
                  >Total Amount</span
                >
                <span class="text-xl font-bold text-primary"
                  >${{ totalPrice }}</span
                >
              </div>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3">
            <span class="material-symbols-outlined text-slate-400">info</span>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              Prices include taxes. Cancellation policy applies up to 2 hours
              before showtime.
            </p>
          </div>
        </div>
        <button
          @click="confirmBooking"
          :disabled="selectedSeats.length === 0"
          class="mt-auto w-full flex items-center justify-center rounded-xl h-14 bg-primary text-white font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          :class="{
            'opacity-50 cursor-not-allowed': selectedSeats.length === 0,
          }"
        >
          Confirm Booking
        </button>
      </aside>
      <!-- Main Interactive Map Area -->
      <section
        class="flex-1 flex flex-col items-center justify-center px-6 py-10 lg:px-6 lg:py-16 relative overflow-auto bg-slate-100 dark:bg-[#1a0c0c]"
      >
        <!-- Screen Visualization -->
        <div class="w-full max-w-4xl mb-20 flex flex-col items-center">
          <div class="w-full h-2 bg-primary/20 rounded-full blur-sm mb-4"></div>
          <div
            class="w-[80%] h-12 bg-gradient-to-b from-primary/10 to-transparent border-t-4 border-primary/40 rounded-[50%] flex items-center justify-center"
          >
            <span
              class="text-primary/60 text-[10px] uppercase tracking-[0.4em] font-bold"
              >Screen This Way</span
            >
          </div>
        </div>

        <!-- Seat Map  -->
        <div class="grid gap-4 select-none">
          <div v-for="row in rows" :key="row" class="flex items-center gap-6">
            <span class="w-6 text-xs text-slate-400 font-bold">{{ row }}</span>

            <div class="flex gap-2">
              <template v-for="n in seatsPerRow" :key="n">
                <div
                  @click="toggleSeat(row, n)"
                  :class="[
                    'w-8 h-8 rounded flex items-center justify-center text-[10px] transition-all',
                    // Sold Out State
                    soldOutSeats.includes(row + n)
                      ? 'bg-slate-400 dark:bg-slate-800 opacity-30 cursor-not-allowed'
                      : // Selected State
                        selectedSeats.includes(row + n)
                        ? 'bg-primary text-white ring-4 ring-primary/20 font-bold cursor-pointer'
                        : // Limit Reached State (Visual Hint)
                          selectedSeats.length >= 5
                          ? 'bg-slate-200 dark:bg-slate-800 opacity-50 cursor-not-allowed'
                          : // Available State
                            'bg-slate-300 dark:bg-slate-700 hover:bg-primary/40 cursor-pointer',
                  ]"
                >
                  <span
                    v-if="soldOutSeats.includes(row + n)"
                    class="material-symbols-outlined text-sm"
                    >close</span
                  >
                  <span v-else>{{ n }}</span>
                </div>

                <div v-if="aisles.includes(n)" class="w-8 mx-2"></div>
              </template>
            </div>
          </div>
        </div>
        <!-- Legend -->
        <div
          class="mt-16 flex flex-wrap justify-center gap-8 bg-background-light dark:bg-background-dark/50 px-8 py-4 rounded-full border border-primary/10 backdrop-blur-md"
        >
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-slate-300 dark:bg-slate-700"></div>
            <span class="text-xs font-medium">Available</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-primary"></div>
            <span class="text-xs font-medium">Selected</span>
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-4 h-4 rounded bg-slate-400 dark:bg-slate-800 opacity-30 flex items-center justify-center"
            >
              <span class="material-symbols-outlined text-[10px]">close</span>
            </div>
            <span class="text-xs font-medium">Sold Out</span>
          </div>
        </div>
      </section>

      <!-- Bottom Bar (Mobile/Tablet Only) -->
      <div
        class="lg:hidden sticky bottom-0 w-full bg-background-light dark:bg-background-dark border-t border-primary/20 p-4 flex items-center justify-between z-50"
      >
        <div class="flex flex-col">
          <span class="text-xs text-slate-500"
            >{{ selectedSeats.join(", ") }} Seats Selected</span
          >
          <span class="text-lg font-bold text-primary">${{ totalPrice }}</span>
        </div>
        <button
          class="bg-primary text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-primary/20"
        >
          Confirm
        </button>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
