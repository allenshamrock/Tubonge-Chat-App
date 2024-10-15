import { API, handleApiError } from "./utils";

export const signUp = async (values) => {
  try {
    const { data } = await API.post("/users", values);
    return { error: null, data };
  } catch (error) {
    handleApiError(error);
  }
};

export const signIn = async (values) => {
  try {
    const { data } = await API.post("/users/login", values);
    return { error: null, data };
  } catch (error) {
    handleApiError(error);
  }
};

export const editProfile = async (values) => {
  try {
    const { data } = await API.patch("/userId", values);
    return { error: null, data };
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteProfile = async (values) => {
  try {
    const { data } = await API.delete("/usersId", values);
    return { error: null, data };
  } catch (error) {
    handleApiError(error);
  }
};

export const signOut = async (values) => {
  try {
    const { data } = await API.post("/users");
    return { error: null, data };
  } catch (error) {
    handleApiError(error);
  }
};
