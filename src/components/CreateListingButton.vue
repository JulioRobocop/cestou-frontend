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
        const response = await axios.post("http://localhost:8081/listings", {seller: {id: user.id}})
        success.value = true   
        emit('created')
    } catch (err) {
        error.value = "Erro ao disponibilizar a cesta"
    }    
}
</script>

<template>
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div class="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <button @click="emit('close')"> <X class="w-6 h-6"/> </button>
            <h1>Deseja anunciar sua cesta?</h1>
            <div v-if="success === true" >
                Cesta anunciada com sucesso
            </div>     
            <div v-if="error">
                Erro ao anunciar a cesta
            </div>
            <button @click="createListing()">Confirmar</button> 
            <button @click="emit('close')">Cancelar</button>
        </div>
    </div>

</template>