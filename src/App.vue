<script lang="ts" setup>
import Main from '@/layouts/MainLayout.vue'
import { userStore } from '@/stores/AuthStore'
import SessionModal from '@/components/SessionModal.vue'

const store = userStore()
</script>
<template>
  <Main v-if="store.isAuth"></Main>
  <router-view v-else></router-view>
  <teleport to="body">
    <session-modal v-if="store.isAuth"></session-modal>
  </teleport>
</template>