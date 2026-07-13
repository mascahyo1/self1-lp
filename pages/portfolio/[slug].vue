<template>
  <div v-if="project">
    <!-- Hero / Cover -->
    <section class="pt-20">
      <div
        class="h-72 md:h-96 relative flex items-center justify-center overflow-hidden"
        :class="getGradient(project.id)"
      >
        <!-- Image with Error Handling -->
        <img 
          v-if="project.image_main && !mainImageError" 
          :src="project.image_main" 
          :alt="project.title" 
          @error="mainImageError = true"
          class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" 
        />
        
        <!-- Beautiful Placeholder Fallback -->
        <div v-else class="absolute inset-0 w-full h-full group">
          <div class="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-white/20 rounded-full blur-[100px]" />
          <div class="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] bg-black/30 rounded-full blur-[100px]" />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-40 h-40 rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl rotate-12 group-hover:rotate-0 transition-all duration-700">
               <fa icon="fa-solid fa-layer-group" class="text-7xl text-white/50 -rotate-12 group-hover:rotate-0 transition-all duration-700" />
            </div>
          </div>
        </div>

        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <!-- Breadcrumb -->
        <div class="absolute top-6 left-0 right-0 section-container">
          <NuxtLink to="/portfolio" class="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors">
            <fa icon="fa-solid fa-arrow-left" class="text-xs" />
            Kembali ke Portfolio
          </NuxtLink>
        </div>
        <!-- Title overlay -->
        <div class="absolute bottom-0 left-0 right-0 section-container pb-8">
          <div class="flex flex-wrap gap-2 mb-3">
            <span class="badge bg-white/20 backdrop-blur-sm text-white text-xs">{{ project.category }}</span>
            <span class="badge bg-white/20 backdrop-blur-sm text-white text-xs">{{ project.year }}</span>
            <span v-if="project.featured" class="badge bg-yellow-400 text-yellow-900 text-xs">
              <fa icon="fa-solid fa-star" class="mr-1" />Featured
            </span>
          </div>
          <h1 class="text-3xl md:text-5xl font-bold text-white leading-tight">{{ project.title }}</h1>
        </div>
      </div>
    </section>

    <section class="py-12">
      <div class="section-container">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">

            <!-- Quick Summary -->
            <div class="card border-l-4 border-primary-500">
              <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                {{ project.description_short }}
              </p>
            </div>

            <!-- Project Metrics -->
            <div v-if="project.metrics?.length" class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div
                v-for="metric in project.metrics"
                :key="metric.label"
                class="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-center shadow-sm"
              >
                <p class="text-xl md:text-2xl font-bold gradient-text">{{ metric.value }}</p>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ metric.label }}</p>
              </div>
            </div>

            <!-- Image Gallery -->
            <div v-if="project.images && project.images.length">
              <div class="flex items-end justify-between gap-4 mb-4">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-1">Project evidence</p>
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white">Dokumentasi Visual</h2>
                </div>
                <span class="text-xs text-gray-400">{{ project.images.length + 1 }} screenshot</span>
              </div>

              <!-- Main Image -->
              <div
                class="h-64 md:h-80 rounded-2xl overflow-hidden mb-3 cursor-pointer relative group"
                :class="getGradient(project.id)"
                @click="lightboxIndex = 0; lightboxOpen = true"
              >
                <!-- Actual Image -->
                <img 
                  v-if="project.image_main && !mainImageError" 
                  :src="project.image_main" 
                  :alt="project.title" 
                  @error="mainImageError = true"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                
                <!-- Placeholder Fallback -->
                <div v-else class="w-full h-full flex items-center justify-center relative overflow-hidden">
                  <div class="absolute -top-16 -right-16 w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                  <div class="absolute -bottom-16 -left-16 w-64 h-64 bg-black/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                  
                  <div class="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center relative z-10 shadow-xl group-hover:-translate-y-2 transition-transform duration-500">
                    <fa icon="fa-solid fa-image" class="text-4xl text-white/70" />
                  </div>
                  
                  <div class="absolute inset-0 flex items-end p-5 z-10 bg-gradient-to-t from-black/60 to-transparent">
                    <span class="text-white font-medium drop-shadow-md">{{ project.title }}</span>
                  </div>
                </div>
                
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center z-20">
                  <fa icon="fa-solid fa-expand" class="text-white opacity-0 group-hover:opacity-100 text-3xl drop-shadow-lg" />
                </div>
              </div>

              <!-- Thumbnail Row -->
              <div v-if="project.images.length > 0" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button
                  v-for="(img, i) in project.images"
                  :key="img"
                  type="button"
                  class="aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all bg-gray-100 dark:bg-gray-800"
                  :class="lightboxIndex === i + 1 ? 'border-primary-500' : 'border-transparent hover:border-primary-300'"
                  :aria-label="`Buka screenshot ${i + 2}`"
                  @click="lightboxIndex = i + 1; lightboxOpen = true"
                >
                  <img
                    :src="img"
                    :alt="`${project.title} — screenshot ${i + 2}`"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </button>
              </div>

              <!-- Image count info -->
              <p class="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
                <fa icon="fa-solid fa-circle-info" />
                Klik screenshot untuk melihat dokumentasi dalam ukuran penuh.
              </p>
            </div>

            <!-- Full Description -->
            <div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Detail Proyek</h2>
              <div class="prose dark:prose-invert max-w-none space-y-4">
                <p
                  v-for="(para, i) in paragraphs"
                  :key="i"
                  class="text-gray-600 dark:text-gray-400 leading-relaxed"
                >{{ para }}</p>
              </div>
            </div>

            <!-- Delivery Workflow -->
            <div v-if="project.workflow?.length">
              <div class="mb-5">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-1">How it works</p>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Workflow AI & Project Management</h2>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Setiap request memiliki jejak yang jelas dari requirement hingga dokumentasi akhir.
                </p>
              </div>
              <div class="relative space-y-4 before:absolute before:left-6 before:top-8 before:bottom-8 before:w-px before:bg-gradient-to-b before:from-primary-500 before:to-violet-500">
                <div
                  v-for="item in project.workflow"
                  :key="item.step"
                  class="relative flex gap-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm"
                >
                  <div class="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary-500/20 flex-shrink-0">
                    {{ item.step }}
                  </div>
                  <div class="min-w-0">
                    <div class="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 class="font-semibold text-gray-900 dark:text-white">{{ item.title }}</h3>
                      <span class="badge bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-[11px]">{{ item.tool }}</span>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Progress Report -->
            <div v-if="project.progress_report?.length" class="rounded-3xl bg-gray-950 dark:bg-black p-6 md:p-8 text-white overflow-hidden relative">
              <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl" />
              <div class="relative">
                <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-300 mb-1">Live overview</p>
                    <h2 class="text-xl font-bold">Laporan Progress Proyek</h2>
                  </div>
                  <span class="inline-flex items-center gap-2 text-xs text-emerald-300">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Diperbarui setiap task passed
                  </span>
                </div>
                <div class="space-y-5">
                  <div v-for="phase in project.progress_report" :key="phase.phase">
                    <div class="flex items-center justify-between gap-3 mb-2">
                      <div>
                        <p class="text-sm font-medium">{{ phase.phase }}</p>
                        <p class="text-xs text-gray-400 mt-0.5">{{ phase.summary }}</p>
                      </div>
                      <div class="text-right flex-shrink-0">
                        <p class="text-sm font-bold">{{ phase.progress }}%</p>
                        <p class="text-[10px] text-gray-400">{{ phase.status }}</p>
                      </div>
                    </div>
                    <div class="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        class="h-full rounded-full bg-gradient-to-r from-primary-400 via-violet-400 to-fuchsia-400 transition-all duration-700"
                        :style="{ width: `${phase.progress}%` }"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Documentation Deliverables -->
            <div v-if="project.documentation?.length">
              <div class="mb-5">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-1">Knowledge base</p>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Dokumentasi yang Diserahkan</h2>
              </div>
              <div class="grid sm:grid-cols-2 gap-4">
                <article
                  v-for="(doc, i) in project.documentation"
                  :key="doc.title"
                  class="group rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg transition-all"
                >
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <fa :icon="documentationIcons[i % documentationIcons.length]" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900 dark:text-white mb-1.5">{{ doc.title }}</h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ doc.description }}</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <!-- Tech Stack -->
            <div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Teknologi yang Digunakan</h2>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm"
                >
                  <fa icon="fa-solid fa-check" class="text-primary-500 text-xs" />
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Navigation -->
            <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <NuxtLink
                v-if="prevProject"
                :to="`/portfolio/${prevProject.slug}`"
                class="card hover:-translate-y-0.5 group"
              >
                <p class="text-xs text-gray-400 mb-1 flex items-center gap-1">
                  <fa icon="fa-solid fa-arrow-left" />
                  Sebelumnya
                </p>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                  {{ prevProject.title }}
                </p>
              </NuxtLink>
              <div v-else />
              <NuxtLink
                v-if="nextProject"
                :to="`/portfolio/${nextProject.slug}`"
                class="card hover:-translate-y-0.5 text-right group"
              >
                <p class="text-xs text-gray-400 mb-1 flex items-center gap-1 justify-end">
                  Berikutnya
                  <fa icon="fa-solid fa-arrow-right" />
                </p>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                  {{ nextProject.title }}
                </p>
              </NuxtLink>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="space-y-5">
            <!-- Project Info Card -->
            <div class="card">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Info Proyek</h3>
              <dl class="space-y-3 text-sm">
                <div class="flex justify-between gap-2">
                  <dt class="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <fa icon="fa-solid fa-user-tie" class="text-primary-500 w-3.5" />Klien
                  </dt>
                  <dd class="font-medium text-gray-900 dark:text-white text-right">{{ project.client }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                  <dt class="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <fa icon="fa-solid fa-person-digging" class="text-primary-500 w-3.5" />Peran
                  </dt>
                  <dd class="font-medium text-gray-900 dark:text-white text-right">{{ project.role }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                  <dt class="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <fa icon="fa-solid fa-clock" class="text-primary-500 w-3.5" />Durasi
                  </dt>
                  <dd class="font-medium text-gray-900 dark:text-white">{{ project.duration }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                  <dt class="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <fa icon="fa-solid fa-calendar" class="text-primary-500 w-3.5" />Tahun
                  </dt>
                  <dd class="font-medium text-gray-900 dark:text-white">{{ project.year }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                  <dt class="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <fa icon="fa-solid fa-tag" class="text-primary-500 w-3.5" />Kategori
                  </dt>
                  <dd class="font-medium text-gray-900 dark:text-white">{{ project.category }}</dd>
                </div>
              </dl>
            </div>

            <!-- Links -->
            <div class="card space-y-3">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Tautan</h3>
              <a
                v-if="project.url_live"
                :href="project.url_live"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 p-3 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors text-sm font-medium"
              >
                <fa icon="fa-solid fa-arrow-up-right-from-square" />
                Live Demo
              </a>
              <a
                v-if="project.url_github"
                :href="project.url_github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                <fa icon="fa-brands fa-github" />
                Source Code
              </a>
              <p v-if="!project.url_live && !project.url_github" class="text-sm text-gray-400">
                Proyek ini bersifat privat
              </p>
            </div>

            <!-- Other Projects -->
            <div class="card">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Proyek Lainnya</h3>
              <ul class="space-y-3">
                <li v-for="other in otherProjects" :key="other.id">
                  <NuxtLink
                    :to="`/portfolio/${other.slug}`"
                    class="flex items-center gap-3 group"
                  >
                    <div
                      class="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                      :class="getGradient(other.id)"
                    >
                      <fa icon="fa-solid fa-globe" class="text-white text-xs" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                        {{ other.title }}
                      </p>
                      <p class="text-xs text-gray-400">{{ other.category }}</p>
                    </div>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          @click.self="lightboxOpen = false"
        >
          <button
            @click="lightboxOpen = false"
            class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <fa icon="fa-solid fa-xmark" class="text-lg" />
          </button>
          <!-- Prev -->
          <button
            v-if="allImages.length > 1"
            @click="lightboxIndex = (lightboxIndex - 1 + allImages.length) % allImages.length"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <fa icon="fa-solid fa-chevron-left" />
          </button>
          <!-- Image Display -->
          <div class="max-w-5xl w-full">
            <div class="aspect-video rounded-2xl overflow-hidden bg-gray-900 border border-white/10 shadow-2xl">
              <img
                :src="allImages[lightboxIndex]"
                :alt="`${project.title} — dokumentasi ${lightboxIndex + 1}`"
                class="w-full h-full object-contain"
              />
            </div>
            <p class="text-center text-white/50 text-xs mt-3">
              Screenshot {{ lightboxIndex + 1 }} dari {{ allImages.length }}
            </p>
          </div>
          <!-- Next -->
          <button
            v-if="allImages.length > 1"
            @click="lightboxIndex = (lightboxIndex + 1) % allImages.length"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <fa icon="fa-solid fa-chevron-right" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>

  <!-- Not found -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <p class="text-gray-400 mb-4">Proyek tidak ditemukan</p>
      <NuxtLink to="/portfolio" class="btn-primary">Kembali ke Portfolio</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const profile = useProfile()
const portfolio = usePortfolio()

const mainImageError = ref(false)

const project = computed(() => portfolio.find((p: any) => p.slug === route.params.slug))

const currentIndex = computed(() => portfolio.findIndex((p: any) => p.slug === route.params.slug))
const prevProject = computed(() => currentIndex.value > 0 ? portfolio[currentIndex.value - 1] : null)
const nextProject = computed(() => currentIndex.value < portfolio.length - 1 ? portfolio[currentIndex.value + 1] : null)
const otherProjects = computed(() => portfolio.filter((p: any) => p.slug !== route.params.slug).slice(0, 3))

const paragraphs = computed(() =>
  project.value?.description_full.split('\n\n').filter((p: string) => p.trim()) ?? []
)

const allImages = computed(() => {
  if (!project.value) return []
  const imgs = [project.value.image_main, ...(project.value.images || [])]
  return imgs.filter(Boolean)
})

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const documentationIcons = [
  'fa-solid fa-list-check',
  'fa-solid fa-code',
  'fa-solid fa-shield-halved',
  'fa-solid fa-chart-line',
]

onKeyStroke('Escape', () => { lightboxOpen.value = false })
onKeyStroke('ArrowLeft', () => {
  if (lightboxOpen.value) lightboxIndex.value = (lightboxIndex.value - 1 + allImages.value.length) % allImages.value.length
})
onKeyStroke('ArrowRight', () => {
  if (lightboxOpen.value) lightboxIndex.value = (lightboxIndex.value + 1) % allImages.value.length
})

const gradients = [
  'from-primary-400 to-indigo-600',
  'from-emerald-400 to-teal-600',
  'from-orange-400 to-rose-600',
  'from-violet-400 to-purple-600',
  'from-sky-400 to-blue-600',
  'from-amber-400 to-orange-600',
]
function getGradient(id: number) { return gradients[(id - 1) % gradients.length] }

useSeoMeta({
  title: project.value ? `${project.value.title} - Portfolio ${profile.name}` : 'Proyek Tidak Ditemukan',
  description: project.value?.description_short,
})
</script>

<style>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
