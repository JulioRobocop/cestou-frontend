<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue'
import router from '@/router';
import { X } from 'lucide-vue-next';

const success = ref(false)
const error = ref('')
const emit = defineEmits(['close', 'created'])

async function createListing() {
    const userData = localStorage.getItem("user")
    if (!userData) {
        router.push('/login')
        alert("Necessário realizar o login ou registro para adicionar uma cesta")
        return
    }
    try {
        const user = JSON.parse(userData);
        const response = await axios.post("http://localhost:8081/listings", { seller: { id: user.id } })
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
            <!-- <div>
                <img src="/images/logo_pado_preta.png" alt="Logo Pado" class="">
            </div> -->
            <button @click="emit('close')">
                <X
                    class="hover:rotate-180 cursor-pointer hover:bg-gray-300 transition-all duration-200  rounded-lg w-6 h-6" />
            </button>
            <h1 class="flex flex-col items-center mb-1">Deseja anunciar sua cesta?</h1>
            <div class=" bg-black w-full h-0.5 rounded-lg" />
            <div v-if="success === true">
                Cesta anunciada com sucesso
            </div>
            <div v-if="error">
                Erro ao anunciar a cesta
            </div>
            <div class="gap-10 mt-7 flex flex-row justify-center items-center">
                <button
                    class="bg-green-400 p-4 cursor-pointer hover:p-6 hover:shadow-2xl hover:bg-green-300 transition-all rounded-2xl"
                    @click="createListing()">Confirmar</button>
                <button
                    class="bg-red-400 p-4 cursor-pointer hover:p-6 hover:shadow-2xl hover:bg-red-300 transition-all rounded-2xl"
                    @click="emit('close')">Cancelar</button>
            </div>
        </div>
    </div>

</template>