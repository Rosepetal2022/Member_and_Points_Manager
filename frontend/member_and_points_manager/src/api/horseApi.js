import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8888/api';

export const getAllHorses = () => axios.get(`${API_URL}/horse/horses`);
export const getHorseById = (id) => axios.get(`${API_URL}/horses/${id}`);
export const getHorseRecord = (horseId) => axios.get(`${API_URL}/classes/record/${horseId}`)