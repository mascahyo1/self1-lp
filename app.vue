<template>
  <div>
    <NuxtLoadingIndicator
      color="repeating-linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)"
      :height="3"
      :duration="2000"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
