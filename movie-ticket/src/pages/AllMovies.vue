<script setup>
import { useResponsive } from '../composables/useResponsive'
import AllMoviesDesktop from './AllMoviesDesktop.vue'

const { isMobile } = useResponsive()
</script>

<template>
  <!-- Mobile will reuse AllMoviesDesktop for now; can be split later -->
  <AllMoviesDesktop />
</template>
