<script setup>
import { ref } from 'vue';
import AssignmentHeader from '@/components/AssignmentHeader.vue';
import AssignmentMain from '@/components/AssignmentMain.vue';

const selectedTopic = ref('ADVENTURE BLOG');

const updateTopic = (topic) => {
  selectedTopic.value = topic;
};
</script>

<template>
  <div class="index-page">
    <div class="header-container">
      <AssignmentHeader @updateTopic="updateTopic" />
    </div>
    <div class="main-container">
      <AssignmentMain :selectedTopic="selectedTopic" />
    </div>
  </div>
</template>

<style scoped>
.index-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #e3f2fd;
  padding: 20px;
  gap: 30px;
}

.header-container {
  width: 100%;
  max-width: 1000px;
  background: #5bb9cd;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.main-container {
  width: 100%;
  max-width: 1000px;
  background: #4fbfcb;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
