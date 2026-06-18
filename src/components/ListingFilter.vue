<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { sectorDisplay } from '@/utils/sectorDisplay';
import { workShiftDisplay } from '@/utils/workShiftDisplay';

const isMenuOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const selectedSector = ref<string | null>(null)
const selectedWorkShift = ref<string | null>(null)


const emit = defineEmits<{
    filter: [payload: { sector: string | null; workShift: string | null }]
}>()


const toggleDropdown = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        isMenuOpen.value = false
    }
}

const applyFilters = () => {
    emit('filter', {
        sector: selectedSector.value,
        workShift: selectedWorkShift.value
    })
    isMenuOpen.value = false
}

const clearFilters = () => {
    selectedSector.value = null
    selectedWorkShift.value = null
    emit('filter', { sector: null, workShift: null })
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
    <div ref="dropdownRef" class="relative inline-block text-left">
        <button type="button" @click="toggleDropdown" :aria-expanded="isMenuOpen" aria-haspopup="true"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <span>Filtros</span>
            <svg class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-180': isMenuOpen }" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>

        <!-- Painel -->
        <transition enter-active-class="transition ease-out duration-150" enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
            <div v-if="isMenuOpen"
                class="absolute right-0 z-20 mt-2 w-64 origin-top-right rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                <div class="mb-4">
                    <label class="mb-1 block text-sm font-medium text-gray-700">Setor</label>
                    <select v-model="selectedSector"
                        class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        <option :value="null">Todos</option>
                        <option v-for="(label, value) in sectorDisplay" :key="value" :value="value">
                            {{ label }}
                        </option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="mb-1 block text-sm font-medium text-gray-700">Turno</label>
                    <select v-model="selectedWorkShift"
                        class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        <option :value="null">Todos</option>
                        <option v-for="(label, value) in workShiftDisplay" :key="value" :value="value">
                            {{ label }}
                        </option>
                    </select>
                </div>
                <div class="flex items-center justify-between gap-2">
                    <button type="button" @click="clearFilters"
                        class="text-sm font-medium text-gray-500 hover:text-gray-700">
                        Limpar
                    </button>
                    <button type="button" @click="applyFilters"
                        class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Aplicar
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>