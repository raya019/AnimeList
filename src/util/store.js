import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAnime } from '@/util/api'

export const useLoading = defineStore('loading', () => {
  const isLoading = ref(true)

  const resetLoading = () => {
    isLoading.value = true
  }

  const updateLoading = () => {
    isLoading.value = false
  }
  const getLoading = computed(() => isLoading.value)

  return { isLoading, updateLoading, resetLoading, getLoading }
})

export const useLoadingCard = defineStore('loadingCard', () => {
  const isLoadingCard = ref(true)

  const resetLoadingCard = () => {
    isLoadingCard.value = true
  }

  const updateLoadingCard = () => {
    isLoadingCard.value = false
  }

  const getLoadingCard = computed(() => isLoadingCard.value)

  return { updateLoadingCard, getLoadingCard, resetLoadingCard }
})

export const useButtonPage = defineStore('buttonPage', () => {
  const buttonPage = ref([])
  const currentPage = ref(1)
  const lastPage = ref(0)

  const updateButtonPage = () => {
    const startPage = Math.floor((currentPage.value - 1) / 10) * 10 + 1
    const endPage = Math.min(startPage + 9, lastPage.value)

    buttonPage.value = Array.from({ length: endPage - startPage + 1 }, (v, k) => startPage + k)
  }

  const nextPage = () => {
    if (currentPage.value < lastPage.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const $reset = () => {
    currentPage.value = 1
    lastPage.value = 0
    buttonPage.value = []
  }

  return { buttonPage, currentPage, lastPage, updateButtonPage, nextPage, prevPage, $reset }
})

export const useApiHome = defineStore('apiHome', () => {
  const loadingStore = useLoading()
  const dataCarousel = ref(null)
  const dataSeasonAnime = ref(null)
  const dataAnimeGenres = ref(null)
  const dataPopular = ref(null)

  const getData = async () => {
    try {
      const [carouselResponse, seasonAnime, animeGenre, popular] = await Promise.all([
        getAnime('top/anime?limit=5&page=1&type=movie'),
        getAnime('seasons/now?limit=10&page=1'),
        getAnime('genres/anime'),
        getAnime('top/anime?filter=bypopularity&page=1&limit=10'),
      ])

      dataCarousel.value = carouselResponse.data.data
      dataSeasonAnime.value = seasonAnime.data.data
      dataAnimeGenres.value = animeGenre.data.data
      dataPopular.value = popular.data.data
    } catch (error) {
      console.log(error)
    } finally {
      loadingStore.updateLoading()
    }
  }

  return { getData, dataCarousel, dataSeasonAnime, dataAnimeGenres, dataPopular }
})

export const useDetailAnime = defineStore('detailAnime', () => {
  const loadingStore = useLoading()

  const detailAnime = ref(null)
  const characters = ref(null)
  const reviews = ref(null)
  const recomendations = ref(null)

  const handlerAnime = async (id) => {
    loadingStore.resetLoading()
    try {
      const [api, character, review, recomendation] = await Promise.all([
        getAnime(`anime/${id}/full`),
        getAnime(`anime/${id}/characters`),
        getAnime(`anime/${id}/reviews?preliminary=true&spoiler=false`),
        getAnime(`anime/${id}/recommendations`),
      ])

      detailAnime.value = api.data.data
      characters.value = character.data.data
      reviews.value = review.data.data
      recomendations.value = recomendation.data.data
    } catch (error) {
      console.log(error)
    } finally {
      loadingStore.updateLoading()
    }
  }

  return { detailAnime, characters, reviews, recomendations, handlerAnime }
})
