<script setup>
import CardComponent from '@/components/card/CardHome.vue'
import Loading from '@/components/loaders/Loading.vue'
import { getAnime } from '@/util/api.js'
import { ref, watchEffect } from 'vue'
import FadeTrasitionGroup from '../transition/FadeTrasitionGroup.vue'
import SectionMobile from './SectionMobile.vue'

const data = ref([])
const isLoading = ref(true)

watchEffect(async () => {
  const res = await getAnime('top/anime?filter=upcoming&page=1&limit=10')

  data.value = res.data.data

  isLoading.value = false
})
</script>

<template>
  <FadeTrasitionGroup>
    <Loading v-if="isLoading" />
    <template v-else>
      <CardComponent :data="data" />
      <SectionMobile :data="data" />
    </template>
  </FadeTrasitionGroup>
</template>
