import { computed, type ComputedRef } from 'vue'
import { useMouse, useWindowScroll, usePreferredReducedMotion } from '@vueuse/core'

interface MouseParallaxOptions {
  /** Kekuatan 0-1, default 0.05. Lebih besar = lebih jauh bergerak. */
  strength?: number
  /** Batas pixel offset, default 30 */
  max?: number
  /** true = bergerak menjauh dari kursor, default false (mengikuti kursor) */
  invert?: boolean
}

interface MouseParallaxReturn {
  x: ComputedRef<number>
  y: ComputedRef<number>
  /** Style object siap pakai di :style, berisi transform: translate3d(...) */
  style: ComputedRef<{ transform: string }>
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}

/**
 * Parallax berdasarkan posisi kursor.
 * Element akan bergerak halus mengikuti kursor (atau menjauh jika invert).
 * Otomatis disable saat prefers-reduced-motion: reduce.
 *
 * @example
 * ```vue
 * <script setup>
 * const blob1 = useMouseParallax({ strength: 0.06, max: 40 })
 * </script>
 * <template>
 *   <div :style="blob1.style" class="absolute ..." />
 * </template>
 * ```
 */
export function useMouseParallax(options: MouseParallaxOptions = {}): MouseParallaxReturn {
  const { strength = 0.05, max = 30, invert = false } = options
  const reducedMotion = usePreferredReducedMotion()
  const { x: mouseX, y: mouseY } = useMouse()

  const dir = invert ? -1 : 1

  const x = computed(() => {
    if (reducedMotion.value === 'reduce') return 0
    const cx = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
    return clamp((mouseX.value - cx) * strength * dir, -max, max)
  })

  const y = computed(() => {
    if (reducedMotion.value === 'reduce') return 0
    const cy = typeof window !== 'undefined' ? window.innerHeight / 2 : 0
    return clamp((mouseY.value - cy) * strength * dir, -max, max)
  })

  const style = computed(() => ({
    transform: `translate3d(${x.value.toFixed(2)}px, ${y.value.toFixed(2)}px, 0)`,
  }))

  return { x, y, style }
}

interface ScrollParallaxOptions {
  /**
   * Kecepatan translasi relatif terhadap scroll.
   * - 0 = diam
   * - 0.3 = bergerak 30% dari kecepatan scroll (default, efek background)
   * - 1 = bergerak secepat scroll
   * - 1.2 = bergerak sedikit lebih cepat dari scroll
   */
  speed?: number
  /** Batas pixel translasi ke atas/bawah, default 200 */
  max?: number
}

interface ScrollParallaxReturn {
  y: ComputedRef<number>
  /** Style object siap pakai di :style, berisi transform: translate3d(0, y, 0) */
  style: ComputedRef<{ transform: string }>
}

/**
 * Parallax berdasarkan posisi scroll window.
 * Berguna untuk background blobs/shapes yang ingin bergerak lebih lambat dari konten.
 * Otomatis disable saat prefers-reduced-motion: reduce.
 *
 * @example
 * ```vue
 * <script setup>
 * const bg = useScrollParallax({ speed: 0.3 })
 * </script>
 * <template>
 *   <div :style="bg.style" class="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
 * </template>
 * ```
 */
export function useScrollParallax(options: ScrollParallaxOptions = {}): ScrollParallaxReturn {
  const { speed = 0.3, max = 200 } = options
  const reducedMotion = usePreferredReducedMotion()
  const { y: scrollY } = useWindowScroll()

  const y = computed(() => {
    if (reducedMotion.value === 'reduce') return 0
    return clamp(scrollY.value * speed, -max, max)
  })

  const style = computed(() => ({
    transform: `translate3d(0, ${y.value.toFixed(2)}px, 0)`,
  }))

  return { y, style }
}
