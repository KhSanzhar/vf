<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';
import peopleData from '@/assets/people.js';

const { user, addFavorite, removeFavorite } = useAuth();
const route = useRoute();
const router = useRouter();
const userId = ref(null);
const userProfile = ref(null);

function loadUserProfile() {
  userProfile.value = peopleData.find((person) => person.id === userId.value) || null;
}

watch(
  () => route.params.id,
  (newId) => {
    userId.value = parseInt(newId);
    loadUserProfile();
  },
  { immediate: true }
);

const avatarSrc = computed(() => `/avatars/${userProfile.value?.Avatar || 'default.png'}`);

const isFavorite = computed(() =>
  user.value?.favorites?.includes(userProfile.value?.id) || false
);

const toggleFavorite = async () => {
  try {
    if (isFavorite.value) {
      await removeFavorite(userProfile.value.id);
    } else {
      await addFavorite(userProfile.value.id);
    }
  } catch (error) {
    console.error('Failed to toggle favorite:', error);
  }
};

const goBackToMainMenu = () => router.push('/');
</script>


<template>
  <div v-if="userProfile" class="user-profile-page">
    <div class="profile-header">
      <img :src="avatarSrc" alt="avatar" class="avatar" />
      <div class="profile-info">
        <h2>{{ userProfile.PersonName }}</h2>
        <p>Age: {{ userProfile.Age }}</p>
        <p>{{ userProfile.Location }}</p>
        <p>Activity: was {{ userProfile.PubDate }} ago</p>
        <p>Current rating:
          <span v-for="n in 5" :key="n" class="star">
            <img 
              :src="n <= userProfile.Rating ? '/star.png' : '/empty-star.png'" 
              alt="star" 
              class="star-icon"
            />
          </span>
        </p>
        <button class="follow-button" @click="toggleFavorite">
          {{ isFavorite ? 'Unfollow' : 'Follow' }}
        </button>
      </div>
    </div>

    <h3>Latest Posts</h3>
    <div class="posts" v-if="userProfile.Posts && userProfile.Posts.length">
      <div v-for="(post, index) in userProfile.Posts" :key="index" class="post-card">
        <p><strong>{{ post.Title }}</strong></p>
        <p>{{ post.Date }}</p>
        <p>{{ post.Content }}</p>
      </div>
    </div>
    <p v-else>No posts available.</p>

    <button class="back-button" @click="goBackToMainMenu">Back to Main Menu</button>
  </div>

  <div v-else class="user-not-found">
    <p>User not found.</p>
    <button class="back-button" @click="goBackToMainMenu">Back to Main Menu</button>
  </div>
</template>

<style scoped>
.user-profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 20px;
  background: #e3f2fd;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-info h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.profile-info p {
  margin: 5px 0;
  font-size: 16px;
  color: #555;
}

.star {
  display: inline-block;
}

.star-icon {
  width: 20px;
  height: 20px;
}

.follow-button {
  margin-top: 10px;
  padding: 10px 20px;
  background: #33cc66;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.follow-button:hover {
  background: #28a745;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.post-card {
  background: #4fbfcb;
  border-radius: 10px;
  padding: 15px;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.pagination-button {
  margin-top: 15px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #007bff;
}

.pagination-button:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.back-button {
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
