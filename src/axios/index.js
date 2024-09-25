import axios from "axios";
import { useRouter } from "vue-router";
import store from "../store";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = store.state.token || localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        const router = useRouter();
        // Redirect to login page
        router.push("/login");
      } else {
        // Show a generic error message
        alert("An error occurred. Please try again later.");
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
