<script setup>
import { ref, computed, watch } from 'vue';
import AssignmentCard from '@/components/AssignmentCard.vue';
import peopleData from '@/assets/people.js';

const props = defineProps({
  selectedTopic: {
    type: String,
    required: true,
  },
});

const currentPage = ref(1);
const itemsPerPage = 4;
const sortType = ref('');
const people = ref([...peopleData]);

watch([() => props.selectedTopic, sortType], () => {
  currentPage.value = 1;
});

const filteredComments = computed(() =>
  people.value.filter(person => person.Topic === props.selectedTopic)
);

const sortedComments = computed(() => {
  const comments = [...filteredComments.value];
  if (sortType.value === 'rating') {
    return comments.sort((a, b) => b.Rating - a.Rating);
  } else if (sortType.value === 'date') {
    return comments.sort((a, b) => new Date(b.PubDate) - new Date(a.PubDate));
  }
  return comments;
});

const totalPages = computed(() =>
  Math.ceil(sortedComments.value.length / itemsPerPage)
);

const paginatedComments = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return sortedComments.value.slice(startIndex, startIndex + itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const increaseRating = (comment) => {
  const foundComment = people.value.find(person => person.id === comment.id);
  if (foundComment) {
    const increment = foundComment.Rating < 3 ? 0.2 : 0.1;
    foundComment.Rating = Math.min(parseFloat((foundComment.Rating + increment).toFixed(1)), 5.0);
  }
};

const sortComments = () => {
  currentPage.value = 1;
};
</script>
<template>
  <div class="flex justify-center p-5">
    <div class="mt-12 w-full max-w-5xl p-5 bg-blue-50 rounded-xl shadow flex flex-col items-center">
      <!-- Top Section -->
      <div class="flex justify-between w-full mb-5">
        <div class="bg-cyan-400 text-white px-4 py-2 rounded-lg text-lg text-center">
          {{ new Date().toLocaleDateString() }}
        </div>
        <div class="bg-cyan-400 text-white px-4 py-2 rounded-lg text-lg text-center">
          {{ selectedTopic }}
        </div>
      </div>

      <!-- Filter and Pagination -->
      <div class="flex justify-between items-center w-full mb-5">
        <div class="flex items-center">
          <img src="/filter-icon.png" alt="filter icon" class="w-5 h-5" />
          <select
              v-model="sortType"
              @change="sortComments"
              class="ml-2 px-2 py-1 rounded bg-cyan-50 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="" disabled>Select Sort Option</option>
            <option value="rating">Sort by Rating</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>
        <div class="flex items-center text-sm text-gray-700">
          <button
              class="mx-2 text-lg hover:text-blue-500 disabled:text-gray-300"
              @click="prevPage"
              :disabled="currentPage === 1"
          >
            ←
          </button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button
              class="mx-2 text-lg hover:text-blue-500 disabled:text-gray-300"
              @click="nextPage"
              :disabled="currentPage === totalPages"
          >
            →
          </button>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="grid grid-cols-2 gap-5 w-full">
        <AssignmentCard
            v-for="(comment, index) in paginatedComments"
            :key="index"
            :comment="comment"
            @likeClicked="increaseRating"
        />
      </div>
    </div>
  </div>
</template>
