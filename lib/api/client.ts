import axios from "axios";

export const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    "Content-Type": "application/json",
    ...(process.env.NEXT_PUBLIC_API_TOKEN
      ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}` }
      : {}),
  },
});
