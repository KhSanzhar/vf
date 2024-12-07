<!-- pages/chat/[currentUserId]/[otherUserId].vue -->

<template>
  <ChatWindow :currentUserId="currentUserId" :otherUserId="otherUserId" :otherUserName="otherUserName" />
</template>

<script setup>
import { useRoute } from 'vue-router';
import ChatWindow from '~/components/ChatWindow.vue';

const route = useRoute();
const currentUserId = parseInt(route.params.currentUserId);
const otherUserId = parseInt(route.params.otherUserId);
const otherUserName = route.query.otherUserName || 'Unknown User'; // Default to 'Unknown User' if not provided
</script>