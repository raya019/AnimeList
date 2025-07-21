<script setup>
defineProps({
  nameRouter: { type: String },
  paramRouter: { type: Number },
  styleClass: { type: Array },
  src: { type: String },
  alt: { type: Number },
})
</script>

<template>
  <router-link
    :to="{ name: nameRouter, params: { id: paramRouter } }"
    :class="['flex flex-wrap overflow-hidden rounded-md border-2 border-yellow-300', styleClass]"
  >
    <img
      :src="src"
      :alt="alt"
      class="h-full w-full object-cover duration-300 ease-in-out hover:scale-105"
    />

    <slot />
  </router-link>
</template>
