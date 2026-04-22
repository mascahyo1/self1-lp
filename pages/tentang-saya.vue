<template>
  <div>
    <PageHeader
      icon="fa-solid fa-user"
      tag="Siapa Saya"
      title="Tentang Saya"
      subtitle="Kenali lebih dekat siapa saya dan apa yang mendorong saya"
    />

    <section class="py-16">
      <div class="section-container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <!-- Avatar Column -->
          <div class="flex justify-center">
            <div class="relative">
              <div class="w-64 h-64 rounded-3xl bg-gradient-to-br from-primary-400 to-indigo-600 p-1 shadow-2xl">
                <div class="w-full h-full rounded-3xl bg-gradient-to-br from-primary-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                  <fa icon="fa-solid fa-user" class="text-8xl text-primary-400 dark:text-primary-500" />
                </div>
              </div>
              <!-- Info Cards -->
              <div class="absolute -top-4 -left-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-3 border border-gray-100 dark:border-gray-800">
                <div class="flex items-center gap-2 text-sm">
                  <fa icon="fa-solid fa-location-dot" class="text-primary-500" />
                  <span class="font-medium text-gray-700 dark:text-gray-300">{{ profile.location }}</span>
                </div>
              </div>
              <div class="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-3 border border-gray-100 dark:border-gray-800">
                <div class="flex items-center gap-2 text-sm">
                  <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span class="font-medium text-gray-700 dark:text-gray-300">Open to work</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ profile.name }}</h2>
            <p class="text-primary-600 dark:text-primary-400 font-medium text-lg mb-6">{{ profile.tagline }}</p>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-lg">{{ profile.bio }}</p>

            <!-- Contact Info -->
            <div class="space-y-3 mb-8">
              <div class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-950 flex items-center justify-center flex-shrink-0">
                  <fa icon="fa-solid fa-envelope" class="text-primary-600 dark:text-primary-400" />
                </div>
                <a :href="`mailto:${profile.email}`" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ profile.email }}</a>
              </div>
              <div class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-950 flex items-center justify-center flex-shrink-0">
                  <fa icon="fa-solid fa-phone" class="text-primary-600 dark:text-primary-400" />
                </div>
                <span>{{ profile.phone }}</span>
              </div>
              <div class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-950 flex items-center justify-center flex-shrink-0">
                  <fa icon="fa-solid fa-globe" class="text-primary-600 dark:text-primary-400" />
                </div>
                <a :href="profile.website" target="_blank" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ profile.website }}</a>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap gap-3">
              <a :href="profile.resume" class="btn-primary">
                <fa icon="fa-solid fa-download" />
                Download CV
              </a>
              <NuxtLink to="/hubungi-saya" class="btn-outline">
                <fa icon="fa-solid fa-paper-plane" />
                Kontak Saya
              </NuxtLink>
            </div>

            <!-- Social -->
            <div class="flex items-center gap-3 mt-6">
              <a
                v-for="(url, key) in profile.social"
                :key="key"
                :href="url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-950 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center justify-center transition-all duration-200"
              >
                <fa :icon="`fa-brands fa-${key}`" />
              </a>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="stat in profile.stats"
            :key="stat.label"
            class="card text-center group hover:-translate-y-1"
          >
            <div class="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">{{ stat.value }}</div>
            <div class="text-gray-500 dark:text-gray-400 text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values / Philosophy -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="section-container">
        <div class="text-center mb-12">
          <h2 class="section-title">Prinsip Kerja Saya</h2>
          <p class="section-subtitle">Nilai-nilai yang saya pegang dalam setiap proyek</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="value in workValues" :key="value.title" class="card text-center group hover:-translate-y-1">
            <div class="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-4 text-2xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
              <fa :icon="value.icon" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ value.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()

const workValues = [
  {
    icon: 'fa-solid fa-code',
    title: 'Clean Code',
    desc: 'Kode yang bersih, terdokumentasi, dan mudah dipahami oleh siapapun adalah prioritas utama.',
  },
  {
    icon: 'fa-solid fa-rocket',
    title: 'Selalu Belajar',
    desc: 'Teknologi terus berkembang. Saya selalu berusaha mengikuti tren dan best practices terbaru.',
  },
  {
    icon: 'fa-solid fa-users',
    title: 'User First',
    desc: 'Setiap keputusan desain dan teknis selalu mempertimbangkan pengalaman pengguna akhir.',
  },
]

useSeoMeta({
  title: `Tentang Saya - ${profile.name}`,
  description: profile.bio,
})
</script>
