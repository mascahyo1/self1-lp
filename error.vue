<template>
  <NuxtLayout>
    <section class="min-h-screen flex items-center justify-center py-20">
      <div class="section-container text-center">
        <div class="text-8xl font-black text-primary-200 dark:text-primary-900 mb-6 select-none">
          {{ error?.statusCode || 404 }}
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {{ error?.statusCode === 404 ? 'Halaman Tidak Ditemukan' : 'Terjadi Kesalahan' }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {{ error?.message || 'Halaman yang Anda cari tidak ada atau sudah dipindahkan.' }}
        </p>
        <div class="flex flex-wrap gap-3 justify-center">
          <button @click="handleError" class="btn-primary">
            <fa icon="fa-solid fa-house" />
            Ke Beranda
          </button>
          <button @click="() => history.back()" class="btn-outline">
            <fa icon="fa-solid fa-arrow-left" />
            Kembali
          </button>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message: string } | null }>()

function handleError() {
  clearError({ redirect: '/' })
}
</script>
