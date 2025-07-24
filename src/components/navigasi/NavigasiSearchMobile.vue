<script setup>
import { ref } from 'vue'
import AccordingNavMobile from '../according/AccordingNavMobile.vue'

const navSideBar = ref(null)
const hamburger = ref(null)
const modal = ref(null)
defineEmits(['handlerClickSideBar', 'handlerClickNavAnime'])
defineProps(['menuOpen', 'active'])
defineExpose({
  navSideBar,
  hamburger,
  modal,
})
</script>

<template>
  <nav class="lg:hidden">
    <button
      @click="$emit('handlerClickSideBar')"
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
        menuOpen ? '-translate-x-full' : '-translate-x-0',
        `absolute bottom-0 left-0 right-0 top-0 h-screen w-full rounded-br-md bg-[#212121] transition-all duration-500 ease-in-out after:absolute after:left-0 after:top-0 after:h-screen after:backdrop-blur-sm after:transition-all after:duration-500 after:ease-in-out after:content-['']`,
      ]"
    >
      <div ref="modal" class="absolute z-10 mt-16 flex flex-col gap-3 ps-4 text-white">
        <router-link :to="{ name: 'home' }" class="text-purple-200 hover:text-purple-300"
          >Home</router-link
        >

        <AccordingNavMobile
          @on-click="$emit('handlerClickNavAnime')"
          :is-active="active"
          name="Anime"
        />
      </div>
    </nav>
  </nav>
</template>
