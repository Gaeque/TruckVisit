import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.90.41:8081",
  headers: {
    "Content-Type": "application/json",
  },
});
