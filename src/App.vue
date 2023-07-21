<script setup lang="ts">
import Main from "@/layouts/MainLayout.vue";
import {ref} from "vue";

let isAuth = ref(true);

</script>
<template>
  <Main v-if="isAuth"></Main>
  <router-view v-else></router-view>
</template>
