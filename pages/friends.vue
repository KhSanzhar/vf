<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

const { user, fetchUser, logout, removeFavorite, addFavorite, getFriends } = useAuth();
const router = useRouter();
const isEditing = ref(false);
const showModal = ref(false);
const modalMessage = ref('');
const modalType = ref('');

const friends = ref([]);
const editingFriendId = ref(null);
const newName = ref('');

// Modal open function
const openModal = (message, type) => {
  modalMessage.value = message;
  modalType.value = type;
  showModal.value = true;
  setTimeout(() => {
    showModal.value = false;
  }, 3000);
};

// Fetch the user and friends on mount
onMounted(async () => {
  if (!user.value) {
    await fetchUser();
    if (!user.value) {
      alert('Please log in again.');
      router.push('/login');
    }
  }
  // Fetch the friends only once the user is authenticated
  if (user.value) {
    friends.value = await getFriends();
  }
});

// Toggle follow/unfollow user
const toggleFollowUser = async (personId) => {
  try {
    if (user.value.favorites.includes(personId)) {
      await removeFavorite(personId);
      openModal('User unfollowed successfully!', 'success');
    } else {
      await addFavorite(personId);
      openModal('User followed successfully!', 'success');
    }
    // Refresh the friends list after action
    friends.value = await getFriends();
  } catch (error) {
    console.error('Failed to toggle follow:', error);
    openModal('An error occurred. Please try again.', 'error');
  }
};

// Check if the user is following a person
const isFollowing = (personId) => user.value?.favorites.includes(personId);

// Navigate back to profile
const goToProfile = () => {
  router.push('/profile');
};

// Navigate to chat
const navigateToChat = (friend) => {
  router.push({
    path: `/chat/${user.value.id}/${friend.id}`,
    query: {
      otherUserName: friend.PersonName,
    },
  });
};

// Start editing a friend's name
const startEditing = (friendId, currentName) => {
  editingFriendId.value = friendId;
  newName.value = currentName;
};

// Save the new name
const saveName = async (friendId) => {
  // Here you would typically send a request to the server to update the friend's name
  const friend = friends.value.find(f => f.id === friendId);
  if (friend) {
    friend.PersonName = newName.value;
    openModal('Name updated successfully!', 'success');
  }
  editingFriendId.value = null;
};
</script>

<template>
  <div v-if="user" class="max-w-4xl mx-auto mt-12 p-8 bg-gray-50 rounded-lg shadow-lg flex flex-col items-center">
    <h2 class="text-2xl font-semibold text-gray-800 mb-8">Your Friends</h2>

    <div v-if="friends.length" class="w-full">
      <ul class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <li
            v-for="friend in friends"
            :key="friend.id"
            class="bg-white p-4 rounded shadow flex flex-col items-center"
        >
          <div class="flex items-center mb-4">
            <img
                :src="`/avatars/${friend.Avatar || 'default-avatar.png'}`"
                alt="avatar"
                class="w-12 h-12 rounded-full mr-4"
            />
            <div class="flex-1">
              <div v-if="editingFriendId !== friend.id" class="font-bold text-gray-700">{{ friend.PersonName }}</div>
              <input
                  v-else
                  v-model="newName"
                  class="border rounded px-2 py-1 w-full"
              />
              <p class="text-sm text-gray-600">Email: {{ friend.email }}</p>
            </div>
          </div>
          <div class="flex gap-2 flex-wrap justify-center">
            <button
                @click="toggleFollowUser(friend.id)"
                :class="[
                'px-4 py-2 rounded text-white font-semibold hover:opacity-90 transition duration-200',
                isFollowing(friend.id) ? 'bg-red-600' : 'bg-green-600'
              ]"
            >
              {{ isFollowing(friend.id) ? 'Unfollow' : 'Follow' }}
            </button>
            <button
                @click="navigateToChat(friend)"
                class="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:opacity-90 transition duration-200"
            >
              Chat
            </button>
            <button
                v-if="editingFriendId !== friend.id"
                @click="startEditing(friend.id, friend.PersonName)"
                class="px-4 py-2 bg-yellow-500 text-white rounded font-semibold hover:opacity-90 transition duration-200"
            >
              Rename
            </button>
            <button
                v-else
                @click="saveName(friend.id)"
                class="px-4 py-2 bg-green-600 text-white rounded font-semibold hover:opacity-90 transition duration-200"
            >
              Save
            </button>
          </div>
        </li>
      </ul>
    </div>

    <p v-else class="text-center text-gray-600">
      You have no friends yet.
      <a @click="goToFriendsPage" class="text-blue-600 underline cursor-pointer">Follow some people!</a>
    </p>

    <!-- Modal for success/error messages -->
    <div
        v-if="showModal"
        :class="[
        'fixed top-5 left-1/2 transform -translate-x-1/2 py-3 px-6 rounded shadow z-50',
        modalType === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
      ]"
    >
      <p>{{ modalMessage }}</p>
    </div>

    <!-- Go Back to Profile button -->
    <button
        class="mx-auto mt-5 px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:opacity-90 transition duration-200"
        @click="goToProfile"
    >
      Go Back to Profile
    </button>
  </div>

  <!-- If user is not loaded yet, show loading state -->
  <div v-else class="text-center p-8">
    <p class="text-gray-700">
      Loading your friends... If this takes too long, please
      <a @click="handleLogout" class="text-blue-600 underline cursor-pointer">log in again</a>.
    </p>
  </div>
</template>

<!-- Tailwind CSS used. No scoped styles needed. -->
