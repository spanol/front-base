<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md">
      <form @submit.prevent="handleLogin" class="bg-white shadow-md rounded px-8 py-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input v-model="email" type="email" required class="w-full px-3 py-2 border rounded" />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700">Senha</label>
          <input v-model="password" type="password" required class="w-full px-3 py-2 border rounded" />
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
            Entrar
          </button>
          <router-link to="/register" class="text-blue-500">
            Registrar-se
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

const router = useRouter();
const store = useStore();

const handleLogin = async () => {
  try {
    console.log(process.env.BASE_URL);
    await store.dispatch('login', {
      email: email.value,
      password: password.value,
    });
    router.push('/');
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    // Aqui você pode adicionar uma mensagem de erro para o usuário
  }
};
</script>
