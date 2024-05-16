import axios from "axios";
//const baseURL = "http://core:8081";
const baseURL = "https://k10a308.p.ssafy.io:8081/api";
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
