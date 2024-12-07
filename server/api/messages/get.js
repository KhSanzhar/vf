import messages from '@/assets/messages.js';

export default defineEventHandler((event) => {
  const authToken = getCookie(event, "auth_token");
  if (!authToken)
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  const query = getQuery(event);
  const withUserId = parseInt(query.withUserId);
  const userId = parseInt(authToken);

  const conversation = messages
    .filter(
      (msg) =>
        (msg && msg.fromUserId === userId && msg.toUserId === withUserId) ||
        (msg.fromUserId === withUserId && msg.toUserId === userId)
    )
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return { messages: conversation };
});