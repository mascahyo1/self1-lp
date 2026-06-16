import type { Directive, DirectiveBinding } from 'vue'

interface RevealState {
  observer?: IntersectionObserver
}

interface RevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

const STATE_KEY = '_revealState' as const

const VALID_DIRECTIONS = ['up', 'down', 'left', 'right', 'zoom', 'fade'] as const
type Direction = (typeof VALID_DIRECTIONS)[number]

const VALID_DELAYS = [0, 100, 200, 300, 500, 700] as const

function applyRevealClasses(el: HTMLElement, direction: Direction, delay: number) {
  el.classList.add('reveal')
  if (direction && direction !== 'fade') {
    el.classList.add(`reveal-${direction}`)
  }
  if (delay > 0) {
    el.classList.add(`reveal-delay-${delay}`)
  }
}

function createObserver(el: HTMLElement, binding: DirectiveBinding): IntersectionObserver | null {
  // Respect prefers-reduced-motion
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.classList.add('is-visible')
    return null
  }

  if (!('IntersectionObserver' in window)) {
    el.classList.add('is-visible')
    return null
  }

  const value = (binding.value || {}) as RevealOptions
  const threshold = value.threshold !== undefined ? value.threshold : 0.15
  const rootMargin = value.rootMargin !== undefined ? value.rootMargin : '0px 0px -50px 0px'
  const once = value.once !== undefined ? value.once : true

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          if (once) {
            observer.disconnect()
            const state = (el as any)[STATE_KEY] as RevealState | undefined
            if (state) state.observer = undefined
          }
        } else if (!once) {
          el.classList.remove('is-visible')
        }
      })
    },
    { threshold, rootMargin }
  )

  observer.observe(el)
  return observer
}

function resolveModifiers(modifiers: Record<string, true> | undefined): { direction: Direction; delay: number } {
  let direction: Direction = 'up'
  let delay = 0

  if (!modifiers) return { direction, delay }

  for (const mod of Object.keys(modifiers)) {
    if ((VALID_DIRECTIONS as readonly string[]).includes(mod)) {
      direction = mod as Direction
    } else if (mod.startsWith('delay-')) {
      const parsed = Number(mod.replace('delay-', ''))
      if ((VALID_DELAYS as readonly number[]).includes(parsed)) {
        delay = parsed
      }
    }
  }

  return { direction, delay }
}

/**
 * v-reveal directive — scroll-triggered reveal animation.
 *
 * Modifiers:
 *   direction: up | down | left | right | zoom | fade (default: up)
 *   delay: 0 | 100 | 200 | 300 | 500 | 700 (ms)
 *
 * Optional binding value (object):
 *   { threshold?: number, rootMargin?: string, once?: boolean }
 *
 * @example
 *   <div v-reveal>              <!-- fade up -->
 *   <div v-reveal.zoom>         <!-- zoom in -->
 *   <div v-reveal.left.delay-200>
 *   <div v-reveal="{ threshold: 0.3, once: false }">
 */
const vReveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el, binding) {
    const { direction, delay } = resolveModifiers(binding.modifiers)
    applyRevealClasses(el, direction, delay)
    const observer = createObserver(el, binding)
    ;(el as any)[STATE_KEY] = { observer }
  },

  unmounted(el) {
    const state = (el as any)[STATE_KEY] as RevealState | undefined
    if (state?.observer) {
      state.observer.disconnect()
    }
    delete (el as any)[STATE_KEY]
  },
}

export default vReveal
