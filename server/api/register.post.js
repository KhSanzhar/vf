import peopleData from '@/assets/people.js';

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event);

  if (peopleData.find((user) => user.email === email)) {
    throw createError({ statusCode: 400, statusMessage: 'Email already exists' });
  }

  const newUser = {
    id: Date.now(),
    PersonName: name,
    email,
    password,
    age: null,
    Avatar: 'default-avatar.png',
    favorites: [],
    Posts: [],
  };

  peopleData.push(newUser);
  setCookie(event, 'auth_token', newUser.id, { httpOnly: true });

  return { user: newUser };
});
