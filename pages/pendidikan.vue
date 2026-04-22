<template>
  <div>
    <PageHeader
      icon="fa-solid fa-graduation-cap"
      tag="Latar belakang akademis"
      title="Pendidikan"
      subtitle="Perjalanan pendidikan formal yang membentuk fondasi pengetahuan saya"
    />

    <section class="py-16">
      <div class="section-container max-w-3xl">
        <!-- Timeline -->
        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 to-transparent hidden sm:block" />

          <div class="space-y-8">
            <div
              v-for="edu in education"
              :key="edu.id"
              class="relative sm:pl-16"
            >
              <!-- Timeline Dot -->
              <div class="hidden sm:flex absolute left-0 top-6 w-12 h-12 rounded-full bg-primary-600 items-center justify-center text-white shadow-lg shadow-primary-200 dark:shadow-primary-900">
                <fa icon="fa-solid fa-graduation-cap" />
              </div>

              <div class="card">
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ edu.degree }}</h3>
                    <p class="text-primary-600 dark:text-primary-400 font-medium">{{ edu.institution }}</p>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <span class="badge bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 whitespace-nowrap">
                      <fa icon="fa-solid fa-calendar" class="mr-1 text-xs" />
                      {{ edu.year_start }} – {{ edu.year_end }}
                    </span>
                    <span v-if="edu.gpa" class="badge bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300">
                      IPK {{ edu.gpa }}
                    </span>
                  </div>
                </div>

                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-3">
                  <fa icon="fa-solid fa-location-dot" class="text-primary-400" />
                  {{ edu.location }}
                </div>

                <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{{ edu.description }}</p>

                <div v-if="edu.achievements.length">
                  <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Prestasi:</p>
                  <ul class="space-y-1.5">
                    <li
                      v-for="achievement in edu.achievements"
                      :key="achievement"
                      class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <fa icon="fa-solid fa-trophy" class="text-yellow-500 text-xs flex-shrink-0" />
                      {{ achievement }}
                    </li>
                  </ul>
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
const education = useEducation()

useSeoMeta({
  title: `Pendidikan - ${profile.name}`,
  description: 'Latar belakang pendidikan formal dan prestasi akademis.',
})
</script>
