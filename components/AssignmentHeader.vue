<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isMenuOpen = ref(false);
const emit = defineEmits(['updateTopic']);
const router = useRouter();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const goToProfile = () => router.push('/profile');

const selectTopic = (topic) => {
  isMenuOpen.value = false;
  emit('updateTopic', topic);
};
</script>

<template>
  <div class="flex justify-between items-center px-5 bg-gray-100 rounded-t-xl h-20 w-[95%] mx-auto shadow">
    <button
        id="header-burger-btn"
        @click="toggleMenu"
        class="bg-transparent border-none rounded-full p-2 hover:bg-cyan-100 transition"
    >
      <img src="/burger.png" width="51" height="51" alt="Menu" />
    </button>
    <button
        id="header-profile-btn"
        @click="goToProfile"
        class="bg-transparent border-none rounded-full p-2 hover:bg-cyan-100 transition"
    >
      <img src="/profile.png" width="51" height="51" alt="Profile" />
    </button>
  </div>

  <!-- Overlay -->
  <div
      v-if="isMenuOpen"
      @click="toggleMenu"
      class="fixed inset-0 bg-black bg-opacity-50 z-50"
  ></div>

  <!-- Sidebar -->
  <div
      class="fixed top-0 left-0 w-72 h-full bg-cyan-50 p-5 shadow-lg transform transition-transform duration-300 z-50"
      :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <button
        class="text-2xl absolute top-3 right-3 bg-transparent border-none cursor-pointer"
        @click="toggleMenu"
    >
      ×
    </button>
    <ul class="mt-16 space-y-3">
      <li
          class="bg-cyan-400 text-white text-center py-3 rounded hover:bg-cyan-500 cursor-pointer transition"
          @click="selectTopic('ADVENTURE BLOG')"
      >
        ADVENTURE BLOG
      </li>
      <li
          class="bg-cyan-400 text-white text-center py-3 rounded hover:bg-cyan-500 cursor-pointer transition"
          @click="selectTopic('NATURE BLOG')"
      >
        NATURE BLOG
      </li>
      <li
          class="bg-cyan-400 text-white text-center py-3 rounded hover:bg-cyan-500 cursor-pointer transition"
          @click="selectTopic('FASHION BLOG')"
      >
        FASHION BLOG
      </li>
    </ul>
  </div>
</template>
