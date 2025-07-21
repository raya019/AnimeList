<script setup>
import CardLink from './CardLink.vue'

defineProps({
  obj: { type: Object },
})
</script>

<template>
  <div class="mt-10 flex flex-wrap justify-center gap-4 px-2 md:gap-5 md:px-5">
    <CardLink
      v-for="i in obj"
      :key="i.mal_id"
      :style-class="['relative h-52 w-32 md:h-60 md:w-40 lg:h-72 lg:w-52']"
      name-router="detail"
      :param-router="i.entry.mal_id"
      :src="i.entry.images.webp.image_url"
      :alt="i.entry.mal_id"
    >
      <div
        class="absolute bottom-0 left-0 w-full bg-black/40 py-2 ps-1 text-start backdrop-blur-sm"
      >
        <h1 class="line-clamp-1 text-xs text-purple-200 lg:text-sm">
          {{ i.entry.title }}
        </h1>
      </div>
    </CardLink>
  </div>
</template>
