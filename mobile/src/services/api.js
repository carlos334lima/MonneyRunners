import axios from "axios";

const api = axios.create({
  baseURL: "https://192.168.15.41:8000" ,
});

export default api;
