<script setup lang="ts">
import api from '@/utils/api'
import { Home, ClipboardList, LogOut, ChevronRightIcon, CircleUserRoundIcon } from 'lucide-vue-next'
import { getUserFromUserName } from '@/utils/getUserFromUserName'
import { ref } from 'vue'
import router from '@/router'

const isExpanded = ref(localStorage.getItem("is_expanded") === "true")
const user = getUserFromUserName()
const userName = ref(user || 'Usuário')

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value
  localStorage.setItem("is_expanded", String(isExpanded.value))
}

async function logout() {
  await api.post("/employees/logout")
  localStorage.removeItem('userName')
  router.push("/login")
}


</script>

<template>
  <div v-if="isExpanded" class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
    @click="toggleMenu" />
  <aside
    class="flex flex-col bg-[#ed0c6e] text-white min-h-screen p-4 overflow-hidden z-50 fixed lg:relative transition-all duration-300 ease-in-out"
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
      <router-link to="/" @click="toggleMenu"
        class="flex items-center gap-4 px-4 py-3 hover:bg-[#4F1528] transition-colors duration-200">
        <Home class="w-6 h-6 min-w-6" />
        <span class="whitespace-nowrap transition-opacity duration-300"
          :class="isExpanded ? 'opacity-100' : 'opacity-0'">
          Home
        </span>
      </router-link>

      <router-link to="/my-listings" @click="toggleMenu"
        class="flex items-center gap-4 px-4 py-3 hover:bg-[#4F1528] transition-colors duration-200">
        <ClipboardList class="w-6 h-6 min-w-6" />
        <span class="whitespace-nowrap transition-opacity duration-300"
          :class="isExpanded ? 'opacity-100' : 'opacity-0'">
          Meus Anúncios
        </span>
      </router-link>
    </nav>

    <div class="flex-1"></div>

    <nav class="flex flex-col gap-1 -mx-4">
      <button @click="logout" to="/login"
        class="flex items-center gap-4 px-4 py-3 hover:bg-[#4F1528] transition-colors duration-200">
        <LogOut class="w-6 h-6 min-w-6" />
        <span class="whitespace-nowrap transition-opacity duration-300"
          :class="isExpanded ? 'opacity-100' : 'opacity-0'">
          Sair
        </span>
      </button>
    </nav>
  </aside>
</template>