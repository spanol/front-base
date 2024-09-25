<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md">
      <form @submit.prevent="handleRegister" class="bg-white shadow-md rounded px-8 py-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Registrar-se</h2>
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input v-model="email" type="email" required class="w-full px-3 py-2 border rounded" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Senha</label>
          <input v-model="password" type="password" required class="w-full px-3 py-2 border rounded" />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700">Cargo</label>
          <select v-model="role" required class="w-full px-3 py-2 border rounded">
            <option value="USER">Usuário</option>
            <option value="FREELANCER">Freelancer</option>
            <option value="PROVIDER">Fornecedor</option>
            <option value="ESTABLISHMENT">Estabelecimento</option>
          </select>
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
            Registrar
          </button>
          <router-link to="/login" class="text-blue-500">
            Já tem uma conta?
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const email = ref('');
const password = ref('');
const role = ref('USER');

const router = useRouter();
const store = useStore();

const handleRegister = async () => {
  try {
    await store.dispatch('register', {
      email: email.value,
      password: password.value,
      role: role.value,
    });
    router.push('/');
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    // Aqui você pode adicionar uma mensagem de erro para o usuário
  }
};
</script>
