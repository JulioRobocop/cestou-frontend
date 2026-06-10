<!-- <script setup lang="ts">
import api from '@/utils/api';
import { ref } from 'vue';
import { X } from 'lucide-vue-next';

const success = ref(false)
const error = ref('')
const emit = defineEmits(['close', 'canceled'])




async function cancelBook(listingId: number) {
    try {
        await api.put(`/listings/${listingId}/cancel-book`);
        await fetchUserReservations();
    } catch (err) {
        error.value = "Não foi possível cancelar a reserva.";
        console.log("Error message: ", err);
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
            <h1 class="flex flex-col items-center mb-1">Confirmar reserva da cesta?</h1>
            <div class=" bg-black w-full h-0.5 rounded-lg" />
            <div v-if="success === true">
                Cesta reservada com sucesso
            </div>
            <div v-if="error">
                Erro ao reservar a cesta
            </div>
            <div class="gap-10 mt-7 flex flex-row justify-center items-center">
                <button
                    class="bg-green-400 p-4 cursor-pointer hover:p-6 hover:shadow-2xl hover:bg-green-300 transition-all rounded-2xl"
                    @click="bookListing(props.listingId)">Confirmar</button>
                <button
                    class="bg-red-400 p-4 cursor-pointer hover:p-6 hover:shadow-2xl hover:bg-red-300 transition-all rounded-2xl"
                    @click="emit('close')">Cancelar</button>
            </div>
        </div>
    </div>
</template> -->