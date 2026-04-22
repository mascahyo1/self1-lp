<template>
  <nav
    class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    :class="scrolled
      ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800'
      : 'bg-transparent'"
  >
    <div class="section-container">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm group-hover:bg-primary-700 transition-colors">
            {{ initials }}
          </div>
          <span class="font-bold text-gray-900 dark:text-white hidden sm:block">{{ profile.name.split(' ')[0] }}</span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in mainLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
            :class="{ 'active bg-primary-50 dark:bg-primary-950/50': $route.path === link.to }"
          >
            {{ link.label }}
          </NuxtLink>

          <!-- Dropdown Lainnya -->
          <div v-if="moreLinks.length > 0" class="relative group">
            <button
              class="nav-link px-3 py-2 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-800 text-sm flex items-center gap-1"
              :class="{ 'active bg-primary-50 dark:bg-primary-950/50': moreLinks.some(link => $route.path === link.to) }"
            >
              Lainnya
              <fa icon="fa-solid fa-chevron-down" class="text-[10px] opacity-70 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            
            <div class="absolute top-full right-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top translate-y-2 group-hover:translate-y-0 z-50">
              <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 py-2">
                <NuxtLink
                  v-for="link in moreLinks"
                  :key="link.to"
                  :to="link.to"
                  class="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  :class="{ 'font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20': $route.path === link.to }"
                >
                  {{ link.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-2">
          <!-- Dark Mode Toggle -->
          <button
            @click="toggleColorMode"
            class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :title="isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'"
          >
            <fa :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" class="text-base" />
          </button>

          <!-- Hire Me Button (desktop) -->
          <NuxtLink to="/hubungi-saya" class="hidden md:flex btn-primary text-sm py-2 px-4">
            <fa icon="fa-solid fa-envelope" />
            Hire Me
          </NuxtLink>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileOpen = !mobileOpen"
            class="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <fa :icon="mobileOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" class="text-base" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 pb-4"
      >
        <div class="section-container pt-2 flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            @click="mobileOpen = false"
            class="nav-link block px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
            :class="{ 'active bg-primary-50 dark:bg-primary-950/50': $route.path === link.to }"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink to="/hubungi-saya" @click="mobileOpen = false" class="btn-primary text-sm py-2.5 mt-2 justify-center">
            <fa icon="fa-solid fa-envelope" />
            Hire Me
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const profile = useProfile()
const colorMode = useColorMode()

const scrolled = ref(false)
const mobileOpen = ref(false)

const isDark = computed(() => colorMode.value === 'dark')

const initials = computed(() =>
  profile.name.split(' ').slice(0, 2).map((w: string) => w[0]).join('')
)

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang-saya', label: 'Tentang' },
  { to: '/layanan-saya', label: 'Layanan' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/skill-saya', label: 'Skill' },
  { to: '/pendidikan', label: 'Pendidikan' },
  { to: '/sertifikat', label: 'Sertifikat' },
  { to: '/riwayat-pekerjaan', label: 'Pengalaman' },
  { to: '/posts', label: 'Posts' },
  { to: '/hubungi-saya', label: 'Kontak' },
]

const mainLinks = computed(() => navLinks.slice(0, 4))
const moreLinks = computed(() => navLinks.slice(4))

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
  const handleScroll = () => {
    scrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', handleScroll)
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>
