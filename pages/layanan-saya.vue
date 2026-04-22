<template>
  <div>
    <PageHeader
      icon="fa-solid fa-briefcase"
      tag="Apa yang saya bisa"
      title="Layanan Saya"
      subtitle="Solusi digital komprehensif yang saya tawarkan untuk kebutuhan bisnis Anda"
    />

    <section class="py-16">
      <div class="section-container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="service in services"
            :key="service.id"
            class="card group hover:-translate-y-1"
          >
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0 text-2xl group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-primary-600 transition-all duration-300">
                <fa :icon="service.icon" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ service.title }}</h3>
                <p class="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{{ service.description }}</p>
                <ul class="space-y-1.5">
                  <li
                    v-for="feature in service.features"
                    :key="feature"
                    class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <fa icon="fa-solid fa-check" class="text-primary-500 text-xs flex-shrink-0" />
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="section-container">
        <div class="text-center mb-12">
          <h2 class="section-title">Cara Kerja Saya</h2>
          <p class="section-subtitle">Proses terstruktur untuk memastikan hasil terbaik</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(step, i) in processSteps"
            :key="step.title"
            class="card text-center relative"
          >
            <div class="absolute -top-3 left-6 w-7 h-7 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center">
              {{ i + 1 }}
            </div>
            <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-4">
              <fa :icon="step.icon" class="text-xl" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16">
      <div class="section-container">
        <div class="card bg-gradient-to-r from-primary-600 to-indigo-700 border-0 text-center text-white">
          <h2 class="text-2xl font-bold mb-3">Siap Mulai Proyek?</h2>
          <p class="text-primary-100 mb-6 max-w-md mx-auto">Ceritakan kebutuhan Anda dan saya akan bantu wujudkan</p>
          <NuxtLink
            to="/hubungi-saya"
            class="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors shadow"
          >
            <fa icon="fa-solid fa-envelope" />
            Hubungi Saya Sekarang
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()
const services = useServices()

const processSteps = [
  { icon: 'fa-solid fa-comments', title: 'Konsultasi', desc: 'Diskusi mendalam tentang kebutuhan dan tujuan proyek Anda.' },
  { icon: 'fa-solid fa-pencil-ruler', title: 'Perencanaan', desc: 'Merancang solusi dan menyiapkan proposal teknis yang detail.' },
  { icon: 'fa-solid fa-code', title: 'Pengembangan', desc: 'Implementasi dengan kode berkualitas tinggi dan update berkala.' },
  { icon: 'fa-solid fa-rocket', title: 'Peluncuran', desc: 'Testing menyeluruh, deployment, dan dukungan pasca-launch.' },
]

useSeoMeta({
  title: `Layanan Saya - ${profile.name}`,
  description: 'Layanan pengembangan web, mobile app, UI/UX design, dan DevOps profesional.',
})
</script>
