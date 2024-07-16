import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const generateToken = async (username, password) => {
  try {
    const response = await api.post("/api/authenticate", {
      username,
      password,
    });
    const token = response.data;
    localStorage.setItem("token", token);

    // Update the default Authorization header for future requests
    api.defaults.headers.Authorization = `Bearer ${token}`;

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

export default api;
