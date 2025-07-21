<script setup>
defineEmits(['prevPage', 'nextPage', 'clickButtonPage'])
defineProps(['currentPage', 'lastPage', 'buttonPage'])
</script>

<template>
  <div class="mt-20 flex justify-center gap-x-3">
    <button @click="$emit('prevPage')" :disabled="currentPage === 1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="bi bi-chevron-double-left w-5 fill-yellow-300 hover:fill-yellow-400"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
        />
        <path
          fill-rule="evenodd"
          d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
        />
      </svg>
    </button>

    <button
      v-for="i in buttonPage"
      :key="i"
      @click="$emit('clickButtonPage', i)"
      :class="[
        'w-10 rounded-lg p-1 text-yellow-200 hover:bg-sky-800 hover:text-yellow-300',
        { 'bg-sky-800 text-yellow-300': i === currentPage },
      ]"
    >
      {{ i }}
    </button>

    <button @click="$emit('nextPage')" :disabled="currentPage === lastPage">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="bi bi-chevron-double-right w-5 fill-yellow-300 hover:fill-yellow-400"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
        />
        <path
          fill-rule="evenodd"
          d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
        />
      </svg>
    </button>
  </div>
</template>
