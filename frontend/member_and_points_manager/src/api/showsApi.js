import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8888/api';


export const getAllShows = () => axios.get(`${API_URL}/shows`);