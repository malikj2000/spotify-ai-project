import axios from 'axios';

const API_URL = '/api';
const AUTH_URL = '/auth';

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

export const createPlaylist = async (prompt, accessToken) => {
    const response = await axios.post(`${API_URL}/create-playlist`, { prompt, access_token: accessToken });
    return response.data;
}

export const login = async () => {
    window.location.href = `${AUTH_URL}/login`;
}