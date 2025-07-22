<script setup>
import Card from '@/components/card/Card.vue'
import CardDetail from '@/components/card/CardDetail.vue'
import ContainerDetailAnime from '@/components/ContainerDetailAnime.vue'
import Loading from '@/components/loaders/Loading.vue'
import Reviews from '@/components/Reviews.vue'
import Title from '@/components/Title.vue'
import FadeTrasitionGroup from '@/components/transition/FadeTrasitionGroup.vue'
import { useDetailAnime, useLoading } from '@/util/store'
import { computed, onBeforeMount, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const store = useLoading()
const route = useRoute()
const selectedIdReviews = ref(null)
const isModalReviewOpen = ref(true)
const detail = useDetailAnime()

onBeforeMount(() => {
  detail.handlerAnime(route.params.id)
})

const handlerReviews = (review) => {
  selectedIdReviews.value = review
  isModalReviewOpen.value = false
}

const information = computed(() => {
  if (!detail.detailAnime) return {}
  return {
    TitleJapanese: detail.detailAnime.title_japanese,
    Type: detail.detailAnime.type,
    Episode: detail.detailAnime.episodes,
    Status: detail.detailAnime.status,
    Producers: detail.detailAnime.producers.map((item) => item.name).join(', ') || '',
    Studios: detail.detailAnime.studios.map((item) => item.name).join(', ') || '',
    Source: detail.detailAnime.source,
    Genre: detail.detailAnime.genres.map((item) => item.name).join(', ') || '',
    Theme: detail.detailAnime.themes.map((item) => item.name).join(', ') || '',
    Duration: detail.detailAnime.duration,
  }
})

const reactions = computed(() => {
  if (!detail.reviews) return {}
  return {
    overall: '😀',
    nice: '👍',
    love_it: '😍',
    confusing: '😵',
    funny: '😂',
  }
})

onUnmounted(() => {
  store.resetLoading()
})
</script>

<template>
  <FadeTrasitionGroup>
    <Loading v-if="store.getLoading" />
    <template v-else>
      <!-- Characters  -->
      <ContainerDetailAnime :obj="detail.detailAnime" :information="information" />

      <Title title="Characters" :class-css="['ms-10', 'mt-5']" />

      <div class="mt-10 flex flex-wrap justify-center gap-4 lg:gap-5 lg:px-5">
        <Card
          v-for="i in detail.characters"
          :key="i.character.mal_id"
          :src="i.character.images.webp.image_url"
          :alt="i.character.name"
          :style-class="['relative h-56 w-32 lg:w-48 lg:h-72']"
        >
          <div class="absolute left-0 top-0 w-fit rounded-br-md bg-sky-800/70 p-2">
            <h1 class="text-xs text-purple-200 lg:text-sm">{{ i.role }}</h1>
          </div>

          <div class="absolute bottom-0 right-0 w-fit rounded-tl-md bg-sky-800/70 p-2">
            <h1 class="line-clamp-1 text-xs text-purple-200 lg:text-sm">{{ i.character.name }}</h1>
          </div>
        </Card>
      </div>

      <!-- Review -->
      <Title title="Reviews" :class-css="['ms-10', 'mt-5']" />

      <Reviews
        :reviews="detail.reviews"
        :reactions="reactions"
        :is-modal-review-open="isModalReviewOpen"
        :selected-id-reviews="selectedIdReviews"
        @handler-reviews="handlerReviews"
        @handler-close-modal-review="() => (isModalReviewOpen = true)"
      />

      <!-- Recommendations -->
      <Title title="Recomendations" :class-css="['ms-10 mt-5']" />

      <CardDetail :obj="detail.recomendations" />
    </template>
  </FadeTrasitionGroup>
</template>
