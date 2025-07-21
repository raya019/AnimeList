<script setup>
import { useButtonPage } from '@/util/store'

defineProps({
  data: {
    type: Array,
  },
})

const buttonPage = useButtonPage()
</script>

<template>
  <div class="flex w-full flex-wrap justify-center gap-3 py-5 lg:mx-auto lg:w-3/4 lg:py-10">
    <router-link
      v-for="(item, index) in data"
      :to="{
        name: 'genre',
        params: { id: item.mal_id },
        query: { page: buttonPage.currentPage },
      }"
      :key="index"
      class="w-1/4 border-2 border-sky-800 p-2 text-start text-xs text-purple-200 hover:bg-sky-800 md:w-[15%] md:p-1 md:text-sm"
    >
      {{ item.name }}
    </router-link>
  </div>
</template>
