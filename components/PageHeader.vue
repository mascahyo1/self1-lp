<template>
  <section class="pt-28 pb-12 bg-gradient-to-br from-primary-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
    <div class="section-container text-center animate-fade-in">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
        <fa :icon="icon" />
        {{ tag }}
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-3">{{ title }}</h1>
      <p class="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{{ subtitle }}</p>
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
</script>
