<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useStatistics } from '~/composables/useStatistics';
import { Chart, registerables } from 'chart.js';
import Datepicker from 'vue3-datepicker';

Chart.register(...registerables);

const { statistics, calculateStatistics } = useStatistics();
const router = useRouter();
const startDate = ref('');
const chartRef = ref(null);
let chartInstance = null;

const fetchStatistics = () => {
  if (startDate.value) {
    calculateStatistics(startDate.value, new Date().toISOString());
  }
};

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = chartRef.value.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['New Users', 'New Posts'],
      datasets: [
        {
          label: 'Statistics',
          data: [statistics.value.newUsers, statistics.value.newPosts],
          backgroundColor: ['#007bff', '#28a745'],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

onMounted(() => {
  fetchStatistics();
  watchEffect(() => {
    renderChart();
  });
});

const goBackToProfile = () => {
  router.push('/profile');
};
</script>

<template>
  <div class="statistics-page">
    <h2>Statistics</h2>
    <form @submit.prevent="fetchStatistics" class="statistics-form">
      <label>
        Start Date:
        <Datepicker v-model="startDate" :format="'YYYY-MM-DD'" :input-class="'datepicker-input'" />
      </label>
      <button type="submit" class="btn btn-primary">Get Statistics</button>
    </form>
    <canvas ref="chartRef" class="statistics-chart"></canvas>
    <button @click="goBackToProfile" class="btn btn-back">Back to Profile</button>
  </div>
</template>

<style scoped>
.statistics-page {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background: #f5f5f5;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.statistics-form {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statistics-form label {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.datepicker-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.datepicker-input:focus {
  border-color: #007bff;
}

.statistics-chart {
  max-width: 100%;
  margin: 20px 0;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s ease;
}

.btn-primary {
  background: #28a745;
  color: white;
}

.btn-primary:hover {
  background: #218838;
}

.btn-back {
  background: #007bff;
  color: white;
}

.btn-back:hover {
  background: #0056b3;
}
</style>