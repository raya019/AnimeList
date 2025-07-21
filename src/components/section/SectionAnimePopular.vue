<script setup>
import CardHome from '@/components/card/CardHome.vue'
import { useApiHome } from '@/util/store'
import SectionMobile from './SectionMobile.vue'

const data = useApiHome()
</script>

<template>
  <CardHome :data="data.dataPopular" />
  <SectionMobile :data="data.dataPopular" />
</template>
