<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const listings = ref([])

const fetchListings = async () => {
  try {
    const response = await axios.get("http://localhost:8081/")

  } catch (error) {
    
  }
}


onMounted(() => {


})



</script>


<template>
</template>
