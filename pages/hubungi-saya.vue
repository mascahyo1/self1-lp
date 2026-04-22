<template>
  <div>
    <PageHeader
      icon="fa-solid fa-envelope"
      tag="Mari terhubung"
      title="Hubungi Saya"
      subtitle="Ada proyek menarik? Atau sekadar ingin menyapa? Saya senang mendengar dari Anda"
    />

    <section class="py-16">
      <div class="section-container">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <!-- Contact Info (2/5) -->
          <div class="lg:col-span-2 space-y-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Senang berkenalan!</h2>
              <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
                Apakah Anda memiliki pertanyaan, ingin berdiskusi tentang proyek, atau sekadar ingin terhubung — jangan ragu untuk menghubungi saya.
              </p>
            </div>

            <!-- Contact Cards -->
            <div class="space-y-4">
              <a
                :href="`mailto:${profile.email}`"
                class="card flex items-center gap-4 hover:-translate-y-0.5 group"
              >
                <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <fa icon="fa-solid fa-envelope" class="text-xl" />
                </div>
                <div>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Email</p>
                  <p class="font-medium text-gray-900 dark:text-white">{{ profile.email }}</p>
                </div>
              </a>

              <a
                :href="`tel:${profile.phone}`"
                class="card flex items-center gap-4 hover:-translate-y-0.5 group"
              >
                <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <fa icon="fa-solid fa-phone" class="text-xl" />
                </div>
                <div>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Telepon / WhatsApp</p>
                  <p class="font-medium text-gray-900 dark:text-white">{{ profile.phone }}</p>
                </div>
              </a>

              <div class="card flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                  <fa icon="fa-solid fa-location-dot" class="text-xl" />
                </div>
                <div>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Lokasi</p>
                  <p class="font-medium text-gray-900 dark:text-white">{{ profile.location }}</p>
                </div>
              </div>
            </div>

            <!-- Social -->
            <div>
              <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Temukan saya di:</p>
              <div class="flex flex-wrap gap-2">
                <a
                  v-for="(url, key) in profile.social"
                  :key="key"
                  :href="url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-950 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all text-sm font-medium"
                >
                  <fa :icon="`fa-brands fa-${key}`" />
                  <span class="capitalize">{{ key }}</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form (3/5) -->
          <div class="lg:col-span-3">
            <div class="card">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Kirim Pesan</h3>

              <form @submit.prevent="submitForm" class="space-y-5">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nama *</label>
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      placeholder="John Doe"
                      class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
                    <input
                      v-model="form.email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subjek *</label>
                  <input
                    v-model="form.subject"
                    type="text"
                    required
                    placeholder="Diskusi proyek web..."
                    class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Budget (opsional)</label>
                  <select
                    v-model="form.budget"
                    class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Pilih range budget</option>
                    <option value="< 5jt">Kurang dari 5 juta</option>
                    <option value="5-15jt">5 – 15 juta</option>
                    <option value="15-50jt">15 – 50 juta</option>
                    <option value="> 50jt">Lebih dari 50 juta</option>
                    <option value="discuss">Diskusi dulu</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Pesan *</label>
                  <textarea
                    v-model="form.message"
                    required
                    rows="5"
                    placeholder="Ceritakan tentang proyek atau kebutuhan Anda..."
                    class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                <!-- Status Message -->
                <Transition name="fade">
                  <div
                    v-if="formStatus"
                    :class="formStatus === 'success' ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'"
                    class="p-4 rounded-xl border text-sm flex items-center gap-2"
                  >
                    <fa :icon="formStatus === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-xmark'" />
                    {{ formStatus === 'success' ? 'Pesan berhasil dikirim! Saya akan membalas dalam 1-2 hari kerja.' : 'Terjadi kesalahan. Silakan coba lagi atau hubungi via email.' }}
                  </div>
                </Transition>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full btn-primary justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <fa :icon="isSubmitting ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-paper-plane'" />
                  {{ isSubmitting ? 'Mengirim...' : 'Kirim Pesan' }}
                </button>

                <p class="text-xs text-center text-gray-400 dark:text-gray-500">
                  Atau langsung email ke
                  <a :href="`mailto:${profile.email}`" class="text-primary-600 dark:text-primary-400 hover:underline">{{ profile.email }}</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  budget: '',
  message: '',
})

const isSubmitting = ref(false)
const formStatus = ref<'success' | 'error' | null>(null)

async function submitForm() {
  isSubmitting.value = true
  formStatus.value = null

  // Simulasi pengiriman (replace dengan API call yang sesungguhnya)
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Demo: selalu sukses. Di produksi, hubungkan ke Formspree, EmailJS, atau backend.
  formStatus.value = 'success'
  isSubmitting.value = false

  // Reset form setelah sukses
  Object.assign(form, { name: '', email: '', subject: '', budget: '', message: '' })

  setTimeout(() => { formStatus.value = null }, 5000)
}

useSeoMeta({
  title: `Hubungi Saya - ${profile.name}`,
  description: 'Hubungi saya untuk diskusi proyek, kolaborasi, atau sekadar menyapa.',
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
