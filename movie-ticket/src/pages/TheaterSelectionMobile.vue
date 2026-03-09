<script setup>
import { ref } from 'vue'

const dates = [
  { dayName: 'Today', day: '12' },
  { dayName: 'Mon', day: '13' },
  { dayName: 'Tue', day: '14' },
  { dayName: 'Wed', day: '15' },
  { dayName: 'Thu', day: '16' }
]
const activeDate = ref(0)
const formats = ['All Formats', 'IMAX', 'Standard']
const activeFormat = ref('All Formats')
</script>

<template>
<!-- Header -->
<header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
<div class="flex items-center p-4 justify-between max-w-2xl mx-auto w-full">
<button class="text-slate-900 dark:text-slate-100 flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
<span class="material-symbols-outlined">arrow_back</span>
</button>
<h2 class="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Select Theater</h2>
<div class="flex w-10 items-center justify-end">
<button class="text-slate-900 dark:text-slate-100 flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
<span class="material-symbols-outlined">share</span>
</button>
</div>
</div>
</header>
<main class="flex-1 max-w-2xl mx-auto w-full">
<!-- Movie Brief -->
<div class="p-4 @container">
<div class="flex w-full flex-col gap-6 @[520px]:flex-row">
<div class="bg-center bg-no-repeat aspect-[2/3] bg-cover rounded-xl shadow-2xl shadow-primary/20 w-32 shrink-0 border border-primary/20" data-alt="Cinematic space nebula movie poster background" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuApN21wN9pTRkD2ILXFvC5OccbY1jEBsDH6L03XhnE8UseGkb3Yr7sLEdWOYR6_oent0QpVWsfXfXdOYHXorWTgcFFMnleVALVMOjHYLvrBXd0sFGqDG8-YWlii5r5crvmmrF1oPx3i04Os3mJrNqyoQ90ixcimMQUuMP1TZq51PcJN74NqpwN1yaiQusTzFNdLhlxJ6q598itwQCmAqi_PRQi7gaHqmJytORJrdNijOqTlTnJ_f6pf9NKqP4ua2-U1Bl6CLTj193ha");'></div>
<div class="flex flex-col justify-center">
<div class="flex items-center gap-2 mb-1">
<span class="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">PG-13</span>
<span class="text-primary text-sm font-medium">94% Tomatometer</span>
</div>
<h1 class="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight tracking-tight">Interstellar</h1>
<p class="text-slate-600 dark:text-primary/70 text-base font-normal mt-1">Sci-Fi/Adventure • 2h 49m</p>
<div class="flex gap-4 mt-3">
<div class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
<span class="material-symbols-outlined text-sm">calendar_today</span>
<span class="text-xs">Nov 7, 2014</span>
</div>
<div class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
<span class="material-symbols-outlined text-sm">language</span>
<span class="text-xs">English, IMAX</span>
</div>
</div>
</div>
</div>
</div>
<!-- Date Selector -->
<div class="mt-4 sticky top-[73px] bg-background-light dark:bg-background-dark z-40">
<div class="flex border-b border-primary/10 px-4 gap-6 overflow-x-auto no-scrollbar">
<button 
  v-for="(date, index) in dates" 
  :key="index"
  @click="activeDate = index"
  :class="[
    'flex flex-col items-center justify-center border-b-2 pb-3 pt-4 shrink-0 px-2 transition-colors',
    activeDate === index 
      ? 'border-primary text-primary' 
      : 'border-transparent text-slate-500 dark:text-primary/40 hover:text-primary'
  ]"
>
<p class="text-xs font-medium uppercase tracking-wider">{{ date.dayName }}</p>
<p class="text-lg font-bold">{{ date.day }}</p>
</button>
</div>
</div>
<!-- Theaters List -->
<div class="p-4 space-y-6 pb-24">
<div class="flex items-center justify-between">
<h3 class="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight">Theaters Near You</h3>
<button class="text-primary text-sm font-bold flex items-center gap-1">
<span class="material-symbols-outlined text-sm">filter_list</span>
                    Filter
                </button>
</div>
<!-- Theater Card 1 -->
<div class="bg-white dark:bg-primary/5 rounded-xl border border-primary/10 overflow-hidden">
<div class="p-4 border-b border-primary/5">
<div class="flex justify-between items-start">
<div>
<h4 class="text-slate-900 dark:text-slate-100 font-bold text-lg">AMC Empire 25</h4>
<p class="text-slate-500 dark:text-primary/60 text-sm">234 W 42nd St, New York</p>
</div>
<div class="text-right">
<span class="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">0.8 miles</span>
</div>
</div>
</div>
<div class="p-4 space-y-4">
<!-- Format: IMAX -->
<div>
<span class="text-[10px] font-black tracking-widest text-slate-400 dark:text-primary/40 uppercase mb-2 block">IMAX WITH LASER</span>
<div class="flex flex-wrap gap-2">
<button 
  v-for="time in ['1:30 PM', '4:45 PM', '8:00 PM']" 
  :key="time"
  :class="[
    'px-4 py-2 rounded-lg font-bold text-sm transition-colors',
    activeFormat === 'IMAX' || activeFormat === 'All Formats'
      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
      : 'border border-primary/30 text-slate-900 dark:text-slate-100 hover:bg-primary/10'
  ]"
>
  {{ time }}
</button>
</div>
</div>
<!-- Format: Standard -->
<div>
<span class="text-[10px] font-black tracking-widest text-slate-400 dark:text-primary/40 uppercase mb-2 block">STANDARD 2D</span>
<div class="flex flex-wrap gap-2">
<button 
  v-for="time in ['11:00 AM', '2:15 PM', '5:30 PM', '9:00 PM']" 
  :key="time"
  :class="[
    'px-4 py-2 rounded-lg font-bold text-sm transition-colors',
    activeFormat === 'Standard' || activeFormat === 'All Formats'
      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
      : 'border border-primary/30 text-slate-900 dark:text-slate-100 hover:bg-primary/10'
  ]"
>
  {{ time }}
</button>
</div>
</div>
</div>
</div>
<!-- Theater Card 2 -->
<div class="bg-white dark:bg-primary/5 rounded-xl border border-primary/10 overflow-hidden">
<div class="p-4 border-b border-primary/5">
<div class="flex justify-between items-start">
<div>
<h4 class="text-slate-900 dark:text-slate-100 font-bold text-lg">Regal Union Square</h4>
<p class="text-slate-500 dark:text-primary/60 text-sm">850 Broadway, New York</p>
</div>
<div class="text-right">
<span class="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">1.2 miles</span>
</div>
</div>
</div>
<div class="p-4 space-y-4">
<!-- Format: 4DX -->
<div>
<div class="flex items-center gap-2 mb-2">
<span class="text-[10px] font-black tracking-widest text-slate-400 dark:text-primary/40 uppercase">4DX</span>
<span class="material-symbols-outlined text-primary text-xs">motion_sensor_active</span>
</div>
<div class="flex flex-wrap gap-2">
<button @click="$router.push('/tickets')" class="px-4 py-2 rounded-lg border border-primary/30 text-slate-900 dark:text-slate-100 font-bold text-sm hover:bg-primary/10 transition-colors">3:00 PM</button>
<button @click="$router.push('/tickets')" class="px-4 py-2 rounded-lg border border-primary/30 text-slate-900 dark:text-slate-100 font-bold text-sm hover:bg-primary/10 transition-colors">6:30 PM</button>
</div>
</div>
<!-- Format: Standard -->
<div>
<span class="text-[10px] font-black tracking-widest text-slate-400 dark:text-primary/40 uppercase mb-2 block">STANDARD 2D</span>
<div class="flex flex-wrap gap-2">
<button @click="$router.push('/tickets')" class="px-4 py-2 rounded-lg border border-primary/30 text-slate-900 dark:text-slate-100 font-bold text-sm hover:bg-primary/10 transition-colors">12:45 PM</button>
<button @click="$router.push('/tickets')" class="px-4 py-2 rounded-lg border border-primary/30 text-slate-900 dark:text-slate-100 font-bold text-sm hover:bg-primary/10 transition-colors">4:00 PM</button>
</div>
</div>
</div>
</div>
<!-- Map View Toggle -->
<div class="fixed bottom-24 left-1/2 -translate-x-1/2">
<button class="bg-primary text-white px-6 py-3 rounded-full font-bold shadow-xl shadow-primary/40 flex items-center gap-2">
<span class="material-symbols-outlined">map</span>
                    View Map
                </button>
</div>
</div>
</main>
<!-- Navigation -->
<nav class="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-primary/10 z-50">
<div class="flex max-w-2xl mx-auto items-center px-4 pb-6 pt-3">
<a class="flex flex-1 flex-col items-center gap-1 text-slate-400 dark:text-primary/40" href="#">
<span class="material-symbols-outlined">movie</span>
<p class="text-[10px] font-bold uppercase tracking-wider">Movies</p>
</a>
<a class="flex flex-1 flex-col items-center gap-1 text-primary" href="#">
<span class="material-symbols-outlined font-fill">theater_comedy</span>
<p class="text-[10px] font-bold uppercase tracking-wider">Theaters</p>
</a>
<a class="flex flex-1 flex-col items-center gap-1 text-slate-400 dark:text-primary/40" href="#">
<span class="material-symbols-outlined">confirmation_number</span>
<p class="text-[10px] font-bold uppercase tracking-wider">Tickets</p>
</a>
<a class="flex flex-1 flex-col items-center gap-1 text-slate-400 dark:text-primary/40" href="#">
<span class="material-symbols-outlined">person</span>
<p class="text-[10px] font-bold uppercase tracking-wider">Profile</p>
</a>
</div>
</nav>
</template>