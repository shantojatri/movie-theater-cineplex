<script setup>
import { useResponsive } from '../composables/useResponsive'
import TheaterSelectionMobile from './TheaterSelectionMobile.vue'
import TheaterSelectionDesktop from './TheaterSelectionDesktop.vue'

const { isMobile } = useResponsive()
</script>

<template>
  <TheaterSelectionMobile v-if="isMobile" />
  <TheaterSelectionDesktop v-else />
</template>
