import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8888/api';



export const addResults = (payload) => axios.post(`${API_URL}/admin/addResults`, payload);
