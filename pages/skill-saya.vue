<template>
  <div>
    <PageHeader
      icon="fa-solid fa-chart-bar"
      tag="Kemampuan teknis"
      title="Skill Saya"
      subtitle="Teknologi dan alat yang saya kuasai dalam pekerjaan sehari-hari"
    />

    <section class="py-16">
      <div class="section-container">
        <!-- Search -->
        <div class="max-w-lg mx-auto mb-10">
          <SearchInput v-model="search" placeholder="Cari nama skill atau teknologi..." />
        </div>

        <!-- Empty state -->
        <div v-if="search && filteredCategories.length === 0" class="text-center py-16">
          <fa icon="fa-solid fa-magnifying-glass" class="text-5xl text-gray-300 dark:text-gray-700 mb-4 block" />
          <p class="text-gray-500 dark:text-gray-400 mb-2">Skill tidak ditemukan</p>
          <button @click="search = ''" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">Reset</button>
        </div>

        <div class="space-y-12">
          <div
            v-for="category in filteredCategories"
            :key="category.name"
          >
            <!-- Category Header -->
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400">
                <fa :icon="category.icon" />
              </div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ category.name }}</h2>
            </div>

            <!-- Skills Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="skill in category.skills"
                :key="skill.name"
                class="card group"
              >
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-950 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      <fa :icon="skill.icon" />
                    </div>
                    <span class="font-medium text-gray-900 dark:text-white text-sm">{{ skill.name }}</span>
                  </div>
                  <span class="text-primary-600 dark:text-primary-400 font-semibold text-sm">{{ skill.level }}%</span>
                </div>

                <!-- Progress Bar -->
                <div class="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full transition-all duration-1000"
                    :style="{ width: `${skill.level}%` }"
                  />
                </div>

                <!-- Level Label -->
                <div class="mt-1.5 text-right">
                  <span class="text-xs text-gray-400 dark:text-gray-500">
                    {{ getLevelLabel(skill.level) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Cloud -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="section-container text-center">
        <h2 class="section-title">Tech Stack Favorit</h2>
        <p class="section-subtitle mb-10">Kombinasi teknologi yang paling sering saya gunakan</p>
        <div class="flex flex-wrap justify-center gap-3">
          <span
            v-for="tech in allSkills"
            :key="tech.name"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 cursor-default"
            :class="tech.level >= 85 ? 'border-primary-200 dark:border-primary-900' : ''"
          >
            <fa :icon="tech.icon" class="text-sm" />
            <span class="text-sm font-medium">{{ tech.name }}</span>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()
const skills = useSkills()

const search = ref('')

const filteredCategories = computed(() => {
  if (!search.value.trim()) return skills.categories
  const q = search.value.toLowerCase()
  return skills.categories.map((cat: any) => ({
    ...cat,
    skills: cat.skills.filter((s: any) => s.name.toLowerCase().includes(q)),
  })).filter((cat: any) => cat.skills.length > 0)
})

const allSkills = computed(() =>
  skills.categories.flatMap((c: any) => c.skills).sort((a: any, b: any) => b.level - a.level)
)

function getLevelLabel(level: number): string {
  if (level >= 90) return 'Expert'
  if (level >= 75) return 'Advanced'
  if (level >= 60) return 'Intermediate'
  return 'Beginner'
}

useSeoMeta({
  title: `Skill Saya - ${profile.name}`,
  description: 'Kemampuan teknis dan teknologi yang saya kuasai sebagai full stack developer.',
})
</script>
