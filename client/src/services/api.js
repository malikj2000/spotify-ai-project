import axios from 'axios';

const API_URL = '/api';
const AUTH_URL = '/auth';

export const createPlaylist = async (prompt, accessToken) => {
    const response = await axios.post(`${API_URL}/create-playlist`, { prompt, access_token: accessToken });
    return response.data;
}

export const login = async () => {
    window.location.href = `${AUTH_URL}/login`;
}