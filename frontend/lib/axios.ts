import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.get(`/auth/refresh`);
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
