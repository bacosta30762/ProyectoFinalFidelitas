import axios from "axios";
import { API_ROUTES } from "./api";

const apiClient = axios.create({
  baseURL: API_ROUTES.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(`${API_ROUTES.auth}/refresh-token`, {
          refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem("token", accessToken);

        // Update original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
