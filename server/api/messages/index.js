import messages from '@/assets/messages.js';

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'auth_token');
  if (!authToken) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const userId = parseInt(authToken);

  if (event.req.method === 'GET') {
    const query = getQuery(event);
    const withUserId = parseInt(query.withUserId);

    const conversation = messages
      .filter(
        (msg) =>
          (msg.fromUserId === userId && msg.toUserId === withUserId) ||
          (msg.fromUserId === withUserId && msg.toUserId === userId)
      )
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return { messages: conversation };
  }

  if (event.req.method === 'POST') {
    const body = await readBody(event);
    const { toUserId, content } = body;

    if (!toUserId || !content) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid message data' });
    }

    const newMessage = {
      id: messages.length + 1,
      fromUserId: userId,
      toUserId,
      content,
      timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);
    return { message: newMessage };
  }
});
