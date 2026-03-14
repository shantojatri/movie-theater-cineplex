<script setup>
import { ref, computed, onMounted } from "vue";
import HeaderDesktop from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import { useRoute, useRouter } from "vue-router";
import { useMovies } from "../composables/useMovies";
import TrailerModal from "../components/TrailerModal.vue";

const route = useRoute();
const router = useRouter();
const isTrailerOpen = ref(false);
const { getMovieById, fetchMovies } = useMovies();

const getNextSevenDays = () => {
  const days = [];
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

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i); // Add 'i' days to today

    days.push({
      month: months[date.getMonth()],
      day: date.getDate().toString(),
      weekday: daysOfWeek[date.getDay()],
      fullDate: date.toISOString().split("T")[0], // Useful for ID/Keys (e.g., 2026-03-09)
    });
  }
  return days;
};

const dates = ref(getNextSevenDays());

const activeDate = ref(0);
const formats = ["All Formats", "IMAX", "Standard"];
const activeFormat = ref("All Formats");

const selectedMovie = getMovieById(route.query.movieId);

const openTrailer = () => {
  if (selectedMovie.value?.trailerUrl) {
    isTrailerOpen.value = true;
  }
};

const theatersList = ref([]);

onMounted(async () => {
  await fetchMovies();
  try {
    const res = await fetch("http://localhost:8080/api/theaters");
    if (res.ok) {
      theatersList.value = await res.json();
    }
  } catch (err) {
    console.error("Failed to load theaters:", err);
  }
});

const movieTheatersDetails = computed(() => {
  // If no theaters array is present (since we transitioned to PostgreSQL without M2M tables),
  // just show all verified theaters as a fallback so the UI isn't empty.
  const theaterIds = selectedMovie.value?.theaters || [
    "amc-metreon-16", 
    "century-san-francisco-centre", 
    "roxie-theater",
    "regal-stonestown"
  ];

  return theaterIds
    .map((id) => {
      return theatersList.value.find((t) => t.theaterId === id);
    })
    .filter((t) => t !== undefined);
});

const gotoTicketSelection = (moviePrice, time, theaterId, type) => {
  router.push({
    path: "/tickets",
    query: {
      movieId: selectedMovie.value.ID || selectedMovie.value.id,
      theaterId: theaterId,
      date: dates.value[activeDate.value].fullDate,
      price: moviePrice,
      time: time,
      type: type,
    },
  });
};
</script>

<template>
  <div
    class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden"
  >
    <div class="layout-container flex h-full grow flex-col">
      <!-- Top Navigation Bar -->
      <HeaderDesktop />
      <main class="flex-1 px-6 lg:px-20 py-8">
        <!-- Breadcrumbs -->
        <div class="flex flex-wrap gap-2 mb-6">
          <a
            class="text-slate-500 text-sm font-medium hover:text-primary"
            href="#"
            >Home</a
          >
          <span class="text-slate-500 text-sm font-medium">/</span>
          <a
            class="text-slate-500 text-sm font-medium hover:text-primary"
            href="#"
            >Movies</a
          >
          <span class="text-slate-500 text-sm font-medium">/</span>
          <span class="text-primary text-sm font-medium">{{
            selectedMovie?.title
          }}</span>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Sidebar: Movie Details -->
          <aside class="lg:col-span-4 flex flex-col gap-6">
            <div class="relative group overflow-hidden rounded-xl bg-primary/5">
              <img
                alt="Movie Poster"
                class="w-full h-auto object-cover aspect-[2/3] rounded-xl shadow-2xl"
                :data-alt="selectedMovie?.description"
                :src="selectedMovie?.imageUrl"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-background-dark/90 to-transparent flex flex-col justify-end p-6"
              >
                <div class="flex items-center gap-2 mb-2">
                  <span
                    class="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                    >IMAX</span
                  >
                  <span
                    class="bg-slate-700 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                    >PG-13</span
                  >
                </div>
                <h1 class="text-3xl font-bold text-white mb-1">
                  {{ selectedMovie?.title }}
                </h1>
                <p class="text-slate-300 text-sm">
                  {{ selectedMovie?.year }} • {{ selectedMovie?.genre }} •
                  {{ selectedMovie?.duration }}
                </p>
              </div>
            </div>
            <div class="bg-primary/5 p-6 rounded-xl border border-primary/10">
              <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">info</span>
                Movie Details
              </h3>
              <p
                class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4"
              >
                {{ selectedMovie?.description }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="cast in selectedMovie.casts"
                  :key="cast"
                  class="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20"
                  >{{ cast }}</span
                >
              </div>
            </div>
            <div class="flex gap-4">
              <button
                class="flex-1 flex items-center justify-center gap-2 bg-primary/10 border border-primary/20 py-3 rounded-lg font-bold text-sm hover:bg-primary/20 transition-all"
                v-if="selectedMovie.trailerUrl"
                @click="openTrailer"
              >
                <span class="material-symbols-outlined text-primary"
                  >play_circle</span
                >
                Watch Trailer
              </button>
              <button
                class="w-12 flex items-center justify-center bg-primary/10 border border-primary/20 rounded-lg text-primary hover:bg-primary/20"
              >
                <span class="material-symbols-outlined">share</span>
              </button>
              <TrailerModal
                :trailer-url="selectedMovie?.trailerUrl"
                :is-open="isTrailerOpen"
                @close="isTrailerOpen = false"
              />
            </div>
          </aside>
          <!-- Main Content: Theater Selection -->
          <section class="lg:col-span-8 flex flex-col gap-6">
            <!-- Date Selector -->
            <div
              class="bg-primary/5 border border-primary/10 rounded-xl p-4 flex items-center gap-4 overflow-x-auto no-scrollbar"
            >
              <div
                v-for="(date, index) in dates"
                :key="index"
                @click="activeDate = index"
                :class="[
                  'flex flex-col items-center min-w-[60px] p-2 rounded-lg cursor-pointer transition-colors',
                  activeDate === index
                    ? 'bg-primary text-white shadow-lg'
                    : 'hover:bg-primary/10 text-slate-500',
                ]"
              >
                <span
                  :class="[
                    'text-xs font-medium uppercase',
                    activeDate === index ? '' : 'text-slate-500',
                  ]"
                  >{{ date.month }}</span
                >
                <span
                  :class="[
                    'text-xl font-bold',
                    activeDate === index
                      ? ''
                      : 'text-slate-900 dark:text-slate-100',
                  ]"
                  >{{ date.day }}</span
                >
                <span
                  :class="[
                    'text-[10px] font-medium uppercase',
                    activeDate === index ? '' : 'text-slate-500',
                  ]"
                  >{{ date.weekday }}</span
                >
              </div>
              <div class="ml-auto flex gap-2">
                <button
                  class="p-2 rounded-lg bg-background-light dark:bg-background-dark border border-primary/10 text-slate-500"
                >
                  <span class="material-symbols-outlined">calendar_today</span>
                </button>
              </div>
            </div>
            <!-- Filters -->
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex gap-3">
                <button
                  v-for="format in formats"
                  :key="format"
                  @click="activeFormat = format"
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-bold transition-all',
                    activeFormat === format
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-primary/10 text-slate-700 dark:text-slate-300 hover:bg-primary/20',
                  ]"
                >
                  {{ format }}
                </button>
              </div>
              <div class="flex items-center gap-2 text-sm text-slate-500">
                <span class="material-symbols-outlined text-lg"
                  >location_on</span
                >
                <span class="font-medium">San Francisco, CA</span>
                <button class="text-primary font-bold hover:underline">
                  Change
                </button>
              </div>
            </div>
            <!-- Theater Listings -->
            <div class="flex flex-col gap-6">
              <!-- Theater Card 1 -->
              <div
                v-for="theater in movieTheatersDetails"
                :key="theater.id"
                class="bg-background-light dark:bg-background-dark border border-primary/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  class="p-5 border-b border-primary/10 flex justify-between items-start"
                >
                  <div>
                    <h3 class="text-xl font-bold flex items-center gap-2">
                      {{ theater.name }}
                      <span
                        v-if="theater.verified"
                        class="material-symbols-outlined text-amber-500 text-lg"
                        >verified</span
                      >
                    </h3>
                    <p class="text-slate-500 text-sm">
                      {{ theater.address }}
                    </p>
                  </div>
                  <button
                    class="p-2 text-slate-400 hover:text-primary transition-colors"
                  >
                    <span class="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                <div class="p-5 flex flex-col gap-6">
                  <!-- Format Group: IMAX -->
                  <div
                    v-for="experience in theater.experience"
                    :key="experience.type"
                    class="flex flex-col gap-3"
                  >
                    <div class="flex items-center gap-2">
                      <span
                        v-if="experience.type === 'STANDARD'"
                        class="bg-slate-700 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest uppercase"
                        >STANDARD</span
                      >
                      <span
                        v-else
                        class="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest uppercase"
                        >{{ experience.type }}</span
                      >

                      <span class="text-slate-400 text-xs font-medium">
                        {{ experience.details.replace(" + ", " • ") }}
                      </span>
                    </div>
                    <div class="flex flex-wrap gap-3">
                      <button
                        v-for="showtime in experience.showtimes"
                        :key="showtime.time"
                        @click="
                          gotoTicketSelection(
                            showtime.price,
                            showtime.time,
                            theater.theaterId,
                            experience.type,
                          )
                        "
                        class="group px-5 py-3 rounded-lg bg-primary/5 border border-primary/20 flex flex-col items-center min-w-[100px] hover:bg-primary hover:border-primary transition-all"
                        :class="
                          showtime.available
                            ? ''
                            : 'opacity-50 cursor-not-allowed'
                        "
                        :disabled="!showtime.available"
                      >
                        <span
                          class="text-slate-900 dark:text-slate-100 group-hover:text-white font-bold text-lg"
                          :class="showtime.available ? '' : 'line-through'"
                          >{{ showtime.time }}</span
                        >
                        <span
                          class="text-slate-500 group-hover:text-white/80 text-[10px] uppercase font-bold"
                          >{{ showtime.available ? "$" : ""
                          }}{{
                            showtime.available ? showtime.price : "SOLD OUT"
                          }}</span
                        >
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Map Integration Placeholder -->
            <div class="mt-4">
              <div
                class="w-full h-64 bg-primary/5 rounded-xl border border-primary/10 flex flex-col items-center justify-center gap-4 relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 opacity-20 bg-cover bg-center"
                  data-alt="Abstract map pattern with theater locations marked in red"
                  data-location="San Francisco"
                  style="
                    background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuDGHRLlonsRnTkPiB4xtRlooZRIhY2C1wOPaj8rsp6hs0Q5dYIf_QDjNjVTC-mvK__h28-_C9mQ0vmnZr-UIHVJTi1lSXqQhZEOpX-LZQD-M6m1ViTFTh-EHg1rNDIPpdZQPYY604NVcjjlgZmPXK0eBo4jYR1ZIZI-rHgKw59toj-sukHdqzvCvW4p9cSMToS9WWkBaNI5Ii2HbRSAsCduG-H-rftOm8zNoIBmoP8PsbwGbeJjTC6G8wcpVcf42FOw32dd40rmemof&quot;);
                  "
                ></div>
                <span
                  class="material-symbols-outlined text-4xl text-primary z-10"
                  >map</span
                >
                <p class="font-bold text-slate-700 dark:text-slate-300 z-10">
                  View theaters on interactive map
                </p>
                <button
                  class="bg-primary text-white px-6 py-2 rounded-lg font-bold shadow-lg z-10 hover:scale-105 transition-transform"
                >
                  Explore Nearby
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <AppFooter />
    </div>
  </div>
</template>
