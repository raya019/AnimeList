<script setup>
const emit = defineEmits(['prev', 'next'])
</script>

<template>
  <button @click="emit('prev')" class="absolute left-5 top-1/2 z-20 hidden text-white lg:block">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      width="50"
      height="50"
      class="bi bi-chevron-left text-white/30 hover:text-white/70"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
      />
    </svg>
  </button>
  <button @click="emit('next')" class="absolute right-5 top-1/2 z-20 hidden text-white lg:block">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      width="50"
      height="50"
      class="bi bi-chevron-right text-white/30 hover:text-white/70"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
      />
    </svg>
  </button>
</template>
