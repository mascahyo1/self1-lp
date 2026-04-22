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
            <div class="relative">
              <div class="w-56 h-56 lg:w-72 lg:h-72 rounded-3xl bg-gradient-to-br from-primary-400 to-indigo-600 p-1 shadow-2xl">
                <div class="w-full h-full rounded-3xl bg-gradient-to-br from-primary-100 to-indigo-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center overflow-hidden">
                  <fa icon="fa-solid fa-user" class="text-7xl text-primary-400 dark:text-primary-500" />
                </div>
              </div>
              <!-- Floating Badge -->
              <div class="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-3 border border-gray-100 dark:border-gray-800">
                <div class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <fa icon="fa-solid fa-code" class="text-primary-500" />
                  <span>{{ yearsOfExperience }} Tahun</span>
                </div>
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
                  {{ stat.key === 'years_of_experience' ? yearsOfExperience : stat.value }}
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

    <!-- Featured Portfolio -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
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

const featuredPortfolio = computed(() => portfolio.filter((p: any) => p.featured).slice(0, 3))

const yearsOfExperience = computed(() => `${new Date().getFullYear() - profile.career_start_year}+`)

const socialLinks = profile.social

useSeoMeta({
  title: `${profile.name} - ${profile.tagline}`,
  description: profile.bio,
  ogTitle: `${profile.name} - ${profile.tagline}`,
  ogDescription: profile.bio,
})
</script>
