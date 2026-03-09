<script setup>
import { useResponsive } from '../composables/useResponsive'
import MovieDiscoveryMobile from './MovieDiscoveryMobile.vue'
import MovieDiscoveryDesktop from './MovieDiscoveryDesktop.vue'

const { isMobile } = useResponsive()
</script>

<template>
  <MovieDiscoveryMobile v-if="isMobile" />
  <MovieDiscoveryDesktop v-else />
</template>
