<template>
  <div class="max-w-md mx-auto mt-12 p-6 bg-gray-100 rounded-lg shadow">
    <h2 class="text-center text-2xl font-semibold text-gray-800 mb-5">Create a New Post</h2>
    <form @submit.prevent="submitPost" class="space-y-4">
      <div class="form-group">
        <label for="title" class="block mb-1 font-medium text-gray-700">Title</label>
        <input
            v-model="title"
            type="text"
            id="title"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
        />
      </div>
      <div class="form-group">
        <label for="date" class="block mb-1 font-medium text-gray-700">Date</label>
        <input
            v-model="date"
            type="date"
            id="date"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
        />
      </div>
      <div class="form-group">
        <label for="content" class="block mb-1 font-medium text-gray-700">Content</label>
        <textarea
            v-model="content"
            id="content"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm h-32"
        ></textarea>
      </div>
      <button
          type="submit"
          class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-medium transition"
      >
        Create Post
      </button>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import peopleData from '@/assets/people.js';

const title = ref('');
const date = ref('');
const content = ref('');
const router = useRouter();

const submitPost = () => {
  const newPost = {
    Title: title.value,
    Date: date.value,
    Content: content.value,
  };

  // Assuming the current user is the first person in the peopleData array
  const currentUser = peopleData[0];
  currentUser.Posts.push(newPost);

  // Redirect to the profile page or any other page
  router.push('/profile');
};
</script>
