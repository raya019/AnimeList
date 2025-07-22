<script setup>
import CardHome from '@/components/card/CardHome.vue'
import Carousel from '@/components/Carousel.vue'
import Genres from '@/components/Genres.vue'
import Loading from '@/components/loaders/Loading.vue'
import AnimeAiring from '@/components/section/SectionAnimeAiring.vue'
import AnimeFavorite from '@/components/section/SectionAnimeFavorite.vue'
import AnimePopular from '@/components/section/SectionAnimePopular.vue'
import AnimeUpcoming from '@/components/section/SectionAnimeUpcoming.vue'
import SectionMobile from '@/components/section/SectionMobile.vue'
import Title from '@/components/Title.vue'
import FadeTrasitionGroup from '@/components/transition/FadeTrasitionGroup.vue'
import { useApiHome } from '@/util/store'
import { useLoading } from '@/util/store.js'
import { onMounted, onUnmounted, ref, onBeforeMount } from 'vue'

const data = useApiHome()
const loadingStore = useLoading()

onBeforeMount(async () => {
  data.getData()
})

const currentTabAnime = ref('Popular')
const animePages = {
  Popular: AnimePopular,
  Favorite: AnimeFavorite,
  Airing: AnimeAiring,
  Upcoming: AnimeUpcoming,
}

onUnmounted(() => {
  loadingStore.resetLoading()
})
</script>

<template>
  <FadeTrasitionGroup>
    <Loading v-if="loadingStore.getLoading" />
    <template v-else>
      <div class="mx-auto max-w-screen-2xl">
        <Carousel :api="data.dataCarousel" />

        <Title
          :title="`Seasonal ${new Date().getFullYear()}`"
          :class-css="['my-10 ms-6 lg:ms-10']"
        />

        <CardHome :data="data.dataSeasonAnime" />
        <SectionMobile :data="data.dataSeasonAnime" />

        <Title title="Anime" :class-css="['my-10 ms-6 lg:ms-10']" />

        <div
          class="mx-10 hidden justify-center gap-10 border-b-2 border-sky-800 px-5 pb-3 text-lg text-purple-200 lg:flex"
        >
          <button
            v-for="(value, key) in animePages"
            :key="key"
            @click="() => (currentTabAnime = key)"
            :class="['hover:text-purple-300', { 'text-purple-600': currentTabAnime === key }]"
          >
            {{ key }}
          </button>
        </div>

        <div class="px-5 md:px-10 lg:hidden">
          <select
            name="Anime"
            id="navAnime"
            v-model="currentTabAnime"
            class="w-full rounded-md px-3 py-2 font-semibold outline-yellow-300"
          >
            <option v-for="(key, value) in animePages" :key="value" :value="value">
              {{ value }}
            </option>
          </select>
        </div>

        <div class="mt-10 pb-10">
          <KeepAlive>
            <component :is="animePages[currentTabAnime]" />
          </KeepAlive>
        </div>

        <Title title="Genres" :class-css="['ms-5  lg:ms-10']" />

        <Genres :data="data.dataAnimeGenres" />
      </div>
    </template>
  </FadeTrasitionGroup>
</template>
