<script setup>
import { ref } from "vue";

const isProfileOpen = ref(false);
const isNotificationsOpen = ref(false);

const toggleProfile = () => {
  isProfileOpen.value = !isProfileOpen.value;
  isNotificationsOpen.value = false;
};

const toggleNotifications = () => {
  isNotificationsOpen.value = !isNotificationsOpen.value;
  isProfileOpen.value = false;
};

// Close dropdowns when clicking outside could be added as a directive,
// but for simplicity, we'll just handle them via toggle.
</script>

<template>
  <header
    class="flex flex-wrap md:flex-nowrap items-center justify-between border-b border-primary/20 px-6 py-4 lg:px-20 bg-background-light dark:bg-background-dark relative z-50"
  >
    <!-- Brand & Nav -->
    <div class="flex items-center gap-8 lg:gap-12">
      <router-link
        to="/"
        class="flex items-center gap-2 lg:gap-3 text-primary shrink-0 hover:opacity-90 transition-opacity"
      >
        <span class="material-symbols-outlined text-3xl lg:text-4xl"
          >movie_filter</span
        >
        <h2
          class="text-slate-900 dark:text-slate-100 text-xl lg:text-2xl font-bold leading-tight tracking-tight"
        >
          Shanto<span class="text-primary">Plex</span>
        </h2>
      </router-link>
      <nav class="hidden md:flex items-center gap-6 lg:gap-8">
        <router-link
          class="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors"
          to="/all-movies"
          >Movies</router-link
        >
        <router-link
          class="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors"
          to="/theaters"
          >Theaters</router-link
        >
        <router-link
          class="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors"
          to="/tickets"
          >Tickets</router-link
        >
      </nav>
    </div>

    <!-- Search & Actions -->
    <div class="flex items-center justify-end gap-3 lg:gap-6 flex-1 ml-4">
      <label
        class="hidden sm:flex flex-col min-w-40 h-10 max-w-xs relative group flex-1"
      >
        <div
          class="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden bg-primary/10 border border-primary/20 focus-within:border-primary transition-all"
        >
          <div class="text-primary flex items-center justify-center pl-3">
            <span class="material-symbols-outlined text-xl">search</span>
          </div>
          <input
            class="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 text-sm font-medium focus:outline-none px-3"
            placeholder="Search movies, actors..."
            value=""
          />
        </div>
      </label>

      <!-- Notifications -->
      <div class="relative">
        <button
          @click="toggleNotifications"
          :class="[
            'flex items-center justify-center rounded-lg h-10 w-10 transition-all shadow-sm',
            isNotificationsOpen
              ? 'bg-primary text-white'
              : 'bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary',
          ]"
        >
          <span class="material-symbols-outlined">notifications</span>
          <span
            class="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-background-dark"
          ></span>
        </button>

        <!-- Notifications Dropdown -->
        <div
          v-if="isNotificationsOpen"
          class="absolute right-0 mt-2 w-80 bg-white dark:bg-background-dark rounded-xl shadow-2xl border border-primary/10 overflow-hidden z-50 transform origin-top-right transition-all"
        >
          <div
            class="p-4 border-b border-primary/10 flex justify-between items-center bg-primary/5"
          >
            <h3 class="font-bold text-slate-900 dark:text-slate-100">
              Notifications
            </h3>
            <span
              class="text-xs text-primary font-bold cursor-pointer hover:underline"
              >Mark all read</span
            >
          </div>
          <div class="max-h-80 overflow-y-auto">
            <div
              class="p-4 border-b border-primary/5 hover:bg-primary/5 transition-colors cursor-pointer flex gap-3"
            >
              <div
                class="bg-primary/10 text-primary p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0"
              >
                <span class="material-symbols-outlined text-sm"
                  >confirmation_number</span
                >
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Booking Confirmed
                </p>
                <p class="text-xs text-slate-500 mt-1">
                  Your tickets for Interstellar (IMAX) are confirmed for May 24.
                </p>
                <p class="text-[10px] text-slate-400 mt-2">2 hours ago</p>
              </div>
            </div>
            <div
              class="p-4 border-b border-primary/5 hover:bg-primary/5 transition-colors cursor-pointer flex gap-3"
            >
              <div
                class="bg-amber-500/10 text-amber-500 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0"
              >
                <span class="material-symbols-outlined text-sm"
                  >local_activity</span
                >
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Special Offer
                </p>
                <p class="text-xs text-slate-500 mt-1">
                  Get 20% off popcorn combos this weekend at AMC Metreon!
                </p>
                <p class="text-[10px] text-slate-400 mt-2">1 day ago</p>
              </div>
            </div>
          </div>
          <div
            class="p-3 text-center bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors text-sm font-bold text-primary"
          >
            View All Notifications
          </div>
        </div>
      </div>

      <!-- Profile -->
      <div class="relative">
        <button
          @click="toggleProfile"
          :class="[
            'bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 transition-all shadow-sm',
            isProfileOpen
              ? 'border-primary ring-2 ring-primary/30'
              : 'border-primary/30 hover:border-primary',
          ]"
          data-alt="User profile avatar"
          style="
            background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuBez4E6SE2nRityxgu796vG6GdBP7ZSUTAfDNflJ1u2uy6xQCDdxQfG0icVsJjQVGCbIx-utWXaRR6XdeOLrHEtMOUVan_Xrke0dZS8ZXtW1-Xl0sUCy4ihOohjV96TX5WmXD1nGU68CS41AJ7TVOuBeajIBO9eb6SMi_Y_unFayfYIjZEdCBWHB9BOpc7LrbDb0zZQLPkUBzlaC1qd8LpSHRwaNnTkbyAdh8Q6kM_bLd-YS_0BGMxrnLZ9WP_N9MPgq9ZzxS9-JKno&quot;);
          "
        ></button>

        <!-- Profile Dropdown -->
        <div
          v-if="isProfileOpen"
          class="absolute right-0 mt-2 w-64 bg-white dark:bg-background-dark rounded-xl shadow-2xl border border-primary/10 overflow-hidden z-50 transform origin-top-right transition-all"
        >
          <div
            class="p-4 border-b border-primary/10 flex items-center gap-3 bg-primary/5"
          >
            <div
              class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-primary shrink-0"
              style="
                background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuBez4E6SE2nRityxgu796vG6GdBP7ZSUTAfDNflJ1u2uy6xQCDdxQfG0icVsJjQVGCbIx-utWXaRR6XdeOLrHEtMOUVan_Xrke0dZS8ZXtW1-Xl0sUCy4ihOohjV96TX5WmXD1nGU68CS41AJ7TVOuBeajIBO9eb6SMi_Y_unFayfYIjZEdCBWHB9BOpc7LrbDb0zZQLPkUBzlaC1qd8LpSHRwaNnTkbyAdh8Q6kM_bLd-YS_0BGMxrnLZ9WP_N9MPgq9ZzxS9-JKno&quot;);
              "
            ></div>
            <div>
              <p class="font-bold text-slate-900 dark:text-slate-100">
                Alex Moviegoer
              </p>
              <p class="text-xs text-slate-500">alex@example.com</p>
            </div>
          </div>
          <div class="py-2">
            <a
              href="#"
              class="flex items-center gap-3 px-4 py-2 hover:bg-primary/5 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <span class="material-symbols-outlined text-slate-400"
                >confirmation_number</span
              >
              <span class="text-sm font-medium">My Tickets</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-3 px-4 py-2 hover:bg-primary/5 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <span class="material-symbols-outlined text-slate-400"
                >favorite</span
              >
              <span class="text-sm font-medium">Watchlist</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-3 px-4 py-2 hover:bg-primary/5 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <span class="material-symbols-outlined text-slate-400"
                >settings</span
              >
              <span class="text-sm font-medium">Settings</span>
            </a>
          </div>
          <div
            class="border-t border-primary/10 py-2 bg-slate-50 dark:bg-black/20"
          >
            <a
              href="#"
              class="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 dark:text-red-400 dark:hover:bg-red-900/10 transition-colors"
            >
              <span class="material-symbols-outlined">logout</span>
              <span class="text-sm font-medium">Sign Out</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
