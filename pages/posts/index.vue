<template>
  <div>
    <PageHeader
      icon="fa-solid fa-pen-nib"
      tag="Tulisan & artikel"
      title="Posts"
      subtitle="Catatan, tutorial, dan pengalaman saya seputar dunia pengembangan web"
    />

    <section class="py-16">
      <div class="section-container">
        <!-- Search -->
        <div class="max-w-lg mx-auto mb-6">
          <SearchInput v-model="search" placeholder="Cari judul, kategori, tag..." />
        </div>

        <!-- Result hint -->
        <p v-if="search" class="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
          <span class="font-semibold text-gray-900 dark:text-white">{{ filteredPosts.length }}</span>
          hasil untuk "<span class="text-primary-600 dark:text-primary-400">{{ search }}</span>"
        </p>

        <!-- Filter -->
        <div class="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            @click="activeFilter = ''"
            :class="activeFilter === '' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'"
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:border-primary-300"
          >
            Semua ({{ posts.length }})
          </button>
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeFilter = cat"
            :class="activeFilter === cat ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'"
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:border-primary-300"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Featured Post -->
        <div v-if="!activeFilter && featuredPost" class="mb-10">
          <NuxtLink :to="`/posts/${featuredPost.slug}`" class="card overflow-hidden p-0 group block hover:-translate-y-1">
            <div class="grid grid-cols-1 md:grid-cols-2">
              <div class="h-56 md:h-auto bg-gradient-to-br from-primary-500 to-indigo-600 relative flex items-center justify-center">
                <fa icon="fa-solid fa-pen-nib" class="text-7xl text-white/20" />
                <div class="absolute top-4 left-4">
                  <span class="badge bg-yellow-400 text-yellow-900 text-xs">
                    <fa icon="fa-solid fa-star" class="mr-1" />
                    Featured
                  </span>
                </div>
              </div>
              <div class="p-8 flex flex-col justify-center">
                <div class="flex items-center gap-3 mb-3">
                  <span class="badge bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-xs">
                    {{ featuredPost.category }}
                  </span>
                  <span class="text-xs text-gray-400 dark:text-gray-500">
                    <fa icon="fa-solid fa-clock" class="mr-1" />
                    {{ featuredPost.read_time }} menit baca
                  </span>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {{ featuredPost.title }}
                </h2>
                <p class="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{{ featuredPost.excerpt }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="tag in featuredPost.tags.slice(0, 2)"
                      :key="tag"
                      class="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs"
                    >{{ tag }}</span>
                  </div>
                  <span class="text-xs text-gray-400">{{ formatDate(featuredPost.published_at) }}</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Posts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TransitionGroup name="list">
            <NuxtLink
              v-for="post in filteredPosts"
              :key="post.id"
              :to="`/posts/${post.slug}`"
              class="card overflow-hidden p-0 group block hover:-translate-y-1"
            >
              <!-- Cover -->
              <div class="h-44 bg-gradient-to-br relative flex items-center justify-center overflow-hidden"
                :class="getCoverGradient(post.id)"
              >
                <fa icon="fa-solid fa-pen-nib" class="text-5xl text-white/20" />
                <div class="absolute top-3 left-3">
                  <span class="badge bg-white/20 backdrop-blur-sm text-white text-xs">{{ post.category }}</span>
                </div>
                <div v-if="post.featured" class="absolute top-3 right-3">
                  <span class="badge bg-yellow-400 text-yellow-900 text-xs">
                    <fa icon="fa-solid fa-star" />
                  </span>
                </div>
              </div>

              <!-- Content -->
              <div class="p-5">
                <div class="flex items-center gap-2 mb-2 text-xs text-gray-400 dark:text-gray-500">
                  <fa icon="fa-solid fa-calendar" />
                  {{ formatDate(post.published_at) }}
                  <span class="mx-1">·</span>
                  <fa icon="fa-solid fa-clock" />
                  {{ post.read_time }} menit
                </div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {{ post.title }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">{{ post.excerpt }}</p>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in post.tags.slice(0, 2)"
                    :key="tag"
                    class="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs"
                  >{{ tag }}</span>
                </div>
              </div>
            </NuxtLink>
          </TransitionGroup>
        </div>

        <div v-if="filteredPosts.length === 0" class="text-center py-20">
          <fa icon="fa-solid fa-pen-nib" class="text-5xl text-gray-300 dark:text-gray-700 mb-4 block" />
          <p class="text-gray-500 dark:text-gray-400 mb-2">Tidak ada post yang cocok</p>
          <button @click="search = ''; activeFilter = ''" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
            Reset pencarian
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()
const posts = usePosts()

const search = ref('')
const activeFilter = ref('')

const categories = computed(() => {
  const cats = new Set<string>()
  posts.forEach((p: any) => cats.add(p.category))
  return Array.from(cats)
})

const featuredPost = computed(() => !search.value && !activeFilter.value ? posts.find((p: any) => p.featured) : null)

const filteredPosts = computed(() => {
  let result = [...posts].sort(
    (a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  ) as any[]
  if (activeFilter.value) result = result.filter(p => p.category === activeFilter.value)
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t: string) => t.toLowerCase().includes(q))
    )
  }
  // Sembunyikan featured dari grid jika tidak ada search/filter (sudah tampil di slot featured)
  if (!search.value && !activeFilter.value) result = result.filter(p => !p.featured)
  return result
})

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
  title: `Posts - ${profile.name}`,
  description: 'Kumpulan tulisan, tutorial, dan catatan seputar pengembangan web.',
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
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
