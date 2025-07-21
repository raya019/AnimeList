<script setup>
import AccordingNavbar from '@/components/according/AccordingNavbar.vue'
import { ref, onMounted, onUnmounted, useTemplateRef, computed, watch } from 'vue'
import AccordingNavMobile from '@/components/according/AccordingNavMobile.vue'
import { getAnime } from '@/util/api'
import Loading from '@/components/loaders/Loading.vue'
import FadeTrasitionGroup from '@/components/transition/FadeTrasitionGroup.vue'

const nav = useTemplateRef('navSideBar')
const ham = useTemplateRef('hamburger')
const anime = ref(true)
const isNavScroll = ref(true)
const isMenuOpen = ref(true)
const isSearchModalOpen = ref(true)
const isSearchFocus = ref(true)
const isLoading = ref(true)
const search = ref('')
const searchData = ref(null)

const handlerClickNavAnime = () => {
  anime.value = !anime.value
}

const handlerScrollNav = () => {
  window.scrollY > 0 ? (isNavScroll.value = false) : (isNavScroll.value = true)
}

const scrollNavbar = computed(() => ({
  ['absolute bg-transparent']: isNavScroll.value,
  ['fixed shadow-sm backdrop-blur bg-yellow-200/20 border-yellow-200 border-b']: !isNavScroll.value,
}))

const handlerClickSideBar = () => {
  isMenuOpen.value ? (isMenuOpen.value = false) : (isMenuOpen.value = true)
}

const handlerCloseModal = () => {
  nav.value.addEventListener('click', function (e) {
    if (!ham.value.contains(e.target) && !e.target.closest('#bar')) {
      isMenuOpen.value = true
    }
  })
}

const handlerCloseSeacrhModal = () => {
  isSearchModalOpen.value = true
}

watch(
  () => search.value,
  async (newVal) => {
    if (newVal != '') {
      isLoading.value = true
      searchData.value = null
      try {
        const res = await getAnime(`anime?q=${newVal}&page=1`)
        searchData.value = res.data.data
      } catch (e) {
        console.log(e)
      } finally {
        isLoading.value = false
      }
    } else {
      searchData.value = null
    }
  },
)

onMounted(() => {
  window.addEventListener('scroll', handlerScrollNav)
  handlerCloseModal()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handlerScrollNav)
})
</script>

<template>
  <header
    :class="[
      'left-0 top-0 z-50 flex w-full items-center justify-between duration-100',
      scrollNavbar,
    ]"
  >
    <nav class="relative flex gap-5 p-3 lg:ms-10 lg:gap-20">
      <h1 class="ps-1 text-lg font-bold text-purple-200 hover:text-purple-300">AnimeList</h1>
    </nav>

    <nav class="me-auto hidden items-center justify-center gap-10 ps-10 lg:flex">
      <router-link
        :to="{ name: 'home' }"
        class="hidden text-lg font-bold text-purple-200 hover:text-purple-300 lg:block"
      >
        Home
      </router-link>

      <AccordingNavbar name="Anime" position="left-64" />
    </nav>

    <nav class="me-10 hidden p-3 lg:block">
      <input
        v-model.lazy="search"
        @focus="() => (isSearchFocus = false)"
        @focusout="
          () => {
            isSearchFocus = true
            search = ''
          }
        "
        placeholder="Search..."
        class="w-72 rounded-xl bg-[#212121] px-3 py-1 text-white shadow-lg outline-none focus-within:outline hover:outline hover:outline-2 hover:outline-sky-800 focus:outline-2 focus:outline-offset-2 focus:outline-sky-800"
        name="text"
        type="text"
      />
      <div
        :class="['absolute mt-1 h-72 w-72 rounded-xl bg-[#212121] p-3', { hidden: isSearchFocus }]"
      >
        <div class="flex h-56 w-full flex-col gap-y-2 overflow-y-auto">
          <template v-if="search.trim() !== ''">
            <FadeTrasitionGroup>
              <Loading v-if="isLoading" />
              <template v-else>
                <p class="text-xs italic text-neutral-400">
                  Search Result : <span class="font-bold">{{ search }}</span>
                </p>
                <div v-for="item in searchData" :key="item.mal_id" class="flex w-full gap-x-2">
                  <div class="h-16 w-1/4">
                    <img
                      :src="item.images.webp.image_url"
                      :alt="item.images.webp.image_url"
                      class="h-full w-full object-cover"
                    />
                  </div>

                  <div class="flex h-16 w-3/4 flex-col justify-center p-1">
                    <h6 class="line-clamp-1 text-xs font-bold text-purple-200">
                      {{ item.title }}
                    </h6>
                    <div class="flex gap-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="bi bi-star-fill w-3 fill-yellow-400"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                        />
                      </svg>
                      <h1 class="text-xs font-bold text-purple-200">{{ item.score || '??' }}</h1>
                    </div>
                  </div>
                </div>
              </template>
            </FadeTrasitionGroup>
          </template>

          <div v-else class="flex h-full items-center justify-center">
            <h1 class="text-xl font-bold italic leading-relaxed tracking-widest text-neutral-600">
              No Result
            </h1>
          </div>
        </div>

        <div
          v-if="search.trim() !== '' && searchData !== null"
          class="flex w-full items-center justify-center rounded-lg p-1"
        >
          <button class="italic text-purple-400 hover:text-purple-300">View All</button>
        </div>
      </div>
    </nav>

    <!-- Mobile -->
    <nav class="ms-auto pe-2 pt-2 lg:hidden">
      <button @click="() => (isSearchModalOpen = false)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-search w-4 fill-white stroke-2 hover:fill-sky-800"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
          />
        </svg>
      </button>

      <div
        :class="[
          `absolute left-0 top-0 h-screen w-full rounded-br-md bg-[#212121]/50 backdrop-blur-sm transition-all duration-500 ease-in-out`,
          { hidden: isSearchModalOpen },
        ]"
      >
        <div class="flex h-full w-full items-center justify-center">
          <div
            class="flex h-3/4 w-3/4 flex-col gap-y-5 rounded-md border border-[#283542] bg-[#212121] px-2 pt-3 md:w-1/2"
          >
            <input
              v-model.lazy="search"
              @focus="() => (isSearchFocus = false)"
              @focusout="
                () => {
                  isSearchFocus = true
                  search = ''
                }
              "
              placeholder="Search..."
              class="w-full rounded-md bg-[#283542] px-3 py-1 text-sm text-white shadow-lg outline-none focus-within:outline hover:outline hover:outline-2 hover:outline-sky-800 focus:outline-2 focus:outline-offset-2 focus:outline-sky-800 md:text-base"
              name="text"
              type="text"
            />

            <div class="flex h-72 w-full flex-col gap-y-3 overflow-y-auto border border-[#283542]">
              <template v-if="search.trim() !== ''">
                <FadeTrasitionGroup>
                  <Loading v-if="isLoading" />
                  <template v-else>
                    <p class="text-xs italic text-neutral-400">
                      Search Result : <span class="font-bold">{{ search }}</span>
                    </p>
                    <div v-for="item in searchData" :key="item.mal_id" class="flex w-full gap-x-2">
                      <div class="h-28 w-1/4">
                        <img
                          :src="item.images.webp.image_url"
                          :alt="item.images.webp.image_url"
                          class="h-full w-full object-cover"
                        />
                      </div>

                      <div class="flex h-16 w-3/4 flex-col justify-center p-1">
                        <h6 class="line-clamp-1 text-xs font-bold text-purple-200">
                          {{ item.title }}
                        </h6>
                        <div class="flex gap-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="bi bi-star-fill w-3 fill-yellow-400"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                            />
                          </svg>
                          <h1 class="text-xs font-bold text-purple-200">
                            {{ item.score || '??' }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </template>
                </FadeTrasitionGroup>
              </template>

              <div v-else class="flex h-full items-center justify-center">
                <h1
                  class="text-xl font-bold italic leading-relaxed tracking-widest text-neutral-600"
                >
                  No Result
                </h1>
              </div>
            </div>

            <div
              v-if="search.trim() !== '' && searchData !== null"
              class="flex w-full justify-center"
            >
              <button
                class="text-sm italic text-purple-400 underline underline-offset-4 hover:text-purple-300 md:text-base"
              >
                View All
              </button>
            </div>

            <button class="absolute right-5 top-5" @click="() => (isSearchModalOpen = true)">
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
        </div>
      </div>
    </nav>

    <nav class="lg:hidden">
      <button
        @click="handlerClickSideBar"
        class="me-5 block rounded-md p-1 hover:bg-sky-800"
        ref="hamburger"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-list w-4 fill-purple-200"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </button>

      <nav
        ref="navSideBar"
        :class="[
          isMenuOpen ? '-translate-x-full' : '-translate-x-0',
          `absolute bottom-0 left-0 right-0 top-0 h-screen w-full rounded-br-md bg-[#212121]/80 transition-all duration-500 ease-in-out after:absolute after:left-0 after:top-0 after:h-screen after:backdrop-blur-sm after:transition-all after:duration-500 after:ease-in-out after:content-['']`,
        ]"
      >
        <div id="bar" class="absolute z-10 mt-16 flex flex-col gap-3 ps-4 text-white">
          <router-link :to="{ name: 'home' }" class="text-purple-200 hover:text-purple-300"
            >Home</router-link
          >

          <AccordingNavMobile @on-click="handlerClickNavAnime" :is-active="anime" name="Anime" />
        </div>
      </nav>
    </nav>
  </header>
</template>
