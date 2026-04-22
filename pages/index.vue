<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950">
      <!-- Background Decoration -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-200/30 dark:bg-primary-900/20 blur-3xl" />
        <div class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-indigo-200/30 dark:bg-indigo-900/20 blur-3xl" />
      </div>

      <div class="section-container relative z-10 py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left: Content -->
          <div class="animate-slide-up">
            <div
              v-if="profile.available_for_work"
              class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6"
            >
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for work
            </div>

            <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Hai, Saya
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                {{ profile.name }}
              </span>
            </h1>

            <p class="text-xl text-primary-600 dark:text-primary-400 font-medium mb-6">
              {{ profile.tagline }}
            </p>

            <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              {{ profile.bio }}
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-3 mb-10">
              <NuxtLink to="/portfolio" class="btn-primary">
                <fa icon="fa-solid fa-briefcase" />
                Lihat Portfolio
              </NuxtLink>
              <a :href="profile.resume" class="btn-outline">
                <fa icon="fa-solid fa-download" />
                Download CV
              </a>
              <NuxtLink to="/hubungi-saya" class="btn-outline">
                <fa icon="fa-solid fa-paper-plane" />
                Hubungi Saya
              </NuxtLink>
            </div>

            <!-- Social Links -->
            <div class="flex items-center gap-3">
              <span class="text-sm text-gray-500 dark:text-gray-400">Temukan saya di:</span>
              <a
                v-for="(url, key) in socialLinks"
                :key="key"
                :href="url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-950 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center justify-center transition-all duration-200"
              >
                <fa :icon="`fa-brands fa-${key}`" />
              </a>
            </div>
          </div>

          <!-- Right: Avatar + Stats -->
          <div class="flex flex-col items-center gap-8 animate-fade-in">
            <!-- Avatar -->
            <div class="w-56 lg:w-72 rounded-3xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800">
              <img
                v-if="avatarSrc"
                :src="avatarSrc"
                :alt="profile.name"
                class="w-full h-auto block"
              />
              <div v-else class="w-full h-auto min-h-[16rem] flex items-center justify-center">
                <fa icon="fa-solid fa-user" class="text-7xl text-gray-400 dark:text-gray-600" />
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div
                v-for="stat in profile.stats"
                :key="stat.label"
                class="card text-center"
              >
                <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {{ stat.key === 'years_of_experience' || stat.value === 'auto' ? yearsOfExperience : stat.value }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600 animate-bounce">
        <span class="text-xs">Scroll</span>
        <fa icon="fa-solid fa-chevron-down" />
      </div>
    </section>

    <!-- Tech Stack Preview -->
    <section class="py-10 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div class="section-container text-center">
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">Tech Stack yang sering digunakan</p>
        <div class="flex flex-wrap justify-center gap-3">
          <span
            v-for="tech in allSkills"
            :key="tech.name"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-300 dark:hover:border-primary-700 transition-all cursor-default"
          >
            <fa :icon="tech.icon" class="text-sm" />
            <span class="text-sm font-medium">{{ tech.name }}</span>
          </span>
        </div>
        <div class="mt-8">
          <NuxtLink to="/skill-saya" class="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
            Lihat semua skill &rarr;
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Services Preview -->
    <section class="py-20 bg-white dark:bg-gray-950">
      <div class="section-container">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <fa icon="fa-solid fa-star" />
            Apa yang saya tawarkan
          </div>
          <h2 class="section-title">Layanan Saya</h2>
          <p class="section-subtitle">Solusi digital terbaik untuk kebutuhan bisnis Anda</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div
            v-for="service in services"
            :key="service.id"
            class="card group hover:-translate-y-1"
          >
            <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4 group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-primary-600 transition-all duration-300">
              <fa :icon="service.icon" class="text-xl" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ service.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ service.description }}</p>
          </div>
        </div>

        <div class="text-center">
          <NuxtLink to="/layanan-saya" class="btn-outline">
            Lihat Semua Layanan
            <fa icon="fa-solid fa-arrow-right" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Latest Experience -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="section-container">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <fa icon="fa-solid fa-briefcase" />
            Perjalanan Karir
          </div>
          <h2 class="section-title">Pengalaman Kerja</h2>
          <p class="section-subtitle">Pengalaman profesional terbaru saya</p>
        </div>

        <div class="max-w-3xl mx-auto relative">
          <div class="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-primary-300 to-transparent hidden sm:block" />
          <div class="space-y-6">
            <div
              v-for="exp in latestExperience"
              :key="exp.id"
              class="relative sm:pl-20"
            >
              <div class="hidden sm:flex absolute left-0 top-6 w-12 h-12 rounded-full flex-shrink-0 items-center justify-center text-white shadow-lg"
                :class="exp.is_current ? 'bg-primary-600 shadow-primary-200 dark:shadow-primary-900' : 'bg-gray-400 dark:bg-gray-600'"
              >
                <fa :icon="exp.company_logo" />
              </div>
              <div class="card">
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div>
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {{ exp.role }}
                      <span v-if="exp.is_current" class="badge bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 text-[10px] px-2 py-0.5">Saat ini</span>
                    </h3>
                    <p class="text-primary-600 dark:text-primary-400 text-sm font-medium">{{ exp.company }}</p>
                  </div>
                  <span class="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs flex-shrink-0">
                    {{ exp.year_start }} – {{ exp.year_end }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <NuxtLink to="/riwayat-pekerjaan" class="btn-outline">
            Lihat CV Lengkap
            <fa icon="fa-solid fa-arrow-right" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Portfolio -->
    <section class="py-20 bg-white dark:bg-gray-950">
      <div class="section-container">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <fa icon="fa-solid fa-folder-open" />
            Karya terbaik saya
          </div>
          <h2 class="section-title">Portfolio Unggulan</h2>
          <p class="section-subtitle">Beberapa proyek yang paling saya banggakan</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div
            v-for="project in featuredPortfolio"
            :key="project.id"
            class="card group overflow-hidden p-0"
          >
            <!-- Project Image Placeholder -->
            <div class="h-44 bg-gradient-to-br from-primary-400 to-indigo-600 flex items-center justify-center text-white">
              <fa icon="fa-solid fa-globe" class="text-5xl opacity-50" />
            </div>
            <div class="p-6">
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ project.title }}</h3>
                <span class="badge bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-xs">{{ project.category }}</span>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{{ project.description }}</p>
              <div class="flex flex-wrap gap-1.5 mb-4">
                <span
                  v-for="tag in project.tags.slice(0, 3)"
                  :key="tag"
                  class="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs"
                >{{ tag }}</span>
              </div>
              <div class="flex items-center gap-2">
                <a
                  v-if="project.url_live"
                  :href="project.url_live"
                  target="_blank"
                  class="text-primary-600 dark:text-primary-400 hover:underline text-sm flex items-center gap-1"
                >
                  <fa icon="fa-solid fa-external-link" class="text-xs" />
                  Live Demo
                </a>
                <a
                  v-if="project.url_github"
                  :href="project.url_github"
                  target="_blank"
                  class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm flex items-center gap-1"
                >
                  <fa icon="fa-brands fa-github" class="text-sm" />
                  Source
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <NuxtLink to="/portfolio" class="btn-outline">
            Lihat Semua Proyek
            <fa icon="fa-solid fa-arrow-right" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Latest Posts -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="section-container">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <fa icon="fa-solid fa-pen-nib" />
            Tulisan & Artikel
          </div>
          <h2 class="section-title">Artikel Terbaru</h2>
          <p class="section-subtitle">Berbagi pengetahuan dan pengalaman</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <NuxtLink
            v-for="post in latestPosts"
            :key="post.id"
            :to="`/posts/${post.slug}`"
            class="card overflow-hidden p-0 group block hover:-translate-y-1"
          >
            <div class="h-40 bg-gradient-to-br relative flex items-center justify-center overflow-hidden"
              :class="getCoverGradient(post.id)"
            >
              <fa icon="fa-solid fa-pen-nib" class="text-5xl text-white/20" />
              <div class="absolute top-3 left-3">
                <span class="badge bg-white/20 backdrop-blur-sm text-white text-xs">{{ post.category }}</span>
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-2 text-xs text-gray-400 dark:text-gray-500">
                <fa icon="fa-solid fa-calendar" />
                {{ formatDate(post.published_at) }}
              </div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {{ post.title }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{{ post.excerpt }}</p>
            </div>
          </NuxtLink>
        </div>

        <div class="text-center">
          <NuxtLink to="/posts" class="btn-outline">
            Baca Artikel Lainnya
            <fa icon="fa-solid fa-arrow-right" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-primary-600 to-indigo-700 dark:from-primary-800 dark:to-indigo-900">
      <div class="section-container text-center text-white">
        <h2 class="text-3xl font-bold mb-4">Tertarik Bekerja Sama?</h2>
        <p class="text-primary-100 mb-8 max-w-lg mx-auto">
          Saya selalu terbuka untuk proyek baru dan kolaborasi yang menarik. Mari diskusikan ide Anda!
        </p>
        <NuxtLink
          to="/hubungi-saya"
          class="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
        >
          <fa icon="fa-solid fa-envelope" />
          Mulai Diskusi
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()
const services = useServices()
const portfolio = usePortfolio()
const skills = useSkills()
const experience = useExperience()
const posts = usePosts()

const featuredPortfolio = computed(() => portfolio.filter((p: any) => p.featured).slice(0, 3))

const allSkills = computed(() =>
  skills.categories.flatMap((c: any) => c.skills).sort((a: any, b: any) => b.level - a.level).slice(0, 12)
)

const latestExperience = computed(() => [...experience].slice(0, 3))

const latestPosts = computed(() => {
  return [...posts].sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()).slice(0, 3)
})

const avatarSrc = computed(() => profile.avatar_url || profile.avatar || '')
const yearsOfExperience = computed(() => `${new Date().getFullYear() - profile.career_start_year}+`)

const socialLinks = profile.social

const gradients = [
  'from-primary-400 to-indigo-600',
  'from-emerald-400 to-teal-600',
  'from-orange-400 to-rose-600',
  'from-violet-400 to-purple-600',
  'from-sky-400 to-blue-600',
  'from-amber-400 to-orange-600',
]

function getCoverGradient(id: number) {
  return gradients[(id - 1) % gradients.length]
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

useSeoMeta({
  title: `${profile.name} - ${profile.tagline}`,
  description: profile.bio,
  ogTitle: `${profile.name} - ${profile.tagline}`,
  ogDescription: profile.bio,
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
