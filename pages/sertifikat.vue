<template>
  <div>
    <PageHeader
      icon="fa-solid fa-certificate"
      tag="Lisensi & sertifikasi"
      title="Sertifikat"
      subtitle="Sertifikasi profesional yang saya raih untuk membuktikan kompetensi"
    />

    <section class="py-16">
      <div class="section-container">
        <!-- Filter Tags -->
        <div class="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            @click="activeFilter = ''"
            :class="activeFilter === '' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary-300'"
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
          >
            Semua ({{ certificates.length }})
          </button>
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="activeFilter = tag"
            :class="activeFilter === tag ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary-300'"
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
          >
            {{ tag }}
          </button>
        </div>

        <!-- Certificates Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TransitionGroup name="list">
            <div
              v-for="cert in filteredCertificates"
              :key="cert.id"
              class="card group hover:-translate-y-1"
            >
              <!-- Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 text-2xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <fa :icon="cert.issuer_logo" />
                </div>
                <span class="text-xs text-gray-400 dark:text-gray-500">
                  <fa icon="fa-solid fa-calendar-check" class="mr-1" />
                  {{ formatDate(cert.date) }}
                </span>
              </div>

              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">{{ cert.title }}</h3>
              <p class="text-primary-600 dark:text-primary-400 text-sm font-medium mb-3">{{ cert.issuer }}</p>

              <div class="text-xs text-gray-400 dark:text-gray-500 mb-4 font-mono">
                ID: {{ cert.credential_id }}
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 mb-4">
                <span
                  v-for="tag in cert.tags"
                  :key="tag"
                  class="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs"
                >{{ tag }}</span>
              </div>

              <!-- Verify Link -->
              <a
                :href="cert.credential_url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                <fa icon="fa-solid fa-shield-check" class="text-xs" />
                Verifikasi Sertifikat
              </a>
            </div>
          </TransitionGroup>
        </div>

        <div v-if="filteredCertificates.length === 0" class="text-center py-20 text-gray-400">
          <fa icon="fa-solid fa-filter" class="text-4xl mb-4 block" />
          Tidak ada sertifikat untuk filter ini
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()
const certificates = useCertificates()

const activeFilter = ref('')

const allTags = computed(() => {
  const tags = new Set<string>()
  certificates.forEach((c: any) => c.tags.forEach((t: string) => tags.add(t)))
  return Array.from(tags)
})

const filteredCertificates = computed(() =>
  activeFilter.value
    ? certificates.filter((c: any) => c.tags.includes(activeFilter.value))
    : certificates
)

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  return `${months[parseInt(month) - 1]} ${year}`
}

useSeoMeta({
  title: `Sertifikat - ${profile.name}`,
  description: 'Koleksi sertifikasi profesional di bidang cloud, frontend, backend, dan DevOps.',
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
