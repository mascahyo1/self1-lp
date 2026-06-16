import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

interface UseRevealOptions {
  /** Threshold IntersectionObserver, default 0.15 */
  threshold?: number
  /** Root margin, default "0px 0px -50px 0px" (trigger sedikit sebelum element masuk viewport) */
  rootMargin?: string
  /** Hanya animate sekali, default true */
  once?: boolean
}

interface UseRevealReturn {
  target: Ref<HTMLElement | null>
  isVisible: Ref<boolean>
}

/**
 * Composable untuk trigger animasi saat element masuk viewport.
 * Pakai IntersectionObserver dari @vueuse/core.
 *
 * @example
 * ```vue
 * <script setup>
 * const { target, isVisible } = useReveal()
 * </script>
 * <template>
 *   <div ref="target" :class="['reveal', 'reveal-up', isVisible && 'is-visible']">
 *     Konten
 *   </div>
 * </template>
 * ```
 */
export function useReveal(options: UseRevealOptions = {}): UseRevealReturn {
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px', once = true } = options

  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return

    // Fallback: kalau browser nggak support IntersectionObserver, tampilkan langsung
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            if (once && observer) {
              observer.disconnect()
              observer = null
            }
          } else if (!once) {
            isVisible.value = false
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(target.value)
  })

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return { target, isVisible }
}
