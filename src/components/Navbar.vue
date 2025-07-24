<script setup>
import AccordingNavbar from '@/components/according/AccordingNavbar.vue'
import AccordingNavMobile from '@/components/according/AccordingNavMobile.vue'
import Loading from '@/components/loaders/Loading.vue'
import FadeTrasitionGroup from '@/components/transition/FadeTrasitionGroup.vue'
import { getAnime } from '@/util/api'
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import NavigasiMobile from './navigasi/NavigasiMobile.vue'
import NavigasiSearchMobile from './navigasi/NavigasiSearchMobile.vue'

const searchRef = ref(null)
const searchWrapper = useTemplateRef('searchWrapper')
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
  searchRef.value.navSideBar.addEventListener('click', function (e) {
    // !searchRef.value.hamburger.contains(e.target) &&
    // !e.target.closest('#bar')
    if (!searchRef.value.modal.contains(e.target)) {
      isMenuOpen.value = true
    }
  })
}

const handleClickOutside = (e) => {
  if (searchWrapper.value && !searchWrapper.value.contains(e.target)) {
    isSearchFocus.value = true
    search.value = ''
  }
}

const handler = () => {
  const links = searchRef.value.modal.querySelectorAll('a')

  Array.from(links)
    .slice(1)
    .forEach((item) => {
      item.addEventListener('click', () => {
        anime.value = true
        isMenuOpen.value = true
      })
    })
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
  window.addEventListener('click', handleClickOutside)
  handlerCloseModal()
  handler()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handlerScrollNav)
  window.removeEventListener('click', handleClickOutside)
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
      <router-link
        :to="{ name: 'home' }"
        class="ps-1 text-lg font-bold text-purple-200 hover:text-purple-300"
        >AnimeList</router-link
      >
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
      <div ref="searchWrapper">
        <input
          v-model.lazy="search"
          @focus="() => (isSearchFocus = false)"
          placeholder="Search..."
          class="w-72 rounded-xl bg-[#212121] px-3 py-1 text-white shadow-lg outline-none focus-within:outline hover:outline hover:outline-2 hover:outline-sky-800 focus:outline-2 focus:outline-offset-2 focus:outline-sky-800"
          name="text"
          type="text"
        />
      </div>

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
                <router-link
                  v-for="item in searchData"
                  :key="item.mal_id"
                  class="flex w-full gap-x-2 hover:bg-sky-800"
                  :to="{ name: 'detail', params: { id: item.mal_id } }"
                >
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
                </router-link>
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
          <router-link
            @click="
              () => {
                isSearchFocus = true
                search = ''
              }
            "
            :to="{ name: 'searchAnime', params: { searchAnime: search } }"
            class="italic text-purple-400 hover:text-purple-300"
            >View All</router-link
          >
        </div>
      </div>
    </nav>

    <!-- Mobile -->
    <NavigasiMobile
      :is-search-modal-open="isSearchModalOpen"
      :is-loading="isLoading"
      :search-data="searchData"
      :search="search"
      v-model="search"
      @close-modal="() => (isSearchModalOpen = true)"
      @view-all="
        () => {
          isSearchModalOpen = true
          search = ''
        }
      "
      @open-modal="() => (isSearchModalOpen = false)"
    />

    <!-- Search -->
    <!-- <nav class="lg:hidden">
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
    </nav> -->

    <NavigasiSearchMobile
      ref="searchRef"
      :menu-open="isMenuOpen"
      :active="anime"
      @handler-click-side-bar="handlerClickSideBar"
      @handler-click-nav-anime="handlerClickNavAnime"
    />
  </header>
</template>
