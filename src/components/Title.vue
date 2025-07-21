<script setup>
defineProps({
  title: {
    type: String,
  },
  classCss: {
    type: Array,
  },
})
</script>

<template>
  <div :class="classCss" class="w-fit border-b-4 border-sky-800 py-2 pe-8 ps-2">
    <h1 class="text-xl text-purple-200 lg:text-3xl">{{ title }}</h1>
  </div>
</template>
