import axios from "axios";

const api = axios.create({
  baseURL: __DEV__ ? "https://192.168.15.41:8000" : "",
});

export default api;
