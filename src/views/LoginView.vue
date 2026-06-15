<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
import api from "@/utils/api";

const registration = ref("");
const password = ref("");
const error = ref("");

async function handleLogin() {
  try {
    error.value = "";
    const response = await api.post("/employees/login", {
      registration: registration.value,
      password: password.value,
    });
    localStorage.setItem("token", response.data.token);
    router.push("/");
  } catch (err) {
    error.value = "Invalid credentials";
    console.error(err);
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <div class="bg-white flex justify-center items-center h-screen gap-4">
      <div class="w-1/2 h-screen hidden lg:block">
        <img src="/images/login.png" alt="Placeholder Image" class="object-cover w-full h-full" />
      </div>
      <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 class="text-2xl font-semibold mb-4">Login</h1>
        <div class="mb-4 bg-white">
          <label class="block text-gray-800">Digite sua matrícula</label>
          <input class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            v-model="registration" placeholder="Matrícula" type="text" name="registration" id="registration" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-800">Digite sua senha</label>
          <input class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            v-model="password" type="password" placeholder="Senha" />
        </div>
        <button
          class="bg-black transition-colors hover:bg-pink-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          :disabled="registration === '' || password === ''" type="submit">
          Entrar
        </button>
        <div>
          <p>
            Não tem conta?
            <router-link to="/register">
              <button class="hover:underline cursor-pointer">Cadastre-se</button>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </form>
</template>
