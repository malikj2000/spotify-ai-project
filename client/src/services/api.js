import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const postUsers = async () => {
    const response = await axios.post(`${API_URL}/users`);
    return response.data;
}

export const fetchUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
}

export const deleteUsers = async () => {
    const response = await axios.delete(`${API_URL}/users`);
    return response.data;
}