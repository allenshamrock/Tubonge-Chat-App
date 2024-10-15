import { handleApiError, API } from "./utils";

export const getConversations = async () => {
  try {
    const { data } = await API.get("/chat");
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getSelectedConversations = async (friendId) => {
  try {
    const { data } = await API.get(`/messages/${friendId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const sendMessage = async (message, chatId) => {
  try {
    await API.post(`/messages/${chatId}`, message);
    return { error: null };
  } catch (error) {
    return handleApiError(error);
  }
};

export const editMessage = async (message, messageId) => {
  try {
    await API.patch(`/chat/messages/${messageId}`, message);
    return { error: null };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteMessage = async (messageId) => {
  try {
    await API.delete(`chat/messages/${messageId}`);
    return { error: null };
  } catch (error) {
    return handleApiError(error);
  }
};

export const seenMessage = async (chatId) => {
  try {
    await API.patch(`/chat/message/seen/${chatId}`);
    return { error: null };
  } catch (error) {
    return handleApiError(error);
  }
};

export const clearConversation = async (chatId) => {
  try {
    const { data } = await API.patch(`/chat/${chatId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getNewConversation = async (chatId) => {
  try {
    const { data } = await API.get(`chat/new/${chatId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
