<script setup lang="ts">
import api from '@/utils/api.ts';
import { ref } from 'vue'
import { X } from 'lucide-vue-next';

const success = ref(false)
const error = ref('')
const emit = defineEmits(['close', 'created'])
const price = ref<number | null>(null)


async function createListing() {
    try {
        await api.post("/listings", { price: price.value })
        success.value = true
        emit('created')
        emit('close')
    } catch (err) {
        error.value = "Erro ao disponibilizar a cesta"
    }
}
</script>

<template>
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div class="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <button @click="emit('close')">
                <X
                    class="hover:rotate-180 cursor-pointer hover:bg-gray-300 transition-all duration-200  rounded-lg w-6 h-6" />
            </button>
            <h1 class="flex flex-col items-center mb-1">Deseja anunciar sua cesta?</h1>
            <div class=" bg-black w-full h-0.5 rounded-lg" />
            <div class="mt-4">
                <label class="block text-gray-800 mb-1">Preço (R$)</label>
                <input v-model.number="price" type="number" min="1" step="0.01" placeholder="Ex: 150.00"
                    class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
            </div>
            <div v-if="success === true">
                Cesta anunciada com sucesso
            </div>
            <div v-if="error">
                Erro ao anunciar a cesta
            </div>
            <div class="gap-10 mt-7 flex flex-row justify-center items-center">
                <button
                    class="bg-green-400 p-4 cursor-pointer hover:p-6 hover:shadow-2xl hover:bg-green-300 transition-all rounded-2xl"
                    :disabled="!price || price <= 0" @click="createListing()">Confirmar</button>
                <button
                    class="bg-red-400 p-4 cursor-pointer hover:p-6 hover:shadow-2xl hover:bg-red-300 transition-all rounded-2xl"
                    @click="emit('close')">Cancelar</button>
            </div>
        </div>
    </div>
</template>