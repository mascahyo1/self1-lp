import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

interface UseCountUpOptions {
  /** Nilai akhir yang dituju, contoh 20 atau 6 */
  end: number
  /** Durasi animasi dalam ms, default 1500 */
  duration?: number
  /** Jumlah angka di belakang koma, default 0 */
  decimals?: number
  /** Threshold IntersectionObserver, default 0.4 */
  threshold?: number
  /** Easing function, default easeOutCubic */
  easing?: (t: number) => number
}

interface UseCountUpReturn {
  target: Ref<HTMLElement | null>
  value: Ref<number>
  /** Nilai terformat dengan prefix/suffix opsional */
  formatted: Ref<string>
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

/**
 * Composable untuk animasi count-up (angka ngitung dari 0 ke `end`).
 * Trigger saat element masuk viewport. Pakai requestAnimationFrame.
 *
 * @example
 * ```vue
 * <script setup>
 * const { target, formatted } = useCountUp({ end: 20, duration: 1800 })
 * </script>
 * <template>
 *   <span ref="target">{{ formatted }}+</span>
 * </template>
 * ```
 */
export function useCountUp(options: UseCountUpOptions): UseCountUpReturn {
  const {
    end,
    duration = 1500,
    decimals = 0,
    threshold = 0.4,
    easing = easeOutCubic,
  } = options

  const target = ref<HTMLElement | null>(null)
  const value = ref(0)
  const formatted = ref('0')

  let observer: IntersectionObserver | null = null
  let rafId: number | null = null
  let started = false

  function formatNum(n: number): string {
    return n.toFixed(decimals)
  }

  function start() {
    if (started) return
    started = true

    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(1, elapsed / duration)
      const eased = easing(t)
      value.value = eased * end
      formatted.value = formatNum(value.value)
      if (t < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        value.value = end
        formatted.value = formatNum(end)
        rafId = null
      }
    }
    rafId = requestAnimationFrame(tick)
  }

  onMounted(() => {
    if (!target.value) return

    // Respect reduced motion → langsung set ke end value
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      value.value = end
      formatted.value = formatNum(end)
      return
    }

    if (!('IntersectionObserver' in window)) {
      start()
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start()
            observer?.disconnect()
            observer = null
          }
        })
      },
      { threshold }
    )

    observer.observe(target.value)
  })

  onBeforeUnmount(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return { target, value, formatted }
}

export { easeOutCubic, easeOutQuart }
