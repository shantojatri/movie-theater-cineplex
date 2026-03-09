<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import HeaderDesktop from "../components/AppHeaderDesktop.vue";
import AppFooter from "../components/AppFooter.vue";
import { movies } from "../data/movies";

const router = useRouter();
const route = useRoute();
const searchQuery = ref("");
const selectedGenre = ref("All");

// Unique genres derived from data
const genres = computed(() => {
  const all = movies.map((m) => m.genre);
  return ["All", ...new Set(all)];
});

// Filtered movies based on search + genre
const filteredMovies = computed(() => {
  let result = movies;
  if (selectedGenre.value !== "All") {
    result = result.filter((m) => m.genre === selectedGenre.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    result = result.filter(
      (m) =>
        m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q),
    );
  }
  return result;
});

// Group filtered movies by genre
const moviesByGenre = computed(() => {
  const groups = {};
  for (const movie of filteredMovies.value) {
    if (!groups[movie.genre]) groups[movie.genre] = [];
    groups[movie.genre].push(movie);
  }
  return groups;
});

function goToMovie(movieId) {
  router.push({ path: "/theaters", query: { movieId } });
}

const mainContent = ref(null);

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
});
</script>

<template>
  <div
    class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden"
  >
    <div class="layout-container flex h-full grow flex-col">
      <HeaderDesktop />
      <main class="flex-1 px-6 lg:px-20 py-10">
        <!-- Page Header -->
        <div
          class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
        >
          <div ref="mainContent">
            <h1
              class="text-slate-900 dark:text-slate-100 text-4xl font-black tracking-tight leading-tight"
            >
              All Movies
            </h1>
            <p
              class="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium"
            >
              {{ filteredMovies.length }} movie{{
                filteredMovies.length !== 1 ? "s" : ""
              }}
              available
            </p>
          </div>

          <!-- Search Bar -->
          <!-- <label class="flex flex-col w-full max-w-xs relative">
            <div class="flex items-stretch rounded-xl h-11 overflow-hidden bg-primary/8 border border-primary/20 focus-within:border-primary transition-all shadow-sm">
              <div class="text-primary flex items-center justify-center pl-4">
                <span class="material-symbols-outlined text-xl">search</span>
              </div>
              <input
                v-model="searchQuery"
                class="form-input flex w-full border-none bg-transparent focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm font-medium focus:outline-none px-3"
                placeholder="Search movies..."
              />
            </div>
          </label> -->
        </div>

        <!-- Genre Filter Chips -->
        <div class="flex flex-wrap gap-2 mb-10">
          <button
            v-for="genre in genres"
            :key="genre"
            @click="selectedGenre = genre"
            :class="[
              'px-5 py-2 rounded-full text-sm font-bold transition-all border',
              selectedGenre === genre
                ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                : 'bg-primary/5 dark:bg-primary/10 text-slate-600 dark:text-slate-400 border-primary/10 hover:border-primary/40 hover:text-primary',
            ]"
          >
            {{ genre }}
          </button>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredMovies.length === 0"
          class="flex flex-col items-center justify-center py-24 gap-4"
        >
          <span
            class="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600"
            >movie_off</span
          >
          <p class="text-slate-400 dark:text-slate-500 text-lg font-semibold">
            No movies found
          </p>
          <button
            @click="
              searchQuery = '';
              selectedGenre = 'All';
            "
            class="text-primary font-bold hover:underline text-sm"
          >
            Clear filters
          </button>
        </div>

        <!-- Movies Grouped by Genre -->
        <div v-else class="flex flex-col gap-14">
          <section v-for="(groupMovies, genre) in moviesByGenre" :key="genre">
            <!-- Genre Header -->
            <div class="flex items-center gap-4 mb-6">
              <h2
                class="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight"
              >
                {{ genre }}
              </h2>
              <span
                class="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold"
              >
                {{ groupMovies.length }}
              </span>
              <div
                class="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent"
              ></div>
            </div>

            <!-- Movie Grid -->
            <div
              class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
            >
              <div
                v-for="movie in groupMovies"
                :key="movie.id"
                @click="goToMovie(movie.id)"
                class="group flex flex-col gap-3 cursor-pointer"
              >
                <div
                  class="relative w-full aspect-[3/4] overflow-hidden rounded-xl shadow-md transition-all group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:-translate-y-1"
                >
                  <div
                    class="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                    :style="`background-image: url('${movie.imageUrl}');`"
                  ></div>
                  <!-- Hover overlay -->
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  >
                    <button
                      class="w-full py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-xl flex items-center justify-center gap-1"
                    >
                      <span class="material-symbols-outlined text-base"
                        >confirmation_number</span
                      >
                      Book Now
                    </button>
                  </div>
                  <!-- Rating badge -->
                  <div
                    class="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1"
                  >
                    <span
                      class="material-symbols-outlined text-xs text-yellow-500 fill-1"
                      >star</span
                    >
                    {{ movie.rating.toFixed(1) }}
                  </div>
                  <!-- Status badge -->
                  <div
                    v-if="movie.status"
                    :class="[
                      'absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full',
                      movie.status === 'In Theaters'
                        ? 'bg-green-500/80 text-white'
                        : movie.status === 'Coming Soon'
                          ? 'bg-amber-500/80 text-white'
                          : 'bg-blue-500/80 text-white',
                    ]"
                  >
                    {{ movie.status }}
                  </div>
                </div>
                <div class="px-1">
                  <h3
                    class="text-slate-900 dark:text-slate-100 text-sm font-bold truncate group-hover:text-primary transition-colors"
                  >
                    {{ movie.title }}
                  </h3>
                  <div class="flex items-center justify-between mt-1">
                    <span
                      class="text-primary text-xs font-semibold px-2 py-0.5 rounded bg-primary/10"
                      >{{ movie.genre }}</span
                    >
                    <span class="text-slate-400 text-xs">{{
                      movie.duration
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <AppFooter />
    </div>
  </div>
</template>
