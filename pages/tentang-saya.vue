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
          <div v-reveal.zoom class="flex justify-center">
            <div class="w-56 lg:w-72 rounded-3xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800 ring-4 ring-white/40 dark:ring-gray-800/40">
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
          </div>

          <!-- Content -->
          <div v-reveal.up>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ profile.name }}</h2>
            <p class="text-primary-600 dark:text-primary-400 font-medium text-lg mb-6">{{ profile.tagline }}</p>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-lg">{{ profile.bio }}</p>

            <!-- Contact Info -->
            <div class="space-y-3 mb-8">
              <div v-for="(item, i) in contactItems" :key="item.label" v-reveal.right :class="`reveal-delay-${(i + 1) * 100}`" class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-950 flex items-center justify-center flex-shrink-0">
                  <fa :icon="item.icon" class="text-primary-600 dark:text-primary-400" />
                </div>
                <component :is="item.href ? 'a' : 'span'" :href="item.href" :target="item.external ? '_blank' : undefined" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{{ item.value }}</component>
              </div>
            </div>

            <!-- Actions -->
            <div v-reveal.up.delay-300 class="flex flex-wrap gap-3">
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
            <div v-reveal.fade.delay-500 class="flex items-center gap-3 mt-6">
              <a
                v-for="(url, key) in profile.social"
                :key="key"
                :href="url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-950 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:-translate-y-0.5 flex items-center justify-center transition-all duration-200"
              >
                <fa :icon="`fa-brands fa-${key}`" />
              </a>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(stat, i) in profile.stats"
            :key="stat.label"
            v-reveal.up
            :class="`reveal-delay-${(i + 1) * 100}`"
            class="card-interactive text-center group bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6"
          >
            <div class="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              <template v-if="stat.key === 'years_of_experience' || stat.value === 'auto'">
                <StatsCounter :end="yearsOfExperienceNum" suffix="+" />
              </template>
              <template v-else>{{ stat.value }}</template>
            </div>
            <div class="text-gray-500 dark:text-gray-400 text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values / Philosophy -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="section-container">
        <div v-reveal.up class="text-center mb-12">
          <h2 class="section-title">Prinsip Kerja Saya</h2>
          <p class="section-subtitle">Nilai-nilai yang saya pegang dalam setiap proyek</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(value, i) in workValues" :key="value.title" v-reveal.up :class="`reveal-delay-${(i + 1) * 100}`" class="card-interactive text-center group bg-white dark:bg-gray-950 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
            <div class="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-4 text-2xl group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
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

const avatarSrc = computed(() => profile.avatar_url || profile.avatar || '')
const yearsOfExperience = computed(() => `${new Date().getFullYear() - profile.career_start_year}+`)
const yearsOfExperienceNum = computed(() => new Date().getFullYear() - profile.career_start_year)

const contactItems = [
  { icon: 'fa-solid fa-location-dot', label: 'Location', value: profile.location },
  { icon: 'fa-solid fa-envelope', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: 'fa-solid fa-phone', label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { icon: 'fa-solid fa-globe', label: 'Website', value: profile.website, href: profile.website, external: true },
]

const workValues = [
  {
    icon: 'fa-solid fa-code',
    title: 'Clean Code',
    desc: 'Kode yang bersih, terdokumentasi, dan mudah dipahami oleh siapapun adalah prioritas utama.',
  },
  {
    icon: 'fa-solid fa-vial',
    title: 'Automated Testing',
    desc: 'Setiap langkah di-test dengan logging jelas, screenshot, dan video. Debugging lebih cepat dan hasilnya lebih confident.',
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
