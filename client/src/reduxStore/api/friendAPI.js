import { handleApiError, API } from "./utils";

export const getFriends = async () => {
  try {
    const { data } = await API.get("/friends");
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getNewFriends = async () => {
  try {
    const { data } = await API.get("/addfriends");
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAllFriendRequests = async () => {
  try {
    const { data } = await API.get("/friends");
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const sendFriendRequest = async (friendId) => {
  try {
    await API.patch(`/friends/${friendId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const rejectFriendRequest = async (friendId) => {
  try {
    await API.delete(`/friends/${friendId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const removeFriend = async (friendId) => {
  try {
    const { data } = await API.patch(`/friends/${friendId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const blockFriend = async (friendId) => {
  try {
    const { data } = await API.patch(`friends/friendId`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const unblockFriend = async (friendId) => {
  try {
    const { data } = await API.delete(`friends/friendId`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const searchFriends = async (value) => {
  try {
    const { data } = await API.get(`/friends/search?q=${value}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
