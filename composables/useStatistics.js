// ~/composables/useStatistics.js

import { ref } from "vue";
import peopleData from "@/assets/people.js";

export function useStatistics() {
  const statistics = ref({
    newUsers: 0,
    newPosts: 0,
  });

  const calculateStatistics = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate new users
    const newUsers = peopleData.filter((user) => {
      const userCreatedAt = new Date(user.createdAt);
      return userCreatedAt >= start && userCreatedAt <= end;
    }).length;

    // Calculate new posts
    let newPosts = 0;
    peopleData.forEach((user) => {
      user.Posts.forEach((post) => {
        const postDate = new Date(post.Date);
        if (postDate >= start && postDate <= end) {
          newPosts++;
        }
      });
    });

    statistics.value = {
      newUsers,
      newPosts,
    };
  };

  return {
    statistics,
    calculateStatistics,
  };
}
