<script setup lang="ts">
import api from "@/utils/api.ts";
import { onMounted, ref, computed } from "vue";
import { formatDate, getMonth } from '@/utils/formatDate'
import { getSectorDisplay } from "@/utils/sectorDisplay.ts";
import { formatEnum } from "@/utils/formatEnum.ts";
import formatPhone from "@/utils/formatPhone.ts";

const userListings = ref([]);
const userReservations = ref([]);
const error = ref("");
const statusColor: Record<string, string> = {
  DISPONIVEL: "bg-green-100 text-green-500",
  RESERVADO: "bg-yellow-100 text-yellow-500",
  CONCLUIDO: "bg-blue-100 text-blue-500",
  CANCELADO: "bg-red-100 text-red-500",
};
const listingsByMonth = computed(() => {
  const groups: Record<string, any[]> = {}
  for (const listing of userListings.value) {
    const month = getMonth(listing.createdAt)
    if (!groups[month]) {
      groups[month] = []
    }
    groups[month].push(listing)
  }
  return groups
})



const reservationsByMonth = computed(() => {
  const groups: Record<string, any[]> = {}
  for (const listing of userReservations.value) {
    const month = getMonth(listing.createdAt)
    if (!groups[month]) {
      groups[month] = []
    }
    groups[month].push(listing)
  }
  return groups
})


async function cancelBook(listingId: number) {
  try {
    await api.put(`/listings/${listingId}/cancel-book`);
    await fetchUserReservations();
  } catch (err) {
    error.value = "Não foi possível cancelar a reserva.";
    console.log("Error message: ", err);
  }
}

async function cancelListing(listingId: number) {
  try {
    await api.put(`/listings/${listingId}/cancel`);
    await fetchUserListings();
  } catch (err) {
    error.value = "Não foi possível cancelar o anúncio.";
    console.log("Error message: ", err);
  }
}

async function concludedListing(listingId: number) {
  try {
    await api.put(`/listings/${listingId}/conclude`);
    await fetchUserListings();
  } catch (err) {
    error.value = "Não foi possível concluir a reserva.";
    console.log("Error message: ", err);
  }
}

const fetchUserListings = async () => {
  try {
    const response = await api.get(`/listings/my?role=seller`);
    const data = response.data;
    userListings.value = data;
  } catch (err) {
    error.value = "Erro ao carregar os anúncios do usuário";
    console.error("Error message: ", err);
  }
};

const fetchUserReservations = async () => {
  try {
    const response = await api.get(`/listings/my?role=buyer`);
    const data = response.data;
    userReservations.value = data;
  } catch (err) {
    error.value = "Erro ao carregar as reservas do usuário";
    console.error("Error message: ", err);
  }
};

onMounted(async () => {
  await Promise.all([
    fetchUserListings(),
    fetchUserReservations(),
  ]);
}
);
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Minha Área</h1>
    <p v-if="error" class="text-red-500 mb-4">{{ error }}</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 class="text-xl font-semibold mb-4">
          Meus Anúncios
          <span class="text-sm text-gray-400">({{ userListings.length }})</span>
        </h2>
        <div v-for="(listings, month) in listingsByMonth" :key="month">
          <div class="text-lg font-semibold mb-4 text-gray-400">
            {{ month }}
            <hr class="border-t border-gray-300" />
          </div>
          <div class="flex flex-col gap-4">
            <div v-for="listing in listings" :key="listing.id">
              <div class="bg-white rounded-lg p-4 shadow-md">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-semibold">Cesta #{{ listing.id }}</span>
                  <span class="text-xs font-medium px-2 py-1 rounded-full" :class="statusColor[listing.status]">
                    {{ listing.status }}
                  </span>
                </div>
                <p class="text-sm text-gray-500">{{ formatDate(listing.createdAt) }}</p>
                <div v-if="listing.status === 'RESERVADO' && listing.buyer" class="mt-2 text-sm text-gray-600">
                  <p>Reservado por: {{ listing.buyer.name }}</p>
                  <p>Setor: {{ getSectorDisplay(listing.buyer.sector) }}</p>
                </div>
                <div class="mt-3 flex gap-2">
                  <button v-if="listing.status === 'DISPONIVEL'" @click='cancelListing(listing.id)'
                    class="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded">
                    Cancelar Anúncio
                  </button>
                  <button v-if="listing.status === 'RESERVADO'" @click="concludedListing(listing.id)"
                    class="bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-3 rounded">
                    Concluir Venda
                  </button>
                  <button v-if="listing.status === 'RESERVADO'" @click="cancelBook(listing.id)"
                    class="bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 px-3 rounded">
                    Cancelar Reserva
                  </button>
                </div>
              </div>
              <p v-if="userListings.length === 0" class="text-gray-400 text-sm">
                Nenhum anúncio criado
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-4">
          Minhas Reservas
          <span class="text-sm text-gray-400">({{ userReservations.length }})</span>
        </h2>
        <div v-for="(reservations, month) in reservationsByMonth" :key="month">
          <div class="text-lg font-semibold mb-4 text-gray-400">
            {{ month }}
            <hr class="border-t border-gray-300" />
          </div>

          <div class="flex flex-col gap-4">
            <div v-for="reservation in reservations" :key="reservation.id" class="bg-white rounded-lg p-4 shadow-md">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">{{ reservation.seller.name }}</span>
                <span class="text-xs font-medium px-2 py-1 rounded-full" :class="statusColor[reservation.status]">
                  {{ reservation.status }}
                </span>
              </div>
              <p class="text-sm text-gray-500">
                {{ getSectorDisplay(reservation.seller.sector) }} · {{ formatEnum(reservation.seller.workShift) }}
              </p>
              <p class="text-sm text-gray-500">{{ formatDate(reservation.createdAt) }}</p>
              <p class="text-sm text-gray-500">Telefone: {{ formatPhone(reservation.seller.phoneNumber) }}</p>
              <div class="mt-3">
                <button v-if="reservation.status === 'RESERVADO'" @click="cancelBook(reservation.id)"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 px-3 rounded">
                  Cancelar Reserva
                </button>
              </div>
            </div>
            <p v-if="userReservations.length === 0" class="text-gray-400 text-sm">Nenhuma reserva feita</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
