import peopleData from '@/assets/people.js';
import { Comment } from 'vue';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const user = peopleData.find(
    (u) =>
      u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
      u.password === password
  );

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
  }

  // Set the auth_token cookie
  setCookie(event, 'auth_token', user.id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return {
    user: {
      id: user.id,
      name: user.PersonName,
      email: user.email,
      age: user.age,
      rating: user.Rating,
      topic: user.Topic,
      commentary: user.Commentary,
      pubDate: user.PubDate,
    },
  };
});
