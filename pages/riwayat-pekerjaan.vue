<template>
  <div>
    <PageHeader
      icon="fa-solid fa-timeline"
      tag="Perjalanan karir"
      title="Riwayat Pekerjaan"
      subtitle="Pengalaman profesional yang membentuk saya menjadi developer yang saya sekarang"
    />

    <section class="py-16">
      <div class="section-container max-w-3xl">
        <!-- Search -->
        <div class="mb-8">
          <SearchInput v-model="search" placeholder="Cari posisi, perusahaan, teknologi..." />
        </div>

        <div v-if="search && filteredExperience.length === 0" class="text-center py-16">
          <fa icon="fa-solid fa-magnifying-glass" class="text-5xl text-gray-300 dark:text-gray-700 mb-4 block" />
          <p class="text-gray-500 dark:text-gray-400 mb-2">Tidak ada hasil</p>
          <button @click="search = ''" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">Reset</button>
        </div>

        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-primary-300 to-transparent hidden sm:block" />

          <div class="space-y-8">
            <div
              v-for="exp in filteredExperience"
              :key="exp.id"
              class="relative sm:pl-20"
            >
              <!-- Timeline Icon -->
              <div class="hidden sm:flex absolute left-0 top-6 w-12 h-12 rounded-full flex-shrink-0 items-center justify-center text-white shadow-lg"
                :class="exp.is_current ? 'bg-primary-600 shadow-primary-200 dark:shadow-primary-900' : 'bg-gray-400 dark:bg-gray-600'"
              >
                <fa :icon="exp.company_logo" />
              </div>

              <div class="card">
                <!-- Header -->
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ exp.role }}</h3>
                      <span
                        v-if="exp.is_current"
                        class="badge bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 text-xs"
                      >
                        <span class="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 animate-pulse inline-block" />
                        Saat ini
                      </span>
                    </div>
                    <p class="text-primary-600 dark:text-primary-400 font-medium">{{ exp.company }}</p>
                  </div>
                  <div class="flex flex-wrap gap-2 flex-shrink-0">
                    <span class="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
                      <fa icon="fa-solid fa-calendar" class="mr-1" />
                      {{ exp.year_start }} – {{ exp.year_end }}
                    </span>
                    <span class="badge bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-xs">
                      {{ exp.employment_type }}
                    </span>
                  </div>
                </div>

                <!-- Location -->
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
                  <fa icon="fa-solid fa-location-dot" class="text-primary-400" />
                  {{ exp.location }}
                </div>

                <!-- Description -->
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{{ exp.description }}</p>

                <!-- Responsibilities -->
                <div class="mb-4">
                  <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tanggung Jawab:</p>
                  <ul class="space-y-1.5">
                    <li
                      v-for="resp in exp.responsibilities"
                      :key="resp"
                      class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <fa icon="fa-solid fa-circle-check" class="text-primary-500 text-xs flex-shrink-0 mt-0.5" />
                      {{ resp }}
                    </li>
                  </ul>
                </div>

                <!-- Tech Stack -->
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tech in exp.tech_stack"
                    :key="tech"
                    class="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs"
                  >{{ tech }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()
const experience = useExperience()

const search = ref('')

const filteredExperience = computed(() => {
  if (!search.value.trim()) return experience
  const q = search.value.toLowerCase()
  return experience.filter((e: any) =>
    e.role.toLowerCase().includes(q) ||
    e.company.toLowerCase().includes(q) ||
    e.description.toLowerCase().includes(q) ||
    e.tech_stack.some((t: string) => t.toLowerCase().includes(q)) ||
    e.responsibilities.some((r: string) => r.toLowerCase().includes(q))
  )
})

useSeoMeta({
  title: `Riwayat Pekerjaan - ${profile.name}`,
  description: 'Pengalaman profesional dan karir sebagai full stack developer.',
})
</script>
