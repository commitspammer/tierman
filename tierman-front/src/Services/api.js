import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getJwt = (name) => {
  return localStorage.getItem(name) || null;
};

api.interceptors.request.use((config) => {
  const jwt = getJwt("jwt");
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
});
