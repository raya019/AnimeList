<script setup>
defineProps({
  obj: {
    type: Object,
  },
})
</script>

<template>
  <div class="flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="bi bi-star-fill w-3 fill-yellow-300 md:w-4 lg:w-5"
      viewBox="0 0 16 16"
    >
      <path
        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
      />
    </svg>
    <h6 class="text-center text-sm text-purple-200 md:text-base">{{ obj.score }}</h6>
  </div>
  <div class="flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="bi bi-people-fill w-3 fill-green-500 md:w-4 lg:w-5"
      viewBox="0 0 16 16"
    >
      <path
        d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
      />
    </svg>
    <h6 class="text-center text-sm text-purple-200 md:text-base">{{ obj.members }}</h6>
  </div>
  <div class="flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="bi bi-heart-fill w-3 fill-red-500 md:w-4 lg:w-5"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
      />
    </svg>
    <h6 class="text-center text-sm text-purple-200 md:text-base">{{ obj.favorites }}</h6>
  </div>
</template>
