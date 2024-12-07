<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

const email = ref('');
const password = ref('');
const router = useRouter();
const { login } = useAuth();

const handleLogin = async () => {
  const success = await login(email.value, password.value);
  if (success) {
    router.push('/');
  } else {
    alert('Invalid credentials.');
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-50">
    <div class="bg-white border border-gray-300 rounded-lg shadow-md p-8 w-full max-w-sm text-center">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
        />
        <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
        />
        <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition font-medium text-sm"
        >
          Login
        </button>
      </form>
      <p class="text-sm text-gray-600 mt-4">
        Don't have an account?
        <nuxt-link to="/register" class="text-blue-600 underline hover:text-blue-500">Register here</nuxt-link>
      </p>
    </div>
  </div>
</template>
