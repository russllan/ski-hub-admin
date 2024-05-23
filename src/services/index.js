import axios from "axios";

export const base_URL = "https://skihub-server-production.up.railway.app/api";

const $api = axios.create({
  baseURL: base_URL,
});

$api.interceptors.request.use(
  async (config) => {
    try {
      const token = await localStorage.getItem("key");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error("Ошибка при настройки Авторизации заголовка:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default $api;
