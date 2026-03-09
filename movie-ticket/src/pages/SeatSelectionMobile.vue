<template>
<!-- Top App Bar -->
<header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 py-4">
<div class="max-w-md mx-auto flex items-center justify-between">
<button class="flex items-center justify-center size-10 rounded-full hover:bg-primary/10 transition-colors">
<span class="material-symbols-outlined">arrow_back</span>
</button>
<div class="text-center">
<h1 class="text-lg font-bold leading-tight">Interstellar</h1>
<p class="text-xs text-slate-500 dark:text-slate-400">Dec 24, 8:30 PM • IMAX 2D</p>
</div>
<button class="flex items-center justify-center size-10 rounded-full hover:bg-primary/10 transition-colors">
<span class="material-symbols-outlined">share</span>
</button>
</div>
</header>
<main class="flex-1 w-full max-w-2xl mx-auto px-4 py-8">
<!-- Screen Visual -->
<div class="relative mb-16">
<div class="screen-curve bg-gradient-to-b from-primary/5 to-transparent"></div>
<p class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.3em] text-primary/60 uppercase">Screen This Way</p>
</div>
<!-- Seat Grid -->
<div class="seat-grid flex flex-col gap-4 mb-12">
<!-- Row A -->
<div class="flex justify-center gap-2">
<div class="w-6 text-[10px] flex items-center justify-center font-bold text-slate-400">A</div>
<div class="flex gap-2">
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">1</button>
<button class="size-8 rounded-lg bg-primary text-white border border-primary flex items-center justify-center text-[10px]">2</button>
<button class="size-8 rounded-lg bg-primary text-white border border-primary flex items-center justify-center text-[10px]">3</button>
<div class="w-4"></div> <!-- Aisle -->
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">4</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">5</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">6</button>
<div class="w-4"></div> <!-- Aisle -->
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">7</button>
<button class="size-8 rounded-lg bg-slate-300 dark:bg-slate-700/50 cursor-not-allowed opacity-50 flex items-center justify-center text-[10px]" disabled="">
<span class="material-symbols-outlined text-xs">close</span>
</button>
</div>
</div>
<!-- Row B -->
<div class="flex justify-center gap-2">
<div class="w-6 text-[10px] flex items-center justify-center font-bold text-slate-400">B</div>
<div class="flex gap-2">
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">1</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">2</button>
<button class="size-8 rounded-lg bg-slate-300 dark:bg-slate-700/50 cursor-not-allowed opacity-50 flex items-center justify-center text-[10px]" disabled="">
<span class="material-symbols-outlined text-xs">close</span>
</button>
<div class="w-4"></div>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">4</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">5</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">6</button>
<div class="w-4"></div>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">7</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">8</button>
</div>
</div>
<!-- Row C -->
<div class="flex justify-center gap-2">
<div class="w-6 text-[10px] flex items-center justify-center font-bold text-slate-400">C</div>
<div class="flex gap-2">
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">1</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">2</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">3</button>
<div class="w-4"></div>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">4</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">5</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">6</button>
<div class="w-4"></div>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">7</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] hover:border-primary">8</button>
</div>
</div>
<!-- Row D (VIP) -->
<div class="flex justify-center gap-2 mt-4">
<div class="w-6 text-[10px] flex items-center justify-center font-bold text-primary">VIP</div>
<div class="flex gap-2">
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-primary/40 flex items-center justify-center text-[10px] hover:bg-primary/10">1</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-primary/40 flex items-center justify-center text-[10px] hover:bg-primary/10">2</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-primary/40 flex items-center justify-center text-[10px] hover:bg-primary/10">3</button>
<div class="w-4"></div>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-primary/40 flex items-center justify-center text-[10px] hover:bg-primary/10">4</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-primary/40 flex items-center justify-center text-[10px] hover:bg-primary/10">5</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-primary/40 flex items-center justify-center text-[10px] hover:bg-primary/10">6</button>
<div class="w-4"></div>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-primary/40 flex items-center justify-center text-[10px] hover:bg-primary/10">7</button>
<button class="size-8 rounded-lg bg-slate-200 dark:bg-slate-800 border border-primary/40 flex items-center justify-center text-[10px] hover:bg-primary/10">8</button>
</div>
</div>
</div>
<!-- Legend -->
<div class="flex flex-wrap items-center justify-center gap-6 py-6 border-t border-primary/10">
<div class="flex items-center gap-2">
<div class="size-4 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"></div>
<span class="text-xs font-medium text-slate-500">Available</span>
</div>
<div class="flex items-center gap-2">
<div class="size-4 rounded bg-primary"></div>
<span class="text-xs font-medium text-slate-500">Selected</span>
</div>
<div class="flex items-center gap-2">
<div class="size-4 rounded bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
<span class="material-symbols-outlined text-[10px]">close</span>
</div>
<span class="text-xs font-medium text-slate-500">Sold Out</span>
</div>
</div>
<!-- Movie Details Card -->
<div class="bg-primary/5 rounded-xl p-4 flex gap-4 mt-4">
<div class="w-20 h-28 rounded-lg bg-center bg-cover shrink-0 overflow-hidden" data-alt="Interstellar movie poster silhouette" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAanP1v6WCPaDn5n0FAv1MOd6_yDtlFK_Rr1I7ul3HgViuvXy0-TbNgelwx-HqGb2xdCVAWsAkSIAlVP6i5nAu1djuLORLxQbalim0Db1j9nNaPUCl_cTuyLtMc4rTAY49ECPEJl_hGW4BXDQjpzpDJVOok8LxrybhDqu_AEWBybfMMYZzEufRDBUvuDXjdsgP1ViHWH3S9m534UdHxnI1B8p2pACz7MGlClEZwmf5fWC36J1osMZrrnePCcgvkvxvbNAIxcz4zubWk');"></div>
<div class="flex flex-col justify-center gap-1">
<h3 class="font-bold text-lg">Cineplex Odeon</h3>
<div class="flex items-center gap-2 text-sm text-slate-500">
<span class="material-symbols-outlined text-sm">location_on</span>
<span>Los Angeles, CA</span>
</div>
<div class="flex items-center gap-2 text-sm text-slate-500">
<span class="material-symbols-outlined text-sm">event</span>
<span>Dec 24, 2023 • 20:30</span>
</div>
</div>
</div>
</main>
<!-- Footer Action -->
<footer class="sticky bottom-0 bg-background-light dark:bg-background-dark border-t border-primary/10 p-4 pb-8">
<div class="max-w-md mx-auto flex items-center justify-between gap-6">
<div class="flex flex-col">
<span class="text-xs text-slate-500 font-medium">Seats: A2, A3</span>
<span class="text-2xl font-bold text-primary">$32.00</span>
</div>
<button class="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl transition-transform active:scale-95 flex items-center justify-center gap-2">
                Confirm Booking
                <span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</footer>
</template>