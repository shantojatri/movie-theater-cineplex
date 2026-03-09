<script setup>
// No props needed; static footer content
</script>

<template>
  <footer class="px-6 lg:px-20 py-10 border-t border-primary/10 bg-primary/5">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1 flex flex-col gap-4">
          <div class="flex items-center gap-3 text-primary">
            <span class="material-symbols-outlined text-3xl">movie_filter</span>
            <span
              class="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight"
              >Cine<span class="text-primary">Plex</span></span
            >
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Your ultimate destination for booking movie tickets across top
            theaters near you.
          </p>
          <div class="flex gap-3 mt-1">
            <a
              href="#"
              class="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all"
              aria-label="Twitter"
            >
              <span class="material-symbols-outlined text-base">close</span>
            </a>
            <a
              href="#"
              class="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all"
              aria-label="Instagram"
            >
              <span class="material-symbols-outlined text-base"
                >photo_camera</span
              >
            </a>
            <a
              href="#"
              class="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all"
              aria-label="Facebook"
            >
              <span class="material-symbols-outlined text-base">group</span>
            </a>
          </div>
        </div>
        <!-- Quick Links -->
        <div class="flex flex-col gap-3">
          <h4
            class="text-slate-900 dark:text-slate-100 font-bold text-sm uppercase tracking-widest mb-1"
          >
            Explore
          </h4>
          <a
            class="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm"
            href="#"
            >Now Playing</a
          >
          <a
            class="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm"
            href="#"
            >Coming Soon</a
          >
          <a
            class="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm"
            href="#"
            >Find Theaters</a
          >
          <a
            class="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm"
            href="#"
            >Gift Cards</a
          >
        </div>
        <!-- Support -->
        <div class="flex flex-col gap-3">
          <h4
            class="text-slate-900 dark:text-slate-100 font-bold text-sm uppercase tracking-widest mb-1"
          >
            Support
          </h4>
          <a
            class="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm"
            href="#"
            >Help Center</a
          >
          <a
            class="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm"
            href="#"
            >Accessibility</a
          >
          <a
            class="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm"
            href="#"
            >Mobile App</a
          >
          <a
            class="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm"
            href="#"
            >Contact Us</a
          >
        </div>
        <!-- Newsletter -->
        <div class="col-span-2 md:col-span-1 flex flex-col gap-3">
          <h4
            class="text-slate-900 dark:text-slate-100 font-bold text-sm uppercase tracking-widest mb-1"
          >
            Newsletter
          </h4>
          <p class="text-slate-500 dark:text-slate-400 text-sm">
            Get exclusive deals and new release alerts directly to your inbox.
          </p>
          <div class="flex items-stretch h-10 mt-1">
            <input
              class="bg-primary/10 border-none rounded-l-lg text-sm px-4 focus:ring-2 focus:ring-primary w-full outline-none"
              placeholder="Email address"
              type="email"
            />
            <button
              class="bg-primary text-white px-4 rounded-r-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
            >
              <span class="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      </div>
      <div
        class="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400"
      >
        <p>© 2024 CineStream. All rights reserved.</p>
        <div class="flex gap-6">
          <a class="hover:text-primary transition-colors" href="#"
            >Privacy Policy</a
          >
          <a class="hover:text-primary transition-colors" href="#"
            >Terms of Service</a
          >
          <a class="hover:text-primary transition-colors" href="#"
            >Cookie Settings</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
