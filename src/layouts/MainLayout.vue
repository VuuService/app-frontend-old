<script lang="ts" setup>
import BottomNavigation from '@/layouts/BottomNavigation.vue'
import NavBar from '@/layouts/NavBar.vue'
</script>
<template>
  <div class="max-w-md mx-auto max-h-lg">
    <NavBar></NavBar>
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" name="fade">
        <div :key="route.path" class="py-16 mt-2">
          <component :is="Component"></component>
        </div>
      </transition>
    </router-view>

    <BottomNavigation></BottomNavigation>
  </div>
</template>
