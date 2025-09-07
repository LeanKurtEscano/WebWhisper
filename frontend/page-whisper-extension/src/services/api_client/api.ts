import axios from "axios";

export const createApi = (baseURL: string, tokenKey?: string) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(tokenKey || "access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};