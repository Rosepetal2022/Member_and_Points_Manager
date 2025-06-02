import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8888/api';


export const getAllClasses = () => axios.get(`${API_URL}/classes`);