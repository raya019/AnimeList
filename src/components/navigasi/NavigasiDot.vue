<script setup>
const props = defineProps({
  data: {
    type: Array,
  },
  currentIndex: {
    type: Number,
  },
})

const emit = defineEmits(['click'])
</script>

<template>
  <div class="absolute bottom-3 left-[38%] flex justify-center gap-2 md:left-[45%] lg:hidden">
    <button v-for="(i, index) in props.data" :key="index" @click="emit('click', index)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="bi bi-circle-fill w-3 fill-white transition-colors hover:scale-[1.5] hover:fill-sky-900"
        viewBox="0 0 16 16"
      >
        <circle cx="8" cy="8" r="8" />
      </svg>
    </button>
  </div>
</template>
