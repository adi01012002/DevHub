import axios from "axios";

// Use environment variable for the base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper to standardize token key
globalThis.AUTH_TOKEN_KEY = "token";


export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    // console.log(data)
    const data = response.data;
    console.log(data.token)
    if (data.token) {
      localStorage.setItem("token", data.token);
    } else {
      throw new Error("Token not provided by the server");
    }
    // console.log(response)
    console.log(data)
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Login failed";
    console.error("Error logging in:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    const { message } = response.data;

    if (response.status === 201) {
      return { success: true, message };
    } else {
      throw new Error(response.data?.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};


export const fetchUser = async (username) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`${API_BASE_URL}/auth/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};


export const logoutUser = () => {
  localStorage.removeItem("token");  // Remove token from local storage
};
