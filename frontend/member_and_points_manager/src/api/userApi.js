import axios from 'axios';
const API_URL = process.env.API_URL || 'http://localhost:8888/api';



// Login function
export const login = async (loginData) => {
  try {
    const response =axios.post(`${API_URL}/user/login`, loginData);
    return response;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// Register function
export const register = async (registerData) => {
  try {
    const response = axios.post(`${API_URL}/user/register`, registerData);
    return response;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const getMemberById = (id) => axios.get(`${API_URL}/member/${id}`);
export const getAllMembers = () => axios.get(`${API_URL}/member/getAllMembers`);