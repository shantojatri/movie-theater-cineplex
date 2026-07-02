<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMovies } from "../composables/useMovies";
import { useTheaters } from "../composables/useTheaters";
import { useAuth } from "../composables/useAuth";

const route = useRoute();
const router = useRouter();
const { getMovieById, fetchMovies } = useMovies();
const { fetchTheaters, theatersForIds, toggleFavorite } = useTheaters();
const { isAuthenticated } = useAuth();

const getNextSevenDays = () => {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      month: months[date.getMonth()],
      day: date.getDate().toString(),
      weekday: daysOfWeek[date.getDay()],
      fullDate: date.toISOString().split("T")[0],
    };
  });
};

const dates = ref(getNextSevenDays());
const activeDate = ref(0);
const formats = ["All Formats", "IMAX", "Standard"];
const activeFormat = ref("All Formats");

const selectedMovie = getMovieById(route.query.movieId);

onMounted(async () => {
  await Promise.all([fetchMovies(), fetchTheaters()]);
});

const movieTheatersDetails = computed(() => {
  const theaterIds = selectedMovie.value?.theaters || [
    "amc-metreon-16",
    "century-san-francisco-centre",
    "roxie-theater",
    "regal-stonestown",
  ];
  return theatersForIds(theaterIds);
});

const filteredTheaters = computed(() => {
  if (activeFormat.value === "All Formats") return movieTheatersDetails.value;
  return movieTheatersDetails.value.filter((t: any) =>
    t.experience.some((e: any) =>
      e.type.toLowerCase().includes(activeFormat.value.toLowerCase()),
    ),
  );
});

const handleToggleFavorite = async (theaterId: string) => {
  if (!isAuthenticated.value) return;
  await toggleFavorite(theaterId);
};

const gotoTicketSelection = (
  price: number,
  time: string,
  theaterId: string,
  type: string,
) => {
  router.push({
    path: "/tickets",
    query: {
      movieId: selectedMovie.value?.ID || selectedMovie.value?.id,
      theaterId,
      date: dates.value[activeDate.value].fullDate,
      price,
      time,
      type,
    },
  });
};
</script>

<template>
  <!-- Header -->
  <header
    class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10"
  >
    <div class="flex items-center p-4 justify-between max-w-2xl mx-auto w-full">
      <button
        @click="$router.back()"
        class="text-slate-900 dark:text-slate-100 flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h2
        class="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center"
      >
        Select Theater
      </h2>
      <div class="flex w-10 items-center justify-end">
        <button
          class="text-slate-900 dark:text-slate-100 flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
        >
          <span class="material-symbols-outlined">share</span>
        </button>
      </div>
    </div>
  </header>

  <main class="flex-1 max-w-2xl mx-auto w-full">
    <!-- Movie Brief -->
    <div class="p-4" v-if="selectedMovie">
      <div class="flex w-full flex-col gap-4">
        <div class="flex gap-4 items-center">
          <img
            :src="selectedMovie.imageUrl"
            :alt="selectedMovie.title"
            class="w-20 h-28 object-cover rounded-xl shadow-lg border border-primary/20 shrink-0"
          />
          <div class="flex flex-col justify-center">
            <div class="flex items-center gap-2 mb-1">
              <span
                class="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded"
                >PG-13</span
              >
            </div>
            <h1
              class="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight"
            >
              {{ selectedMovie.title }}
            </h1>
            <p class="text-slate-600 dark:text-primary/70 text-sm mt-1">
              {{ selectedMovie.genre }} • {{ selectedMovie.duration }}
            </p>
            <p class="text-slate-500 text-xs mt-1">
              ⭐ {{ selectedMovie.rating }} • {{ selectedMovie.year }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Date Selector -->
    <div
      class="mt-2 sticky top-[73px] bg-background-light dark:bg-background-dark z-40"
    >
      <div
        class="flex border-b border-primary/10 px-4 gap-4 overflow-x-auto no-scrollbar"
      >
        <button
          v-for="(date, index) in dates"
          :key="index"
          @click="activeDate = index"
          :class="[
            'flex flex-col items-center justify-center border-b-2 pb-3 pt-4 shrink-0 px-2 transition-colors',
            activeDate === index
              ? 'border-primary text-primary'
              : 'border-transparent text-slate-500 dark:text-primary/40 hover:text-primary',
          ]"
        >
          <p class="text-[10px] font-medium uppercase tracking-wider">
            {{ index === 0 ? "TODAY" : date.weekday }}
          </p>
          <p class="text-lg font-bold">{{ date.day }}</p>
        </button>
      </div>
    </div>

    <!-- Format Filter -->
    <div class="px-4 pt-4 flex gap-2">
      <button
        v-for="format in formats"
        :key="format"
        @click="activeFormat = format"
        :class="[
          'px-3 py-1.5 rounded-full text-xs font-bold transition-all',
          activeFormat === format
            ? 'bg-primary text-white shadow-md'
            : 'bg-primary/10 text-slate-700 dark:text-slate-300 hover:bg-primary/20',
        ]"
      >
        {{ format }}
      </button>
    </div>

    <!-- Theaters List -->
    <div class="p-4 space-y-6 pb-24">
      <div class="flex items-center justify-between">
        <h3
          class="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight"
        >
          Theaters Near You
        </h3>
        <span class="text-primary text-sm font-bold"
          >{{ filteredTheaters.length }} found</span
        >
      </div>

      <!-- Loading -->
      <div
        v-if="filteredTheaters.length === 0"
        class="flex flex-col items-center justify-center py-16 gap-3 text-slate-400"
      >
        <span class="material-symbols-outlined text-4xl">theater_comedy</span>
        <p class="font-medium">Loading theaters...</p>
      </div>

      <!-- Theater Cards -->
      <div
        v-for="theater in filteredTheaters"
        :key="theater.theaterId"
        class="bg-white dark:bg-primary/5 rounded-xl border border-primary/10 overflow-hidden"
      >
        <div class="p-4 border-b border-primary/5">
          <div class="flex justify-between items-start">
            <div class="flex-1 min-w-0">
              <h4
                class="text-slate-900 dark:text-slate-100 font-bold text-base flex items-center gap-1 flex-wrap"
              >
                {{ theater.name }}
                <span
                  v-if="theater.verified"
                  class="material-symbols-outlined text-amber-500 text-sm"
                  >verified</span
                >
              </h4>
              <p
                class="text-slate-500 dark:text-primary/60 text-xs mt-0.5 truncate"
              >
                {{ theater.address }}
              </p>
              <span
                class="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1 inline-block"
                >{{ theater.distance }}</span
              >
            </div>
            <button
              @click="handleToggleFavorite(theater.theaterId)"
              :class="[
                'p-2 transition-colors rounded-lg shrink-0 ml-2',
                theater.isFavorite
                  ? 'text-red-500'
                  : 'text-slate-400 hover:text-primary',
                !isAuthenticated
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer',
              ]"
              :title="
                isAuthenticated
                  ? theater.isFavorite
                    ? 'Remove favorite'
                    : 'Add favorite'
                  : 'Login to favorite'
              "
            >
              <span
                :class="[
                  'material-symbols-outlined',
                  theater.isFavorite ? 'filled' : '',
                ]"
                >favorite</span
              >
            </button>
          </div>
        </div>

        <div class="p-4 space-y-4">
          <div
            v-for="experience in theater.experience"
            :key="experience.type"
            v-show="
              activeFormat === 'All Formats' ||
              experience.type.toLowerCase().includes(activeFormat.toLowerCase())
            "
          >
            <div class="flex items-center gap-2 mb-2">
              <span
                :class="[
                  'text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded',
                  experience.type === 'STANDARD'
                    ? 'bg-slate-700 text-white'
                    : 'bg-primary text-white',
                ]"
                >{{ experience.type }}</span
              >
              <span class="text-slate-400 dark:text-primary/40 text-xs">{{
                experience.details
              }}</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="showtime in experience.showtimes"
                :key="showtime.time"
                @click="
                  showtime.available &&
                  gotoTicketSelection(
                    showtime.price,
                    showtime.time,
                    theater.theaterId,
                    experience.type,
                  )
                "
                :disabled="!showtime.available"
                :class="[
                  'px-4 py-2 rounded-lg font-bold text-sm transition-colors flex flex-col items-center min-w-[80px]',
                  showtime.available
                    ? 'bg-primary/10 border border-primary/30 text-slate-900 dark:text-slate-100 hover:bg-primary hover:text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-60',
                ]"
              >
                <span :class="showtime.available ? '' : 'line-through'">{{
                  showtime.time
                }}</span>
                <span class="text-[10px] font-bold">{{
                  showtime.available ? "$" + showtime.price : "SOLD OUT"
                }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Navigation -->
  <nav
    class="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-primary/10 z-50"
  >
    <div class="flex max-w-2xl mx-auto items-center px-4 pb-6 pt-3">
      <router-link
        to="/"
        class="flex flex-1 flex-col items-center gap-1 text-slate-400 dark:text-primary/40"
      >
        <span class="material-symbols-outlined">movie</span>
        <p class="text-[10px] font-bold uppercase tracking-wider">Movies</p>
      </router-link>
      <a class="flex flex-1 flex-col items-center gap-1 text-primary" href="#">
        <span class="material-symbols-outlined filled">theater_comedy</span>
        <p class="text-[10px] font-bold uppercase tracking-wider">Theaters</p>
      </a>
      <router-link
        to="/my-tickets"
        class="flex flex-1 flex-col items-center gap-1 text-slate-400 dark:text-primary/40"
      >
        <span class="material-symbols-outlined">confirmation_number</span>
        <p class="text-[10px] font-bold uppercase tracking-wider">Tickets</p>
      </router-link>
      <router-link
        to="/profile"
        class="flex flex-1 flex-col items-center gap-1 text-slate-400 dark:text-primary/40"
      >
        <span class="material-symbols-outlined">person</span>
        <p class="text-[10px] font-bold uppercase tracking-wider">Profile</p>
      </router-link>
    </div>
  </nav>
</template>
