import { ref, onMounted, onUnmounted } from 'vue'

export function useResponsive() {
  const isMobile = ref(false)
  const mobileBreakpoint = 768

  const checkIsMobile = () => {
    isMobile.value = window.innerWidth < mobileBreakpoint
  }

  onMounted(() => {
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkIsMobile)
  })

  return { isMobile }
}
