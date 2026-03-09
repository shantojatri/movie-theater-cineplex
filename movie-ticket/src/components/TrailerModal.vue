<script setup>
import { computed } from 'vue'

const props = defineProps({
  trailerUrl: {
    type: String,
    default: ''
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

// Convert YouTube watch URL to embed URL
const embedUrl = computed(() => {
  if (!props.trailerUrl) return ''
  let url = props.trailerUrl
  // Handle youtu.be shortlinks
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`
  // Handle youtube.com/watch?v=
  const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}?autoplay=1`
  return url
})

const close = () => emit('close')
</script>

<template>
  <!-- Backdrop -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="close"
      >
        <!-- Modal box -->
        <div class="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-black">
          <!-- Close button -->
          <button
            @click="close"
            class="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-primary transition-colors"
            aria-label="Close trailer"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
          <!-- YouTube embed -->
          <div class="relative w-full aspect-video">
            <iframe
              v-if="embedUrl"
              :src="embedUrl"
              class="absolute inset-0 w-full h-full"
              frameborder="0"
              allow="autoplay; encrypted-media; fullscreen"
              allowfullscreen
              title="Movie Trailer"
            ></iframe>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
