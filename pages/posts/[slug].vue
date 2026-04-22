<template>
  <div v-if="post">
    <!-- Hero -->
    <section class="pt-24 pb-0">
      <div class="h-64 md:h-80 relative flex items-center justify-center overflow-hidden"
        :class="getCoverGradient(post.id)"
      >
        <fa icon="fa-solid fa-pen-nib" class="text-9xl text-white/10" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div class="absolute bottom-0 left-0 right-0 section-container pb-8">
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <NuxtLink
              to="/posts"
              class="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors"
            >
              <fa icon="fa-solid fa-arrow-left" class="text-xs" />
              Semua Posts
            </NuxtLink>
            <span class="text-white/40">·</span>
            <span class="badge bg-white/20 backdrop-blur-sm text-white text-xs">{{ post.category }}</span>
            <span v-if="post.featured" class="badge bg-yellow-400 text-yellow-900 text-xs">
              <fa icon="fa-solid fa-star" class="mr-1" />
              Featured
            </span>
          </div>
          <h1 class="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">{{ post.title }}</h1>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12">
      <div class="section-container">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <!-- Article -->
          <article class="lg:col-span-3">
            <!-- Meta -->
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 text-sm font-bold">
                  {{ profile.name[0] }}
                </div>
                <span class="font-medium text-gray-700 dark:text-gray-300">{{ profile.name }}</span>
              </div>
              <span class="flex items-center gap-1.5">
                <fa icon="fa-solid fa-calendar" />
                {{ formatDate(post.published_at) }}
              </span>
              <span class="flex items-center gap-1.5">
                <fa icon="fa-solid fa-clock" />
                {{ post.read_time }} menit baca
              </span>
            </div>

            <!-- Lead / excerpt -->
            <p class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 font-medium">
              {{ post.excerpt }}
            </p>

            <!-- Rendered Content -->
            <div class="prose dark:prose-invert max-w-none" v-html="renderedContent" />

            <!-- Tags -->
            <div class="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
              <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tags:</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="badge bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                >{{ tag }}</span>
              </div>
            </div>

            <!-- Navigation -->
            <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NuxtLink
                v-if="prevPost"
                :to="`/posts/${prevPost.slug}`"
                class="card hover:-translate-y-0.5 group"
              >
                <p class="text-xs text-gray-400 mb-1 flex items-center gap-1">
                  <fa icon="fa-solid fa-arrow-left" />
                  Post Sebelumnya
                </p>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {{ prevPost.title }}
                </p>
              </NuxtLink>
              <div v-else />
              <NuxtLink
                v-if="nextPost"
                :to="`/posts/${nextPost.slug}`"
                class="card hover:-translate-y-0.5 text-right group sm:col-start-2"
              >
                <p class="text-xs text-gray-400 mb-1 flex items-center gap-1 justify-end">
                  Post Berikutnya
                  <fa icon="fa-solid fa-arrow-right" />
                </p>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {{ nextPost.title }}
                </p>
              </NuxtLink>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="lg:col-span-1 space-y-6">
            <!-- Author -->
            <div class="card">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Tentang Penulis</h3>
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg">
                  {{ profile.name[0] }}
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white text-sm">{{ profile.name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ profile.tagline }}</p>
                </div>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{{ profile.bio }}</p>
              <NuxtLink to="/tentang-saya" class="text-xs text-primary-600 dark:text-primary-400 hover:underline">
                Lihat profil lengkap →
              </NuxtLink>
            </div>

            <!-- Other Posts -->
            <div class="card">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Post Lainnya</h3>
              <ul class="space-y-3">
                <li
                  v-for="other in otherPosts"
                  :key="other.id"
                >
                  <NuxtLink
                    :to="`/posts/${other.slug}`"
                    class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2 block"
                  >
                    {{ other.title }}
                  </NuxtLink>
                  <p class="text-xs text-gray-400 mt-0.5">{{ formatDate(other.published_at) }}</p>
                </li>
              </ul>
              <NuxtLink to="/posts" class="text-xs text-primary-600 dark:text-primary-400 hover:underline mt-4 block">
                Lihat semua posts →
              </NuxtLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>

  <!-- 404 -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <p class="text-gray-400 mb-4">Post tidak ditemukan</p>
      <NuxtLink to="/posts" class="btn-primary">Kembali ke Posts</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const profile = useProfile()
const posts = usePosts()

const post = computed(() => posts.find((p: any) => p.slug === route.params.slug))

const sortedPosts = [...posts].sort(
  (a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
)

const currentIndex = computed(() => sortedPosts.findIndex((p: any) => p.slug === route.params.slug))
const prevPost = computed(() => currentIndex.value < sortedPosts.length - 1 ? sortedPosts[currentIndex.value + 1] : null)
const nextPost = computed(() => currentIndex.value > 0 ? sortedPosts[currentIndex.value - 1] : null)
const otherPosts = computed(() => sortedPosts.filter((p: any) => p.slug !== route.params.slug).slice(0, 4))

// Simple markdown renderer (headings, bold, code, lists, paragraphs)
const renderedContent = computed(() => {
  if (!post.value) return ''
  return post.value.content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>(\n|$))+/g, (match) => `<ul>${match}</ul>`)
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^(?!<[hulo]|<pre|<li)(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
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
  title: post.value ? `${post.value.title} - ${profile.name}` : 'Post Not Found',
  description: post.value?.excerpt,
})
</script>

<style>
.prose h1 { @apply text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4; }
.prose h2 { @apply text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3; }
.prose h3 { @apply text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-2; }
.prose p  { @apply text-gray-600 dark:text-gray-400 leading-relaxed mb-4; }
.prose strong { @apply font-semibold text-gray-800 dark:text-gray-200; }
.prose ul  { @apply list-disc list-inside space-y-1.5 mb-4 text-gray-600 dark:text-gray-400; }
.prose ol  { @apply list-decimal list-inside space-y-1.5 mb-4 text-gray-600 dark:text-gray-400; }
.prose li  { @apply leading-relaxed; }
.prose code {
  @apply bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400 px-1.5 py-0.5 rounded text-sm font-mono;
}
.prose pre {
  @apply bg-gray-900 dark:bg-gray-950 rounded-xl p-5 mb-6 overflow-x-auto border border-gray-800;
}
.prose pre code {
  @apply bg-transparent text-gray-100 dark:text-gray-200 p-0 text-sm;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
