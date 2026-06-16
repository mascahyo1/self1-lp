import vReveal from '~/directives/reveal'

/**
 * Register v-reveal directive globally (client-side only).
 *
 * Usage:
 *   <div v-reveal>                → fade in (up by default)
 *   <div v-reveal.zoom>           → zoom in
 *   <div v-reveal.left>           → slide from left
 *   <div v-reveal.up.delay-300>   → up direction with 300ms delay
 *
 * Modifiers:
 *   - direction: up | down | left | right | zoom | fade
 *   - delay: 0 | 100 | 200 | 300 | 500 | 700 (ms)
 *
 * Optional binding value (object):
 *   { threshold: 0.2, rootMargin: '0px', once: true }
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', vReveal)
})
