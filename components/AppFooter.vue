<template>
  <footer class="bg-gray-950 text-gray-400 py-12 mt-20">
    <div class="section-container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
              {{ initials }}
            </div>
            <span class="font-bold text-white">{{ profile.name }}</span>
          </div>
          <p class="text-sm leading-relaxed">{{ profile.tagline }}</p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold mb-3">Halaman</h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm hover:text-primary-400 transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-white font-semibold mb-3">Kontak</h4>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <fa icon="fa-solid fa-envelope" class="text-primary-500 w-4" />
              <a :href="`mailto:${profile.email}`" class="hover:text-primary-400 transition-colors">{{ profile.email }}</a>
            </li>
            <li class="flex items-center gap-2">
              <fa icon="fa-solid fa-phone" class="text-primary-500 w-4" />
              <span>{{ profile.phone }}</span>
            </li>
            <li class="flex items-center gap-2">
              <fa icon="fa-solid fa-location-dot" class="text-primary-500 w-4" />
              <span>{{ profile.location }}</span>
            </li>
          </ul>

          <!-- Social -->
          <div class="flex items-center gap-3 mt-4">
            <a
              v-for="(url, key) in socialLinks"
              :key="key"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-lg bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
            >
              <fa :icon="`fa-brands fa-${key}`" class="text-sm" />
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} {{ profile.name }}. Hak cipta dilindungi.</p>
        <p class="flex items-center gap-1">
          Dibuat dengan
          <fa icon="fa-solid fa-heart" class="text-red-500" />
          menggunakan Nuxt.js & Tailwind CSS
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const profile = useProfile()

const initials = computed(() =>
  profile.name.split(' ').slice(0, 2).map((w: string) => w[0]).join('')
)

const quickLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang-saya', label: 'Tentang Saya' },
  { to: '/layanan-saya', label: 'Layanan Saya' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/hubungi-saya', label: 'Hubungi Saya' },
]

const socialLinks = {
  github: profile.social.github,
  linkedin: profile.social.linkedin,
  twitter: profile.social.twitter,
  instagram: profile.social.instagram,
}
</script>
