<template>
    <div>

      <AssignmentHeader @updateTopic="updateTopic" />
      <NuxtPage />
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useAuth } from '~/composables/useAuth';
  
  const { fetchUser } = useAuth();
  
  onMounted(() => {
    fetchUser(); // Initialize user data on app load
  });
  </script>
  
  
  <style scoped>
  /* Your global styles */
  </style>
  