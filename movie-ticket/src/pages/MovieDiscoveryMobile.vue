<script setup>
import { ref } from "vue";
import { movies, featuredMovie } from "../data/movies";
import AppFooter from "../components/AppFooter.vue";
import TrailerModal from "../components/TrailerModal.vue";

const isTrailerOpen = ref(false);
</script>

<template>
  <!-- Navigation -->
  <nav
    class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 bg-primary rounded flex items-center justify-center"
          >
            <span class="material-icons text-white">movie</span>
          </div>
          <span
            class="text-xl font-bold tracking-tighter text-slate-900 dark:text-slate-100"
            >CINE<span class="text-primary">STREAM</span></span
          >
        </div>
        <div class="hidden md:block flex-1 max-w-md mx-8">
          <div class="relative">
            <span
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <span class="material-icons text-slate-400 text-sm">search</span>
            </span>
            <input
              class="block w-full pl-10 pr-3 py-2 border-none rounded-lg bg-primary/5 dark:bg-primary/10 focus:ring-2 focus:ring-primary text-sm"
              placeholder="Search movies, actors, directors..."
              type="text"
            />
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button
            class="p-2 text-slate-500 hover:text-primary transition-colors"
          >
            <span class="material-icons">notifications</span>
          </button>
          <div
            class="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 overflow-hidden"
          >
            <img
              class="w-full h-full object-cover"
              data-alt="User profile avatar portrait"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWHousPSJj0rkL-mMAz7n2I0HpQsiFnjCjFNfbuRYf61RpQDWyRVBXZVeVBf-X5otvwLWMEsdymKGva19uZ6P4DfKh9P48gCSbCStDx9dJKteSvzSgdcIS_fDOgVdouVYFNIzNm4iUXZjd1PLg66X71rSmGTV2-FsgqJ59aEkkwbXXfowMnptHexbxeN50eN8QcRuCVM2GSy_21O3b6Mg8cRVGnOipiJK7SPfQx9QjQSeSoQdqPuQUlRfuOReD2aW_rLbLJnTSHv5F"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <section
      class="relative rounded-xl overflow-hidden mb-12 aspect-[21/9] min-h-[400px]"
    >
      <img
        class="absolute inset-0 w-full h-full object-cover"
        :data-alt="`${featuredMovie.title} cover image`"
        :src="featuredMovie.imageUrl"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"
      ></div>
      <div class="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
        <div class="flex items-center gap-2 mb-4">
          <span
            class="px-2 py-1 bg-primary text-white text-xs font-bold rounded"
            >FEATURED</span
          >
          <span class="text-slate-300 text-sm flex items-center gap-1">
            <span class="material-icons text-xs text-yellow-500">star</span>
            {{ featuredMovie.rating }} IMDB
          </span>
        </div>
        <h1
          class="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-none text-white"
        >
          {{ featuredMovie.title }}
        </h1>
        <p
          class="text-slate-300 text-lg mb-8 max-w-xl line-clamp-2 md:line-clamp-none"
        >
          {{ featuredMovie.description }}
        </p>
        <div class="flex flex-wrap gap-4">
          <button
            @click="$router.push('/theaters')"
            class="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all flex items-center gap-2"
          >
            <span class="material-icons">confirmation_number</span>
            BOOK NOW
          </button>
          <a
            v-if="featuredMovie.trailerUrl"
            @click.prevent="isTrailerOpen = true"
            href="#"
            class="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-lg border border-white/20 transition-all flex items-center gap-2"
          >
            <span class="material-icons">play_circle</span>
            WATCH TRAILER
          </a>
        </div>
      </div>
    </section>
    <!-- Category Filters -->
    <div class="flex items-center gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
      <button
        class="px-6 py-2 bg-primary text-white rounded-full font-medium whitespace-nowrap"
      >
        Trending Now
      </button>
      <button
        class="px-6 py-2 bg-primary/10 dark:bg-primary/20 hover:bg-primary/30 text-slate-900 dark:text-slate-100 rounded-full font-medium whitespace-nowrap transition-colors"
      >
        Action
      </button>
      <button
        class="px-6 py-2 bg-primary/10 dark:bg-primary/20 hover:bg-primary/30 text-slate-900 dark:text-slate-100 rounded-full font-medium whitespace-nowrap transition-colors"
      >
        Sci-Fi
      </button>
      <button
        class="px-6 py-2 bg-primary/10 dark:bg-primary/20 hover:bg-primary/30 text-slate-900 dark:text-slate-100 rounded-full font-medium whitespace-nowrap transition-colors"
      >
        Drama
      </button>
      <button
        class="px-6 py-2 bg-primary/10 dark:bg-primary/20 hover:bg-primary/30 text-slate-900 dark:text-slate-100 rounded-full font-medium whitespace-nowrap transition-colors"
      >
        Horror
      </button>
      <button
        class="px-6 py-2 bg-primary/10 dark:bg-primary/20 hover:bg-primary/30 text-slate-900 dark:text-slate-100 rounded-full font-medium whitespace-nowrap transition-colors"
      >
        Animation
      </button>
      <button
        class="px-6 py-2 bg-primary/10 dark:bg-primary/20 hover:bg-primary/30 text-slate-900 dark:text-slate-100 rounded-full font-medium whitespace-nowrap transition-colors"
      >
        Documentary
      </button>
    </div>
    <!-- Movie Grid -->
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      <div
        v-for="movie in movies"
        :key="movie.id"
        @click="$router.push('/theaters')"
        class="group flex flex-col gap-3 cursor-pointer"
      >
        <div
          class="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg transition-transform group-hover:scale-[1.02]"
        >
          <img
            class="w-full h-full object-cover"
            :data-alt="`${movie.title} poster visual`"
            :src="movie.imageUrl"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
          >
            <button
              class="w-full py-2 bg-primary text-white font-bold rounded shadow-xl"
            >
              Quick Book
            </button>
          </div>
          <div
            class="absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] font-bold text-white flex items-center gap-1"
          >
            <span class="material-icons text-[10px] text-yellow-400">star</span>
            {{ movie.rating.toFixed(1) }}
          </div>
        </div>
        <div>
          <h3
            class="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-1"
          >
            {{ movie.title }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            {{ movie.genre }}
          </p>
        </div>
      </div>
    </div>
    <!-- Load More Section -->
    <div class="flex justify-center mt-12 mb-16">
      <button
        class="px-10 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-lg transition-all duration-300"
      >
        LOAD MORE MOVIES
      </button>
    </div>
  </main>
  <!-- Simple Mobile Navigation (Bottom) -->
  <div
    class="md:hidden fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-primary/10 px-6 py-3 flex justify-between items-center z-50"
  >
    <button class="flex flex-col items-center text-primary">
      <span class="material-icons">home</span>
      <span class="text-[10px] font-bold">Home</span>
    </button>
    <button class="flex flex-col items-center text-slate-400">
      <span class="material-icons">explore</span>
      <span class="text-[10px] font-bold">Discover</span>
    </button>
    <button
      @click="$router.push('/tickets')"
      class="flex flex-col items-center text-slate-400"
    >
      <span class="material-icons">confirmation_number</span>
      <span class="text-[10px] font-bold">Tickets</span>
    </button>
    <button class="flex flex-col items-center text-slate-400">
      <span class="material-icons">person</span>
      <span class="text-[10px] font-bold">Profile</span>
    </button>
  </div>
  <!-- Footer -->
  <AppFooter />
  <TrailerModal
    :trailer-url="featuredMovie.trailerUrl"
    :is-open="isTrailerOpen"
    @close="isTrailerOpen = false"
  />
</template>
