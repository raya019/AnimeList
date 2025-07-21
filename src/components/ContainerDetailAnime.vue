<script setup>
import AnimeScore from './AnimeScore.vue'
import Card from './card/Card.vue'

defineProps({
  obj: {
    type: Object,
  },

  information: {
    type: Object,
  },
})
</script>

<template>
  <div class="mx-auto mt-20 w-5/6 border-2 border-white p-7 md:w-[70%] lg:w-3/4 lg:p-10">
    <div class="grid-row-6 grid grid-cols-3">
      <div class="order-1 col-span-3 row-span-1 pb-5 lg:col-span-3">
        <h1 class="text-lg font-bold text-purple-200 md:text-xl lg:text-2xl">{{ obj.title }}</h1>
      </div>

      <div class="order-3 col-span-3 pt-4 lg:order-2 lg:col-span-1 lg:row-span-6 lg:ps-4">
        <Card
          :style-class="['mb-2 w-44 h-64 md:h-72 md:w-48']"
          :src="obj.images.webp.image_url"
          :alt="obj.title"
        />

        <div class="pb-1 pt-4">
          <h1 class="font-bold text-purple-200 md:text-lg">Information</h1>
        </div>

        <div class="mt-3">
          <h6
            class="mb-2 text-sm text-purple-200 lg:text-base"
            v-for="(value, key) in information"
            :key="key"
          >
            {{ key }}: {{ value }}
          </h6>
        </div>
      </div>

      <div class="order-2 col-span-3 flex gap-x-5 lg:order-3 lg:col-span-2 lg:row-span-1 lg:px-3">
        <AnimeScore :obj="obj" />
      </div>

      <div class="order-4 col-span-3 pt-5 lg:col-span-2 lg:row-span-3 lg:p-3">
        <h1 class="mb-2 text-lg font-bold text-purple-200 lg:text-xl">Synopsis</h1>
        <p class="text-sm text-purple-200 lg:text-base">{{ obj.synopsis }}</p>
      </div>

      <div class="order-5 col-span-3 pt-5 lg:col-span-2 lg:row-span-2 lg:p-4 lg:pt-0">
        <h1 class="mb-3 text-lg font-bold text-purple-200 lg:mb-5 lg:text-xl">Trailer</h1>
        <iframe
          :src="obj.trailer.embed_url"
          frameborder="0"
          allowfullscreen
          class="mx-auto h-64 w-full border-2 border-yellow-300 md:w-10/12 lg:w-3/4"
        ></iframe>
      </div>
    </div>
  </div>
</template>
