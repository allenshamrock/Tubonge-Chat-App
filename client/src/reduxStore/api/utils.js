import axios from " axios";

const baseUrl = " http://127.0.0.1:5555";

// Creating an axios instance
export const API = axios.create({
  baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adding the users's accesstoken to the authorix=zation header for authenticated API calls
API.interceptors.request.use((req) => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;

  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

// centralizes handling of API errors & provide consistent ways  to extract error message
export const handleApiError = async (error) => {
  try {
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred";
    return { error: errorMessage, data: null };
  } catch (err) {
    throw new Error("An unexpected error occurred");
  }
};
