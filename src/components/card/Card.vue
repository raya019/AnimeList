<script setup>
defineProps({
  styleClass: { type: Array },
  src: { type: String },
  alt: { type: String },
})
</script>

<template>
  <div :class="['overflow-hidden rounded-md border-2 border-yellow-300', styleClass]">
    <img :src="src" :alt="alt" class="h-full w-full object-cover" />

    <slot />
  </div>
</template>
