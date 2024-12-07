import peopleData from '@/assets/people.js';

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'auth_token');
  if (!authToken) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const { profileId } = await readBody(event);
  const user = peopleData.find((u) => u.id === parseInt(authToken));

  if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' });

  user.favorites = user.favorites || [];
  if (!user.favorites.includes(profileId)) {
    user.favorites.push(profileId);
  } else {
    throw createError({ statusCode: 400, statusMessage: 'User already followed.' });
  }

  return { favorites: user.favorites };
});
