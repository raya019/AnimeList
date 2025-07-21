<script setup>
import CardLink from '@/components/card/CardLink.vue'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

defineProps({
  data: {
    type: Array,
  },
})
</script>

<template>
  <div class="lg:hidden">
    <swiper
      :modules="[Navigation]"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :breakpoints="{
        320: {
          spaceBetween: 30,
          slidesPerView: 3,
        },
        570: {
          spaceBetween: 10,
          slidesPerView: 3.5,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }"
    >
      <swiper-slide v-for="i in data" class="px-10 pb-3">
        <CardLink
          :style-class="['relative  h-60 w-40 lg:h-72 lg:w-52']"
          name-router="detail"
          :param-router="i.mal_id"
          :src="i.images.webp.image_url"
          :alt="i.mal_id"
        >
          <div class="absolute left-0 top-0 flex gap-2 rounded-br-md bg-sky-800/50 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="bi bi-star-fill w-3 fill-yellow-400"
              viewBox="0 0 16 16"
            >
              <path
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
              />
            </svg>
            <h1 class="text-sm font-bold text-purple-200">{{ i.score || '??' }}</h1>
          </div>
        </CardLink>

        <div class="py-2 ps-1 text-sm">
          <h1 class="line-clamp-1 w-40 text-purple-200 lg:w-52">{{ i.title }}</h1>
        </div>
      </swiper-slide>

      <div class="swiper-button-prev after:text-yellow-200 hover:text-yellow-400"></div>
      <div class="swiper-button-next after:text-yellow-200 hover:text-yellow-400"></div>
    </swiper>
  </div>
</template>
