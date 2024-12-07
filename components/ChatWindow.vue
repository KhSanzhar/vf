<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  currentUserId: { type: Number, required: true },
  otherUserId: { type: Number, required: true },
  otherUserName: { type: String, required: true },
});

const messages = ref([]);
const newMessage = ref('');
const interval = ref(null);
const router = useRouter();

const fetchMessages = async () => {
  try {
    const response = await fetch(`/api/messages?withUserId=${props.otherUserId}`, {
      method: 'GET',
      credentials: 'include', // Ensures cookies are sent
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.statusText}`);
    }

    const data = await response.json();
    messages.value = Array.isArray(data.messages) ? data.messages.filter(msg => msg && msg.content) : [];
  } catch (error) {
    console.error('Failed to fetch messages:', error);
  }
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return; // Ignore empty messages
  try {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Ensures cookies are sent
      body: JSON.stringify({ toUserId: props.otherUserId, content: newMessage.value }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    const data = await response.json();
    messages.value.push(data.message);
    newMessage.value = ''; // Clear input
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};

// Helper function to format timestamps
const formatTimestamp = (timestamp) => {
  try {
    return new Date(timestamp).toLocaleTimeString();
  } catch {
    return 'Invalid Date';
  }
};

const goBackToFriends = () => {
  router.push('/friends');
};

onMounted(() => {
  fetchMessages();
  interval.value = setInterval(fetchMessages, 3000); // Poll for new messages every 3 seconds
});

onBeforeUnmount(() => {
  clearInterval(interval.value);
});
</script>
<template>
  <div class="max-w-sm mx-auto mt-5 bg-gray-100 border border-gray-300 rounded-lg p-3 flex flex-col h-[80vh]">
    <div class="flex justify-between items-center font-semibold text-gray-800 mb-2">
      <span>{{ otherUserName }}</span>
      <button @click="goBackToMenu" class="text-sm text-blue-600 underline hover:text-blue-500">
        Go Back to Menu
      </button>
    </div>
    <div class="flex-1 overflow-y-auto space-y-2 p-1">
      <div
          v-for="msg in messages"
          :key="msg.id"
          :class="[
          'px-3 py-2 rounded-lg text-sm whitespace-pre-wrap inline-block max-w-[70%]',
          msg.fromUserId === currentUserId ? 'ml-auto bg-green-100 text-right' : 'mr-auto bg-gray-200 text-left'
        ]"
      >
        <div>{{ msg.content }}</div>
        <div class="text-xs text-gray-500 mt-1">{{ formatTimestamp(msg.timestamp) }}</div>
      </div>
    </div>
    <div class="flex items-center gap-2 mt-2">
      <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type a message..."
          class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
      />
      <button
          @click="sendMessage"
          class="bg-cyan-500 hover:bg-cyan-400 text-white px-3 py-2 rounded text-sm font-medium"
      >
        Send
      </button>
    </div>
    <button
        class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded text-sm font-medium mt-3 self-start"
        @click="goBackToFriends"
    >
      Go Back to Friends Page
    </button>
  </div>
</template>
