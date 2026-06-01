<script setup lang="ts">
import router from "@/router";
import axios from "axios";
import { ref } from "vue";
import PasswordInput from "@/components/PasswordInput.vue";

const screen = ref("register");
const registration = ref("");
const phoneNumber = ref("");
const password = ref("");
const passwordValid = ref(false);
const error = ref("");
const name = ref("");
const email = ref("");
const sectorOptions = [
  "ENGENHARIA",
  "PeD",
  "ADMINISTRATIVO",
  "MONTAGEM_DE_FECHADURAS",
  "EMBALAGEM_DE_FECHADURAS",
  "MONTAGEM_DE_MACANETAS",
  "MONTAGEM_DE_KIT PARAFUSOS",
  "MONTAGEM_DE_CILINDROS",
  "MONTAGEM_DE_GUARNICOES",
  "GALVANOPLASTIA",
  "MANUTENCAO_MECANICA",
  "MANUTENCAO_CIVIL",
  "USINAGEM_DE_CADEADOS",
  "USINAGEM_DE_HASTES",
  "ALMOXARIFADO",
  "EXPEDICAO",
  "CONSERVACAO_E_LIMPEZA",
  "RECUPERACAO_DE_MATERIAIS",
  "CENTRO_DE_DISTRIBUICAO",
  "ESTAMPARIA",
  "MONTAGEM_DE_CADEADOS",
  "EMBALAGEM_DE_SUPERMERCADOS",
  "POLITRIZ",
  "USINAGEM_DE_MACANETAS",
  "PINTURA",
  "FUNDICAO_ZAMAC",
  "USINAGEM_DE_FECHADURAS",
  "USINAGEM_DE_PINOS_E_MOLAS",
  "USINAGEM_DE_CHAVES",
  "APRENDIZ",
  "GARANTIA_DE_QUALIDADE",
  "FERRAMENTARIA",
  "PREPARADORES",
  "AMBULATORIO",
  "LABORATORIO_GALVANOPLASTIA",
];
const sector = ref("");
const workShiftOptions = ["MANHÃ", "TARDE", "NOITE", "COMERCIAL"];
const workShift = ref("");

async function handleLogin() {
  try {
    error.value = "";
    const response = await axios.post("http://localhost:8081/employees/login", {
      registration: registration.value,
      password: password.value,
    });
    router.push("/");
    localStorage.setItem("user", JSON.stringify(response.data));
  } catch (err) {
    error.value = "Invalid credentials";
    console.error(err);
  }
}

async function handleRegister() {
  try {
    error.value = "";
    const response = await axios.post(
      "http://localhost:8081/employees/register",
      {
        name: name.value,
        registration: registration.value,
        email: email.value,
        password: password.value,
        phoneNumber: phoneNumber.value,
        sector: sector.value,
        workShift: workShift.value,
      },
    );
    router.push("/");
    localStorage.setItem("user", JSON.stringify(response.data));
  } catch (err) {
    error.value = "Necessário preencher todos os campos";
    console.error(err);
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin" v-if="screen === 'login'">
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
          <p @click="screen = 'register'">
            Não tem conta?
            <button class="hover:underline cursor-pointer">Cadastre-se</button>
          </p>
        </div>
      </div>
    </div>
  </form>

  <form @submit.prevent="handleRegister" v-else>
    <div class="bg-white flex justify-center items-center h-screen gap-4 overflow-hidden">
      <div class="w-1/2 h-screen hidden lg:block">
        <img src="/images/login.png" alt="Placeholder Image" class="object-cover w-full h-full" />

      </div>
      <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 class="text-2xl font-semibold mb-4">Registre-se</h1>
        <div class="mb-4 bg-white">
          <label class="block text-gray-800 mb-1">Digite seu nome:</label>
          <input class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            v-model="name" placeholder="Nome" type="text" required name="name" id="name" />
        </div>
        <div class="mb-4 bg-white">
          <label class="block text-gray-800 mb-1">Digite sua matrícula:</label>
          <input class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            v-model="registration" placeholder="Matrícula" type="text" name="registration" required id="registration" />
        </div>
        <label class="block text-gray-800 mb-1">Selecione seu turno</label>
        <select
          class="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none"
          v-model="workShift" name="workshift" required id="workshift">
          <option v-for="option in workShiftOptions" :value="option">
            {{ option }}
          </option>
        </select>

        <label disabled class="block text-gray-800 mb-1">Selecione seu setor:</label>
        <select
          class="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none"
          v-model="sector" name="sector" required id="sector">
          <option v-for="option in sectorOptions" :value="option">
            {{ option }}
          </option>
        </select>
        <div class="mb-4 bg-white">
          <label class="block text-gray-800 mb-1">Digite seu e-mail:</label>
          <input class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            v-model="email" placeholder="E-mail" type="email" name="email" required id="email" />
        </div>
        <div class="mb-4 bg-white">
          <label class="block text-gray-800 mb-1">Digite seu telefone:</label>
          <input class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            v-model="phoneNumber" placeholder="Número de telefone" type="phone" name="phone" required id="phone" />
        </div>
        <PasswordInput @update:password="password = $event" @update:valid="passwordValid = $event" />
        <button
          class="bg-black transition-colors hover:bg-pink-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          :disabled="!passwordValid" type="submit">Registrar</button>
        <div>
          <p @click="screen = 'login'">
            Já tem conta?
            <button class="hover:underline cursor-pointer">Faça login</button>
          </p>
        </div>
      </div>
    </div>
  </form>
</template>
