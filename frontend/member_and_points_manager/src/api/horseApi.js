import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8888/api';

export const getAllHorses = () => axios.get(`${API_URL}/horse/horses`);
export const getHorseById = (id) => axios.get(`${API_URL}/horses/${id}`);
export const getHorseRecord = (horseId) => axios.get(`${API_URL}/classes/record/${horseId}`);
export const getHorsesByMemberId = (memberId) => axios.get(`${API_URL}/horse/horses/getAllByMember/${memberId}`);
export const addHorse = (formData) => axios.post(`${API_URL}/horse/horses`, formData);
export const updateHorse = (id, formData) => axios.patch(`${API_URL}/horse/horses/${id}`, formData);
export const transferHorse = (id, formData) => axios.patch(`${API_URL}/horseOwner/${id}`, formData);
export const deleteHorse = (id) => axios.patch(`${API_URL}/horse/horses/${id}`);