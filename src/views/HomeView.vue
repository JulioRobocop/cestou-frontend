<script setup lang="ts">
import router from "@/router";
import axios from "axios";
import { PlusCircle } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { sectorDisplay, sectorColor } from "@/utils/sectorDisplay";
import CreateListingButton from "@/components/CreateListingButton.vue";

const listings = ref([]);
const error = ref("");
const showCreateModel = ref(false)

function formatDate(dateStr : string ) {
  return new Date(dateStr).toLocaleDateString('pt-BR')
}

function getSectorColor(sector: string) {
  return sectorColor[sector];
}

function formatEnum(value : string) : string {
  return value.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase())
}

function getSectorDisplay(sector: string) {
  return sectorDisplay[sector];
}

async function bookListing(listingId: number) {
  try {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      alert("Necessário realizar o login ou registro para reservar uma cesta")
      return;
    }
    const user = JSON.parse(userData);

    const response = await axios.put(
      `http://localhost:8081/listings/${listingId}/book`,
      { employeeId: user.id },
    );
    await fetchListings();
  } catch (err) {
    error.value = "Erro ao reservar a cesta";
    console.log("Error message:", err);
  }
}

const fetchListings = async () => {
  try {
    const response = await axios.get("http://localhost:8081/listings");
    const data = response.data;
    listings.value = data;
  } catch (err) {
    error.value = "Erro ao carregar as cestas";
    console.error("Error message:", err);
  }
};
onMounted(() => {
  fetchListings();
});
</script>

<template>
  <div class="p-6 h-full bg-gray-200">
    <h1 class="text-3xl font-bold mb-6">Cestas disponíveis</h1>
    <p v-if="error">{{ error }}</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="listing in listings"
        :key="listing.id"
        class="rounded-lg border-l-4 p-5 shadow-md hover:shadow-lg transition-shadow flex flex-col gap-2"
        :class="getSectorColor(listing.seller.sector)"
      >
        <p class="text-lg font-semibold">{{ listing.seller.name }}</p>
        <p class="text-sm text-gray-500">Setor : {{ getSectorDisplay(listing.seller.sector) }}</p>
        <p class="text-sm text-gray-500">Turno : {{ formatEnum(listing.seller.workShift) }}</p>
        <p class="text-sm text-gray-500">{{ formatDate(listing.createdAt) }}</p>
        <button class="mt-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors" @click="bookListing(listing.id)">Reservar</button>
      </div>
    </div>
    <p v-if="listings.length === 0 && !error">
      Nenhuma cesta disponível no momento
    </p>
    <button @click='showCreateModel = true' class="flex shadow-md hover:shadow-lg transition-all items-center gap-4 border-l-4 mt-10 rounded-lg px-4 py-3 bg-gray-100 hover:bg-black duration-200 hover:text-white">
      <PlusCircle class="w-6 h-6 min-w-6"/>
      Anunciar Cesta
    </button>
    <CreateListingButton
    v-if="showCreateModel"
    @close="showCreateModel = false"
    @created="fetchListings()"
    />
  </div>
</template>
