<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import HeaderDesktop from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";

const router = useRouter();
const { token, isAuthenticated } = useAuth();
const tickets = ref([]);
const theatersList = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  if (!isAuthenticated.value) {
    router.push("/login");
    return;
  }

  try {
    // Fetch theaters to map theaterId to theater name and address
    const thRes = await fetch("http://localhost:8080/api/theaters");
    if (thRes.ok) {
      theatersList.value = await thRes.json();
    }

    // Fetch user's tickets
    const res = await fetch("http://localhost:8080/api/tickets", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (res.ok) {
      tickets.value = await res.json();
    }
  } catch (error) {
    console.error("Failed to load tickets:", error);
  } finally {
    isLoading.value = false;
  }
});

const getTheater = (theaterId) => {
  return (
    theatersList.value.find((t) => t.theaterId === theaterId) || {
      name: theaterId,
      address: "Unknown Location",
    }
  );
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });
};

const scanTicket = async (ticketId) => {
  try {
    const res = await fetch(
      `http://localhost:8080/api/tickets/${ticketId}/scan`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      },
    );

    if (res.ok) {
      const ticketIndex = tickets.value.findIndex((t) => t.ID === ticketId);
      if (ticketIndex !== -1) {
        tickets.value[ticketIndex].status = "watched";
      }
    } else {
      const err = await res.json();
      alert(err.error || "Failed to scan ticket");
    }
  } catch (err) {
    console.error("Scan error", err);
  }
};
</script>

<template>
  <div
    class="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden"
  >
    <div class="layout-container flex h-full grow flex-col">
      <HeaderDesktop />

      <main class="flex-1 px-6 lg:px-20 py-10 max-w-6xl mx-auto w-full">
        <div class="mb-8 flex items-center justify-between">
          <h1
            class="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3"
          >
            <span class="material-symbols-outlined text-primary text-3xl"
              >confirmation_number</span
            >
            My Tickets
          </h1>
          <router-link
            to="/all-movies"
            class="text-primary hover:underline font-medium text-sm"
          >
            Browse Movies
          </router-link>
        </div>

        <div v-if="isLoading" class="flex justify-center items-center py-20">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
          ></div>
        </div>

        <div
          v-else-if="tickets.length === 0"
          class="bg-primary/5 rounded-2xl p-12 text-center border border-primary/10"
        >
          <span class="material-symbols-outlined text-6xl text-slate-400 mb-4"
            >local_activity</span
          >
          <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            No tickets yet
          </h2>
          <p class="text-slate-500 mb-6 max-w-md mx-auto">
            You haven't purchased any tickets. Discover what's playing and book
            your next cinematic experience!
          </p>
          <router-link
            to="/all-movies"
            class="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all inline-block"
          >
            Find Movies
          </router-link>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <div
            v-for="ticket in tickets"
            :key="ticket.ID"
            class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group flex flex-col"
          >
            <!-- Movie Poster -->
            <div class="relative h-44 overflow-hidden bg-black shrink-0">
              <img
                :src="ticket.movie?.imageUrl"
                :alt="ticket.movie?.title"
                class="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-4">
                <!-- Status top right -->
                <div class="flex justify-end">
                  <span
                    :class="{
                      'bg-green-500 text-white': ticket.status === 'booked',
                      'bg-blue-500 text-white': ticket.status === 'watched',
                      'bg-slate-500 text-white': ticket.status === 'expired'
                    }"
                    class="text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow"
                  >
                    {{ ticket.status }}
                  </span>
                </div>
                <!-- Movie title bottom -->
                <div>
                  <h3 class="text-lg font-black text-white leading-snug drop-shadow">
                    {{ ticket.movie?.title }}
                  </h3>
                  <p class="text-white/70 text-xs mt-0.5 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[13px]">location_on</span>
                    {{ getTheater(ticket.theaterId).name }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Details Block -->
            <div class="px-4 py-4 flex-1 flex flex-col gap-3">
              <div class="grid grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <p class="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Date</p>
                  <p class="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">{{ formatDate(ticket.showTime) }}</p>
                </div>
                <div>
                  <p class="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Time</p>
                  <p class="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">{{ formatTime(ticket.showTime) }}</p>
                </div>
                <div>
                  <p class="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Seats</p>
                  <p class="text-xs font-bold text-primary flex items-center gap-1 flex-wrap">
                    <span class="material-symbols-outlined text-[13px]">chair</span>
                    {{ ticket.seatNumber }}
                  </p>
                </div>
                <div>
                  <p class="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Total</p>
                  <p class="text-sm font-bold text-slate-900 dark:text-slate-100">${{ ticket.price.toFixed(2) }}</p>
                </div>
              </div>
            </div>

            <!-- Stub Footer -->
            <div class="relative border-t border-dashed border-slate-200 dark:border-slate-700 mx-4 mb-4">
              <!-- Perforation half-circles -->
              <div class="absolute -top-3 -left-7 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"></div>
              <div class="absolute -top-3 -right-7 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"></div>

              <div class="pt-3 flex items-center justify-between">
                <div>
                  <p class="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Booking ID</p>
                  <p class="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">#TK-{{ ticket.ID.toString().padStart(6, '0') }}</p>
                </div>

                <button
                  v-if="ticket.status === 'booked'"
                  @click="scanTicket(ticket.ID)"
                  class="bg-primary hover:bg-primary/90 text-white text-[11px] font-black px-3 py-1.5 rounded-lg transition-all shadow shadow-primary/30 flex items-center gap-1 active:scale-95"
                >
                  <span class="material-symbols-outlined text-[14px]">qr_code_scanner</span>
                  Scan
                </button>
                <div v-else-if="ticket.status === 'watched'" class="flex items-center gap-1 text-[11px] font-bold text-blue-500">
                  <span class="material-symbols-outlined text-[16px]">check_circle</span>
                  Watched
                </div>
                <div v-else class="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                  <span class="material-symbols-outlined text-[16px]">block</span>
                  Expired
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  </div>
</template>
