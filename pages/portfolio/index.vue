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
        <!-- Search + Filter -->
        <div class="flex flex-col sm:flex-row gap-3 mb-8">
          <div class="flex-1">
            <SearchInput v-model="search" placeholder="Cari proyek, teknologi, kategori..." />
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              @click="activeFilter = ''"
              :class="activeFilter === '' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'"
              class="px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:border-primary-300 whitespace-nowrap"
            >
              Semua
            </button>
            <button
              v-for="cat in categories"
              :key="cat"
              @click="activeFilter = cat"
              :class="activeFilter === cat ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'"
              class="px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:border-primary-300 whitespace-nowrap"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Result count -->
        <p v-if="search" class="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Menampilkan <span class="font-semibold text-gray-900 dark:text-white">{{ filteredPortfolio.length }}</span>
          hasil untuk "<span class="text-primary-600 dark:text-primary-400">{{ search }}</span>"
        </p>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TransitionGroup name="list">
            <NuxtLink
              v-for="project in filteredPortfolio"
              :key="project.id"
              :to="`/portfolio/${project.slug}`"
              class="card overflow-hidden p-0 group block hover:-translate-y-1"
            >
              <!-- Image -->
              <div class="h-48 bg-gradient-to-br relative overflow-hidden flex items-center justify-center"
                :class="getGradient(project.id)"
              >
                <fa icon="fa-solid fa-globe" class="text-6xl text-white/15" />
                <div class="absolute top-3 left-3">
                  <span class="badge bg-white/20 backdrop-blur-sm text-white text-xs">{{ project.year }}</span>
                </div>
                <div v-if="project.featured" class="absolute top-3 right-3">
                  <span class="badge bg-yellow-400 text-yellow-900 text-xs">
                    <fa icon="fa-solid fa-star" class="mr-1" />Featured
                  </span>
                </div>
                <!-- Hover overlay -->
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span class="text-white text-sm font-medium flex items-center gap-2">
                    <fa icon="fa-solid fa-eye" />
                    Lihat Detail
                  </span>
                </div>
              </div>

              <!-- Content -->
              <div class="p-5">
                <div class="flex items-start justify-between gap-2 mb-2">
                  <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {{ project.title }}
                  </h3>
                  <span class="badge bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-xs flex-shrink-0">
                    {{ project.category }}
                  </span>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">
                  {{ project.description_short }}
                </p>
                <div class="flex flex-wrap gap-1.5 mb-3">
                  <span
                    v-for="tag in project.tags.slice(0, 3)"
                    :key="tag"
                    class="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs"
                  >{{ tag }}</span>
                  <span v-if="project.tags.length > 3" class="badge bg-gray-100 dark:bg-gray-800 text-gray-400 text-xs">
                    +{{ project.tags.length - 3 }}
                  </span>
                </div>
                <div class="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                  <span class="flex items-center gap-1"><fa icon="fa-solid fa-user" />{{ project.role }}</span>
                  <span class="flex items-center gap-1"><fa icon="fa-solid fa-clock" />{{ project.duration }}</span>
                </div>
              </div>
            </NuxtLink>
          </TransitionGroup>
        </div>

        <!-- Empty state -->
        <div v-if="filteredPortfolio.length === 0" class="text-center py-20">
          <fa icon="fa-solid fa-folder-open" class="text-5xl text-gray-300 dark:text-gray-700 mb-4 block" />
          <p class="text-gray-500 dark:text-gray-400 mb-2">Tidak ada proyek yang cocok</p>
          <button @click="search = ''; activeFilter = ''" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
            Reset pencarian
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()
const portfolio = usePortfolio()

const search = ref('')
const activeFilter = ref('')

const categories = computed(() => {
  const cats = new Set<string>()
  portfolio.forEach((p: any) => cats.add(p.category))
  return Array.from(cats)
})

const filteredPortfolio = computed(() => {
  let result = [...portfolio] as any[]
  if (activeFilter.value) result = result.filter(p => p.category === activeFilter.value)
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description_short.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t: string) => t.toLowerCase().includes(q)) ||
      (p.client && p.client.toLowerCase().includes(q))
    )
  }
  return result
})

const gradients = [
  'from-primary-400 to-indigo-600',
  'from-emerald-400 to-teal-600',
  'from-orange-400 to-rose-600',
  'from-violet-400 to-purple-600',
  'from-sky-400 to-blue-600',
  'from-amber-400 to-orange-600',
]

function getGradient(id: number) {
  return gradients[(id - 1) % gradients.length]
}

useSeoMeta({
  title: `Portfolio - ${profile.name}`,
  description: 'Proyek-proyek web app, mobile app, dan dashboard yang telah saya kerjakan.',
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.list-move,
.list-enter-active,
.list-leave-active { transition: all 0.3s ease; }
.list-enter-from,
.list-leave-to { opacity: 0; transform: scale(0.95); }
.list-leave-active { position: absolute; }
</style>
