<script lang="ts" setup>
import Main from '@/layouts/MainLayout.vue'
import { userStore } from '@/stores/AuthStore'

const { user } = userStore()
</script>
<template>
  <Main v-if="user?.token"></Main>
  <router-view v-else></router-view>
</template>