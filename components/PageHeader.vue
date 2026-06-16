<template>
  <section class="relative pt-28 pb-12 bg-gradient-to-br from-primary-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
    <!-- Floating shapes (parallax) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div :style="headerBlob1.style" class="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-200/30 dark:bg-primary-900/20 blur-3xl animate-float" />
      <div :style="headerBlob2.style" class="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-indigo-200/30 dark:bg-indigo-900/20 blur-3xl animate-float-slow" />
      <div :style="headerBlob3.style" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-200/20 dark:bg-pink-900/10 blur-3xl animate-float" style="animation-delay: -3s" />
    </div>

    <div class="section-container text-center relative z-10">
      <!-- Breadcrumb -->
      <nav v-reveal.fade.delay-100 class="flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-4">
        <NuxtLink to="/" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5">
          <fa icon="fa-solid fa-house" class="text-[11px]" />
          <span>Beranda</span>
        </NuxtLink>
        <fa icon="fa-solid fa-chevron-right" class="text-[8px] opacity-50" />
        <span class="text-primary-600 dark:text-primary-400 font-medium">{{ title }}</span>
      </nav>

      <div v-reveal.up class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
        <fa :icon="icon" />
        {{ tag }}
      </div>
      <h1 v-reveal.up.delay-100 class="text-4xl font-bold text-gray-900 dark:text-white mb-3">{{ title }}</h1>
      <p v-reveal.up.delay-200 class="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{{ subtitle }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  tag: string
  title: string
  subtitle: string
}>()

// Floating shapes parallax (different speeds for depth)
const headerBlob1 = useScrollParallax({ speed: 0.15, max: 80 })
const headerBlob2 = useScrollParallax({ speed: 0.1, max: 60 })
const headerBlob3 = useScrollParallax({ speed: 0.2, max: 100 })
</script>
