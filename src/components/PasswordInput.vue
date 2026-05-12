<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Eye, EyeOff, Check, Minus } from "lucide-vue-next";

const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);

const requirements = computed(() => [
  {
    name: "A senha deve contém letras maiúsculas e minúsculas",
    predicate:
      password.value.toLowerCase() !== password.value &&
      password.value.toUpperCase() !== password.value,
  },
  {
    name: "A senha precisa conter números",
    predicate: /\d/.test(password.value),
  },
  {
    name: "A senha deve conter símbolos",
    predicate: /\W/.test(password.value),
  },
  {
    name: "A senha precisa ter no mínimo 8 caracteres",
    predicate: password.value.length >= 8,
  },
  {
    name: "As senhas devem ser iguais",
    predicate: password.value === confirmPassword.value,
  },
]);

const emit = defineEmits(["update:password", "update:valid"]);

const isValid = computed(() => requirements.value.every((r) => r.predicate));

watch(password, (val) => emit("update:password", val));
watch(isValid, (val) => emit("update:valid", val));
</script>

<template>
  <div>
    <div class="mb-4 bg-white">
      <label class="block text-gray-800 mb-1">Digite sua senha</label>
      <div class="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
          <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          
          required
          name="password"
          id="password"
          class="w-full py-2 px-3 outline-none rounded-l-md"
          />
          <div class="h-6 w-px bg-gray-100"></div>
          <button type="button" @click="showPassword = !showPassword">
            <component :is="showPassword ? Eye : EyeOff" class="w-5 h-5" />
          </button>
  
      </div>
    </div>
    <div class="mb-4 bg-white">
      <label class="block text-gray-800 mb-1">Repita a senha</label>
      <div class="flex items-center border border-gray-300 rounded-md focus-within:border-blue-500">
        <input
        :type="showPassword ? 'text' : 'password'"
        v-model="confirmPassword"
        required
        name="password-repeat"
        id="password-repeat"
        class="w-full py-2 px-3 outline-none rounded-l-md"
        />
        <div class="h-6 w-px bg-gray-100"></div>
        <button type="button" @click="showPassword = !showPassword">
          <component :is="showPassword ? Eye : EyeOff" class="w-5 h-5" />
        </button>
      </div>
      <ul class="mt-2 space-y-1">
        <li
          v-for="(requirement, key) in requirements"
          :key="key"
          class="flex items-center gap-2 text-sm"
          :class="requirement.predicate && password != '' ? 'text-green-500' : 'text-gray-400'"
        >
          <component
            :is="requirement.predicate && password != '' ? Check : Minus"
            class="w-4 h-4"
          />
          {{ requirement.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
