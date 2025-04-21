import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // app.config.* veya env.local
});

// ► Her istekte token ekle
api.interceptors.request.use(async (cfg) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
