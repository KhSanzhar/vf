import peopleData from '@/assets/people.js';

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'auth_token');
  if (!authToken) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const postId = parseInt(event.context.params.id);
  const user = peopleData.find((u) => u.id === parseInt(authToken));

  if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' });

  const postIndex = user.Posts.findIndex((post) => post.id === postId);
  if (postIndex === -1) throw createError({ statusCode: 404, statusMessage: 'Post not found' });

  if (event.req.method === 'PUT') {
    const { title, content } = await readBody(event);
    user.Posts[postIndex].Title = title;
    user.Posts[postIndex].Content = content;

    return { post: user.Posts[postIndex] };
  }

  if (event.req.method === 'DELETE') {
    user.Posts.splice(postIndex, 1);
    return { message: 'Post deleted successfully' };
  }
});