<script setup>
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const props = defineProps({
  reviews: {
    type: Array,
  },
  reactions: {
    type: Object,
  },

  selectedIdReviews: {
    type: Object,
  },

  isModalReviewOpen: {
    type: Boolean,
  },
})

defineEmits(['handlerReviews', 'handlerCloseModalReview'])

const breakpoint = {
  320: {
    slidesPerView: 1.5,
    spaceBetween: 20,
  },

  768: {
    slidesPerView: 2,
    spaceBetween: 10,
  },

  1024: {
    slidesPerView: 3,
    allowTouchMove: false,
    spaceBetween: 10,
  },
}
</script>

<template>
  <div class="relative mt-10 px-10 lg:px-12">
    <div class="swiper-button-prev after:text-yellow-200 hover:text-yellow-400"></div>
    <div class="swiper-button-next after:text-yellow-200 hover:text-yellow-400"></div>
    <swiper
      :modules="[Navigation]"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :breakpoints="breakpoint"
    >
      <swiper-slide
        v-for="i in props.reviews"
        :key="i.mal_id"
        class="rounded-md border-2 border-yellow-300 bg-neutral-700 p-3"
      >
        <div class="mb-5 flex items-center gap-2">
          <div class="h-5 w-5 overflow-hidden rounded-full">
            <img
              :src="i.user.images.webp.image_url"
              :alt="i.user.images.webp.image_url"
              class="h-full w-full"
            />
          </div>
          <h1 class="text-xs text-purple-200 md:text-sm">{{ i.user.username }}</h1>
        </div>

        <p class="mb-5 line-clamp-5 text-xs text-purple-200">
          {{ i.review }}
        </p>

        <div class="flex gap-x-2">
          <span
            v-for="(value, key) in props.reactions"
            :key="key"
            class="text-xs text-purple-200 lg:text-sm"
            >{{ value }}{{ i.reactions[key] }}</span
          >
        </div>

        <div class="mt-5 flex justify-end">
          <button
            @click="$emit('handlerReviews', i)"
            class="text-sm text-purple-200 hover:text-purple-300"
          >
            Detail>>>
          </button>
        </div>
      </swiper-slide>
    </swiper>

    <div
      v-if="props.selectedIdReviews"
      :class="[
        'fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50',
        { hidden: isModalReviewOpen },
      ]"
    >
      <div class="flex h-3/4 w-3/4 flex-col gap-y-3 bg-neutral-800 p-5">
        <div class="flex w-full items-center justify-between gap-x-3">
          <div class="h-10 w-10 overflow-hidden rounded-full">
            <img
              :src="props.selectedIdReviews.user.images.webp.image_url"
              :alt="props.selectedIdReviews.user.images.webp.image_url"
              class="h-full w-full"
            />
          </div>
          <h1 class="me-auto text-xs text-purple-200 md:text-sm">
            {{ props.selectedIdReviews.user.username }}
          </h1>
          <button @click="$emit('handlerCloseModalReview')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="bi bi-x w-8 fill-white hover:fill-sky-800"
              viewBox="0 0 16 16"
            >
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
        </div>

        <div class="overflow-y-auto">
          <p class="text-xs text-purple-200">
            {{ props.selectedIdReviews.review }}
          </p>
        </div>

        <div class="flex gap-x-2">
          <span
            v-for="(value, key) in props.reactions"
            :key="key"
            class="text-xs text-purple-200 lg:text-sm"
            >{{ value }} {{ props.selectedIdReviews.reactions[key] }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
