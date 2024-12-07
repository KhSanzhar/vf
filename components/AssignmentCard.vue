<script setup>
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';

const props = defineProps({
  comment: { type: Object, required: true },
});
const emit = defineEmits(['likeClicked']);

const { user } = useAuth();
const router = useRouter();

// Check if the user is authenticated before accessing their data
const isAuthenticated = computed(() => user.value !== null);

const isFavorite = computed(() =>
  isAuthenticated.value && user.value.favorites.includes(props.comment.id)
);

const fullStars = computed(() => Math.floor(props.comment.Rating));
const hasHalfStar = computed(() => props.comment.Rating % 1 >= 0.5);
const emptyStars = computed(() => 5 - fullStars.value - (hasHalfStar.value ? 1 : 0));

const avatarSrc = computed(() => `/avatars/${props.comment.Avatar}`);

const likeComment = () => emit('likeClicked', props.comment);

const navigateToChat = () => {
  if (isAuthenticated.value) {
    router.push({
      path: `/chat/${user.value.id}/${props.comment.id}`,
      query: {
        otherUserName: props.comment.PersonName,
      },
    });
  } else {
    router.push('/login'); // Redirect to login if not authenticated
  }
};
</script>

<template>
  <div class="bg-white border border-gray-300 rounded-lg shadow-sm p-4 w-80 hover:shadow-md transition mb-4">
    <div class="flex items-center mb-4">
      <img :src="avatarSrc" alt="avatar" class="w-12 h-12 rounded-full object-cover mr-3" />
      <div class="flex-1">
        <h4 class="text-base font-semibold text-gray-800 m-0">
          <nuxt-link :to="`/user/${comment.id}`" class="text-blue-600 hover:underline">{{ comment.PersonName }}</nuxt-link>
        </h4>
        <div class="mt-1">
          <template v-if="isAuthenticated">
            <button @click="navigateToChat" class="text-sm text-blue-600 underline hover:text-blue-500">
              Chat
            </button>
          </template>
          <template v-else>
            <p class="text-sm text-gray-500">Please log in to start a chat.</p>
          </template>
        </div>
        <p class="text-sm text-gray-500 mt-1">{{ comment.PubDate }}</p>
        <div class="flex items-center mt-2">
          <img v-for="star in fullStars" :key="'full-' + star" src="/star.png" alt="star" class="w-5 h-5" />
          <div v-if="hasHalfStar" class="relative w-5 h-5 overflow-hidden bg-center bg-no-repeat bg-contain" style="background-image:url('/empty-star.png');">
            <img src="/star.png" alt="half-star" class="absolute inset-0 w-5 h-5" style="clip-path: inset(0 50% 0 0)" />
          </div>
          <img v-for="star in emptyStars" :key="'empty-' + star" src="/empty-star.png" alt="empty-star" class="w-5 h-5" />
        </div>
      </div>
    </div>
    <p class="text-sm text-gray-700 mb-4">{{ comment.Commentary }}</p>
    <div>
      <template v-if="isAuthenticated">
        <button @click="likeComment" class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-medium">
          LIKE
        </button>
      </template>
      <template v-else>
        <p class="text-sm text-gray-500">Log in to like this comment.</p>
      </template>
    </div>
  </div>
</template>
