import peopleData from '@/assets/people.js';

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'auth_token');
  if (!authToken) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const { name, email, age } = await readBody(event);
  const user = peopleData.find((u) => u.id === parseInt(authToken));

  if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' });

  // Update only the fields that are provided
  if (name) user.PersonName = name;
  if (email) user.email = email;
  if (age) user.age = age;

  return { 
    user: { 
      id: user.id, 
      name: user.PersonName, 
      email: user.email,
      age: user.age,
      favorites: user.favorites || [] 
    } 
  };
});
