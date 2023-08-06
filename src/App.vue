<script lang="ts" setup>
import Main from '@/layouts/MainLayout.vue'
import { userStore } from '@/stores/AuthStore'

const { isAuth } = userStore()
</script>
<template>
  <Main v-if="isAuth"></Main>
  <router-view v-else></router-view>
</template>