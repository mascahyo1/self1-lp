<template>
  <div>
    <PageHeader
      icon="fa-solid fa-folder-open"
      tag="Karya-karya saya"
      title="Portfolio"
      subtitle="Kumpulan proyek yang telah saya kerjakan — dari web app, mobile, hingga dashboard"
    />

    <section class="py-16">
      <div class="section-container">
        <!-- Filter -->
        <div class="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            @click="activeFilter = ''"
            :class="activeFilter === '' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'"
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:border-primary-300"
          >
            Semua ({{ portfolio.length }})
          </button>
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeFilter = cat"
            :class="activeFilter === cat ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'"
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:border-primary-300"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TransitionGroup name="list">
            <div
              v-for="project in filteredPortfolio"
              :key="project.id"
              class="card group overflow-hidden p-0"
            >
              <!-- Image -->
              <div class="h-48 bg-gradient-to-br from-primary-400 to-indigo-600 relative overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center text-white">
                  <fa icon="fa-solid fa-globe" class="text-6xl opacity-20" />
                </div>
                <!-- Year Badge -->
                <div class="absolute top-3 left-3">
                  <span class="badge bg-white/20 backdrop-blur-sm text-white text-xs">{{ project.year }}</span>
                </div>
                <!-- Featured Badge -->
                <div v-if="project.featured" class="absolute top-3 right-3">
                  <span class="badge bg-yellow-400 text-yellow-900 text-xs">
                    <fa icon="fa-solid fa-star" class="mr-1" />
                    Featured
                  </span>
                </div>
                <!-- Overlay on hover -->
                <div class="absolute inset-0 bg-primary-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    v-if="project.url_live"
                    :href="project.url_live"
                    target="_blank"
                    class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors"
                  >
                    <fa icon="fa-solid fa-external-link" />
                  </a>
                  <a
                    v-if="project.url_github"
                    :href="project.url_github"
                    target="_blank"
                    class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    <fa icon="fa-brands fa-github" />
                  </a>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="font-semibold text-gray-900 dark:text-white">{{ project.title }}</h3>
                  <span class="badge bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-xs flex-shrink-0 ml-2">
                    {{ project.category }}
                  </span>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{{ project.description }}</p>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in project.tags"
                    :key="tag"
                    class="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs"
                  >{{ tag }}</span>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <div v-if="filteredPortfolio.length === 0" class="text-center py-20 text-gray-400">
          <fa icon="fa-solid fa-folder-open" class="text-4xl mb-4 block" />
          Tidak ada proyek untuk kategori ini
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()
const portfolio = usePortfolio()

const activeFilter = ref('')

const categories = computed(() => {
  const cats = new Set<string>()
  portfolio.forEach((p: any) => cats.add(p.category))
  return Array.from(cats)
})

const filteredPortfolio = computed(() =>
  activeFilter.value
    ? portfolio.filter((p: any) => p.category === activeFilter.value)
    : portfolio
)

useSeoMeta({
  title: `Portfolio - ${profile.name}`,
  description: 'Proyek-proyek web app, mobile app, dan dashboard yang telah saya kerjakan.',
})
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.list-leave-active {
  position: absolute;
}
</style>
