import messages from '@/assets/messages.js';

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'auth_token');
  if (!authToken) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const { toUserId, content } = await readBody(event);
  const fromUserId = parseInt(authToken);

  if (!toUserId || !content || !fromUserId) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid message data' });
  }

  const message = {
    id: Date.now(),
    fromUserId,
    toUserId,
    content,
    timestamp: new Date().toISOString(),
  };

  messages.push(message);

  return { message };
});