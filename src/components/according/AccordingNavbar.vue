<script setup>
import AccordingChild from './AccordingChild.vue'

defineProps(['name', 'position'])
</script>

<template>
  <div
    class="group cursor-pointer text-lg font-bold text-purple-200 hover:text-purple-300 lg:block"
  >
    {{ name }}
    <div
      :class="position"
      class="absolute hidden rounded-md bg-[#212121] p-5 text-purple-200 group-hover:block"
    >
      <AccordingChild />
    </div>
  </div>
</template>
