<script lang="ts" setup>
import BottomNavigation from '@/layouts/BottomNavigation.vue'
import NavBar from '@/layouts/NavBar.vue'
</script>
<template>
  <NavBar></NavBar>
  <div class="pt-16 mt-2 px-2">
    <router-view></router-view>
  </div>

  <BottomNavigation></BottomNavigation>
</template>