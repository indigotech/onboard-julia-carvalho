import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://template-onboarding-node-944896486321.us-central1.run.app",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
