import axios from 'axios'
import { Token } from '../features/user/model/token';
const { get, post, put, delete: destroy, patch } = axios;
export { get, post, put, destroy, patch }

const token = localStorage.getItem('session');
const storedToken: Token = token ? JSON.parse(token) : null;
if (storedToken && storedToken.access_token) {
	axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken.access_token}`;
}
