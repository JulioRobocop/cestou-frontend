<script setup lang="ts">
import { Home, ClipboardList, LogOut, ChevronRightIcon, CircleUserRoundIcon } from 'lucide-vue-next'
import { getUserFromToken } from '@/utils/getUserFromToken'
import { ref } from 'vue'

const isExpanded = ref(localStorage.getItem("is_expanded") === "true")
const user = getUserFromToken()
const userName = ref(user || 'Usuário')

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value
  localStorage.setItem("is_expanded", String(isExpanded.value))
}

const logOut = () => {
  const token = localStorage.getItem("token")
  if (token) localStorage.removeItem("token")
}

</script>

<template>
  <aside class="flex flex-col bg-[#ed0c6e] text-white min-h-screen p-4 transition-all duration-200 overflow-hidden"
    :class="isExpanded ? 'w-60' : 'w-16'">
    <div class="mb-4">
      <img src="/images/pado_logo.svg" alt="Logo" class="size-full rounded" />
    </div>

    <div class="flex justify-end mb-4">
      <button @click="toggleMenu" class="text-white hover:bg-[#4F1528] transition-all duration-200"
        :class="isExpanded ? 'rotate-180' : ''">
        <ChevronRightIcon class="w-6 h-6" />
      </button>
    </div>

    <div class="flex items-center gap-4">
      <CircleUserRoundIcon class="w-6 h-6 min-w-6" />
      <span class="whitespace-nowrap transition-opacity duration-300" :class="isExpanded ? 'opacity-100' : 'opacity-0'">
        Olá, {{ userName }}
      </span>
    </div>

    <span class="text-xs uppercase text-white mb-2 mt-2 transition-opacity duration-300"
      :class="isExpanded ? 'opacity-100' : 'opacity-0'">
      Menu
    </span>

    <nav class="flex flex-col gap-1 -mx-4">
      <router-link to="/" class="flex items-center gap-4 px-4 py-3 hover:bg-[#4F1528] transition-colors duration-200">
        <Home class="w-6 h-6 min-w-6" />
        <span class="whitespace-nowrap transition-opacity duration-300"
          :class="isExpanded ? 'opacity-100' : 'opacity-0'">
          Home
        </span>
      </router-link>

      <router-link to="/my-listings"
        class="flex items-center gap-4 px-4 py-3 hover:bg-[#4F1528] transition-colors duration-200">
        <ClipboardList class="w-6 h-6 min-w-6" />
        <span class="whitespace-nowrap transition-opacity duration-300"
          :class="isExpanded ? 'opacity-100' : 'opacity-0'">
          Meus Anúncios
        </span>
      </router-link>
    </nav>

    <div class="flex-1"></div>

    <nav class="-mx-4">
      <router-link @click="logOut()" to="/login"
        class="flex items-center gap-4 px-4 py-3 hover:bg-[#4F1528] transition-colors duration-200">
        <LogOut class="w-6 h-6 min-w-6" />
        <span class="whitespace-nowrap transition-opacity duration-300"
          :class="isExpanded ? 'opacity-100' : 'opacity-0'">
          Sair
        </span>
      </router-link>
    </nav>
  </aside>
</template>