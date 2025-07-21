<script setup>
import ButtonPagination from '@/components/ButtonPagination.vue'
import CardLink from '@/components/card/CardLink.vue'
import Loading from '@/components/loaders/Loading.vue'
import FadeTrasition from '@/components/transition/FadeTrasition.vue'
import FadeTrasitionGroup from '@/components/transition/FadeTrasitionGroup.vue'
import { getAnime } from '@/util/api'
import { useButtonPage, useLoading, useLoadingCard } from '@/util/store'
import { onUnmounted, ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const loading = useLoading()
const loadingCard = useLoadingCard()
const button = useButtonPage()
const data = ref(null)
const count = ref(null)
const perPage = ref(null)
const total = ref(null)
const router = useRouter()

const fetchAnime = async () => {
  router.replace({ query: { page: button.currentPage } })
  loadingCard.resetLoadingCard()

  try {
    const res = await getAnime(
      `top/anime?filter=${route.params.nameSection}&page=${button.currentPage}`,
    )

    data.value = res.data.data
    button.lastPage = res.data.pagination.last_visible_page
    count.value = res.data.pagination.items.count
    total.value = res.data.pagination.items.total
    perPage.value = res.data.pagination.items.per_page

    loadingCard.updateLoadingCard()
    button.updateButtonPage()
  } catch (e) {
    console.log(e)
  } finally {
    loading.updateLoading()
  }
}

onMounted(() => {
  const pageFromQuery = parseInt(route.query.page)
  if (!isNaN(pageFromQuery) && pageFromQuery > 0) {
    button.currentPage = pageFromQuery
  }
  fetchAnime()
})

watch(
  () => button.currentPage,
  () => fetchAnime(),
)

onUnmounted(() => {
  loadingCard.resetLoadingCard()
  loading.resetLoading()
  button.$reset()
})
</script>

<template>
  <FadeTrasitionGroup>
    <Loading v-if="loading.getLoading" />

    <div v-else>
      <ButtonPagination
        :current-page="button.currentPage"
        :last-page="button.lastPage"
        :button-page="button.buttonPage"
        @click-button-page="(i) => (button.currentPage = i)"
        @prev-page="button.prevPage()"
        @next-page="button.nextPage()"
      />

      <div class="ms-20 mt-10">
        <p class="text-lg text-neutral-600">
          Search Result {{ (button.currentPage - 1) * perPage + 1 }} -
          {{ count + (button.currentPage - 1) * perPage }} of {{ total }}
        </p>
      </div>

      <FadeTrasition>
        <Loading v-if="loadingCard.getLoadingCard" />
        <div v-else class="mt-10 flex flex-wrap justify-center gap-3 px-3 lg:px-10">
          <div v-for="i in data" :key="i.mal_id" class="flex flex-col">
            <CardLink
              :style-class="['relative h-40 w-32 lg:h-72 lg:w-52']"
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
              <h1 class="line-clamp-1 w-32 text-purple-200 lg:w-52">{{ i.title }}</h1>
            </div>
          </div>
        </div>
      </FadeTrasition>

      <ButtonPagination
        :current-page="button.currentPage"
        :last-page="button.lastPage"
        :button-page="button.buttonPage"
        @click-button-page="(i) => (button.currentPage = i)"
        @prev-page="button.prevPage()"
        @next-page="button.nextPage()"
      />
    </div>
  </FadeTrasitionGroup>
</template>
