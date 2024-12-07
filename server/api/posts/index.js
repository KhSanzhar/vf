import peopleData from '@/assets/people.js';

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'auth_token');
  if (!authToken) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const user = peopleData.find((u) => u.id === parseInt(authToken));
  if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' });

  if (event.req.method === 'GET') {
    return { posts: user.Posts || [] };
  }

  if (event.req.method === 'POST') {
    const { title, content } = await readBody(event);

    const newPost = {
      id: Date.now(),
      Title: title,
      Content: content,
      Date: new Date().toISOString(),
    };

    user.Posts = user.Posts || [];
    user.Posts.push(newPost);

    return { post: newPost };
  }
});