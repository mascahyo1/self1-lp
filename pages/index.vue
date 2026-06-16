<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950">
      <!-- Background Decoration -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div class="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-200/30 dark:bg-primary-900/20 blur-3xl animate-float" />
        <div class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-indigo-200/30 dark:bg-indigo-900/20 blur-3xl animate-float-slow" />
        <div class="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-pink-200/20 dark:bg-pink-900/10 blur-3xl animate-float" style="animation-delay: -4s" />
      </div>

      <div class="section-container relative z-10 py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left: Content -->
          <div>
            <div
              v-if="profile.available_for_work"
              v-reveal.fade
              class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6"
            >
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow" />
              Available for work
            </div>

            <h1 v-reveal.up class="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Hai, Saya
              <span class="gradient-text">{{ profile.name }}</span>
            </h1>

            <p v-reveal.up.delay-100 class="text-xl text-primary-600 dark:text-primary-400 font-medium mb-6">
              {{ profile.tagline }}
            </p>

            <p v-reveal.up.delay-200 class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              {{ profile.bio }}
            </p>

            <!-- CTA Buttons -->
            <div v-reveal.up.delay-300 class="flex flex-wrap gap-3 mb-10">
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
            <div v-reveal.fade.delay-500 class="flex items-center gap-3">
              <span class="text-sm text-gray-500 dark:text-gray-400">Temukan saya di:</span>
              <a
                v-for="(url, key) in socialLinks"
                :key="key"
                :href="url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-950 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:-translate-y-0.5 flex items-center justify-center transition-all duration-200"
              >
                <fa :icon="`fa-brands fa-${key}`" />
              </a>
            </div>
          </div>

          <!-- Right: Avatar + Stats -->
          <div class="flex flex-col items-center gap-8">
            <!-- Avatar -->
            <div
              v-reveal.zoom
              class="w-56 lg:w-72 rounded-3xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800 ring-4 ring-white/40 dark:ring-gray-800/40"
            >
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
                v-for="(stat, idx) in profile.stats"
                :key="stat.label"
                v-reveal.up
                :class="`reveal-delay-${(idx + 1) * 100}`"
                class="card-interactive bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 text-center"
              >
                <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  <template v-if="stat.key === 'years_of_experience' || stat.value === 'auto'">
                    <StatsCounter :end="yearsOfExperienceNum" suffix="+" />
                  </template>
                  <template v-else>{{ stat.value }}</template>
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
        <p v-reveal.fade class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">Tech Stack yang sering digunakan</p>
        <div class="flex flex-wrap justify-center gap-3">
          <span
            v-for="(tech, i) in allSkills"
            :key="tech.name"
            v-reveal.zoom
            :class="`reveal-delay-${(i % 6) * 100}`"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-300 dark:hover:border-primary-700 hover:-translate-y-0.5 transition-all cursor-default"
          >
            <fa :icon="tech.icon" class="text-sm" />
            <span class="text-sm font-medium">{{ tech.name }}</span>
          </span>
        </div>
        <div v-reveal.fade class="mt-8">
          <NuxtLink to="/skill-saya" class="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline inline-flex items-center gap-1 group">
            Lihat semua skill
            <fa icon="fa-solid fa-arrow-right" class="text-xs transition-transform group-hover:translate-x-1" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Stats Counter Section -->
    <section class="py-16 bg-gradient-to-br from-primary-600 via-violet-600 to-indigo-700 text-white relative overflow-hidden">
      <!-- Decorative shapes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div class="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl animate-float" />
        <div class="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-pink-300/20 blur-3xl animate-float-slow" />
      </div>

      <div class="section-container relative z-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div v-for="(stat, i) in bigStats" :key="stat.label" v-reveal.up :class="`reveal-delay-${(i + 1) * 100}`">
            <div class="text-4xl md:text-5xl font-extrabold mb-2">
              <StatsCounter :end="stat.end" :suffix="stat.suffix" />
            </div>
            <div class="text-sm md:text-base text-white/80">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Preview -->
    <section class="py-20 bg-white dark:bg-gray-950">
      <div class="section-container">
        <div v-reveal.up class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <fa icon="fa-solid fa-star" />
            Apa yang saya tawarkan
          </div>
          <h2 class="section-title">Layanan Saya</h2>
          <p class="section-subtitle">Solusi digital terbaik untuk kebutuhan bisnis Anda</p>
        </div>

        <div class="flex flex-row flex-wrap gap-6 mb-10">
          <div
            v-for="(service, i) in services"
            :key="service.id"
            v-reveal.up
            :class="`reveal-delay-${(i % 3 + 1) * 100}`"
            class="card-interactive w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 group"
          >
            <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4 group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-primary-600 transition-all duration-300">
              <fa :icon="service.icon" class="text-xl" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ service.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ service.description }}</p>
          </div>
        </div>

        <div v-reveal.fade class="text-center">
          <NuxtLink to="/layanan-saya" class="btn-outline">
            Lihat Semua Layanan
            <fa icon="fa-solid fa-arrow-right" class="text-sm transition-transform group-hover:translate-x-1" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why Choose Me -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div class="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary-200/20 dark:bg-primary-900/10 blur-3xl" />
      </div>
      <div class="section-container relative z-10">
        <div v-reveal.up class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <fa icon="fa-solid fa-trophy" />
            Keunggulan
          </div>
          <h2 class="section-title">Kenapa Pilih Saya?</h2>
          <p class="section-subtitle">Komitmen pada kualitas dan hasil yang terukur</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(item, i) in whyChooseMe"
            :key="item.title"
            v-reveal.up
            :class="`reveal-delay-${(i + 1) * 100}`"
            class="card-interactive bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 group"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300" :class="item.color">
                <fa :icon="item.icon" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1.5">{{ item.title }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process / Workflow -->
    <section class="py-20 bg-white dark:bg-gray-950">
      <div class="section-container">
        <div v-reveal.up class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <fa icon="fa-solid fa-route" />
            Cara Kerja
          </div>
          <h2 class="section-title">Proses Pengerjaan</h2>
          <p class="section-subtitle">Alur kerja terstruktur dari konsultasi hingga peluncuran</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <!-- Connecting line (desktop only) -->
          <div class="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary-300 via-violet-300 to-pink-300 dark:from-primary-800 dark:via-violet-800 dark:to-pink-800" />

          <div
            v-for="(step, i) in processSteps"
            :key="step.title"
            v-reveal.up
            :class="`reveal-delay-${(i + 1) * 150}`"
            class="card-interactive relative bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 text-center"
          >
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-primary-200 dark:shadow-primary-900">
              {{ i + 1 }}
            </div>
            <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-4 mt-2">
              <fa :icon="step.icon" class="text-xl" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Experience -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="section-container">
        <div v-reveal.up class="text-center mb-12">
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
              v-for="(exp, i) in latestExperience"
              :key="exp.id"
              v-reveal.left
              :class="`reveal-delay-${(i + 1) * 100}`"
              class="relative sm:pl-20"
            >
              <div class="hidden sm:flex absolute left-0 top-6 w-12 h-12 rounded-full flex-shrink-0 items-center justify-center text-white shadow-lg"
                :class="exp.is_current ? 'bg-primary-600 shadow-primary-200 dark:shadow-primary-900 animate-pulse-slow' : 'bg-gray-400 dark:bg-gray-600'"
              >
                <fa :icon="exp.company_logo" />
              </div>
              <div class="card-interactive bg-white dark:bg-gray-950 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
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

        <div v-reveal.fade class="text-center mt-10">
          <NuxtLink to="/riwayat-pekerjaan" class="btn-outline">
            Lihat CV Lengkap
            <fa icon="fa-solid fa-arrow-right" class="text-sm" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Portfolio -->
    <section class="py-20 bg-white dark:bg-gray-950">
      <div class="section-container">
        <div v-reveal.up class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <fa icon="fa-solid fa-folder-open" />
            Karya terbaik saya
          </div>
          <h2 class="section-title">Portfolio Unggulan</h2>
          <p class="section-subtitle">Beberapa proyek yang paling saya banggakan</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div
            v-for="(project, i) in featuredPortfolio"
            :key="project.id"
            v-reveal.up
            :class="`reveal-delay-${(i + 1) * 100}`"
            class="card-interactive group overflow-hidden p-0 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <!-- Project Image Placeholder -->
            <div class="h-44 bg-gradient-to-br from-primary-400 to-indigo-600 flex items-center justify-center text-white relative overflow-hidden"
              :class="getCoverGradient(project.id)"
            >
              <fa icon="fa-solid fa-globe" class="text-5xl opacity-50 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
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

        <div v-reveal.fade class="text-center">
          <NuxtLink to="/portfolio" class="btn-outline">
            Lihat Semua Proyek
            <fa icon="fa-solid fa-arrow-right" class="text-sm" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div class="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-pink-200/20 dark:bg-pink-900/10 blur-3xl" />
      </div>
      <div class="section-container relative z-10">
        <div v-reveal.up class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <fa icon="fa-solid fa-quote-left" />
            Testimoni
          </div>
          <h2 class="section-title">Apa Kata Mereka?</h2>
          <p class="section-subtitle">Cerita dari klien dan kolega yang pernah bekerja bersama</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(t, i) in testimonials"
            :key="t.id"
            v-reveal.up
            :class="`reveal-delay-${(i + 1) * 100}`"
            class="card-interactive bg-white dark:bg-gray-950 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col"
          >
            <div class="flex items-center gap-1 mb-3 text-yellow-400">
              <fa v-for="n in t.rating" :key="n" icon="fa-solid fa-star" class="text-sm" />
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1 mb-4">
              <span class="text-primary-500 text-2xl leading-none">"</span>{{ t.message }}<span class="text-primary-500 text-2xl leading-none">"</span>
            </p>
            <div class="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm flex-shrink-0" :class="t.color">
                {{ t.initials }}
              </div>
              <div class="min-w-0">
                <p class="font-semibold text-sm text-gray-900 dark:text-white truncate">{{ t.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ t.role }} · {{ t.company }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Client Logos Marquee -->
    <section class="py-12 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800 overflow-hidden">
      <div v-reveal.fade class="text-center mb-8">
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Dipercaya oleh berbagai klien</p>
      </div>
      <div class="relative">
        <!-- Fade masks -->
        <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
        <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
        <div class="marquee-track">
          <div v-for="c in doubledClients" :key="c.id + '-' + c.idx" class="flex items-center gap-3 px-6 py-3 mx-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex-shrink-0">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
              {{ c.initials }}
            </div>
            <span class="font-semibold text-gray-700 dark:text-gray-300 text-sm whitespace-nowrap">{{ c.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Posts -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="section-container">
        <div v-reveal.up class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <fa icon="fa-solid fa-pen-nib" />
            Tulisan & Artikel
          </div>
          <h2 class="section-title">Artikel Terbaru</h2>
          <p class="section-subtitle">Berbagi pengetahuan dan pengalaman</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <NuxtLink
            v-for="(post, i) in latestPosts"
            :key="post.id"
            :to="`/posts/${post.slug}`"
            v-reveal.up
            :class="`reveal-delay-${(i + 1) * 100}`"
            class="card-interactive overflow-hidden p-0 group block bg-white dark:bg-gray-950 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div class="h-40 bg-gradient-to-br relative flex items-center justify-center overflow-hidden"
              :class="getCoverGradient(post.id)"
            >
              <fa icon="fa-solid fa-pen-nib" class="text-5xl text-white/20 transition-transform duration-500 group-hover:scale-110" />
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

        <div v-reveal.fade class="text-center">
          <NuxtLink to="/posts" class="btn-outline">
            Baca Artikel Lainnya
            <fa icon="fa-solid fa-arrow-right" class="text-sm" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-white dark:bg-gray-950">
      <div class="section-container">
        <div v-reveal.up class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <fa icon="fa-solid fa-circle-question" />
            FAQ
          </div>
          <h2 class="section-title">Pertanyaan Umum</h2>
          <p class="section-subtitle">Hal yang sering ditanyakan calon klien</p>
        </div>

        <div class="max-w-3xl mx-auto space-y-3">
          <div
            v-for="(faq, i) in faqs"
            :key="faq.id"
            v-reveal.up
            :class="`reveal-delay-${((i % 4) + 1) * 100}`"
            class="card-interactive bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <button
              @click="toggleFaq(faq.id)"
              class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div class="flex items-center gap-3 min-w-0">
                <span class="text-xs font-bold text-primary-600 dark:text-primary-400 flex-shrink-0">{{ faq.category }}</span>
                <h3 class="font-semibold text-gray-900 dark:text-white truncate">{{ faq.question }}</h3>
              </div>
              <fa
                icon="fa-solid fa-chevron-down"
                class="text-sm text-gray-400 flex-shrink-0 transition-transform duration-300"
                :class="openFaqId === faq.id ? 'rotate-180 text-primary-600 dark:text-primary-400' : ''"
              />
            </button>
            <Transition name="accordion">
              <div v-if="openFaqId === faq.id" class="px-5 pb-5 pt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ faq.answer }}
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-indigo-700 dark:from-primary-800 dark:to-indigo-900" />
      <!-- Decorative shapes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div class="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl animate-float" />
        <div class="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-pink-300/20 blur-3xl animate-float-slow" />
        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 32px 32px" />
      </div>

      <div class="section-container relative z-10 text-center text-white">
        <h2 v-reveal.up class="text-3xl md:text-4xl font-bold mb-4">Tertarik Bekerja Sama?</h2>
        <p v-reveal.up.delay-100 class="text-primary-100 mb-8 max-w-lg mx-auto">
          Saya selalu terbuka untuk proyek baru dan kolaborasi yang menarik. Mari diskusikan ide Anda!
        </p>
        <div v-reveal.up.delay-200 class="flex flex-wrap items-center justify-center gap-3">
          <NuxtLink
            to="/hubungi-saya"
            class="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 hover:scale-105 transition-all shadow-lg"
          >
            <fa icon="fa-solid fa-envelope" />
            Mulai Diskusi
          </NuxtLink>
          <NuxtLink
            to="/portfolio"
            class="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
          >
            <fa icon="fa-solid fa-eye" />
            Lihat Portfolio
          </NuxtLink>
        </div>
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
const testimonials = useTestimonials()
const faqs = useFaqs()
const clients = useClients()

const featuredPortfolio = computed(() => portfolio.filter((p: any) => p.featured).slice(0, 3))

const allSkills = computed(() =>
  skills.categories.flatMap((c: any) => c.skills).sort((a: any, b: any) => b.level - a.level).slice(0, 12)
)

const latestExperience = computed(() => [...experience].slice(0, 3))

const latestPosts = computed(() => {
  return [...posts].sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()).slice(0, 3)
})

const yearsOfExperienceNum = computed(() => new Date().getFullYear() - profile.career_start_year)

const avatarSrc = computed(() => profile.avatar_url || profile.avatar || '')
const yearsOfExperience = computed(() => `${new Date().getFullYear() - profile.career_start_year}+`)

const socialLinks = profile.social

const bigStats = [
  { end: yearsOfExperienceNum.value, suffix: '+', label: 'Tahun Pengalaman' },
  { end: 6, suffix: '+', label: 'Perusahaan' },
  { end: 20, suffix: '+', label: 'Proyek Selesai' },
  { end: 10, suffix: '+', label: 'Teknologi Dikuasai' },
]

const whyChooseMe = [
  { icon: 'fa-solid fa-bolt', color: 'from-yellow-500 to-orange-500', title: 'Cepat & Responsif', desc: 'Komunikasi aktif, update progress real-time, dan fast response untuk setiap pertanyaan.' },
  { icon: 'fa-solid fa-shield-halved', color: 'from-emerald-500 to-teal-500', title: 'Kode Berkualitas', desc: 'Best practices, clean code, testing, dan dokumentasi agar sistem mudah di-maintain.' },
  { icon: 'fa-solid fa-arrows-up-down-left-right', color: 'from-primary-500 to-indigo-500', title: 'Scalable & Modern', desc: 'Arsitektur scalable, teknologi terkini, dan pattern yang teruji untuk pertumbuhan bisnis.' },
  { icon: 'fa-solid fa-handshake', color: 'from-pink-500 to-rose-500', title: 'Garansi & Support', desc: 'Bug-fix gratis 30 hari pasca-launch dan paket maintenance untuk dukungan jangka panjang.' },
  { icon: 'fa-solid fa-puzzle-piece', color: 'from-violet-500 to-purple-500', title: 'Solusi End-to-End', desc: 'Dari konsultasi, desain, development, hingga deployment dan monitoring — semua ter-handle.' },
  { icon: 'fa-solid fa-clock', color: 'from-sky-500 to-blue-500', title: 'On-Time Delivery', desc: 'Komitmen pada timeline yang disepakati, dengan milestone tracking yang transparan.' },
]

const processSteps = [
  { icon: 'fa-solid fa-comments', title: 'Konsultasi', desc: 'Diskusi mendalam tentang kebutuhan dan tujuan proyek Anda.' },
  { icon: 'fa-solid fa-pencil-ruler', title: 'Perencanaan', desc: 'Merancang solusi dan menyiapkan proposal teknis yang detail.' },
  { icon: 'fa-solid fa-code', title: 'Pengembangan', desc: 'Implementasi dengan kode berkualitas tinggi dan update berkala.' },
  { icon: 'fa-solid fa-rocket', title: 'Peluncuran', desc: 'Testing menyeluruh, deployment, dan dukungan pasca-launch.' },
]

const doubledClients = computed(() => {
  // Duplicate 2x for seamless marquee loop
  const arr: any[] = []
  clients.forEach((c: any) => arr.push({ ...c, idx: 'a' }))
  clients.forEach((c: any) => arr.push({ ...c, idx: 'b' }))
  return arr
})

const openFaqId = ref<number | null>(null)
function toggleFaq(id: number) {
  openFaqId.value = openFaqId.value === id ? null : id
}

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
