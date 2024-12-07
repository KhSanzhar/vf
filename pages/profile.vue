<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';
import { usePosts } from '~/composables/usePosts';

const { user, fetchUser, logout, removeFavorite, addFavorite } = useAuth();
const { posts, fetchPosts, createPost, updatePost, deletePost } = usePosts();

const router = useRouter();
const name = ref('');
const email = ref('');
const age = ref('');
const avatar = ref('');
const topic = ref('');
const rating = ref('');
const commentary = ref('');
const pubDate = ref('');
const isEditing = ref(false);
const modalMessage = ref('');
const modalType = ref('');
const showModal = ref(false);

const newPostTitle = ref('');
const newPostContent = ref('');
const editingPostId = ref(null);
const editingPostTitle = ref('');
const editingPostContent = ref('');

const openModal = (message, type) => {
  modalMessage.value = message;
  modalType.value = type;
  showModal.value = true;

  setTimeout(() => {
    showModal.value = false;
  }, 3000);
};

onMounted(async () => {
  if (!user.value) {
    await fetchUser();
    if (!user.value) {
      alert('Please log in again.');
      router.push('/login');
    }
  }
  await fetchPosts();
});

watchEffect(() => {
  if (user.value) {
    name.value = user.value.name || '';
    email.value = user.value.email || '';
    age.value = user.value.age || '';
    avatar.value = user.value.avatar || 'default-avatar.png';
    topic.value = user.value.topic || '';
    rating.value = user.value.rating || '';
    commentary.value = user.value.commentary || '';
    pubDate.value = user.value.pubDate || '';
  }
});

const updateProfile = async () => {
  try {
    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        age: age.value,
        avatar: avatar.value,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      user.value = data.user;
      alert('Profile updated successfully.');
      isEditing.value = false;
    } else {
      alert(data.error || 'Failed to update profile.');
    }
  } catch (error) {
    console.error('Profile update failed:', error);
    alert('An error occurred while updating the profile.');
  }
};

const handleEdit = () => (isEditing.value = true);
const cancelEdit = () => (isEditing.value = false);

const handleLogout = () => {
  logout();
  router.push('/login');
};

const goBack = () => {
  router.push('/');
};

const toggleFollowUser = async (personId) => {
  try {
    if (user.value?.favorites?.includes(personId)) {
      await removeFavorite(personId);
      openModal('User unfollowed successfully!', 'success');
    } else {
      await addFavorite(personId);
      openModal('User followed successfully!', 'success');
    }
  } catch (error) {
    console.error('Failed to toggle follow:', error);
    openModal('An error occurred. Please try again.', 'error');
  }
};

const isFollowing = (personId) =>
  computed(() => user.value?.favorites.includes(personId));

const followers = computed(() => {
  if (!user.value || !user.value.favorites) return [];
  return peopleData.filter((person) => user.value.favorites.includes(person.id));
});

const isFollowersDropdownOpen = ref(false);

const toggleFollowersDropdown = () => {
  isFollowersDropdownOpen.value = !isFollowersDropdown.value;
};

const goToFriendsPage = () => {
  router.push('/friends'); // Ensure this route matches the path to your friends page
};

const goToStatisticsPage = () => {
  router.push('/statistics'); // Ensure this route matches the path to your statistics page
};

// CRUD operations for posts
const createNewPost = async () => {
  if (!newPostTitle.value.trim() || !newPostContent.value.trim()) {
    alert('Title and content are required.');
    return;
  }

  await createPost(newPostTitle.value, newPostContent.value);
  newPostTitle.value = '';
  newPostContent.value = '';
  openModal('Post created successfully!', 'success');
};

const startEditingPost = (post) => {
  editingPostId.value = post.id;
  editingPostTitle.value = post.Title;
  editingPostContent.value = post.Content;
};

const savePost = async () => {
  if (!editingPostTitle.value.trim() || !editingPostContent.value.trim()) {
    alert('Title and content are required.');
    return;
  }

  await updatePost(editingPostId.value, editingPostTitle.value, editingPostContent.value);
  editingPostId.value = null;
  editingPostTitle.value = '';
  editingPostContent.value = '';
  openModal('Post updated successfully!', 'success');
};

const removePost = async (postId) => {
  await deletePost(postId);
  openModal('Post deleted successfully!', 'success');
};
</script>
<template>
  <div v-if="user" class="max-w-3xl mx-auto p-8 bg-gray-50 min-h-screen font-sans text-gray-800">
    <h2 class="text-center text-2xl font-semibold text-gray-800 mb-8">My Profile</h2>

    <!-- Profile Display -->
    <div v-if="!isEditing" class="bg-white border border-gray-300 rounded-lg p-6 shadow-sm flex flex-col items-center text-center mb-8">
      <img :src="`/avatars/${avatar}`" alt="avatar" class="w-32 h-32 rounded-full mb-4 object-cover" />
      <p class="text-sm text-gray-700 mb-2"><strong>Name:</strong> {{ name }}</p>
      <p class="text-sm text-gray-700 mb-2"><strong>Email:</strong> {{ email }}</p>
      <p class="text-sm text-gray-700 mb-2"><strong>Age:</strong> {{ age }}</p>
      <p class="text-sm text-gray-700 mb-2"><strong>Topic:</strong> {{ topic }}</p>
      <p class="text-sm text-gray-700 mb-2"><strong>Current Rating:</strong> {{ rating }} ⭐</p>
      <p class="text-sm text-gray-700 mb-2"><strong>Commentary:</strong> {{ commentary }}</p>
      <p class="text-sm text-gray-700 mb-4"><strong>Published On:</strong> {{ pubDate }}</p>
      <button @click="handleEdit" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium">
        Edit
      </button>
    </div>

    <!-- Profile Edit Form -->
    <form v-else @submit.prevent="updateProfile" class="bg-white border border-gray-300 rounded-lg p-6 shadow-sm mb-8 flex flex-col gap-4">
      <input v-model="name" type="text" placeholder="Name" required class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500" />
      <input v-model="email" type="email" placeholder="Email" required class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500" />
      <input v-model="age" type="number" placeholder="Age" min="0" required class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500" />
      <input v-model="avatar" type="text" placeholder="Avatar Filename" required class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500" />
      <div class="flex gap-2 justify-end">
        <button type="submit" class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-medium">
          Save
        </button>
        <button @click="cancelEdit" type="button" class="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded text-sm font-medium">
          Cancel
        </button>
      </div>
    </form>

    <!-- Actions -->
    <div class="flex flex-wrap gap-4 mb-8">
      <button @click="handleLogout" class="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded text-sm font-medium">
        Logout
      </button>
      <button @click="goBack" class="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded text-sm font-medium">
        Back to Main Page
      </button>
      <button @click="goToFriendsPage" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium">
        View Your Friends
      </button>
      <button @click="goToStatisticsPage" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium">
        View Statistics
      </button>
    </div>

    <!-- Create Post Form -->
    <h3 class="text-center text-xl font-semibold text-gray-800 mb-4">Your Posts</h3>
    <form @submit.prevent="createNewPost" class="bg-white border border-gray-300 rounded-lg p-6 shadow-sm mb-8 flex flex-col gap-4">
      <input v-model="newPostTitle" type="text" placeholder="Post Title" required class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500" />
      <textarea v-model="newPostContent" placeholder="Post Content" required class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 h-32"></textarea>
      <button type="submit" class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-medium self-end">
        Create Post
      </button>
    </form>

    <!-- Posts List -->
    <ul class="space-y-4">
      <li v-for="(post, index) in posts" :key="index" class="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
        <div v-if="editingPostId !== post.id">
          <strong class="block text-gray-800 font-medium">{{ post.Title }}</strong>
          <span class="block text-sm text-gray-500 mb-2">{{ post.Date }}</span>
          <p class="text-sm text-gray-700 mb-4">{{ post.Content }}</p>
          <div class="flex gap-2">
            <button @click="startEditingPost(post)" class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-sm">Edit</button>
            <button @click="removePost(post.id)" class="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded text-sm">Delete</button>
          </div>
        </div>
        <div v-else class="flex flex-col gap-4">
          <input v-model="editingPostTitle" type="text" placeholder="Post Title" required class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500" />
          <textarea v-model="editingPostContent" required placeholder="Post Content" class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 h-32"></textarea>
          <div class="flex gap-2 justify-end">
            <button @click="savePost" class="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded text-sm">Save</button>
            <button @click="() => { editingPostId = null; editingPostTitle = ''; editingPostContent = ''; }" class="bg-gray-500 hover:bg-gray-400 text-white px-3 py-1.5 rounded text-sm">Cancel</button>
          </div>
        </div>
      </li>
    </ul>

    <!-- Modal (Toast) -->
    <transition name="fade">
      <div v-if="showModal" :class="['fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow text-sm border z-50', modalType === 'success' ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700']">
        <p>{{ modalMessage }}</p>
      </div>
    </transition>
  </div>

  <div v-else class="text-center p-12 text-sm text-gray-600">
    <p>
      Loading profile... If this takes too long, please
      <a @click="handleLogout" class="text-blue-600 underline hover:text-blue-500 cursor-pointer">log in again</a>.
    </p>
  </div>
</template>
