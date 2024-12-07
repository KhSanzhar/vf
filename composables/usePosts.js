import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';

export const usePosts = () => {
  const { user } = useAuth();
  const posts = ref([]);

  const fetchPosts = async () => {
    try {
      const response = await $fetch('/api/posts');
      posts.value = response.posts;
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const createPost = async (title, content) => {
    try {
      const response = await $fetch('/api/posts', {
        method: 'POST',
        body: { title, content },
      });
      posts.value.push(response.post);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const updatePost = async (postId, title, content) => {
    try {
      const response = await $fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: { title, content },
      });
      const postIndex = posts.value.findIndex((post) => post.id === postId);
      posts.value[postIndex] = response.post;
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await $fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      posts.value = posts.value.filter((post) => post.id !== postId);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return {
    posts,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
};