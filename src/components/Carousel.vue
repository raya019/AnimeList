<script setup>
import AnimeScore from '@/components/AnimeScore.vue'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

defineProps({
  api: {
    type: Array,
  },
})
</script>

<template>
  <swiper
    :slides-per-view="1"
    :speed="1000"
    :modules="[Autoplay, EffectFade, Pagination]"
    effect="fade"
    :fade-effect="{ crossFade: true }"
    :autoplay="{ delay: 5000 }"
    :pagination="{ clickable: true, el: '.swiper-pagination', type: 'fraction' }"
    :breakpoints="{
      320: {
        allowTouchMove: true,
      },
      1024: {
        allowTouchMove: false,
      },
    }"
  >
    <swiper-slide
      v-for="item in api"
      :key="item.mal_id"
      class="after:absolute after:left-0 after:top-0 after:z-10 after:h-screen after:w-full after:bg-gradient-to-r after:from-black/80 after:from-10% after:via-black/70 after:via-30% after:to-black/40 after:to-90% after:backdrop-blur-sm after:content-['']"
    >
      <img :src="item.images.webp.image_url" alt="" class="h-screen w-full object-cover" />

      <div class="absolute left-[5%] top-[20%] z-30 flex flex-col gap-4 md:left-[10%] lg:top-[20%]">
        <h1 class="text-xl font-bold text-yellow-300 md:text-4xl">Top Movies Anime</h1>
        <h2
          class="w-72 overflow-hidden text-ellipsis whitespace-nowrap text-nowrap text-xl font-bold text-purple-200 lg:text-2xl"
        >
          {{ item.title }}
        </h2>
        <h3 class="text-xs font-bold text-purple-200 lg:text-base">
          {{ item.title_japanese }}
        </h3>
        <div class="flex gap-x-4">
          <AnimeScore :obj="item" />
        </div>
        <p
          class="line-clamp-4 w-72 text-xs font-bold text-purple-200 md:w-96 lg:w-[35rem] lg:text-base"
        >
          {{ item.synopsis }}
        </p>
        <router-link
          :to="{ name: 'detail', params: { id: item.mal_id } }"
          :class="[
            'w-fit rounded-md bg-sky-800 p-3 text-xs font-bold text-purple-200 hover:text-white lg:text-sm',
          ]"
        >
          Show Detail
        </router-link>
      </div>
    </swiper-slide>

    <div class="swiper-pagination"></div>
  </swiper>
</template>
