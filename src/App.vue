<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import SideBar from './components/SideBar.vue';
const route = useRoute()
</script>

<template>
  <div class="flex">
    <SideBar v-if="route.name !== 'login' && route.name !== 'register'" />
    <main class="flex-1 lg:ml-0" :class="route.name !== 'login' && route.name !== 'register' ? 'ml-16' : ''">
      <RouterView />
    </main>
  </div>
</template>