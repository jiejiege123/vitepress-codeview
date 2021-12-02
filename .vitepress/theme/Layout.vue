<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { page } = useData()

console.log(page.value.headers);

const { Layout } = DefaultTheme
</script>

<template>
  <Layout />
  <div v-if="page.headers">
    adsfadsfasdf
  </div>
</template>