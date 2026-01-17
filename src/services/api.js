import axios from "axios";

// Create an Axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Add a request interceptor to include JWT token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `JWT ${token}`;
  return req;
});

// Add a response interceptor to handle unauthorized errors
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default API;
