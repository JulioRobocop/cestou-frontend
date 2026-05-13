<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import SideBar from './components/SideBar.vue';
const route = useRoute()
</script>

<template>
  <div class="flex">
    <SideBar v-if="route.name !== 'login'"/>
    <main class="flex-1">
      <RouterView/>
    </main>
  </div>
</template>