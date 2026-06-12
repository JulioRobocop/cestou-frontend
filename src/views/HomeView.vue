<script setup lang="ts">
import api from "@/utils/api.ts";
import BookListingButton from "@/components/BookListingButton.vue";
import { PlusCircle } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import CreateListingButton from "@/components/CreateListingButton.vue";
import { formatDate } from '@/utils/formatDate.ts'
import { getSectorColor } from "@/utils/getSector.ts";
import { getSectorDisplay } from "@/utils/sectorDisplay.ts";
import { formatEnum } from "@/utils/formatEnum.ts";

const listings = ref([]);
const error = ref("");
const showCreateModel = ref(false)
const showBookModel = ref(false)
const selectedListingId = ref(0)

const fetchListings = async () => {
  try {
    const response = await api.get("/listings");
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
    <button @click='showCreateModel = true'
      class="flex shadow-md hover:shadow-lg transition-all items-center gap-4 border-l-4 mt-5 mb-5 rounded-lg px-4 py-3 bg-gray-100 hover:bg-black duration-200 hover:text-white">
      <PlusCircle class="w-6 h-6 min-w-6" />
      Anunciar Cesta
    </button>
    <CreateListingButton v-if="showCreateModel" @close="showCreateModel = false" @created="fetchListings()" />
    <p v-if="error">{{ error }}</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="listing in listings" :key="listing.id"
        class="rounded-lg border-l-4 p-5 shadow-md hover:shadow-lg transition-shadow flex flex-col gap-2"
        :class="getSectorColor(listing.seller.sector)">
        <p class="text-lg font-semibold">{{ listing.seller.name }}</p>
        <p class="text-sm text-gray-500">Setor : {{ getSectorDisplay(listing.seller.sector) }}</p>
        <p class="text-sm text-gray-500">Turno : {{ formatEnum(listing.seller.workShift) }}</p>
        <p class="text-sm text-gray-500">Preço : R$ {{ listing.price }}</p>
        <p class="text-sm text-gray-500">{{ formatDate(listing.createdAt) }}</p>
        <button
          class="mt-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          @click="selectedListingId = listing.id; showBookModel = true">
          Reservar
        </button>
      </div>
      <BookListingButton :listingId="selectedListingId" v-if="showBookModel" @close="showBookModel = false"
        @booked="fetchListings()" />
    </div>
    <p v-if="listings.length === 0 && !error">
      Nenhuma cesta disponível no momento
    </p>
  </div>
</template>
