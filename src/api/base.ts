import axios from 'axios';
import { Token } from '../features/user/model/token';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    timeout: 1000,
});

const token = localStorage.getItem('session');
const storedToken: Token = token ? JSON.parse(token) : null;
if (storedToken && storedToken.access_token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken.access_token}`;
}

const { get, post, put, delete: destroy, patch } = axiosInstance;
export { get, post, put, destroy, patch };
