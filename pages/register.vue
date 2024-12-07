<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const { register } = useAuth();

const handleRegister = async () => {
  const success = await register(name.value, email.value, password.value);
  if (success) {
    router.push('/login');
  } else {
    alert('Registration failed.');
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-50 p-4">
    <div class="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-md p-8 text-center">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Register</h2>
      <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
        <input
            v-model="name"
            type="text"
            placeholder="Name"
            required
            class="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
        />
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
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition font-medium text-sm"
        >
          Register
        </button>
      </form>
      <p class="text-sm text-gray-600 mt-4">
        Already have an account?
        <nuxt-link to="/login" class="text-blue-600 underline hover:text-blue-500">Login here</nuxt-link>
      </p>
    </div>
  </div>
</template>
