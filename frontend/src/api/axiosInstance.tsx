import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://core:8081",
  withCredentials: true,
});

export default axiosInstance;
