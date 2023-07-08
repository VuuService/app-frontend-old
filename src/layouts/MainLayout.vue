<script lang="ts" setup>
import BottomNavigation from '@/layouts/BottomNavigation.vue'
import NavBar from '@/layouts/NavBar.vue'
</script>
<template>
  <NavBar></NavBar>
  <div class="py-16 mt-2">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

  <BottomNavigation></BottomNavigation>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>