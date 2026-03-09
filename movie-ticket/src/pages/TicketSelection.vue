<script setup>
import { useResponsive } from '../composables/useResponsive'
import SeatSelectionMobile from './SeatSelectionMobile.vue'
import SeatSelectionDesktop from './SeatSelectionDesktop.vue'

const { isMobile } = useResponsive()
</script>

<template>
  <SeatSelectionMobile v-if="isMobile" />
  <SeatSelectionDesktop v-else />
</template>
