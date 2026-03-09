<script setup>
import { ref, computed } from "vue";
import HeaderDesktop from "../components/AppHeaderDesktop.vue";
import AppFooter from "../components/AppFooter.vue";
import TrailerModal from "../components/TrailerModal.vue";
import { movies, featuredMovie } from "../data/movies";

const isTrailerOpen = ref(false);

// Derive unique genres from movies data
const genres = computed(() => {
  const all = movies.map((m) => m.genre);
  return ["All", ...new Set(all)];
});

const selectedGenre = ref("All");

const filteredMovies = computed(() => {
  if (selectedGenre.value === "All") return movies;
  return movies.filter((m) => m.genre === selectedGenre.value);
});

function selectGenre(genre) {
  selectedGenre.value = genre;
}
</script>

<template>
  <div
    class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden"
  >
    <div class="layout-container flex h-full grow flex-col">
      <!-- Top Navigation Bar -->
      <HeaderDesktop />
      <main class="flex-1">
        <!-- Hero Section -->
        <div class="px-6 lg:px-20 py-8">
          <div class="@container">
            <div
              class="relative flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 pb-12 lg:px-16 lg:pb-16 overflow-hidden shadow-2xl"
              :data-alt="`${featuredMovie.title} cover image`"
              :style="`background-image: linear-gradient(to top, rgba(34, 16, 16, 0.95) 0%, rgba(34, 16, 16, 0.4) 50%, rgba(34, 16, 16, 0.1) 100%), url('${featuredMovie.imageUrl}');`"
            >
              <div class="flex flex-col gap-4 max-w-2xl">
                <span
                  class="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full w-fit uppercase tracking-widest"
                  >Featured Today</span
                >
                <h1
                  class="text-white text-5xl font-black leading-tight tracking-tight lg:text-7xl"
                >
                  {{ featuredMovie.title }}
                </h1>
                <p
                  class="text-slate-200 text-lg font-medium leading-relaxed max-w-xl"
                >
                  {{ featuredMovie.description }}
                </p>
                <div
                  class="flex items-center gap-4 text-slate-300 text-sm mb-2"
                >
                  <span class="flex items-center gap-1"
                    ><span
                      class="material-symbols-outlined text-yellow-500 fill-1"
                      >star</span
                    >
                    {{ featuredMovie.rating }}/10</span
                  >
                  <span>•</span>
                  <span>{{ featuredMovie.duration }}</span>
                  <span>•</span>
                  <span>{{ featuredMovie.genre }}</span>
                </div>
              </div>
              <div class="flex flex-wrap gap-4 relative z-10">
                <button
                  @click="$router.push('/theaters?movieId=' + featuredMovie.id)"
                  class="flex min-w-[140px] items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary text-white text-base font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/30"
                >
                  <span class="material-symbols-outlined"
                    >confirmation_number</span
                  >
                  <span>Book Now</span>
                </button>
                <a
                  v-if="featuredMovie.trailerUrl"
                  @click.prevent="isTrailerOpen = true"
                  href="#"
                  class="flex min-w-[140px] items-center justify-center gap-2 rounded-lg h-12 px-6 bg-white/10 backdrop-blur-md text-white border border-white/20 text-base font-bold transition-all hover:bg-white/20 cursor-pointer"
                >
                  <span class="material-symbols-outlined">play_circle</span>
                  <span>Watch Trailer</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- Filters and List Section -->
        <div class="px-6 lg:px-20 pb-20">
          <div
            class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
          >
            <h2
              class="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight"
            >
              Currently Playing
            </h2>
            <div
              class="flex flex-wrap bg-primary/5 dark:bg-primary/10 p-1 rounded-xl border border-primary/10 gap-1"
            >
              <button
                v-for="genre in genres"
                :key="genre"
                @click="selectGenre(genre)"
                :class="[
                  'px-6 py-2 rounded-lg text-sm font-bold transition-all',
                  selectedGenre === genre
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/10',
                ]"
              >
                {{ genre }}
              </button>
            </div>
          </div>
          <!-- Movie Grid -->
          <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
          >
            <div
              v-for="movie in filteredMovies"
              :key="movie.id"
              @click="$router.push('/theaters?movieId=' + movie.id)"
              class="group flex flex-col gap-3 cursor-pointer"
            >
              <div
                class="relative w-full aspect-[3/4] overflow-hidden rounded-xl shadow-md transition-all group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:-translate-y-1"
              >
                <div
                  class="absolute inset-0 bg-center bg-no-repeat bg-cover"
                  :data-alt="`${movie.title} poster visual`"
                  :style="`background-image: url('${movie.imageUrl}');`"
                ></div>
                <div
                  class="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1"
                >
                  <span
                    class="material-symbols-outlined text-xs text-yellow-500 fill-1"
                    >star</span
                  >
                  {{ movie.rating.toFixed(1) }}
                </div>
              </div>
              <div class="px-1">
                <h3
                  class="text-slate-900 dark:text-slate-100 text-lg font-bold truncate group-hover:text-primary transition-colors"
                >
                  {{ movie.title }}
                </h3>
                <div class="flex items-center justify-between mt-1">
                  <span
                    class="text-primary text-xs font-semibold px-2 py-0.5 rounded bg-primary/10"
                    >{{ movie.genre }}</span
                  >
                  <span
                    class="text-slate-500 dark:text-slate-400 text-xs font-medium"
                    >{{ movie.status }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- View More Button -->
          <div class="mt-12 flex justify-center">
            <router-link
              to="/all-movies"
              class="flex items-center gap-2 px-8 py-3 rounded-full border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all"
            >
              <span>View All Movies</span>
              <span class="material-symbols-outlined">arrow_forward</span>
            </router-link>
          </div>
        </div>
      </main>
      <!-- Simple Footer -->
      <AppFooter />
    </div>
  </div>
  <!-- Trailer Modal -->
  <TrailerModal
    :trailer-url="featuredMovie.trailerUrl"
    :is-open="isTrailerOpen"
    @close="isTrailerOpen = false"
  />
</template>
