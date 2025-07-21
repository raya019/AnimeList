<script setup>
import { useButtonPage } from '@/util/store'

const titles = {
  Airing: 'airing',
  Upcoming: 'upcoming',
  Favorite: 'favorite',
  Popular: 'bypopularity',
}

const buttonPage = useButtonPage()
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <router-link
      v-for="(value, key) in titles"
      :to="{
        name: 'sectionAnime',
        params: { nameSection: value },
        query: { page: buttonPage.currentPage },
      }"
      :key="key"
      class="hover:text-purple-300"
      >Top {{ key }}</router-link
    >
  </div>
</template>
