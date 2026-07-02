<script setup>
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
import AppFooter from "../components/AppFooter.vue";
import HeaderDesktop from "../components/AppHeader.vue";

const email = ref("");
const password = ref("");
const { login, isLoading, error } = useAuth();

const handleLogin = async () => {
  await login(email.value, password.value);
};
</script>

<template>
  <div class="relative flex min-h-screen w-full flex-col bg-slate-50 dark:bg-[#0a0f1c] overflow-x-hidden">
    <div class="layout-container flex h-full grow flex-col">
      <HeaderDesktop />
      <main class="flex-1 flex items-center justify-center p-6">
        <div class="w-full max-w-md bg-white dark:bg-[#131b2f] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
          <div class="flex flex-col items-center mb-8">
            <span class="material-symbols-outlined text-5xl text-primary mb-4">movie</span>
            <h1 class="text-2xl font-black text-slate-900 dark:text-white">Welcome Back</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">Sign in to book your next cinematic adventure</p>
          </div>

          <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
            <div v-if="error" class="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-sm font-medium">
              {{ error }}
            </div>
            
            <div class="flex flex-col gap-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="john@example.com"
                class="h-12 px-4 rounded-xl bg-slate-100 dark:bg-black/20 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-[#131b2f] text-slate-900 dark:text-white transition-all outline-none"
              />
            </div>
            
            <div class="flex flex-col gap-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
              <input
                v-model="password"
                type="password"
                required
                placeholder="••••••••"
                class="h-12 px-4 rounded-xl bg-slate-100 dark:bg-black/20 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-[#131b2f] text-slate-900 dark:text-white transition-all outline-none"
              />
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="h-12 mt-2 w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              <span v-if="isLoading" class="material-symbols-outlined animate-spin text-xl">progress_activity</span>
              <span>{{ isLoading ? 'Signing in...' : 'Sign In' }}</span>
            </button>
          </form>

          <p class="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mt-8">
            Don't have an account? 
            <router-link to="/register" class="text-primary hover:underline font-bold">Register here</router-link>
          </p>
        </div>
      </main>
      <AppFooter />
    </div>
  </div>
</template>
